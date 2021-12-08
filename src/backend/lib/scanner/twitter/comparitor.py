from PIL import Image
from io import BytesIO
import imagehash
import lib.scanner.twitter.twitter as twit
import requests


def check_duplicates(user_account, suspected):
    # Get user profile pic
    user_profile_pic_raw = requests.get(
        user_account['data']['profile_image_url'])
    user_profile_pic = Image.open(BytesIO(user_profile_pic_raw.content))

    cases = []

    for suspect in suspected['data']:
        print("Checking: " + suspect['name'])
        suspect_profile_pic = Image.open(
            BytesIO(requests.get(suspect['profile_image_url']).content))
        if check_if_image_similar(user_profile_pic, suspect_profile_pic):
            cases.append(suspect)
    return cases


def check_if_image_similar(source, suspect):
    source_hash = imagehash.average_hash(source)
    suspect_hash = imagehash.average_hash(suspect)
    cutoff = 5  # maximum bits that could be different between the hashes.

    if source_hash - suspect_hash < cutoff:
        return True
    return False
