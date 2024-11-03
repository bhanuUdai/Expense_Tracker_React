from django.http import JsonResponse
from firebase_admin import auth

class FirebaseUser:
    def __init__(self, decoded_token):
        self.uid = decoded_token.get('uid')
        self.email = decoded_token.get('email')
        self.is_active = True
        self.is_authenticated = True

    def __str__(self):
        return self.email or "FirebaseUser"

def firebase_auth_middleware(get_response):
    def middleware(request):
        # Skip authentication for certain paths (like login)
        skipping_arr = ['/expense_tracker/user_login/']
        # if request.path in skipping_arr:
        #     return get_response(request)

        # Get the token from the Authorization header
        token = request.META.get('HTTP_AUTHORIZATION')
        if token is not None and token.startswith('Bearer '):
            token = token.split(' ')[1]
            try:
                print("MIDDLEWARE A===> Before verifying token")
                # Verify the token
                decoded_token = auth.verify_id_token(token)
                print("MIDDLEWARE B===> After verifying token")
                # Wrap the decoded token in FirebaseUser and assign to request.user
                request.user = FirebaseUser(decoded_token)
            except auth.ExpiredIdTokenError:
                print("Token expired")
                return JsonResponse({'status': 'error', 'message': 'Token expired'}, status=401)
            except auth.InvalidIdTokenError:
                print("Invalid token")
                return JsonResponse({'status': 'error', 'message': 'Invalid token'}, status=401)
            except auth.RevokedIdTokenError:
                print("Token has been revoked")
                return JsonResponse({'status': 'error', 'message': 'Token has been revoked'}, status=401)
            except Exception as e:
                print("Token verification failed:", str(e))
                return JsonResponse({'status': 'error', 'message': 'Unauthorized', 'details': str(e)}, status=401)

        print("MIDDLEWARE B===>")
        return get_response(request)

    return middleware
