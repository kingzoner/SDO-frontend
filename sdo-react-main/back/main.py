import subprocess
from base64 import b64encode
from typing import Dict, Any, List, Type, Annotated
from fastapi import Request, File, UploadFile, Form
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder

from testing.test import check_file
from modules.database.dbconnector import *
from modules.models.data_model import *
from modules.models.db_class import *
from modules.test.test_main import *
from modules.analize.check_symbols import *
from modules.account.jwt_impl import *
from passlib.context import CryptContext
import json
import os
import shutil
import random
import string
import datetime

with open("config.json", 'r') as config_file:
    config_data = json.load(config_file)

app = FastAPI()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config_data['origins'],
    allow_credentials=config_data['credentials'],
    allow_methods=config_data['methods'],
    allow_headers=config_data['headers']
)

init_test_db_data()


@app.get("/", status_code=404)
async def read_root() -> HTMLResponse:
    html_content: str = "Error 404. Here is no page"
    return HTMLResponse(content=html_content, status_code=404)


@app.post("/register", response_model=UserResponseModel)
def create_user(user: RegisterRequestModel):
    hashed_password = pwd_context.hash(user.password)
    user_id = create_user_db(username=user.username, password=hashed_password, role='student',
                             study_group_name=user.group_name)
    payload = {"sub": user.username, "role": 'student'}
    access_token = create_access_token(data=payload)
    response = {
        "id": user_id,
        "username": user.username,
        'role': 'student',
        "access_token": access_token
    }
    return response


@app.post("/login", response_model=UserResponseModel)
def login_for_access_token(login_request: LoginRequestModel):
    user = get_user_db(login_request.username)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username",
            headers={"WWW-Authenticate": "Bearer"}
        )
    elif not pwd_context.verify(login_request.password, user.password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    payload = {"sub": user.username, "role": user.role}
    access_token = create_access_token(data=payload)
    response = {
        "id": user.id,
        "username": user.username,
        "role": user.role,
        "access_token": access_token
    }
    return response


@app.get("/user_status", response_model=UserRole)
def get_user_status(request: Request):
    access_token = request.headers.get("authorization").split(" ")[1]
    decode_data = jwt.decode(jwt=access_token,
                             key="test",
                             algorithms=['HS256'])
    user_role = decode_data.get('role')
    return UserRole(
        status=user_role,
    )


@app.get("/user_dashboard", response_model=UserDashboardModel)
def get_userDashboard(current_user: User = Depends(get_current_user)):
    role = Roles[current_user.role]
    if role != Roles.student:
        raise HTTPException(
            status_code=403,
            detail="Access Denied",
            headers={"WWW-Authenticate": "Bearer"}
        )
    response = UserDashboardModel(id=2, username='tst')
    return response


@app.get("/teacher_dashboard", response_model=TeacherDashboardModel)
def get_teacherDashboard(current_user: User = Depends(get_current_user)):
    role = Roles[current_user.role]
    if role != Roles.teacher:
        raise HTTPException(
            status_code=403,
            detail="Access Denied",
            headers={"WWW-Authenticate": "Bearer"}
        )
    response = TeacherDashboardModel(id=1, username='tst')
    return response


@app.get("/tasks")
async def get_tasks() -> JSONResponse:
    content: Dict[str, str] = {str(test.id): test.description for test in await get_all_tests()}
    return JSONResponse(content=content)


@app.get("/task/{id}")
async def get_task(id: int):
    task = await get_test(id)
    response = {"Task": TestOutput(id=task.id, task_description=task.description, task_text=task.name)}
    return response


@app.post("/check/{id}")
async def check_task(id, item: CheckModel) -> JSONResponse:
    unique_id: str = str(id) + ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7)) \
                     + datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    os.mkdir(f"./trash/{unique_id}")
    file: str = item.file
    test: Type[Test] = await get_test_by_id(id)
    filename: str = "test_" + str(id) + ''.join(random.choice(string.ascii_lowercase + string.digits)
                                                for _ in range(3)) + datetime.datetime.now().strftime('%Y%m%d%H%M%S') \
                    + ".py"
    write_file(filename, file, unique_id)
    checks: Dict[str, List[Any]] = run_test(filename, test.functions, unique_id)
    lengths: List[Dict[str, int | bool | None]] = [
        check_symbols(filename, length, unique_id) for length in test.lengths
    ]
    with open(f"./trash/{unique_id}/output.xml", "rb") as export_file:
        output: str = b64encode(export_file.read()).decode('utf-8')
    with open(f"./trash/{unique_id}/errors.txt", "rb") as export_file:
        error: str = b64encode(export_file.read()).decode('utf-8')
    for directory in ["./.pytest_cache", "./__pycache__", f"./trash/{unique_id}"]:
        try:
            shutil.rmtree(directory)
        except Exception as e:
            print(e.__str__())
    response = {
        "test_results": output,
        "test_errors": error,
        "test_passed": checks,
        "lengths": lengths
    }
    return JSONResponse(content=jsonable_encoder(response))


