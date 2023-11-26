from logging import INFO, basicConfig, getLogger

from flask import Flask, jsonify, make_response, render_template, request

app = Flask(__name__)

basicConfig(level=INFO)
logger = getLogger(__name__)


def get_count(image):
    # TODO: Send image to the model and return count
    return 123


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/process", methods=["POST"])
def process():
    try:
        image = request.files["image"]
        logger.info("Received request to process image - %s", image.filename)
        count = get_count(image)
        logger.info("Successfully processed image - Count = %d", count)
        response = make_response(jsonify({"count": str("{:03d}".format(count))}), 200)
        return response
    except Exception as e:
        logger.error("%s", e)
        response = make_response(jsonify({"error": "ERR"}), 500)
        return response


if __name__ == "__main__":
    app.run(debug=True)
