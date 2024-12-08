import cloudinary.uploader
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from mysite.db_utils import execute_query


@csrf_exempt
def _upload_image(project_id,user_name, image_file):
        image_file = image_file

        if image_file:
            # Upload the image to Cloudinary
            cloudinary_response = cloudinary.uploader.upload(image_file)

            # Get the URL of the uploaded image from Cloudinary
            image_url = cloudinary_response['secure_url']

            params = {
            'id': project_id,
            'user_name' : user_name,
            'image' : image_url
            }

            res = execute_query('update_profile',params)
            return JsonResponse({"status": "success", "image_url": image_url})

        return JsonResponse({"status": "error", "message": "No image uploaded"}, status=400)

def _check_user_profile(project_id):
    params = {
     'id' : project_id
    }

    res = execute_query("check_user_profile", params)
    return res