from flask import Flask, jsonify, make_response, render_template, request

app = Flask(__name__)


def get_count(image):
    return 123


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process():
    try:
        image = request.files["image"]
        count = get_count(image)
        response = make_response(jsonify({"count": str("{:03d}".format(count))}), 200)
        return response
    except Exception as e:
        response = make_response(jsonify({"error": "ERR"}), 500)
        return response


if __name__ == "__main__":
    app.run(debug=True)
