# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']

GA_ID = os.environ["GA_ID"]

BASE_URL = "https://neurodocker.herokuapp.com/"

WEBPACK_LOADER = {
    "NEURODOCKER": {
        "CACHE": not DEBUG,
        "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
        "STATS_FILE": os.path.join(BASE_DIR,
                                   "../webpack/webpack-stats-prod.json"),
    },
}
