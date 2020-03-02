import os
import shutil


ROOT_PATH =  os.path.dirname(os.path.abspath(__file__))
# Create target Directory if don't exist
SOURCE += 'font.jpeg'
COUNT = int(input('How many copies per character?'))


charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


for letter in charset:
    print(letter)
    pass

def create_folder(letter, count):
    dirname = ROOT_PATH + '/' + letter + '/'
    if not os.path.exists(dirName):
        os.mkdir(dirName)
        print("Directory " , dirName ,  " Created ")
    else:
        print("Directory " , dirName ,  " already exists")
    for i in range(count):
        shutil.copyfile(SOURCE, dirName)
