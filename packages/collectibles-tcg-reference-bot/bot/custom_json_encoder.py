import json
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
    """
    Custom JSON Encoder that converts Decimal objects to float.
    """
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)  # Convert Decimal to float
        return super(DecimalEncoder, self).default(obj)
