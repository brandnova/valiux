from django.shortcuts import render, redirect
from django.contrib.auth import login, update_session_auth_hash, logout
from django.contrib.auth.decorators import login_required
from ads.models import Ad
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm, CustomAuthenticationForm, CustomPasswordChangeForm
from django.contrib import messages
from django.utils import timezone
from datetime import timedelta
from posts.models import Bookmark, Comment, Reaction

def register(request):
    # Redirect authenticated users to the profile page
    if request.user.is_authenticated:
        return redirect('profile')
    
    # Process form submission
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            # send_registration_email(user)
            login(request, user)  # Log the user in after registration
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
            return redirect('profile')  # Redirect to profile page after successful registration
    else:
        form = UserRegisterForm()
    
    # Render registration form for GET request
    return render(request, 'accounts/register.html', {'form': form})


def login_view(request):
    if request.user.is_authenticated:
        return redirect('profile')
    
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('profile')
    else:
        form = CustomAuthenticationForm()

    return render(request, 'accounts/login.html', {'form': form})

def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('login')


@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, 'Your profile has been updated!')
            return redirect('profile')
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    # Fetch user's bookmarks with related post data
    bookmarked_posts = Bookmark.objects.filter(user=request.user).select_related(
        'post', 
        'post__author', 
        'post__category'
    ).prefetch_related(
        'post__comments',
        'post__reactions',
        'post__genres'
    )

    # Fetch user's reactions with related post data
    user_reactions = Reaction.objects.filter(user=request.user).select_related(
        'post',
        'post__author',
        'post__category'
    ).prefetch_related(
        'post__comments',
        'post__reactions',
        'post__genres'
    )

    # Fetch user's comments with related post data
    user_comments = Comment.objects.filter(user=request.user).select_related(
        'post',
        'post__author'
    ).order_by('-created_at')

    context = {
        'u_form': u_form,
        'p_form': p_form,
        'bookmarked_posts': bookmarked_posts,
        'user_reactions': user_reactions,
        'user_comments': user_comments,
        'activity_stats': {
            'reactions_count': user_reactions.count(),
            'bookmarks_count': bookmarked_posts.count(),
            'comments_count': user_comments.count(),
        }
    }

    return render(request, 'accounts/profile.html', context)



@login_required
def password_change(request):
    if request.method == 'POST':
        form = CustomPasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important to keep the user logged in
            messages.success(request, 'Your password was successfully updated!')
            return redirect('profile')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = CustomPasswordChangeForm(request.user)

    context = {
        'form': form,
    }
    return render(request, 'accounts/password_change.html', context)