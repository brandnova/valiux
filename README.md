# Blog API Documentation

## Project Overview

### Purpose
This API powers a modern, interactive blog platform designed to provide a seamless experience for both readers and content creators. The platform allows public access to content while requiring authentication for interactive features like commenting and reactions.

### Core Features
- Public blog post browsing
- User authentication and registration
- Protected interactions (comments, reactions)
- Content categorization (categories and tags)
- Post analytics (view counting)
- Content management (For admin users)

### Technical Stack
- **Framework**: Django 4.2 with Django REST Framework
- **Database**: MySQL (recommended) / SQLite3 (development)
- **Authentication**: JSON Web Tokens (JWT) via SimpleJWT
- **Base API Endpoint**: `/api/`

### Authentication Packages
1. **django-rest-framework-simplejwt**
   - Handles JWT token generation and validation
   - Provides token refresh functionality
   - Default token lifetime: 24 hours (access) / 7 days (refresh)

2. **dj-rest-auth**
   - Handles registration and authentication endpoints
   - Provides password reset functionality
   - Manages email verification

3. **django-allauth**
   - Manages user registration
   - Handles email verification
   - Supports social authentication (if enabled)

## Authentication

### Registration
**Endpoint**: `POST /api/auth/registration/`
```json
// Request
{
    "username": "testuser",
    "email": "user@example.com",
    "password1": "securepass123",
    "password2": "securepass123"
}

// Success Response (200 OK)
{
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "user": {
        "id": 1,
        "username": "testuser",
        "email": "user@example.com"
    }
}

// Error Response (400 Bad Request)
{
    "email": ["This email is already registered."],
    "password1": ["This password is too common."]
}
```

### Login
**Endpoint**: `POST /api/auth/token/`
```json
// Request
{
    "username": "testuser",
    "password": "securepass123"
}

// Success Response (200 OK)
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

// Error Response (401 Unauthorized)
{
    "detail": "No active account found with the given credentials"
}
```

### Token Refresh
**Endpoint**: `POST /api/auth/token/refresh/`
```json
// Request
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

// Success Response (200 OK)
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

// Error Response (401 Unauthorized)
{
    "detail": "Token is invalid or expired"
}
```

## Blog Posts

### List Posts
**Endpoint**: `GET /api/posts/`

**Query Parameters**:
- `page`: Page number (default: 1)
- `category`: Filter by category slug
- `tag`: Filter by tag slug
- `search`: Search in title and content
- `ordering`: Sort by field (created_at, -created_at, views_count, -views_count)
- `status`: Filter by status (staff only)

```json
// Success Response (200 OK)
{
    "count": 100,
    "next": "http://api.example.com/api/posts/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "title": "Sample Post",
            "slug": "sample-post",
            "excerpt": "This is a sample post...",
            "featured_image": "http://api.example.com/media/posts/2024/01/image.jpg",
            "created_at": "2024-01-01T12:00:00Z",
            "author": {
                "id": 1,
                "username": "admin"
            },
            "category": {
                "id": 1,
                "name": "Technology",
                "slug": "technology"
            },
            "comments_count": 5,
            "reactions_count": {
                "like": 10,
                "love": 5,
                "laugh": 2
            }
        }
        // ... more posts
    ]
}
```

### Get Single Post
**Endpoint**: `GET /api/posts/{slug}/`
```json
// Success Response (200 OK)
{
    "id": 1,
    "title": "Sample Post",
    "slug": "sample-post",
    "content": "Full post content...",
    "excerpt": "Post excerpt...",
    "featured_image": "http://api.example.com/media/posts/2024/01/image.jpg",
    "created_at": "2024-01-01T12:00:00Z",
    "updated_at": "2024-01-01T13:00:00Z",
    "author": {
        "id": 1,
        "username": "admin"
    },
    "category": {
        "id": 1,
        "name": "Technology",
        "slug": "technology"
    },
    "tags": [
        {
            "id": 1,
            "name": "Python",
            "slug": "python"
        }
    ],
    "comments": [
        {
            "id": 1,
            "content": "Great post!",
            "created_at": "2024-01-01T14:00:00Z",
            "author": {
                "id": 2,
                "username": "user"
            },
            "replies": []
        }
    ],
    "reactions_count": {
        "like": 10,
        "love": 5,
        "laugh": 2
    },
    "user_reaction": "like",
    "views_count": 150
}

// Error Response (404 Not Found)
{
    "detail": "Not found."
}
```

