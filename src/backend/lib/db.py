from firebase_admin import credentials, firestore, initialize_app

CRED_CERTIFICATE_PATH = "secrets/piii-74022-firebase-adminsdk.json"

# Initialize Firestore DB


def create_connection():
    cred = credentials.Certificate(CRED_CERTIFICATE_PATH)
    initialize_app(cred)
    db = firestore.client()
    return db


def get_collection(db, collection_name):
    return db.collection(collection_name)


def add_cases(db, user, link):
    return db.collection("users").document(user).collection('cases').add({
        'status': 'open',
        'link': link
    })
    
def add_twitter_account(db, user, account_details):
    return db.collection("users").document(user).update({
        'accounts': [{
            'type': 'twitter',
            'handle': account_details['username'],
            'displayName': account_details['name'],
            'profilePicture': account_details['profile_image_url']
        }]
    })
