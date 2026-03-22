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

def userDashboard(token):
    url = f'{URL}/userDashboard'
    SESSION.headers = {'Authorization': f'Bearer {token}'}
    resp = SESSION.get(url=url)
    return resp


#print(create_group('220-221').text)
print(get_groups().json())
#print(login('test1').json())
resp = register('test1123').json()
token = resp['access_token']
print(userDashboard(token).json())
