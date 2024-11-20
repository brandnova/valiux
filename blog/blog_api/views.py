# blog_api/views.py
from urllib import request
from django.utils import timezone
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, Q
from .models import Category, Post, Comment, PostView, Reaction, Tag, UserProfile
from .serializers import CategorySerializer, PostDetailSerializer, PostSerializer, CommentSerializer, TagSerializer, UserProfileSerializer
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    
    @action(detail=True)
    def posts(self, request, slug=None):
        tag = self.get_object()
        posts = tag.posts.filter(status='published')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'tags']
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['created_at', 'updated_at', 'views_count']

    def get_queryset(self):
        queryset = Post.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(
                status='published',
                published_date__lte=timezone.now()
            )
        return queryset

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PostDetailSerializer
        return PostSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            ip = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
            
            # Use get_or_create instead of create
            PostView.objects.get_or_create(
                post=instance,
                ip_address=ip,
                created_date=timezone.now().date(),
                defaults={'user': request.user if request.user.is_authenticated else None}
            )
            
            instance.views_count = instance.post_views.count()
            instance.save()
            
        except Exception as e:
            print(f"Error recording view: {str(e)}")
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = self.get_queryset().filter(is_featured=True)[:5]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def popular(self, request):
        popular_posts = self.get_queryset().order_by('-views_count')[:5]
        serializer = self.get_serializer(popular_posts, many=True)
        return Response(serializer.data)
    
    @action(
        detail=True, 
        methods=['post'],
        permission_classes=[permissions.IsAuthenticated]
    )
    def react(self, request, slug=None):
        post = self.get_object()
        reaction_type = request.data.get('reaction_type')
        
        if not reaction_type:
            return Response(
                {'error': 'Reaction type is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if reaction_type not in dict(Reaction.REACTION_CHOICES):
            return Response(
                {'error': 'Invalid reaction type'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Get or create the reaction
            reaction, created = Reaction.objects.get_or_create(
                post=post,
                user=request.user,
                defaults={'reaction_type': reaction_type}
            )
            
            if not created:
                if reaction.reaction_type == reaction_type:
                    # If same reaction, remove it (toggle off)
                    reaction.delete()
                    return Response({'status': 'reaction removed'})
                else:
                    # If different reaction, update it
                    reaction.reaction_type = reaction_type
                    reaction.save()

            return Response({
                'status': 'reaction added' if created else 'reaction updated',
                'reaction_type': reaction_type
            })

        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
    @action(detail=True, methods=['get'])
    def reactions(self, request, slug=None):
        post = self.get_object()
        reactions = post.reactions.values('reaction_type').annotate(
            count=Count('id')
        )
        user_reaction = None
        if request.user.is_authenticated:
            try:
                user_reaction = post.reactions.get(
                    user=request.user
                ).reaction_type
            except Reaction.DoesNotExist:
                pass
                
        return Response({
            'reactions': reactions,
            'user_reaction': user_reaction
        })

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(parent=None)
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)