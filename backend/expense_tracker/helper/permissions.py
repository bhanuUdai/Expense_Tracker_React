from django.db import connection
from mysite.db_utils import execute_query


def has_permission(user_data, project_id):
    """
    Check if the user has the specified permission on the resource.
    """
    try:
      params = {
          "project_id" : project_id
      }
      res = execute_query('get_user_details', params)

      if res[0].get('email') == user_data.email:
          return True
      else:
          return False
    
    except Exception as e:
      return False
