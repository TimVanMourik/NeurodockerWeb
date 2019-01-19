from django.urls import path

import api.views

api_urls = [
    path("installer-arguments/", api.views.installer_arguments, name="installer_arguments"),
]
