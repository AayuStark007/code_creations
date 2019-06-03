/* eslint-disable no-console */
const express = require("express");
const app = express();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

/* 
Need: 
- Routing
- JSON Parsing
- POST with fetch()
*/

app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;
  response.json({
    status: "success",
    latitude: data.latitude,
    longitude: data.longitude
  });
});
