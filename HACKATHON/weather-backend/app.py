from flask import Flask, request, jsonify
import requests
import pandas as pd
from twilio.rest import Client
from dotenv import load_dotenv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

load_dotenv()

# Load crop data
crop_data = pd.read_csv("crop_data.csv")

# Twilio setup
twilio_client = Client(
    os.getenv('TWILIO_ACCOUNT_SID'),
    os.getenv('TWILIO_AUTH_TOKEN')
)

@app.route("/get_weather", methods=["POST"])
def get_weather():
    try:
        data = request.json
        lat, lon, crop = data["lat"], data["lon"], data["crop"]
        phone = data.get("phone")

        crop_info = crop_data[crop_data["crop"].str.lower() == crop.lower()]
        if crop_info.empty:
            return jsonify({"error": f"Crop '{crop}' not found in database"}), 404

        crop_info = crop_info.iloc[0]
        min_temp = float(crop_info["min_temp"])
        max_temp = float(crop_info["max_temp"])
        min_humidity = float(crop_info.get("min_humidity", 0))
        max_rain = float(crop_info["max_rain"])

        # Get forecast for next 3 days
        api_key = os.getenv("WEATHER_API_KEY")
        url = f"http://api.weatherapi.com/v1/forecast.json?key={api_key}&q={lat},{lon}&days=3"
        res = requests.get(url)
        res.raise_for_status()
        forecast_data = res.json()

        forecast_days = forecast_data["forecast"]["forecastday"]

        total_temp = 0
        total_rain = 0
        total_humidity = 0
        count = 0

        for day in forecast_days:
            for hour in day["hour"]:
                total_temp += hour["temp_c"]
                total_humidity += hour["humidity"]
                total_rain += hour.get("precip_mm", 0)
                count += 1

        avg_temp = round(total_temp / count, 1)
        avg_humidity = round(total_humidity / count, 1)
        total_rain = round(total_rain, 1)

        alerts = []

        if avg_temp < min_temp:
            alerts.append("temperature_too_low")
        elif avg_temp > max_temp:
            alerts.append("temperature_too_high")

        if avg_humidity < min_humidity:
            alerts.append("humidity_too_low")

        if total_rain > max_rain:
            alerts.append("rain_too_high")

        # Send SMS if alerts and phone provided
        if alerts and phone:
            alert_messages = {
                "temperature_too_low": f"❄️ Cold weather warning! Avg temp: {avg_temp}°C.",
                "temperature_too_high": f"🔥 Hot weather alert! Avg temp: {avg_temp}°C.",
                "humidity_too_low": f"💨 Low humidity alert! Avg: {avg_humidity}%.",
                "rain_too_high": f"🌧️ Heavy rain expected! Rainfall: {total_rain}mm."
            }
            body = "\n".join(alert_messages[alert] for alert in alerts)
            twilio_client.messages.create(
                body=body,
                from_=os.getenv("TWILIO_PHONE_NUMBER"),
                to=phone
            )

        return jsonify({
            "temperature": avg_temp,
            "humidity": avg_humidity,
            "rain": total_rain,
            "alerts": alerts,
            "debug": {
                "avg_temp_72h": avg_temp,
                "avg_humidity_72h": avg_humidity,
                "total_rain_72h": total_rain,
                "thresholds": {
                    "min_temp": min_temp,
                    "max_temp": max_temp,
                    "min_humidity": min_humidity,
                    "max_rain": max_rain
                }
            }
        })

    except requests.exceptions.HTTPError as http_err:
        return jsonify({"error": f"WeatherAPI error: {str(http_err)}"}), 502
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
