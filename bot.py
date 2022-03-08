import sqlite3
import telebot
from telebot import types
import time

db = sqlite3.connect('base.db')
sql = db.cursor()

bot = telebot.TeleBot("5189886521:AAGw-MWlkUbeEthb9Rd6OIPpV8hQ_UG0zrA")
@bot.message_handler(commands=["start"])
@bot.message_handler(func=lambda m:True)

def start(message):
	bot.send_message(message.chat.id, 'Добро пожаловать в меню!', reply_markup = markup)
	bot.register_next_step_handler(message, handler)

def handler(message):
	db = sqlite3.connect('base.db')
	sql = db.cursor()
	if message.text == 'Посмотреть базу':
		c = 0
		for i in sql.execute("SELECT full_name FROM users"):
			c += 1
		bot.send_message(message.chat.id, f'Введите кол-во аккаунтов, сколько записей вы хотите увидеть(всего записей - {c})')
		bot.register_next_step_handler(message, dbviewer)
	if message.text == 'Включить систему оповещений':
		bot.send_message(message.chat.id, 'Система оповещений включена. Вы получите уведомление, как только новый аккаунт зарегистрируется')
		# c = 0
		# for i in sql.execute("SELECT full_name FROM users"):
		# 	c += 1
		while True:
			e = 0
			for d in sql.execute("SELECT full_name FROM users"):
				e += 1
			global counter
			if e > counter:
				base_list = list()
				for x in sql.execute(f"SELECT * FROM users"):
					base_list.append(f'Новый аккаунт зарегистрирован!\nФИО : {x[0]}\nНомер телефона : {x[1]}')
				base_list.reverse()
				for i in range(e-counter):
					bot.send_message(message.chat.id, base_list[i])
				counter = e
			time.sleep(10)

def dbviewer(message):
	db = sqlite3.connect('base.db')
	sql = db.cursor()
	c = 0
	for i in sql.execute("SELECT full_name FROM users"):
		c += 1
	b = 0
	base_list = list()
	for i in sql.execute(f"SELECT * FROM users"):
		base_list.append(f'ФИО : {i[0]}\nНомер телефона : {i[1]}')
		b += 1
		if b >= int(message.text):
			break
	base_list.reverse()
	for i in range(len(base_list)):
		bot.send_message(message.chat.id, base_list[i])
	bot.send_message(message.chat.id, 'Добро пожаловать в меню!', reply_markup = markup)
	bot.register_next_step_handler(message, handler)
		
watch_db = types.KeyboardButton('Посмотреть базу')
push_on = types.KeyboardButton('Включить систему оповещений')
markup = types.ReplyKeyboardMarkup(resize_keyboard = True, row_width = 1)
markup.add(watch_db, push_on)
counter = 0
for i in sql.execute("SELECT full_name FROM users"):
	counter += 1
bot.polling(none_stop=True, interval=0)