import json
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.http import JsonResponse
from django.middleware.csrf import get_token


def installer_arguments(request):
    # with open(static("misc/installerArguments.json")) as f:
    with open("staticfiles/misc/installerArguments.json") as f:
        arguments = json.load(f)

    return HttpResponse(json.dumps(arguments), content_type="application/json")


def csrf(request):
    return JsonResponse({"csrfToken": get_token(request)})


def dockerfile(request):
    return HttpResponse("", content_type="application/text")
