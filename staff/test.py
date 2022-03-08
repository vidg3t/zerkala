root="sergefbr.beget.tech"
port="21"
import random
login="sergefbr"
import string
password="g85wOuB4"
from ftplib import FTP 
with FTP(root) as ftp:
    ftp.login(user=login,passwd=password)
    print(ftp.getwelcome())
    ftp.cwd("sergefbr.beget.tech/public_html/staff")
    length=15
    letters = string.ascii_lowercase
    rand_string = ''.join(random.choice(letters) for i in range(length))
    name="../returns"+rand_string+".html"
    x=open("../returns/"+rand_string+".html","w")
    
    g=open("../templ_for_registr.html","r")
    # ftp.retrbinary('RETR ' + name, g.write, 1024) # Введите имя файла для загрузки
    html=g.read()
    print(html,file=x)
    x.close()
    ftp.retrbinary('RETR ' + name, x.write, 1024) # Введите имя файла для загрузки
    g.close()
    x.close()
    print(rand_string)