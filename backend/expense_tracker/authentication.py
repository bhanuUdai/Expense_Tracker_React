from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from firebase_admin import auth
import json

class FirebaseUser:
    def __init__(self, decoded_token):
        self.uid = decoded_token.get('uid')
        self.email = decoded_token.get('email')
        self.is_active = True
        self.is_authenticated = True

    def __str__(self):
        return f"{json.dumps({'uid': self.uid, 'email': self.email})}" or "FirebaseUser"

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        if not token or not token.startswith('Bearer '):
            return None  # Skip authentication if no valid token is provided

        token = token.split(' ')[1]
        try:
            decoded_token = auth.verify_id_token(token)
            user = FirebaseUser(decoded_token)
            return (user, None)
        except auth.ExpiredIdTokenError:
            print("Token expired")
            raise AuthenticationFailed("Token expired")  # Return error message directly
        except auth.InvalidIdTokenError:
            print("Invalid token")
            raise AuthenticationFailed("Invalid token")  # Return error message directly
        except auth.RevokedIdTokenError:
            print("Token has been revoked")
            raise AuthenticationFailed("Token has been revoked")  # Return error message directly
        except Exception as e:
            print("Token verification failed:", str(e))
            raise AuthenticationFailed(f'Firebase authentication failed: {str(e)}')  # Handle any other errors
