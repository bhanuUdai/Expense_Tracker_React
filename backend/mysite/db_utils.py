# db_utils.py
import os
import yaml
from django.conf import settings
from django.db import connection, DatabaseError
import re
from jinja2 import Template





#Load YAML queries
queries_file_path = os.path.join(settings.BASE_DIR, "mysite/queries.yml")

with open(queries_file_path,'r') as file :
    queries = yaml.safe_load(file)

def _replace_named_placeholders(query, params):
    """Converts named parameters (:param) to positional ones (%s) for PostgreSQL."""
    keys = sorted(params.keys(), key=lambda k: len(k), reverse=True)
    # print("query1==>",query)
    for key in keys:
        old_query = query
        query = re.sub(f":{key}", "%s", query)
        print(f"Replacing :{key} -> %s in query")
        print("Before:", old_query)
        print("After:", query)
        # print("query2==>",query)
    return query

def execute_query(query_name, params = None):
    try:
        query_template = queries.get(query_name)
        if not query_template:
            raise ValueError(f"Query '{query_name}' not found in queries.yml")
        
        
        # Render query with Jinja2
        query = Template(query_template).render(params or {})


        with connection.cursor() as cursor:
            cursor.execute(query, list(params.values()) if params else [])
            # if params:
            #     print("query===>",query, list(params.values()))
            #     # Use list(params.values()) only if params is not None
            #     cursor.execute(query, list(params.values()))
            # else:
            #     cursor.execute(query)  # Execute the query without parameters
            #     # result = [row._asdict() for row in cursor]

            # Fetch all rows
            rows = cursor.fetchall()

            # Get column names from cursor.description
            column_names = [desc[0] for desc in cursor.description]

            # Combine column names with rows to create a list of dictionaries
            results = [
                {column_names[i]: row[i] for i in range(len(column_names))}
                for row in rows
            ]

            # print("result==>", results)  # Print the result with column names
            return results
    except ValueError as e:
        return {
            "error": "InvalidQuery",
            "message": str(e),
            "code": 400  # Bad Request
        }
    except DatabaseError as e:
        return {
            "error": "DatabaseError",
            "message": str(e),
            "code": 500  # Internal Server Error
        }
    except Exception as e:
        return {
            "error": "UnknownError",
            "message": str(e),
            "code": 500  # Internal Server Error
        }


    



# re.sub is a function in Python's re module, which provides support for regular expressions.
#  The re.sub function is specifically used to search for a pattern in a string
# a and replace it with a specified replacement string.


# text = "The quick brown fox jumps over the lazy dog."
# # Replace "fox" with "cat"
# modified_text = re.sub(r"fox", "cat", text)

# print(modified_text)
# # Output: The quick brown cat jumps over the lazy dog.