'''
Author: Hantong Xing
StudentID: 1164099
Date: 2021-05-26 18:01:24
LastEditTime: 2021-05-27 07:08:28
FilePath: \ccc_assign2_group\twitter_harvesting\search.py
'''


import base64
import requests
import couchdb
import time
import sys
from crawlerSetting import host, port, username, password, db_name



def server_connection():
    try:
        server = couchdb.Server('http://{}:{}@{}:{}/'.format(username, password, host, port))
        print("CouchDB is connected: " + str(server) + "\n")
        return server

    except Exception as e:
        print(e)


def get_db(server, db_name):
    try:
        db = server[db_name]
        return db
    except Exception as e:
        print(e)


def create_doc(db, document):
    doc_id, doc_rev = db.save(document)
    doc = db[doc_id]
    return doc


def print_time():
    now = time.localtime()
    print("Time: %04d/%02d/%02d %02d:%02d:%02d" % (
    now.tm_year, now.tm_mon, now.tm_mday, now.tm_hour, now.tm_min, now.tm_sec))


def get_tweets(provinces, geocodes, since, until, server, base_url, search_headers):
    for idx, province in enumerate(provinces):
        # initial start id
        since_id = 9999999999999999999999999999999999

        # db = get_db(server, "{}_radius".format(province))
        db = get_db(server, "results")
        geocode = geocodes[idx]

        while True:
            # print_time()
            # print("[ Send request to Twitter ]\n")

            try:
                search_params = {
                    # 'q': '{}'.format(query),
                    'geocode': '{}'.format(geocode),
                    'since': '{}'.format(since),  # only 7 days before
                    'until': '{}'.format(until),
                    'count': 100,  # max 100 with free api
                    'result_type': 'recent',  # mixed, recent, popular
                    'max_id': '{}'.format(str(since_id)),
                    'retryonratelimit': True
                }

                search_url = '{}1.1/search/tweets.json'.format(base_url)

                search_resp = requests.get(search_url, headers=search_headers, params=search_params)
                tweet_data = search_resp.json()['statuses']

                # print(search_resp)
                # print(tweet_data)

                if len(tweet_data) != 0:
                    for tweet in tweet_data:
                        print_time()

                        try:
                            since_id = tweet["id"]
                            tweet["_id"] = tweet["id_str"]
                            create_doc(db, tweet)

                            print("Tweet is collected [ {}_radius ]> {}\n".format(province, tweet["_id"]))

                        except Exception as e_db:
                            print(str(e_db) + "\n")

                    since_id = since_id - 1

                else:
                    print("Tweets about the requested query does not exist\n")
                    break

            except Exception as e:
                print_time()
                print(e)

                print("\nAPI reaches the rating limit, Sleep 15 min\n")
                time.sleep(930)  # sleep 15min 30sec


#####################################################################################
# My keys and tokens
consumer_key = 'hLOhZongKatT6zTA6ZREQ51nn'
consumer_secret = '7LofEjZre3wcdPPwVafmsByNzkmwPlEjUTGRyAmSh22V1CBUfj'
access_token = '1385211029597032449-wLX0RtqzWxtIoZmeKt3bqevvQbCI5j'
access_token_secret = 'XDXIvigjHf1TxEdych14JVZmcHtydQm1P4BGDOm6rqt7y'

#####################################################################################


key_secret = '{}:{}'.format(consumer_key, consumer_secret).encode('ascii')
b64_encoded_key = base64.b64encode(key_secret)
b64_encoded_key = b64_encoded_key.decode('ascii')

base_url = 'https://api.twitter.com/'
auth_url = '{}oauth2/token'.format(base_url)

auth_headers = {
    'Authorization': 'Basic {}'.format(b64_encoded_key),
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }

auth_data = {'grant_type': 'client_credentials'}

auth_resp = requests.post(auth_url, headers=auth_headers, data=auth_data)

access_token = auth_resp.json()['access_token']

search_headers = { 'Authorization': 'Bearer {}'.format(access_token) }

#####################################################################################
# [geocode: latitude,longitude,radius]
australia = '-29.1425,133.1389,2081km'
melbourne = '-37.7867,144.9082,100km'
sydney = '-33.8813,151.2128,100km'
brisbane = '-27.5394,153.1024,100km'
adelaide = '-34.9328,138.6444,100km'
perth = '-32.0379,115.8808,100km'
hobart = '-42.8826,147.3257,100km'
canberra = '-35.2809,149.1300,100km'
darwin = '-12.4637,130.8444,100km'

provinces = ['melbourne', 'sydney', 'brisbane', 'adelaide', 'perth','hobart','canberra','darwin']
geocodes = [melbourne, sydney, brisbane, adelaide, perth, hobart, canberra, darwin]

#####################################################################################
# query = "education OR learning OR school OR background OR curriculum OR major OR minor OR highlight OR specialized OR course"
since = "2021-05-19"
until = "2021-05-26"

# change above Twitter account keys(consumer_key, consumer_secret)
# change above parameters only: query, since, until
# get_tweets(query, provinces, geocodes, since, until, server_connection(server_id, server_pw, server_ip, server_port), base_url, search_headers)
get_tweets(provinces, geocodes, since, until, server_connection(), base_url, search_headers)