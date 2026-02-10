import os
from flask import Flask, render_template
from flask_cors import CORS
from controllers.routes import api
from db import criar_tabelas
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)


app.config["INTERNAL_API_TOKEN"] = os.getenv("INTERNAL_API_TOKEN")

print("TOKEN SISTEMA:", app.config["INTERNAL_API_TOKEN"])

app.register_blueprint(api)

@app.route("/")
def home():
    return render_template("index.html")

criar_tabelas()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host = "0.0.0.0",port=port)