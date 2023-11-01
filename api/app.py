from flask import Flask, jsonify
from flask_cors import CORS
from faker import Faker
import random
from datetime import date, timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True)

fake = Faker()

apartments = []

# image_paths = ['../src/assets/images/pexels-andrew-neel-3201763.jpg', '../src/assets/images/pexels-emre-can-acer-2079246.jpg', '../src/assets/images/pexels-haider-syed-18651510.jpg', '../src/assets/images/pexels-houzlook-com-3797991.jpg', '../src/assets/images/pexels-jean-van-der-meulen-1454805.jpg', '../src/assets/images/pexels-jean-van-der-meulen-1457847.jpg', '../src/assets/images/pexels-jonathan-borba-5570224.jpg',
#                '../src/assets/images/pexels-jovydas-pinkevicius-2462015.jpg', '../src/assets/images/pexels-julie-aagaard-2467285.jpg', '../src/assets/images/pexels-leah-kelley-6480707.jpg', '../src/assets/images/pexels-li-sun-3190541.jpg', '../src/assets/images/pexels-mark-2724749.jpg', '../src/assets/images/pexels-nothing-ahead-3460599.jpg', '../src/assets/images/pexels-max-rahubovskiy-7511693.jpg']


def generate_apartment_description(apartment):
    return f"Welcome to our charming {apartment['title']} a hidden gem in the heart of {apartment['location']}. This cozy retreat offers the perfect blend of comfort and style at an affordable price of ${apartment['price']} per night. With a capacity to accommodate up to {apartment['guests']} guests, it's the ideal spot for a romantic getaway, a family vacation, or a weekend escape with friends.Located within easy reach of local attractions, restaurants, and shops, {apartment['title']} offers convenience and tranquility in equal measure. Whether you're seeking adventure or a peaceful retreat, this apartment is your ideal home away from home. Book your stay today and experience the magic of {apartment['location']} at its finest."


for i in range(50):
    apartment = {
        "title": fake.sentence(),
        "location": fake.city(),
        "price": fake.random_int(min=600, max=2500),
        "guests": random.randint(1, 5),
        "image": f"https://picsum.photos/200/300/?image={random.randint(1, 500)}",
        "reservations": []
        # "image": random.choice(image_paths)
    }
    apartment['description'] = generate_apartment_description(apartment)
    apartments.append(apartment)

    for _ in range(random.randint(0, 10)):
        check_in = date.today() + timedelta(random.randint(1, 100))
        check_out = check_in + timedelta(random.randint(1, 7))
        reservation = {
            "check_in": check_in.isoformat(),
            "check_out": check_out.isoformat()
        }
        apartment["reservations"].append(reservation)


@app.route('/apartments', methods=['GET'])
def get_apartments():
    return jsonify(apartments)


if __name__ == '__main__':
    app.run(debug=True)
