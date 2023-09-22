from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

@app.route('/poweroff', methods=['POST'])
def poweroff():
    try:
        subprocess.run(["/usr/local/bin/power_control_panel.sh", "poweroff"], check=True)
        return jsonify({"status": "Success"}), 200
    except subprocess.CalledProcessError:
        return jsonify({"status": "Failure"}), 500

@app.route('/restart', methods=['POST'])
def restart():
    try:
        subprocess.run(["/usr/local/bin/power_control_panel.sh", "restart"], check=True)
        return jsonify({"status": "Success"}), 200
    except subprocess.CalledProcessError:
        return jsonify({"status": "Failure"}), 500

@app.route('/status', methods=['GET'])
def status():
    try:
        result = subprocess.run(["/usr/local/bin/power_control_panel.sh", "status"], capture_output=True, text=True)
        return jsonify({"status": result.stdout.strip()}), 200
    except subprocess.CalledProcessError:
        return jsonify({"status": "Failure"}), 500
