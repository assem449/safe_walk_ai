from flask import Flask, request, jsonify
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load data and train model
file_path = 'assult_data.csv'
gdf = pd.read_csv(file_path)
geometry = [Point(xy) for xy in zip(gdf['LONG_WGS84'], gdf['LAT_WGS84'])]
gdf = gpd.GeoDataFrame(gdf, geometry=geometry)

X = gdf[['LONG_WGS84', 'LAT_WGS84']]
y = (gdf['OFFENCE'] == 'Assault').astype(int)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = LogisticRegression()
model.fit(X_train_scaled, y_train)

def predict_danger(longitude, latitude):
    X_pred = scaler.transform([[longitude, latitude]])
    result = model.predict(X_pred)
    if result[0] == 1:
        message = "This area is not safe. Consider taking a different route."
    else:
        message = "This area is safe! Enjoy your walk."
    
    return {'message' : message}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    longitude = float(data['longitude'])
    latitude = float(data['latitude'])

    result = predict_danger(longitude, latitude)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
