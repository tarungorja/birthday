import json
import hashlib


def generate_json_hash(json_document):
    json_string = json.dumps(json_document, sort_keys=True)

    # Convert data to bytes if it's not already in bytes format
    if isinstance(json_string, str):
        json_string = json_string.encode('utf-8')
    return hashlib.sha256(json_string).hexdigest()



def generate_pdf_hash(pdf_bytes):
    return hashlib.sha256(pdf_bytes).hexdigest()