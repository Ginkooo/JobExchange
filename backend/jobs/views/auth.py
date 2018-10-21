import json

from django.http import JsonResponse, HttpResponse
from django.contrib.auth import get_user_model


def sign_up(request):
    data = json.loads(request.body.decode('utf-8'))

    required = 'username password email'.split()
    for r in required:
        if not data.get(r):
            return JsonResponse({'errorMsg': f'{r} invalid'}, status=400)
    try:
        creds = {
            'username': data['username'],
            'password': data['password'],
            'email': data['email'],
        }
        get_user_model().objects.create_user(**creds)
    except Exception as e:
        return JsonResponse({'errorMsg': str(e)}, status=400)

    return JsonResponse(creds, status=201)
