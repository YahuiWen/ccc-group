
import tweepy
from tweepy.streaming import StreamListener
# from api_requirements import DOMAIN, API_KEY, API_PORT
from tweepy import OAuthHandler
from tweepy import Stream
import argparse
from datetime import datetime
# from tweetProcess import uploadImg, postRequest
from DB_Communicator import send_to_db_raw, send_to_db_select
import time
import json
import os
from multiprocessing import Process


# My keys and tokens
consumer_key = 'hLOhZongKatT6zTA6ZREQ51nn'
consumer_secret = '7LofEjZre3wcdPPwVafmsByNzkmwPlEjUTGRyAmSh22V1CBUfj'
access_token = '1385211029597032449-wLX0RtqzWxtIoZmeKt3bqevvQbCI5j'
access_token_secret = 'XDXIvigjHf1TxEdych14JVZmcHtydQm1P4BGDOm6rqt7y'

access = {"consumer_key": consumer_key,
            "consumer_secret": consumer_secret,
            "access_token": access_token,
            "access_secret": access_token_secret}

# 8 capital cities
bbox = {
        "sydney": [150.163056, -34.589722, 153.679723, -29],
        "melbourne": [141, -39.188889, 147.038611, -36.561667],
        "brisbane": [141, -29, 153.358056, -10.508056],
        "adelaide": [129, -38.070833, 141, -25.997778],
        "perth": [112.841389, -35.254166, 129, -13.504166],
        "hobart": [143.766111, -43.691389, 148.691389, -39.188889],
        "canberra": [147.038611, -36.561667, 150.163056, -34.589722],
        "darwin": [129, -25.997778, 141, -10.833333]
    }

# Get the authentication
def getAuth(access):

    auth = tweepy.OAuthHandler(access['consumer_key'], access['consumer_secret'])
    auth.set_access_token(access['access_token'], access['access_secret'])
    return auth


def fieldSelect(tweetJson):

    dataDict = {}
    dataDict["id"] = tweetJson["id"]
    dataDict["user"] = tweetJson["user"]["screen_name"]
    dataDict["text"] = tweetJson["text"]

    if tweetJson["created_at"] != None:
        stringTime = tweetJson["created_at"]
        dataDict["date"] = datetime.strptime(stringTime,'%a %b %d %H:%M:%S %z %Y').strftime('%Y-%m-%d %H:%M:%S%z')
    else:
        dataDict["date"] = ""
        
    dataDict["hashtags"] = []

    if tweetJson["entities"]["hashtags"] != None:

        listHashtags = tweetJson["entities"]["hashtags"]
        for hashtag in listHashtags:        
            dataDict["hashtags"].append(hashtag["text"])

    elif tweetJson["extended_tweet"] != None and tweetJson["extended_tweet"]["entities"] != None and\
            tweetJson["extended_tweet"]["entities"]["hashtags"] != None:
        
        listHashtags = tweetJson["extended_tweet"]["entities"]["hashtags"]
        for hashtag in listHashtags:        
            dataDict["hashtags"].append(hashtag["text"])            



    if tweetJson["coordinates"]!= None and tweetJson["coordinates"]["coordinates"] != None:
        dataDict["geo"] = tweetJson["coordinates"]["coordinates"]

    elif tweetJson["geo"]!= None and tweetJson["geo"]["coordinates"] != None:
        temp = tweetJson["geo"]["coordinates"]
        if len(temp) == 2:
            dataDict["geo"] = [temp[1], temp[0]]

    else:
        dataDict["geo"] = []

    return dataDict




def dealStream(tweetJson, file):


    try:
        send_to_db_raw(tweetJson)

        dataDict = fieldSelect(tweetJson)
        send_to_db_select(dataDict)


    except Exception as e:

        print(e)
        print("Cannot upload a well-formatted tweet to couchDB")
        file.write(str(e) + "\n")
        file.write("Cannot upload a well-formatted tweet to couchDB\n")
        time.sleep(30)



parser = argparse.ArgumentParser(description='COMP90024 Project Twitter Streamer')
# Use like:
# python arg.py -l 1234 2345 3456 4567
# parser.add_argument('-l','--list', nargs='+', default=[141, -38, 150, -34])
parser.add_argument('--filename', type=str, default="streamlog57.txt")
args = parser.parse_args()



file = open(args.filename, "a")

#This is a basic listener that just prints received tweets to stdout.
class TweetListener(StreamListener):

    def on_data(self, data):

        tweetJson = json.loads(data, encoding= 'utf-8')
        print(tweetJson)
    	# need to filter out the retweets
        if not tweetJson["text"].startswith('RT') and tweetJson["retweeted"] == False:
            file.write(data)
            dealStream(tweetJson, file)
        return True

    def on_error(self, status):
        print (status)




if __name__ == '__main__':


    #This handles Twitter authetification and the connection to Twitter Streaming API
    listener = TweetListener()
    auth = getAuth(access)
    stream = Stream(auth, listener)

    #This line filter Twitter Streams to capture data around Victoria state
    stream.filter(locations=args.list) 

    file.close()





