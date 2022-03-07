import sqlite3
import os

def add_info(name, phone):
        db = sqlite3.connect('base.db')
        sql = db.cursor()

        sql.execute('''CREATE TABLE IF NOT EXISTS users(
                full_name TEXT,
                phone_number TEXT
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
                sql.execute(f"INSERT INTO users VALUES(?,?)", (name, phone))
                db.commit()

def remove_oldest():
        original_list = len(os.listdir('remdir'))
        min = os.listdir('remdir')[0]
        for file in os.listdir('remdir'):
                if os.stat(f'remdir/{file}').st_ctime < os.stat(f'remdir/{min}').st_ctime:
                        min = file
        while True:
                #os.remove(f'remdir/{min}')
                if f'remdir/{min}' in os.listdir('remdir'):
                        print(True)
                        break
                try:
                        os.remove(f'remdir/{min}')
                except FileNotFoundError:
                        break

remove_oldest()
