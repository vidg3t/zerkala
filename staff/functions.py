import sqlite3
import os
from datetime import datetime
import pytz
from pathlib import Path

def add_info(name, phone):
        db = sqlite3.connect('base.db')
        sql = db.cursor()

        sql.execute('''CREATE TABLE IF NOT EXISTS users(
                full_name TEXT,
                phone_number TEXT,
                creation_time TEXT
        )''')

        db.commit()

        db = sqlite3.connect('base.db')
        sql = db.cursor()
        phone = list(phone)
        symbs = '+-() '
        for symb in symbs:
                for s in phone:
                        if s == symb:
                                phone.remove(s)
        phone = ''.join(phone)
        #print(phone)
        sql.execute(f"SELECT phone_number FROM users WHERE phone_number = {phone}")
        if sql.fetchone() is None:
                sql.execute(f"INSERT INTO users VALUES(?,?,?)", (name, phone, str(datetime.now(pytz.timezone('Europe/Moscow'))).split('.')[0]))
                db.commit()

def remove_oldest():
        original_list = len(os.listdir('../returns'))
        if original_list>5:
                min = os.listdir('../returns')[0]
                for file in os.listdir('../returns'):
                        if os.stat(f'../returns/{file}').st_ctime < os.stat(f'../returns/{min}').st_ctime:
                                min = file
                while True:
                        #os.remove(f'remdir/{min}')
                        try:
                                os.remove(f'../returns/{min}')
                        except FileNotFoundError:
                                break
