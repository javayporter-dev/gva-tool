const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/generate', (req, res) => {
  const dealerName = req.body.dealerName.trim();
  const lotID = req.body.lotID.trim();
  const dealerPhone = req.body.dealerPhone.trim();
  const assetFolder = req.body.assetFolder.trim();

  const transportName = `${dealerName} GVA Local Transport`;
  const directory = `/irv/accounts/${assetFolder}/google_vehicle_ads/daily_export`;
  const fileUrl = `https://assets.interactcp.com/${assetFolder}/google_vehicle_ads/daily_export/gva.tsv`;
  const lotParam = `${lotID}:${dealerPhone}`;

  res.send(`
    <h2>Generated Values</h2>
    <p><strong>Transport Name:</strong> ${transportName}</p>
    <p><strong>Directory:</strong> ${directory}</p>
    <p><strong>File URL:</strong> ${fileUrl}</p>
    <p><strong>Lot Parameter:</strong> ${lotParam}</p>
    <br>
    <a href="/">Generate Another</a>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});