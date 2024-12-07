import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-)yutv7q7)%x!#o%!gtiumlkrq@eu7m^us34_5da#=ah&1_qdt#'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_cleanup.apps.CleanupConfig',
    'django_ckeditor_5',
    'accounts',
    'ads',
    'core',
    'newsletter',
    'posts',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'valiux.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.site_settings', 
                'core.context_processors.static_pages_processor',
                'core.context_processors.ad_context_processor',
                'core.context_processors.posts_context_processor',
            ],
        },
    },
]

WSGI_APPLICATION = 'valiux.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': BASE_DIR / 'db.sqlite3',

        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'valiux',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# Path to store uploaded images
CKEDITOR_UPLOAD_PATH = "uploads/"

# Optional: Restrict the formats of the uploaded images
CKEDITOR_IMAGE_BACKEND = "pillow"  # or "pil"

# Optional: Thumbnail size
CKEDITOR_THUMBNAIL_SIZE = (300, 300)

# Optional: Custom CKEditor settings
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': '100%',
        'extraPlugins': ','.join([
            'uploadimage',  # Include the upload image plugin
            # other extra plugins you want to add
        ]),
    },
}

# Email SMTP Settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'brandnova89@gmail.com'
EMAIL_HOST_PASSWORD = 'zxgc intt dvax quzy'
DEFAULT_FROM_EMAIL = 'brandnova89@gmail.com'

# CKEditor Configuration

customColorPalette = [
        {
            'color': 'hsl(4, 90%, 58%)',
            'label': 'Red'
        },
        {
            'color': 'hsl(340, 82%, 52%)',
            'label': 'Pink'
        },
        {
            'color': 'hsl(291, 64%, 42%)',
            'label': 'Purple'
        },
        {
            'color': 'hsl(262, 52%, 47%)',
            'label': 'Deep Purple'
        },
        {
            'color': 'hsl(231, 48%, 48%)',
            'label': 'Indigo'
        },
        {
            'color': 'hsl(207, 90%, 54%)',
            'label': 'Blue'
        },
    ]

CKEDITOR_5_CUSTOM_CSS = 'assets/css/ckeditor.css' 
CKEDITOR_5_UPLOAD_PATH = "media/" 
CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': {
            'items': [
                'heading', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
                '|',
                'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
                '|',
                'alignment', 'bulletedList', 'numberedList', 'todoList',
                '|',
                'link', 'insertImage', 'imageUpload', 'mediaEmbed',
                '|',
                'code', 'codeBlock', 'sourceEditing', 'highlight',
                '|',
                'outdent', 'indent', 'blockQuote', 'horizontalLine', 'removeFormat',
                '|',
                'undo', 'redo', 'findAndReplace', 'insertTable', 'specialCharacters'
                
            ],
            'extraPlugins': 'GeneralHtmlSupport',
            'htmlSupport': {
                'allow': [
                    {
                        'name': '.*',
                        'attributes': True,
                        'classes': True,
                        'styles': True
                    }
                ],
            },
            'shouldNotGroupWhenFull': True
        },
        'menuBar': {
            'isVisible': True
        },
        'image': {
            'toolbar': ['imageTextAlternative', '|', 'imageStyle:alignLeft',
                        'imageStyle:alignRight', 'imageStyle:alignCenter', 'imageStyle:side'],
            'styles': [
                'full',
                'side',
                'alignLeft',
                'alignRight',
                'alignCenter',
            ]
        },
        'table': {
            'contentToolbar': ['tableColumn', 'tableRow', 'mergeTableCells',
                               'tableProperties', 'tableCellProperties'],
            'tableProperties': {
                'borderColors': 'customColorPalette',
                'backgroundColors': 'customColorPalette'
            },
            'tableCellProperties': {
                'borderColors': 'customColorPalette',
                'backgroundColors': 'customColorPalette'
            }
        },
        'heading': {
            'options': [
                {'model': 'paragraph', 'title': 'Paragraph', 'class': 'ck-heading_paragraph'},
                {'model': 'heading1', 'view': 'h1', 'title': 'Heading 1', 'class': 'ck-heading_heading1'},
                {'model': 'heading2', 'view': 'h2', 'title': 'Heading 2', 'class': 'ck-heading_heading2'},
                {'model': 'heading3', 'view': 'h3', 'title': 'Heading 3', 'class': 'ck-heading_heading3'},
                {'model': 'heading4', 'view': 'h4', 'title': 'Heading 4', 'class': 'ck-heading_heading4'},
                {'model': 'heading5', 'view': 'h5', 'title': 'Heading 5', 'class': 'ck-heading_heading5'},
                {'model': 'heading6', 'view': 'h6', 'title': 'Heading 6', 'class': 'ck-heading_heading6'}
            ]
        },
        'mention': {
            'feeds': [
                {
                    'marker': '@',
                    'feed': ['@John', '@Jane', '@Admin'],
                    'minimumCharacters': 1
                }
            ]
        },
        'upload': {
            "types": ['png', 'jpg', 'jpeg', 'gif']
        },
        
        
    }
}


# Zazzmin settings

JAZZMIN_SETTINGS = {
    # Title of the window (Will default to current_admin_site.site_title if absent or None)
    'site_title': 'Valiux',

    # Title on the brand, and the login screen (19 chars max)
    'site_header': 'Valiux',

    # Logo to use for your site, must be present in static files, used for login, brand and top menu
    'site_logo': 'assets/img/valiux-removebg-preview-removebg-preview.png',

    # CSS classes that are applied to the logo above
    'site_logo_classes': 'rounded',

    # Welcome text on the login screen
    'welcome_sign': 'Welcome to Valiux',

    # Copyright on the footer
    'copyright': 'Valiux',

    # The model admin to search from the search bar, search bar omitted if excluded
    'search_model': 'auth.User',

    # Field name on user model that contains avatar image, used for the avatar beside the log out
    'user_avatar': lambda user: user.profile.avatar.url if user.profile.avatar else None,

    # Custom icons for side menu apps/models
    'icons': {
        'auth': 'fas fa-users-cog',
        'auth.user': 'fas fa-user',
        'auth.Group': 'fas fa-users',
    },

    # Default expanded menu
    'default_expanded': True,

    # Custom links to be included in the top menu
    'topmenu_links': [
        {'name': 'Home', 'url': 'admin:index', 'permissions': ['auth.view_user']},
    ],

    # Link to put at the bottom of the sidebar
    'show_ui_builder': False,

}