@app.post("/newtask", status_code=201)
async def insert_task(item: QueryData) -> JSONResponse:
    try:
        answer: str = await insert_vals(item.lab_task)
        response = {
            "status": answer
        }
        return JSONResponse(content=response)
    except Exception as ex:
        response = {
            "status": ex.__str__()
        }
        return JSONResponse(content=response, status_code=400)


@app.post("/create_students_group", status_code=201, response_model=StudyGroupResponseModel)
async def create_students_group(payload: StudyGroupRequestModel):
    group_id = create_students_group_db(payload.name)
    response = {
        "id": group_id,
        "name": payload.name
    }
    return response


@app.get("/get_students_groups", response_model=List[StudyGroupResponseModel])
async def get_students_groups():
    return get_students_groups_db()


@app.post("/newTaskPyTest")
async def newTaskForPyTest(item: PyTestQueryData):
    answer: str = await insert_pytestVals(item.labTask)
    return JSONResponse(content={"status": answer})


@app.get("/checkbypytest/{id}")
async def getDefName(id):
    test: Type[PyTest] = await get_pytest_by_id(id)
    return TaskInfo(defName=test.spoiler, taskDecsription=test.description)


@app.post("/checkbypytest/{id}")
async def checkTaskByPytest(id, item: CheckProgram):
    test: Type[PyTest] = await get_pytest_by_id(id)
    pytest = test.pyTests
    try:
        exec(item.code)
        exec(pytest)
        return {"result": "Succsec"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/execute_testing_main", response_class=JSONResponse)
async def execute_testing_main():
    try:
        testing_main_path = "../Testing/main.py"
        result = subprocess.run(["python", testing_main_path], capture_output=True, text=True)
        cleaned_output = result.stdout.replace("[", "").replace("]", "").replace("\n", "")
        return JSONResponse(content={"result": cleaned_output})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})


@app.post('/testFile/')
async def checking_file(filename: str = Form(...)):
    base_path = os.path.abspath(os.path.dirname(__file__))
    teacher_formula_path = os.path.join(base_path, 'testing', 'test_files', 'teacher_formula')
    input_variables_path = os.path.join(base_path, 'testing', 'test_files', 'input_variables')
    code_path = os.path.join(base_path, 'testing', 'test_files', filename)
    result_output = check_file(teacher_formula_path, input_variables_path, code_path)
    return JSONResponse(
        content={
            "formulas": result_output[0],
            "result": result_output[1],
            "execution_time": result_output[2],
            "code_length": result_output[3]
        }
    )


@app.post("/files")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}

# временно для демонстрации
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app.mount("/static", StaticFiles(directory="web/static"), name="static")
templates = Jinja2Templates(directory="web/templates")

@app.get("/file")
async def test_file(request: Request):
    return templates.TemplateResponse("testfile.html", {"request": request})

####

@app.post("/uploadFile")
async def create_upload_file(file: UploadFile):
    code_path = "testing/test_files/studentCode"
    with open(code_path, "wb") as f:
        f.write(file.file.read())
    return JSONResponse(
        content={"filename": "studentCode"}
    )


@app.post("/uploadFiles")
async def create_upload_files(files: list[UploadFile]):
    return {"filenames": [file.filename for file in files]}


@app.post("/executeUploadedFile")
async def execute_uploaded_file(file: UploadFile):
    try:
        testing_main_path = "../Testing/main.py"
        code_path = "testing/test_files/code.txt"
        with open(code_path, "wb") as f:
            f.write(file.file.read())
        result = subprocess.run(["python", testing_main_path], capture_output=True, text=True)
        cleaned_output = result.stdout.replace("[", "").replace("]", "").replace("\n", "")
        return JSONResponse(content={"result": cleaned_output})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})


@app.post("/executeUploadedFiles")
async def execute_uploaded_files(files: list[UploadFile]):
    try:
        testing_main_path = "testing/Formulas_analize_system/analise_formula.py"
        code_path = "testing/test_files/code.txt"
        formulas_techer_path = "testing/test_files/teacher_formula"
        input_variables_path = "testing/test_files/input_variables"
        with open(code_path, "wb") as f:
            f.write(files[0].file.read())
        with open(formulas_techer_path, "wb") as f:
            f.write(files[1].file.read())
        with open(input_variables_path, "wb") as f:
            f.write(files[2].file.read())
        result = subprocess.run(["python", testing_main_path], capture_output=True, text=True)
        cleaned_output = result.stdout.replace("[", "").replace("]", "").replace("\n", "")
        return JSONResponse(content={"result": cleaned_output})
    except Exception as e:
        return JSONResponse(content={"error": str(e)})
