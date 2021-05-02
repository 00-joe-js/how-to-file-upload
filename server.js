const fs = require("fs");
const express = require('express'); // CommonJS require.

const app = express(); // "pipeline" --> requests go through there, to each middleware

app.use((req, res, next) => {
    console.log(req.url);
    next(); // I will get "stuck" here without calling this.
});

app.use(express.static(__dirname + "/front-end"));

/*
    1. Sending the base64 string up to the server, decoding it. (modern)
    2. Multi-part form data, sending the data through a HTTP mechanism. (years of exp)
*/
app.get("/", () => {
    res.sendFile(__dirname + "/front-end/index.html");
});

app.use(express.json({ limit: "200mb" })); // makes req.body happen
app.post("/base64-file-upload", (req, res) => {
    const stringRepOfMyImage = req.body.fileData.split(",")[1];
    const rawData = Buffer.from(stringRepOfMyImage, "base64");
    console.log(rawData); // instance of "Buffer"--how Node.js represents raw data
    fs.writeFile(__dirname + `/uploadedFiles/${Date.now()}.png`, rawData, () => {});
});

app.listen(7777, () => console.log(`
    The Express server process has begun listening on port 7777 ~
`));