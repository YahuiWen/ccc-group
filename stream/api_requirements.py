
import requests
DOMAIN = "http://172.26.131.13:5984/"
API_KEY = "d4a3f319b0941dd19dcb2595a98bfda4"

API_PORT = {"upload_tweet" : {"Port" : "api/tweet/", "Header": {"Content-Type" : "application/json", "X-API-KEY": API_KEY}},
            "upload_pic" : {"Port" : "api/tweet/pic/", "Header": {"X-API-KEY": API_KEY}}, "download_tweet" : {"Port" : "api/tweet/untrained/text/", "Header": {"X-API-KEY": API_KEY}}
            }

