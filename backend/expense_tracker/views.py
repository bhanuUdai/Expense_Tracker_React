# from django.shortcuts import render
# from django.http.response import HttpResponse


# # Create your views here.
# def index(request):
#     return HttpResponse("Hello, World!")



# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from mysite.db_utils import execute_query

@api_view(['POST'])
def add_expense(request):
    print("DATA==>",request.data)
    amount = request.data.get('amount')
    description = request.data.get('description')
    category = request.data.get('category')

    if not amount or not description or not category:
        return Response({'error': 'All fields are required.'}, status=400)

    # Parameters to replace in the query
    params = {
        'amount': amount,
        'description': description,
        'category': category,
    }

    # Execute the query from the YAML file
    res = execute_query('insert_expense', params)

    return Response({
        'error': False,
        'response' : res
    },status=200)

@api_view(['GET'])
def get_expenses(request):
    res = execute_query('get_expenses')
    return Response({
        "res" : res,
        "error" : False
    },status=200)

@api_view(['DELETE'])
def delete_expense(request):
    print("request==>",request.data)
    id = request.data.get("id")
    if not id:
         return Response({'error': True,
                          'message': 'All fields are required.'
                }, status=400)
    params = {
        'id': id
    }
    res = execute_query('delete_expense',params)
    return Response({
        "res" : res,
        "error" : False
    },status=200)