# expense_tracker/authentication.py

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from firebase_admin import auth
from django.http import JsonResponse
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
                return AuthenticationFailed({'status': 'error', 'message': 'Token expired'}, status=401)
        except auth.InvalidIdTokenError:
            print("Invalid token")
            return AuthenticationFailed({'status': 'error', 'message': 'Invalid token'}, status=401)
        except auth.RevokedIdTokenError:
            print("Token has been revoked")
            return AuthenticationFailed({'status': 'error', 'message': 'Token has been revoked'}, status=401)
        except Exception as e:
            print("Token verification failed:", str(e))
            return AuthenticationFailed({'status': 'error', 'message': 'Unauthorized', 'details': str(e)}, status=401)
        except Exception as e:
            raise AuthenticationFailed(f'Firebase authentication failed: {str(e)}')

