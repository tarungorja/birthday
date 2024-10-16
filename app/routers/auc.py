from fastapi import APIRouter, Depends,  Request
from app.auth.jwt_bearer import JWTBearer
from app.utils.generate_auc_pdf import create_pdf, certificate_id_generator
from app.utils.date_utils import custom_strftime
from fastapi import Response
from app.core.database import auc_instance, meta_data_instance, aggregated_metrics_instance
from datetime import datetime, timedelta
import json
from app.utils.auc_utils import generate_json_hash, generate_pdf_hash
import requests
from decouple import config
from app.data_validators.example_responses.auc_response import auc_meta_data_response
from app.core.config import DATABASE_NAME

battery_auc_api_router = APIRouter(prefix="/v1/auc", tags=['Certification'], dependencies=[Depends(JWTBearer())])
blockchain_api_url = config("BLOCKCHAIN_URL")


def fetch_all_certificates(battery_uid):
    auc_docs = auc_instance.get_all_certificates_bat_uid(battery_uid)
    blockchain_url = blockchain_api_url + "battery/auc/history/" + battery_uid  # type: ignore
    blockchain_response = requests.get(blockchain_url)
    if blockchain_response.status_code == 500:
        return []
    blockchain_response_data = json.loads(blockchain_response.text)['data']
    certificate_txid_dict = {}
    for data in blockchain_response_data:
        certificate_txid_dict[data['certificate_id']] = data['history'][0]['txId']

    format_str = "%B {S}, %Y %I:%M:%S%p"

    result = []
    for doc in auc_docs:
        generated_date = doc['generated_on'].strftime("%d/%m/%Y")
        completed_date = custom_strftime(format_str, doc['created_at'])
        expiry_date = doc['expired_by'].strftime("%d-%m-%Y")
        result.append({
            'battery_uid': doc['bat_uid'],
            'certificate_id': doc['certificate_id'],
            'file_name': doc['file_name'],
            'current_phase': 'First Life Usage',
            'document_hash': doc['certificate_pdf_hash'],
            'document_data_hash': doc['certificate_bat_data_hash'],
            'generated_on': generated_date,
            'completed_on': completed_date,
            'expiry': expiry_date,
            'transaction_id': certificate_txid_dict[doc['certificate_id']],
        })

    return result


@battery_auc_api_router.get("/list", responses=auc_meta_data_response)  # type: ignore
async def get_all_certificates(request: Request, battery_uid: str):
    return fetch_all_certificates(battery_uid)


@battery_auc_api_router.get("/download")
async def download_battery_certificate(request: Request, battery_uid: str, certificate_id: str):

    auc_doc = auc_instance.get_certificate(battery_uid, certificate_id)
    pdf_buffer = auc_doc['certificate_pdf']

    # Set response headers
    headers = {
        "Content-Disposition": "attachment; filename=example.pdf",
        "Content-Type": "application/pdf",
    }

    return Response(content=pdf_buffer, headers=headers)


@battery_auc_api_router.post("/generate", responses=auc_meta_data_response)  # type: ignore
async def generate_battery_certificate(request: Request, battery_uid: str):
    generated_on = datetime.now()
    generated_on_string = generated_on.strftime("%d%m%y%H%M%S")

    expired_by = generated_on + timedelta(weeks=1)
    certificate_id = certificate_id_generator()

    battery_metadata = meta_data_instance.get_battery_metadata_bat_uid(battery_uid)
    aggregated_data = aggregated_metrics_instance.find_one_bat_uid(battery_uid,
                                                                   project={'bms_soh': 1, 'bms_soh': 1, 'charge_cycle_count': 1, 'discharge_cycle_count': 1, 'cumulative_energy_consumed_kwh': 1, 'cumulative_energy_discharged_kwh': 1,
                                                                            'equivalent_cycles_count': 1, 'total_charge_duration_hrs': 1, 'total_discharge_duration_hrs': 1, '_id': 0
                                                                            })
    certificate_bat_data = battery_metadata | aggregated_data
    certificate_bat_data_hash = generate_json_hash(certificate_bat_data)

    pdf_buffer = create_pdf(certificate_id, certificate_bat_data)
    pdf_hash = generate_pdf_hash(pdf_buffer.getvalue())

    mongo_document_to_save = {
        'bat_uid': battery_uid,
        'certificate_id': certificate_id,
        'file_name': 'AUC_' + certificate_bat_data['asset_name'] + '_' + generated_on_string + ".pdf",
        'certificate_pdf': pdf_buffer.getvalue(),
        'certificate_pdf_hash': pdf_hash,
        'certificate_bat_data_hash': certificate_bat_data_hash,
        'certificate_bat_data': certificate_bat_data,
        'generated_on': generated_on,
        'expired_by': expired_by,
        'created_at': datetime.now()
    }
    blockchain_json = {
        "batteryId": battery_uid,
        "certificate_id": certificate_id,
        "certificate_hash": pdf_hash,
        "certificate_bat_data_hash": certificate_bat_data_hash
    }

    auc_inserted_id = auc_instance.insert_auc(mongo_document_to_save)
    blockchain_url = blockchain_api_url + "battery/auc"  # type: ignore
    blockchain_response = requests.post(blockchain_url, json=blockchain_json)
    print(blockchain_response.text)
    return fetch_all_certificates(battery_uid)
