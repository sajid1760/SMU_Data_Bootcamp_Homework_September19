from sqlalchemy import create_engine
import pandas as pd

class SQLHelper():
    
    def __init__(self, databasepath):
        self.database_path = databasepath
        self.connection_str = f"sqlite:///{self.database_path}"
        self.engine = create_engine(self.connection_str)

    def executeQuery(self, query):
        df = pd.read_sql(query, self.engine)
        return(df)
    
    def precipitation(self):
        query = f"""
                SELECT
                    date,
                    prcp
                FROM
                    measurement
                WHERE date > '2016-08-23'
                    AND date <= '2017-08-23'
                """
        return(self.executeQuery(query))

    def stations(self):
        query = f"""
                SELECT
                    station
                FROM
                    station
                """
        return(self.executeQuery(query))

    def tobs(self):
        query = f"""
                SELECT
                    m.date,
                    m.tobs
                FROM
                    measurement m
                WHERE
                    m.station = 'USC00519281'
                """
        return(self.executeQuery(query))
    
    def start(self,start_date):
        query = f"""
                SELECT
                    station,
                    MAX(tobs) as max_temperature,
                    MIN(tobs) as min_temperature,
                    AVG(tobs) as avg_temperature
                FROM
                    measurement
                WHERE
                    date >= '{start_date}'
                GROUP BY
                    station
                """
        return(self.executeQuery(query))

    def start_end(self,start_date, end_date):
        query = f"""
                SELECT
                    station,
                    MAX(tobs) as max_temperature,
                    MIN(tobs) as min_temperature,
                    AVG(tobs) as avg_temperature
                FROM
                    measurement
                WHERE
                    date >= '{start_date}'
                    AND date <= '{end_date}'
                GROUP BY
                    station
                """
        return(self.executeQuery(query))
                