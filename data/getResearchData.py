'''
Author: Hantong Xing
StudentID: 1164099
Date: 2021-05-15 05:45:15
LastEditTime: 2021-05-27 07:08:56
FilePath: \ccc_assign2_group\data\getResearchData.py
'''


# Get Twitter data from professor's API

import requests
import json
import argparse


parser = argparse.ArgumentParser(description='COMP90024 Project Research Data')
parser.add_argument('--batch', type=int, default=100)
parser.add_argument('--total', type=int, default=500)
parser.add_argument('--startDate', type=str, default='[\"melbourne\",2016,1,1]')
parser.add_argument('--endDate', type=str, default='[\"melbourne\",2016,1,31]')
parser.add_argument('--url', type=str, default='http://45.113.232.90/couchdbro/twitter/_design/twitter/_view/summary')
parser.add_argument('--filename', type=str, default='log2016-melbourne.txt')
args = parser.parse_args()

url = args.url
BATCHSIZE = args.batch
params={'include_docs':'true','reduce':'false','start_key':args.startDate,'end_key':args.endDate,"skip": "0", "limit": str(BATCHSIZE)}
TOTALSIZE = args.total


num = 0
file = open(args.filename,"w")
while num<TOTALSIZE:

	message=requests.get(url,params,auth=('readonly', 'ween7ighai9gahR6'))


	num = num + BATCHSIZE
	
	temp = num
	params['skip'] = str(temp)
	# Message to dict
	dataset = message.json()
	print(type(dataset))
	file.write(json.dumps(dataset))

file.close()
