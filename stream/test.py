import json

with open('sam.json') as f:
  data = json.load(f)

print(data["place"]["bounding_box"]["coordinates"][0][0])

cors = {
        "sydney": [150.163056, -34.589722, 153.679723, -29],
        "melbourne": [141, -39.188889, 147.038611, -36.561667],
        "brisbane": [141, -29, 153.358056, -10.508056],
        "adelaide": [129, -38.070833, 141, -25.997778],
        "perth": [112.841389, -35.254166, 129, -13.504166],
        "hobart": [143.766111, -43.691389, 148.691389, -39.188889],
        "canberra": [147.038611, -36.561667, 150.163056, -34.589722],
        "darwin": [129, -25.997778, 141, -10.833333]
    }

for key, value in cors.items():
    print(key)
    print(value)