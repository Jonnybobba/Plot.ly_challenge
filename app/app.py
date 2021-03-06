# import necessary libraries
from flask import (
    Flask,
    render_template)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug = True)
