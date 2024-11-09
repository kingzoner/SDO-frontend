import requests

URL = 'http://127.0.0.1:8040'
SESSION = requests.Session()


def create_group(name):
    url = f'{URL}/create_students_group'
    payload = {'name': str(name)}
    resp = SESSION.post(url=url, json=payload)
    return resp


def get_groups():
    url = f'{URL}/get_students_groups'
    resp = SESSION.get(url=url)
    return resp


def register(username):
    url = f'{URL}/register'
    payload = {
        'username': username,
        'password': username,
        'group_id': 0
    }
    resp = SESSION.post(url=url, json=payload)
    return resp


def login(username):
    url = f'{URL}/login'
    payload = {
        'username': username,
        'password': username,
    }
    resp = SESSION.post(url=url, json=payload)
    return resp


def user_dashboard(token):
    url = f'{URL}/userDashboard'
    SESSION.headers = {'Authorization': f'Bearer {token}'}
    resp = SESSION.get(url=url)
    return resp


def upload_file(path_file: str):
    url = f'{URL}/uploadFile'
    files = {'file': open(path_file, 'rb')}
    SESSION.post(url=url, files=files)

# test file
def check_file(title_file: str):
    url = f'{URL}/testFile'
    params = {'title': title_file}
    resp = SESSION.get(url=url, params=params)
    return resp


upload_file('testing/test_files/requestFile.py')
print(check_file('studentCode.txt').content)
