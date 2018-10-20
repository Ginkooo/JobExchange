from django.http import JsonResponse
from django.contrib.auth import get_user_model


def sign_up(request):
    required = 'username password email'.split()
    for r in required:
        if not request.POST.get(r):
            return JsonResponse({'errorMsg': f'{r} invalid'}, status=400)
    try:
        creds = {
            'username': request.POST['username'],
            'password': request.POST['password'],
            'email': request.POST['email'],
        }
        get_user_model().objects.create_user(**creds)
    except Exception as e:
        return JsonResponse({'errorMsg': str(e)}, status=400)

    return JsonResponse(creds, status=201)
