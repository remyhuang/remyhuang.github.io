from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import json

gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

AC_ID = "1bGzLHFCZ0ICk1dRmgVi9OtHYTFJIWIcH"
NC_ID = "1pzc_8_XWhQb5qvt6uA8Hfkpuyf86lA56"
BASELINE_ID = "18eyZdWCIEIFK-pqriclAed3jCvV3yl6Q"
FOLDER_IDS = [AC_ID, NC_ID, BASELINE_ID]
FOLDER_NAMES = ['AC', 'NC', 'baseline']

files = {}
for FOLDER_NAME, FOLDER_ID in zip(FOLDER_NAMES, FOLDER_IDS):
    file_list = drive.ListFile({'q': "'{}' in parents and trashed=false".format(FOLDER_ID)}).GetList()
    for file in file_list:
        title = file['title']
        link = "https://drive.google.com/uc?export=open&id={}".format(file['id'])
        if title not in files:
            files[title] = {}
        files[title][FOLDER_NAME] = link

with open('files.json', 'w') as outfile:
    json.dump(files, outfile)
