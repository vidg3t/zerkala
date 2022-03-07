import py_compile
import flask
from flask import Flask
from flask import jsonify, Request
from flask_cors import CORS
import requests
import json
import time
import random
import functions
import string
import math
def generator():
    length=15
    letters = string.ascii_lowercase
    rand_string = ''.join(random.choice(letters) for i in range(length))
    print("Random string of length", length, "is:", rand_string)
app = Flask(__name__)
CORS(app)

URL = 'https://api.shiptor.ru/shipping/v1'
headers = {
        'Content-Type' : 'application/json',
        'X-Authorization-Token' : '05eaca80d8fbc53660329ccc6ce97b3da3823788'
    }

@app.route('/newClient/<name>&&<phone>')
def search_city(name,phone):
    print(name,phone)
    functions.add_info(name,phone)
    functions.remove_oldest()
    return ({"name":name,"phone":phone})
@app.route("/newClient/generate")
def generate():
    length=15
    letters = string.ascii_lowercase
    rand_string = ''.join(random.choice(letters) for i in range(length))
    x=open("../returns/"+rand_string+".html","w")
    g=open("../templ_for_registr.html","r")
    html=g.read()
    print(html,file=x)
    x.close()
    g.close()
    print(rand_string)
    
    # time.sleep(0.1)
    return ({"text":rand_string})

app.run(debug=True)
