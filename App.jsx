import { useState } from "react";

export default function App() {
  const [rawData, setRawData] = useState("");
  const [prediction, setPrediction] = useState(null);

  const predict = () => {
    const rows = rawData.split("\n").map(r => r.trim()).filter(Boolean);
    const colors = {};
    const numbers = {};

    rows.forEach(row => {
      const parts = row.split(/[, \t]+/);
      const num = parts[2];
      const color = parts[3]?.toLowerCase();

      if (color) colors[color] = (colors[color] || 0) + 1;
      if (num) numbers[num] = (numbers[num] || 0) + 1;
    });

    const topColor = Object.entries(colors).sort((a,b)=>b[1]-a[1])[0]?.[0];
    const topNumber = Object.entries(numbers).sort((a,b)=>b[1]-a[1])[0]?.[0];

    setPrediction({ color: topColor, number: topNumber });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Simple Prediction Web App</h2>
      <p>Paste your past records (CSV style): period,price,number,color per line.</p>

      <textarea
        style={{ width: "100%", height: "150px" }}
        placeholder="20260128126,37941,1,green"
        value={rawData}
        onChange={e => setRawData(e.target.value)}
      />

      <br/><br/>
      <button onClick={predict}>Predict Next</button>

      {prediction && (
        <div style={{ marginTop: "20px" }}>
          <h3>Prediction:</h3>
          <p><b>Most likely color:</b> {prediction.color}</p>
          <p><b>Most likely number:</b> {prediction.number}</p>
          <small>Method: simple frequency analysis.</small>
        </div>
      )}
    </div>
  );
}
