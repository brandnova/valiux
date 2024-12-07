import re
from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key, 0)


@register.filter(name='highlight_first_char')
def highlight_first_char(text):
    # Remove leading HTML tags and whitespace
    clean_text = re.sub(r'^<[^>]+>', '', text).lstrip()
    first_char = clean_text[0]
    rest_text = clean_text[1:]
    return mark_safe(f'<span class="firstcharacter">{first_char}</span>{rest_text}')

@register.filter(name='has_group')
def has_group(user, group_name):
    if user is None:
        return False
    return user.groups.filter(name=group_name).exists()