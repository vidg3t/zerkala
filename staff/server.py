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
import paramiko
from scp import SCPClient
import os


def createSSHClient(server, port, user, password):
    client = paramiko.SSHClient()
    client.load_system_host_keys()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(server, port, user, password)
    return client

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
    os.system("sshpass -p 'Qwerty1!' ssh sergefbr_24@sergefbr.beget.tech 'rm -Rf /home/s/sergefbr/sergefbr.beget.tech/public_html/returns'")
    ssh = createSSHClient('sergefbr.beget.tech',22, 'sergefbr_24', 'Qwerty1!')
    scp = SCPClient(ssh.get_transport())
    scp.put("../returns", recursive = True, remote_path = '/home/s/sergefbr/sergefbr.beget.tech/public_html')
    scp.close()    
    print(rand_string)
    
    # time.sleep(0.1)
    return ({"text":rand_string})





app.run(debug=True,host="195.2.74.124")
