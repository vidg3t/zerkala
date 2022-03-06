import os

original_list = len(os.listdir())

#print(type(os.stat('test.txt').st_ctime))
while True:
	if len(os.listdir()) > original_list:
		max = os.listdir()[0]
		for file in os.listdir():
			if os.stat(file).st_ctime > os.stat(max).st_ctime:
				max = file
		os.remove(max)
