import json
from django.http import HttpResponse
from django.contrib.staticfiles.templatetags.staticfiles import static


def installer_arguments(request):
    # with open(static("misc/installerArguments.json")) as f:
    with open("staticfiles/misc/installerArguments.json") as f:
        questions = json.load(f)

    return HttpResponse(json.dumps(questions), content_type="application/json")
