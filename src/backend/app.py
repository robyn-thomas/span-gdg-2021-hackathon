# PI3 backend for scanning social media profile similarities

import os
from flask import Flask, request, jsonify, Response
from flask_cors import CORS, cross_origin

import lib.db
import lib.scanner.twitter.twitter as twit
import lib.scanner.twitter.comparitor as comparator

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Init firestore connection:
db_conn = lib.db.create_connection()
user_ref = lib.db.get_collection(db_conn, 'users')


@app.route("/hello")
@cross_origin()
def hello():
    return "hello! Welcome to PIII!"


@app.route("/twitter/scan/<app_user>/<twitter_user>")
@cross_origin()
def scan_twitter(app_user, twitter_user):
    user_account = twit.get_user_profile_data(twitter_user)
    similar_accounts = twit.search_by_username(twitter_user)
    cases = comparator.check_duplicates(
        user_account.json(), similar_accounts.json())

    for case in cases:
        # Add cases to firestore
        lib.db.add_cases(db_conn, app_user,
                         "https://twitter.com/" + case['username'])
    return Response("{}", status=200, mimetype='application/json')

@app.route("/twitter/add_profile/<app_user>/<twitter_handle>")
@cross_origin()
def link_twitter_profile(app_user, twitter_handle):
    user_account = twit.get_user_profile_data(twitter_handle)
    user_account = user_account.json()
    lib.db.add_twitter_account(db_conn, app_user, user_account['data'])
    return user_account

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port, debug=True)