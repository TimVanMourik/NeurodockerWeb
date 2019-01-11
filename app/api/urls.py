from django.urls import path

import api.views

api_urls = [
    path("neurodocker/", api.views.neurodocker, name="neurodocker"),
]
