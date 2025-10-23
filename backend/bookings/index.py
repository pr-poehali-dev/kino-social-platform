"""
Business: Process romantic date bookings with online payment integration
Args: event with httpMethod, body, queryStringParameters; context with request_id
Returns: HTTP response with booking confirmation or payment processing result
"""

import json
from typing import Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr, validator


class BookingRequest(BaseModel):
    location_id: int = Field(..., ge=1)
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=10)
    date: str
    time: str
    price: int = Field(..., ge=0)
    
    @validator('date')
    def validate_date(cls, v):
        try:
            datetime.strptime(v, '%Y-%m-%d')
            return v
        except ValueError:
            raise ValueError('Date must be in YYYY-MM-DD format')
    
    @validator('time')
    def validate_time(cls, v):
        try:
            datetime.strptime(v, '%H:%M')
            return v
        except ValueError:
            raise ValueError('Time must be in HH:MM format')


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            booking = BookingRequest(**body_data)
            
            booking_id = f"BK-{datetime.now().strftime('%Y%m%d')}-{context.request_id[:8].upper()}"
            
            result = {
                'success': True,
                'booking_id': booking_id,
                'location_id': booking.location_id,
                'name': booking.name,
                'email': booking.email,
                'phone': booking.phone,
                'date': booking.date,
                'time': booking.time,
                'price': booking.price,
                'payment_url': f'https://payment.example.com/pay/{booking_id}',
                'message': 'Booking confirmed! Please proceed to payment.'
            }
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps(result, ensure_ascii=False)
            }
            
        except Exception as e:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': str(e)}, ensure_ascii=False)
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
