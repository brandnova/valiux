# blog_api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Post, Comment, Reaction, Tag, UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')
        read_only_fields = ('id', 'slug')

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'parent', 'content', 'created_at', 'replies')
        read_only_fields = ('id', 'created_at')

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True).data
        return []

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True, required=False)
    comments_count = serializers.SerializerMethodField()
    reactions_count = serializers.SerializerMethodField()
    user_reaction = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'category', 'category_id',
                 'content', 'excerpt', 'featured_image', 'created_at', 
                 'updated_at', 'status', 'comments_count', 'reactions_count',
                 'user_reaction', 'views_count')
        read_only_fields = ('id', 'slug', 'created_at', 'updated_at', 'views_count')

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_reactions_count(self, obj):
        return {
            reaction_type: obj.reactions.filter(reaction_type=reaction_type).count()
            for reaction_type, _ in Reaction.REACTION_CHOICES
        }

    def get_user_reaction(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            try:
                reaction = obj.reactions.get(user=request.user)
                return reaction.reaction_type
            except Reaction.DoesNotExist:
                return None
        return None
    

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ('username', 'email', 'bio', 'avatar', 'website')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')
        read_only_fields = ('id', 'slug')

class PostDetailSerializer(PostSerializer):
    tags = TagSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    
    class Meta(PostSerializer.Meta):
        fields = PostSerializer.Meta.fields + ('tags', 'comments')
    
    def get_comments(self, obj):
        page_size = 10  # Or get from settings
        page = self.context.get('request').query_params.get('comments_page', 1)
        
        comments = obj.comments.filter(parent=None)
        start = (int(page) - 1) * page_size
        end = start + page_size
        
        paginated_comments = comments[start:end]
        return {
            'results': CommentSerializer(paginated_comments, many=True).data,
            'total': comments.count(),
            'pages': (comments.count() + page_size - 1) // page_size
        }