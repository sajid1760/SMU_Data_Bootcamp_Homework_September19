from flask import Flask, jsonify
from SQLHelper import SQLHelper
from sqlalchemy import create_engine
import pandas as pd

databasepath = "Resources/hawaii.sqlite"
# connection_str = f"sqlite:///{databasepath}"
# engine = create_engine(connection_str)

app = Flask(__name__)
sqlHelper = SQLHelper(databasepath)


@app.route("/")
def welcome():
    return (
        f"""
          Welcome to the weather API!"  <br>
          Please select one of the following paths:  <br>
            1.  /api/v1.0/precipitation  <br>
            2.  /api/v1.0/stations      <br>
            3.  /api/v1.0/tobs          <br>
            4.  /api/v1.0/[put start date here YYYY-MM-DD]      <br>
            5.  /api/v1.0/[put start date here YYYY-MM-DD]/[put end date here YYYY-MM-DD]
        """
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    df = sqlHelper.precipitation()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/stations")
def stations():
    df = sqlHelper.stations()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/tobs")
def tobs():
    df = sqlHelper.tobs()
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/<start>")
def start(start):
    df = sqlHelper.start(start)
    data = df.to_dict(orient="records")
    return(jsonify(data))

@app.route("/api/v1.0/<start>/<end>")
def start_end(start, end):
    df = sqlHelper.start_end(start, end)
    data = df.to_dict(orient="records")
    return(jsonify(data))

if __name__ == "__main__":
    app.run(debug=True)
