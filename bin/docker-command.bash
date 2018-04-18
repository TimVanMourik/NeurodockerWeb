#!/bin/bash

#django commands
cd app
python manage.py collectstatic --noinput -i other &
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
