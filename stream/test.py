import json

with open('sam.json') as f:
  data = json.load(f)

print(data["place"]["bounding_box"]["coordinates"][0][0])