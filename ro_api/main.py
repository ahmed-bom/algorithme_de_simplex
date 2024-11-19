import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from simplexe import simplexe


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class tableModel(BaseModel):
  maze: list [list[int]]

@app.post("/solve")
def read_root(table:tableModel):
  t = np.array(table.maze)
  tables , pivots =simplexe(t)
  return {"pivots":pivots,"tables":tables}

if __name__ == "__main__":
    uvicorn.run("main:app", host= "127.0.0.1",port= 8080,reload= True)
