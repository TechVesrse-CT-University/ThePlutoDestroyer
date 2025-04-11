import React, { useState } from "react";
import "../styles/PlantDiseaseDetection.css"; 
import axios from "axios";

const PlantDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePredict = async () => {
    if (!selectedImage) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      setPrediction("Error predicting disease.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plant-container">
      <main className="content recognition-tab">
        <h1>🌿 Plant Disease Detection System</h1>
        <p className="subtitle">Upload a leaf image to identify potential diseases</p>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <div className="preview-box">
            <h4>Selected Image:</h4>
            <img src={preview} alt="Selected" />
          </div>
        )}

        <button onClick={handlePredict} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>

        {prediction && <div className="result">Result: {prediction}</div>}
      </main>
    </div>
  );
};

export default PlantDiseaseDetection;
    