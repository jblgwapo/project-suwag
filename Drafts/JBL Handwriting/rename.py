import os
ROOT_PATH =  os.path.dirname(os.path.abspath(__file__))
FOLDER_CONTENTS = os.listdir(ROOT_PATH)
for file in FOLDER_CONTENTS:
    folder = ROOT_PATH + '/' + file + '/'
    print(os.path.isdir(folder))
    if os.path.isdir(folder):
        print (os.listdir(folder))
        i=0
        for img in os.listdir(folder):
            dst = folder + str(i) + ".png"
            src = folder + img
            os.rename(src,dst)
            i += 1
