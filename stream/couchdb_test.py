# -*- coding: utf-8 -*-
"""
Created on Thu May  6 16:52:22 2021

@author: lantianqi
"""

import couchdb
couch = couchdb.Server()

couch = couchdb.Server('http://admin:comp90024ccc@172.26.131.13:5984/')

db = couch['test_db']

doc = {'_id': '123', 'foo': 'bar'}

db.save(doc)

