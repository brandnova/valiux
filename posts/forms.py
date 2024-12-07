from django import forms
from .models import Comment

class CommentForm(forms.ModelForm):
    parent_id = forms.IntegerField(widget=forms.HiddenInput, required=False)

    class Meta:
        model = Comment
        fields = ['comment', 'parent_id']
        widgets = {
            'comment': forms.Textarea(attrs={
                'class': 'form-control comment-form',
                'placeholder': 'Enter your comment',
                'cols': 30,
                'rows': 4,
                'required': True,
            }),
        }
