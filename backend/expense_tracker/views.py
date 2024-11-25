# from django.shortcuts import render
# from django.http.response import HttpResponse


# # Create your views here.
# def index(request):
#     return HttpResponse("Hello, World!")



# views.py
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from mysite.db_utils import execute_query
import json

from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt



@api_view(['POST'])
def add_expense(request):
    print("DATA==>",request.data)
    amount = request.data.get('amount')
    description = request.data.get('description')
    category = request.data.get('category')
    project_id = request.data.get('project_id')

    if not amount or not description or not category:
        return Response({'error': 'All fields are required.'}, status=400)

    # Parameters to replace in the query
    params = {
        'amount': amount,
        'description': description,
        'category': category,
        'project_id' : project_id
    }

    # Execute the query from the YAML file
    res = execute_query('insert_expense', params)

    return Response({
        'error': False,
        'response' : res
    },status=200)

@api_view(['GET'])
def get_expenses(request):
    auth_data = (request.user.uid)
    # print("get_expenses==>",(auth_data))
    project_id = request.query_params.get('project_id')
    params = {
        "project_id" : project_id
    }
    res = execute_query('get_expenses', params)
    return Response({
        "res" : res,
        "error" : False
    },status=200)

@api_view(['DELETE'])
def delete_expense(request):
    id = request.data.get("id")
    project_id = request.data.get("project_id")
    if not id:
         return Response({'error': True,
                          'message': 'All fields are required.'
                }, status=400)
    params = {
        'id': id,
        'project_id' : project_id
    }
    res = execute_query('delete_expense',params)
    return Response({
        "res" : res,
        "error" : False
    },status=200)
    
@api_view(['PUT'])
def edit_expense(request):
    print("request==>",request.data)
    id = request.data.get("id")
    amount = request.data.get('amount')
    description = request.data.get('description')
    category = request.data.get('category')
    project_id = request.data.get('project_id')

    if not id and not amount and not description and not category:
         return Response({'error': True,
                          'message': 'All fields are required.'
                }, status=400)
    params = {
        'amount': amount,
        'description': description,
        'category': category,
        'id': id,
        'project_id' : project_id
    }
    res = execute_query('edit_expense',params)
    return Response({
        "res" : res,
        "error" : False
    },status=200)

@api_view(['POST'])
@csrf_exempt
@permission_classes([AllowAny])  # No authentication required
@authentication_classes([])     # Skip authentication mechanism
def user_login(request):
    print("Request Headers:", request.headers)
    print("Authorization Header:", request.META.get('HTTP_AUTHORIZATION'))

    data = json.loads(request.body)
    firebase_uid = data['firebase_uid']
    email = data['email']
    if not firebase_uid and not email:
        return Response({
            'error' : True,
            'message': 'All fields are required.'
        },status = 400)
    params = {
        'firebase_uid': firebase_uid
    }
    res = execute_query('get_user_id',params)

    if (res):
        data = res
    else:
        params = {
            'firebase_uid': firebase_uid,
            'email' : email
        }
        res = execute_query('create_user',params)
        data = res
    print("res==>",res)
    # data = data.get("data",[])
    return Response({
        'res' : data[0],
        'error' : False
    },status = 200)
