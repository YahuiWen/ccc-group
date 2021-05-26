'''
Author: Hantong Xing
StudentID: 1164099
Date: 2021-05-06 17:06:03
LastEditTime: 2021-05-27 07:06:55
FilePath: \ccc_assign2_group\twitter_harvesting\DB_Communicator.py
'''


import couchdb
from shapely.geometry import Polygon, box
from crawlerSetting import host, port, username, password, db_name


def connect_to_couch_db_server(host, port, username, password):
    secure_remote_server = couchdb.Server('http://' + username + ':' + password + '@' + host + ':' + port)
    return secure_remote_server


def connect_to_database(database_name, server):
    try:
        return server[database_name]
    except:
        return server.create(database_name)


## SETUP ######################################################
server = connect_to_couch_db_server(host, port, username, password)
database_raw = connect_to_database("raw_tweets", server)
database_select = connect_to_database("test_db", server)
######################################################


bbox_shapes = {}
for name, coordinates in bbox.items():
    bbox_shapes[name] = box(coordinates[0], coordinates[1], coordinates[2], coordinates[3])


def preprocess(bounding_box):
    user_shape = Polygon(bounding_box)
    for name_, area_shape in bbox_shapes.items():
        if area_shape.contains(user_shape.centroid):
            return name_
    return "Australia other"


# data: the dictionary format of tweet object
def send_to_db_raw(tweet_, db=database_raw):
    
    # set tweet id as the document id for duplication removal
    tweet_["_id"] = "%d" % tweet_["id"]
    tweet_["id"] = "%d" % tweet_["id"]

    tweet_["geo_code"] = preprocess(tweet_['place']["bounding_box"]["coordinates"][0])  # ADD
    print(tweet_["geo_code"])

    if tweet_ is not None:
        try:
            db.save(tweet_)
        except:
            print("error")
            pass

# data: the dictionary format of tweet object
def send_to_db_city(tweet_, db):

    tweet_["_id"] = "%s" % tweet_["id"]

    tweet_["geo_code"] = preprocess(tweet_['place']["bounding_box"]["coordinates"][0])  # ADD
    print(tweet_["geo_code"])

    if tweet_ is not None:
        try:
            db.save(tweet_)
        except:
            print("error")
            pass
    
    

