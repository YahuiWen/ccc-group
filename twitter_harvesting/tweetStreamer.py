'''
Author: Hantong Xing
StudentID: 1164099
Date: 2021-04-27 05:49:15
LastEditTime: 2021-05-27 07:08:15
FilePath: \ccc_assign2_group\twitter_harvesting\tweetStreamer.py
'''


import tweepy
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
import argparse
import time
import json
import couchdb
from crawlerSetting import host, port, username, password, db_name
from shapely.geometry import Polygon, box



def connect_to_couch_db_server(host, port, username, password):
    secure_remote_server = couchdb.Server('http://' + username + ':' + password + '@' + host + ':' + port)
    # secure_remote_server = couchdb.Server('http://admin:comp90024ccc@127.0.0.1:5984/')
    return secure_remote_server


def connect_to_database(database_name, server):
    try:
        return server[database_name]
    except:
        return server.create(database_name)

## SETUP ######################################################
server = connect_to_couch_db_server(host, port, username, password)
database_raw = connect_to_database("tweets", server)
######################################################

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


bbox_shapes = {}
for name, coordinates in bbox.items():
    bbox_shapes[name] = box(coordinates[0], coordinates[1], coordinates[2], coordinates[3])


def preprocess(bounding_box):
    user_shape = Polygon(bounding_box)
    for name_, area_shape in bbox_shapes.items():
        if area_shape.contains(user_shape.centroid):
            return name_
    return "Australia other"


# # data: the dictionary format of tweet object
def send_to_db_raw(tweet_, db=database_raw):
    
    # set tweet id as the document id for duplication removal
    tweet_["_id"] = "%s" % tweet_["id"]
    tweet_["id"] = "%s" % tweet_["id"]

    tweet_["geo_code"] = preprocess(tweet_['place']["bounding_box"]["coordinates"][0])  # ADD
    print(tweet_["geo_code"])
    print(tweet_["_id"])

    if tweet_ is not None:

        try:
            db.save(tweet_)
        except:
            print("error")
            pass


# My keys and tokens
consumer_key = 'hLOhZongKatT6zTA6ZREQ51nn'
consumer_secret = '7LofEjZre3wcdPPwVafmsByNzkmwPlEjUTGRyAmSh22V1CBUfj'
access_token = '1385211029597032449-wLX0RtqzWxtIoZmeKt3bqevvQbCI5j'
access_token_secret = 'XDXIvigjHf1TxEdych14JVZmcHtydQm1P4BGDOm6rqt7y'

access = {"consumer_key": consumer_key,
            "consumer_secret": consumer_secret,
            "access_token": access_token,
            "access_secret": access_token_secret}


# Get the authentication
def getAuth(access):

    auth = tweepy.OAuthHandler(access['consumer_key'], access['consumer_secret'])
    auth.set_access_token(access['access_token'], access['access_secret'])
    return auth


def dealStream(tweetJson, file):

    try:
        send_to_db_raw(tweetJson)


    except Exception as e:

        print(e)
        print("Cannot upload a well-formatted tweet to couchDB")
        file.write(str(e) + "\n")
        file.write("Cannot upload a well-formatted tweet to couchDB\n")
        time.sleep(30)



parser = argparse.ArgumentParser(description='COMP90024 Project Twitter Streamer')
parser.add_argument('-l','--list', nargs='+', default=[112.841389, -43.691389, 153.679723, -10.508056])
parser.add_argument('--filename', type=str, default="streamlog523.txt")
args = parser.parse_args()
file = open(args.filename, "a")

#This is a basic listener that just prints received tweets to stdout.
class TweetListener(StreamListener):

    def on_data(self, data):

        tweetJson = json.loads(data, encoding= 'utf-8')
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
