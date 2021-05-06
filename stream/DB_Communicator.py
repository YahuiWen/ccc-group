import couchdb

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



# data: the dictionary format of tweet object
def send_to_db_raw(tweet_, db=database_raw):
    
    # set tweet id as the document id for duplication removal
    tweet_["_id"] = "%d" % tweet_["id"]
    tweet_["id"] = "%d" % tweet_["id"]
    if tweet_ is not None:
        try:
            db.save(tweet_)
        except:
            print("error")
            pass

# data: the dictionary format of tweet object
def send_to_db_city(tweet_, db):

    tweet_["_id"] = "%s" % tweet_["id"]
    if tweet_ is not None:
        try:
            db.save(tweet_)
        except:
            print("error")
            pass
    
# # data: the dictionary format of tweet object
# def send_to_db_select(tweet_, db=database_select):

#     tweet_["_id"] = "%s" % tweet_["id"]
#     if tweet_ is not None:
#         try:
#             db.save(tweet_)
#         except:
#             print("error")
#             pass
    

