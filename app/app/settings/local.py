from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 's9&vp1jq1yzr!1c_temg#v_)j-a)i5+@vbsekmi6pbjl4l1&u@'

GA_ID = "UA-XXXXXXXXX-0"


#
WEBPACK_LOADER = {
    "NEURODOCKER": {
        "CACHE": not DEBUG,
        "BUNDLE_DIR_NAME": "webpack_bundles/",  # must end with slash
        "STATS_FILE": os.path.join(BASE_DIR, "../webpack/webpack-stats.json"),
        "POLL_INTERVAL": 0.1,
        "TIMEOUT": None,
        "IGNORE": [".+\.hot-update.js", ".+\.map"]
    },
}
