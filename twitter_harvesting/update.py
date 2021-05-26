'''
Author: Hantong Xing
StudentID: 1164099
Date: 2021-05-22 18:26:50
LastEditTime: 2021-05-27 07:08:06
FilePath: \ccc_assign2_group\twitter_harvesting\update.py
'''


import collections
import json
import couchdb
from crawlerSetting import host, port, username, password, db_name
import re
import nltk
from nltk.tokenize import TweetTokenizer
from nltk.stem import WordNetLemmatizer
from shapely.geometry import Polygon, box
from keywords import medical, education, environment, transport, entertainment
import random
from textblob import TextBlob


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
database_raw = connect_to_database("results", server)
db_results = connect_to_database("analysis", server)
######################################################

'''
preprocess
'''

# nltk.download('stopwords')
word2count = {
        "sydney": {},
        "melbourne": {},
        "brisbane": {},
        "adelaide": {},
        "perth": {},
        "hobart": {},
        "canberra": {},
        "darwin": {},
        "Australia other": {}
}

# clean data
default_stopwords = set(nltk.corpus.stopwords.words('english'))
tt = TweetTokenizer()
lemmatizer = WordNetLemmatizer()


def preprocess_data(text):
    """
    This function takes a string as input, then performs these operations: 
        - lowercase
        - remove URLs
        - remove ticker symbols 
        - removes punctuation
        - removes any single character tokens
    """ 
    # text = df['text'].apply(str)
    # for i in range(len(text)):

    # Replace URLs with a space in the message
    text = re.sub('https?:\/\/[a-zA-Z0-9@:%._\/+~#=?&;-]*', ' ', text)
    # Replace ticker symbols with a space. The ticker symbols are any stock symbol that starts with $.
    text = re.sub('\$[a-zA-Z0-9]*', ' ', text)
    # Replace StockTwits usernames with a space. The usernames are any word that starts with @.
    text = re.sub('\@[a-zA-Z0-9]*', ' ', text)
    # Replace everything not a letter or apostrophe with a space
    text = re.sub('[^a-zA-Z\']', ' ', text)
    # tokenize the sentence
    text = tt.tokenize(text)
    # remove single character words
    text = [word for word in text if len(word) > 3]
    # convert to lower case
    text = [word.lower() for word in text]
    # removing numbers
    text = [word for word in text if word.isalpha()]
    # stem the words
    text = [lemmatizer.lemmatize(word) for word in text]
    # remove stopwords
    text = [word for word in text if word not in default_stopwords]
    # text = " ".join(text)
    # df['text'][i] = text
    # print("Pre-process finished")
    return text
    # return df['text']



def freq_count(city, text):

    for word in text: 
        if word not in word2count[city].keys(): 
            word2count[city][word] = 1
        else: 
            word2count[city][word] += 1



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


def geo_process(bounding_box):
    user_shape = Polygon(bounding_box)
    for name_, area_shape in bbox_shapes.items():
        if area_shape.contains(user_shape.centroid):
            return name_
    return "Australia other"



'''
count keywords
'''

fields = [medical, education, environment, transport, entertainment]

def count_keywords(tokens):

    score = [0] * 5
    for i, each in enumerate(fields):
        for word in tokens:
            if word in each:
                score[i] += 1
    return score



'''
topic count
'''

topic_of_city = {
        "sydney": [0] * 5,
        "melbourne": [0] * 5,
        "brisbane": [0] * 5,
        "adelaide": [0] * 5,
        "perth": [0] * 5,
        "hobart": [0] * 5,
        "canberra": [0] * 5,
        "darwin": [0] * 5,
        "Australia other": [0] * 5
}

def count_topic(city, score):
    topic_of_city[city] = [i + j for i, j in zip(topic_of_city[city], score)]



'''
sentiment analysis
'''

def sentiment_analysis(text):
	text = " ".join(text)
	analysis = TextBlob(text)
	# set sentiment 
	if analysis.sentiment.polarity > 0: 
		return 'pos'

	elif analysis.sentiment.polarity == 0: 
		return 'neu'

	else:
		return 'neg'


cities=["sydney","melbourne","brisbane","adelaide","perth","hobart","canberra","darwin","Australia other"]
topics=["medical", "education", "environment", "transport", "entertainment"]
sentiment_class = ["pos", "neg", "neu"]

sentiment_dict = {ver: {col: {senti_class: 0 for senti_class in sentiment_class} for col in topics} for ver in cities}

def build_sentiment_dict(sentiment_dict, city, count, senti):
    # find and assign the highest count as this tweet's related topic, break tie if multiple max
    max_count = max(count)
    # get index of max count
    index = [i for i, j in enumerate(count) if j == max_count]
    #only 1 max
    if len(index) == 1:
        sentiment_dict[city][topics[index[0]]][senti] += 1
    else:
        idx = random.choice(index)
        sentiment_dict[city][topics[idx]][senti] += 1


'''
helper functions
'''
def save():

    with open('word2count.json', 'w') as fp:
        json.dump(word2count, fp)
    
    with open('topic_of_city.json', 'w') as fp:
        json.dump(topic_of_city, fp)

    with open('sentiment_dict.json', 'w') as fp:
        json.dump(sentiment_dict, fp)



def slicing(dict, n):
    new_a = {}
    for i,(k,v) in enumerate(dict.items()):
        new_a[k]=v
        if i== n-1:
            break
    return new_a



def flatten(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)



def process():
    
    view = database_raw.view('_all_docs')
    # print(view)
    i = 0
    for docid in database_raw.view('_all_docs'):
        try:
            i = i+1
            print(i)
            doc = database_raw.get(docid.id)
            if doc and "text" in doc:
                if not "geo_code" in doc:
                    if doc["place"] is not None:
                        doc["geo_code"] = geo_process(doc['place']["bounding_box"]["coordinates"][0])  # Add geo_code if missing
                    else: 
                        doc["geo_code"] = "sydney"

                if doc["text"]:
                    tokens = preprocess_data(doc["text"])
                    doc["tokens"] = tokens
                    # print(tokens)

                    if tokens:

                        count = count_keywords(tokens)
                        doc["words"] = count
                        # print(count)

                        senti = sentiment_analysis(tokens)
                        doc["sentiment"] = senti
                        # print(senti)

                        city = doc["geo_code"]
                        # print(city)
                        freq_count(city, tokens)

                        count_topic(city, count)

                        database_raw.save(doc)

                        build_sentiment_dict(sentiment_dict, city, count, senti)
            
            if i % 10000 == 0:
                save()

        except Exception as e:
            pass


    for i, city in enumerate(cities):
        word2count[city] = {k: v for k, v in sorted(word2count[city].items(), key=lambda item: item[1], reverse=True)}
        word2count[city] = slicing(word2count[city], 50)
    

    for city in cities:
        
        doc = db_results.get(city)
        if doc is None:
            db_results.save({"_id": city})
            doc = db_results.get(city)

        doc['city'] = city

        doc['words'] = word2count[city]

        for i, topic in enumerate(topics):
            doc[topic] = topic_of_city[city][i]

        # doc['sentiment'] = sentiment_dict[city]
        flattened = flatten(sentiment_dict[city])
        for i, topic in enumerate(flattened):
            # print(i, topic, flattened[topic])
            doc[topic] = flattened[topic]


        db_results[doc.id] = doc
    


process()
print("Finish processing!")