### Create Post (Staff Only)
**Endpoint**: `POST /api/posts/`
```json
// Request
{
    "title": "New Post",
    "content": "Post content...",
    "category_id": 1,
    "tags": [1, 2],
    "status": "published",
    "featured_image": [binary_file]
}

// Success Response (201 Created)
{
    "id": 2,
    "title": "New Post",
    "slug": "new-post",
    ...
}

// Error Response (403 Forbidden)
{
    "detail": "You do not have permission to perform this action."
}
```

## Comments

### List Comments
**Endpoint**: `GET /api/comments/`

**Query Parameters**:
- `post`: Filter by post ID
- `page`: Page number

```json
// Success Response (200 OK)
{
    "count": 50,
    "next": "http://api.example.com/api/comments/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "content": "Comment content",
            "created_at": "2024-01-01T12:00:00Z",
            "author": {
                "id": 1,
                "username": "user"
            },
            "post": 1,
            "replies": []
        }
    ]
}
```

### Create Comment (Authenticated Users)
**Endpoint**: `POST /api/comments/`
```json
// Request
{
    "post": 1,
    "content": "New comment",
    "parent": null  // Optional, for replies
}

// Success Response (201 Created)
{
    "id": 2,
    "content": "New comment",
    "created_at": "2024-01-01T12:00:00Z",
    ...
}

// Error Response (401 Unauthorized)
{
    "detail": "Authentication credentials were not provided."
}
```

## Reactions

### React to Post (Authenticated Users)
**Endpoint**: `POST /api/posts/{slug}/react/`
```json
// Request
{
    "reaction_type": "like"  // Options: like, love, laugh
}

// Success Response (200 OK)
{
    "reaction_type": "like"
}

// Error Response (400 Bad Request)
{
    "error": "Invalid reaction type"
}
```

## Categories and Tags

### List Categories
**Endpoint**: `GET /api/categories/`
```json
// Success Response (200 OK)
{
    "results": [
        {
            "id": 1,
            "name": "Technology",
            "slug": "technology"
        }
    ]
}
```

### List Tags
**Endpoint**: `GET /api/tags/`
```json
// Success Response (200 OK)
{
    "results": [
        {
            "id": 1,
            "name": "Python",
            "slug": "python"
        }
    ]
}
```

## Pagination

The API uses page number pagination with a default page size of 10 items. 

### Pagination Parameters
- `page`: Page number (starts from 1)
- `page_size`: Number of items per page (optional, default: 10, max: 100)

### Pagination Response Format
```json
{
    "count": 100,  // Total number of items
    "next": "http://api.example.com/api/posts/?page=2",  // Next page URL (null if none)
    "previous": null,  // Previous page URL (null if none)
    "results": []  // Array of items
}
```

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

### Error Response Format
```json
{
    "detail": "Error message"
}
// or
{
    "field_name": ["Error message"]
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- Anonymous users: 100 requests per hour
- Authenticated users: 1000 requests per hour

Rate limit response headers:
- `X-RateLimit-Limit`: Maximum requests per window
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time until the rate limit resets

### Rate Limit Exceeded Response
```json
{
    "detail": "Request limit exceeded. Please try again later."
}
```

## Image Uploads

- Supported formats: JPEG, PNG, GIF
- Maximum file size: 5MB
- Images are served from `/media/` URL

## Security Notes

1. Always use HTTPS in production
2. Store JWT tokens securely:
   - Access token: Memory/short-lived storage
   - Refresh token: HTTP-only cookie
3. Implement token refresh before expiration
4. Handle 401 responses by redirecting to login

## Deployment Considerations

1. Configure CORS settings for your frontend domain
2. Set up proper media file handling
3. Configure email backend for registration/verification
4. Set up proper database indexes for performance
5. Configure proper caching for frequently accessed endpoints

This documentation covers the core functionality of the blog API. For specific implementation details or custom requirements, consult the codebase or reach out to the development team.