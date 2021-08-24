import os

for file in os.listdir("."):
    if file[-2: ] == 'py':
        continue

    if file.find('fulla') > -1:
        name = file.replace('fulla','1a')
    elif file.find('fullb') > -1:
        name = file.replace('fullb','1b')
    elif file.find('close1') > -1:
        name = file.replace('close1','4')
    elif file.find('quater1') > -1:
        name = file.replace('quater1','2')
    elif file.find('half') > -1:
        name = file.replace('half','3')
    else:
        name = file

    os.rename(file,name)
    print(file,name)