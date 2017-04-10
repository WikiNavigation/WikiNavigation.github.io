# This is our Algorthim for surfing wikipedia
# Our Goal is to set a starting Point and End point and be 
# Able to 
# Tyrone 
# Andrew
import wikipedia
from random import randint
import csv
import json 

wikipedia.search("Barack")
state = wikipedia.page("apple")
VERSION = "DS_1.0.1"
floor  = 70
title = []
double = []
route = []
link = []
total = 0

print('Title~Route~Link.csv')

def dupe(string):
    count = 0
    for i in range(0,len(double)):
        if string == double[i]:
            return True
    double.append(string)
    return False

for i in range (0,floor):
    choice = randint(2,10)
    state = wikipedia.page(state.links[choice])
    route.append(choice)
    title.append(state.title)
    link.append(len(state.links))
    #print(titles[i]+" | "+str(route[i])+" | "+str(link[i]))
    total += route[i];
print("Total: "+str(total))

#out = csv.writer(open(VERSION+".json","w"), delimiter=',',quoting=csv.QUOTE_ALL)
#out.writerow(data)
box = []
nodes = []
links = []
Modifier = 0;
alt = 0;
for i in range (0,floor):
    if dupe(title[i]) ==  False:
        nodes.append({'id':title[i],'node': i,'group':route[i]})   

for i in range (1,floor):
    links.append({'source':title[i-1],'target':title[i],'value':route[i]}) 

# for i in range (1,floor):
#     Modifier = randint(1,floor-10)
#     alt = randint(20,floor-1)
#     links.append({'source':title[Modifier],'target':title[alt],'value':route[i]}) 

# for i in range (1,floor):
#     Modifier = randint(20,floor-1)
#     alt =  randint(1,floor-15)
#     links.append({'source':title[alt],'target':title[Modifier],'value':route[i]}) 

box.append({'nodes':nodes,'links':links})
with open('data.json', 'w') as outfile:
  json.dump(box, outfile)

print(json.dumps(box))


    
    



