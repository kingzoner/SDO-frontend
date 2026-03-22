import uvicorn
import os

os.environ["DB_CON"] = "sqlite:///database/tst.db"
from main import app
uvicorn.run(app, host="127.0.0.1", port=8040)
