from fastapi import FastAPI
from typing import Optional
import mysql.connector
import json
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:4200",
    "http://localhost",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Formation(BaseModel):
    id: int
    name: str
    type: str
    duration: int
    speciality: str


@app.get("/formation/")
def fetch_formations():
    mydb = mysql.connector.connect(host="localhost", user="root", password="root", database="forma")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * FROM formation")
    return mycursor.fetchall()


@app.get("/formation/{formaId}")
def fetch_formation(formId: str):
    mydb = mysql.connector.connect(host="localhost", user="root", password="root", database="forma")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * FROM formation where id={formId}")
    return mycursor.fetchone()


@app.post("/formation/add")
def add_formation(new_forma: Formation):
    mydb = mysql.connector.connect(host="localhost", user="root", password="root", database="forma")
    mycursor = mydb.cursor()
    mycursor.execute(
        f"INSERT INTO formation (nom, type, duree, specialite) VALUES ('{new_forma.name}', '{new_forma.type}',{new_forma.duration},'{new_forma.speciality}')")
    mydb.commit()
    return "formation Added"


@app.delete("/formation/delete/{formaId}")
def delete_formation(formaId: str):
    mydb = mysql.connector.connect(host="localhost", user="root", password="root", database="forma")
    mycursor = mydb.cursor()
    mycursor.execute(f"delete from formation where id = {formaId}")
    mydb.commit()
    return "formation deleted"


@app.put("/formation/update/{formaId}")
def update_formation(formaId: int, new_forma: Formation):
    mydb = mysql.connector.connect(host="localhost", user="root", password="root", database="forma")
    mycursor = mydb.cursor()
    mycursor.execute(
        f"update formation set nom='{new_forma.name}', type='{new_forma.type}', duree={new_forma.duration}, specialite='{new_forma.speciality}'  where id = {formaId}")
    mydb.commit()
    return "formation updated"
