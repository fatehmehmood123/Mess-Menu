from flask import Flask, jsonify, request, make_response
from datetime import date
today = date.today()

app = Flask(__name__)
odd_week_menu = {
    0: {
        'breakfast': 'Parathe Omelette',
        'lunch': 'Aluu Gajar Matar',
        'dinner': 'Shami Kabab + Daal Channa'
    },
    1: {
        'breakfast': 'Naan Channay',
        'lunch': 'Curry + Rice',
        'dinner': 'Korma + Kheer'
    },
    2: {
        'breakfast': 'Paratha Khakina',
        'lunch': 'Daal Mash + Salad',
        'dinner': 'Manchurian + Fried Rice'
    },
    3: {
        'breakfast': 'French Toast',
        'lunch': 'Aluu Palak',
        'dinner': 'Biryani'
    },
    4: {
        'breakfast': 'Paratha Aluu Bhujia',
        'lunch': 'Daal Chawal (Yellow)',
        'dinner': 'Koftay'
    },
    5: {
        'breakfast': 'Aluu Paratha',
        'lunch': 'Aluu Gobi',
        'dinner': 'Cutlets + Daal'
    },
    6: {
        'breakfast': 'Halwa Poori',
        'lunch': 'Red Beans',
        'dinner': 'Chicken Curry + Pulao'
    }
}

even_week_menu = {
    0: {
        'breakfast': 'Parathe Omelette',
        'lunch': 'Aluu Gajar Matar',
        'dinner': 'Fish + Daal Channa'
    },
    1: {
        'breakfast': 'Naan Channay',
        'lunch': 'Curry + Rice',
        'dinner': 'Korma + Gajar Halwa'
    },
    2: {
        'breakfast': 'Paratha Khakina',
        'lunch': 'Daal Mash + Yoghurt',
        'dinner': 'Channa Pulao'
    },
    3: {
        'breakfast': 'French Toast',
        'lunch': 'Aluu Palak',
        'dinner': 'Biryani'
    },
    4: {
        'breakfast': 'Paratha Aluu Bhujia',
        'lunch': 'Daal Chawal (Black)',
        'dinner': 'Daleem'
    },
    5: {
        'breakfast': 'Aluu Paratha',
        'lunch': 'Aluu Gobi',
        'dinner': 'Chapli Kabab'
    },
    6: {
        'breakfast': 'Halwa Poori',
        'lunch': 'Red Beans',
        'dinner': 'Chicken Pulao'
    }
}


@app.route('/today-mess/', methods=['GET', 'POST'])
def todaymess():
    week_no = today.isocalendar()[1]
    if week_no % 2 != 0:
        return _corsify_actual_response(jsonify(
            odd_week_menu[today.weekday()]
        ))
    else:
        return _corsify_actual_response(jsonify(
            even_week_menu[today.weekday()]
        ))

@app.route('/week-mess/', methods=['GET', 'POST'])
def weekmess():
    week_no = today.isocalendar()[1]
    if week_no % 2 != 0:
        return _corsify_actual_response(jsonify(
            odd_week_menu
        ))
    else:
        return _corsify_actual_response(jsonify(
            even_week_menu
        ))

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)
