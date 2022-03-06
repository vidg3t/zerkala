import sqlite3

db = sqlite3.connect('base.db')
sql = db.cursor()

sql.execute('''CREATE TABLE IF NOT EXISTS users(
        full_name TEXT,
        phone_number TEXT
)''')

db.commit()

def add_info(name, phone):
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
add_info('dbawjdba ', '876585')