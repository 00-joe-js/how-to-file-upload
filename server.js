const fs = require("fs");
const express = require('express'); // CommonJS require.

const app = express(); // "pipeline" --> requests go through there, to each middleware

app.use((req, res, next) => {
    console.log(req.url);
    next(); // I will get "stuck" here without calling this.
});

app.use(express.static(__dirname + "/front-end"));
app.use("/files", express.static(__dirname + "/uploadedFiles"));

/*
    1. Sending the base64 string up to the server, decoding it. (modern)
    2. Multi-part form data, sending the data through a HTTP mechanism. (years of exp)
*/
app.get("/", () => {
    res.sendFile(__dirname + "/front-end/index.html");
});

app.get("/users", (req, res) => {
    res.send([{ id: 1, name: "Joe" }]);
});

app.use(express.json({ limit: "200mb" })); // makes req.body happen
app.post("/base64-file-upload", (req, res, next) => {
    const stringRepOfMyImage = req.body.fileData.split(",")[1];
    const rawData = Buffer.from(stringRepOfMyImage, "base64"); // *
    fs.writeFile(
        __dirname + `/uploadedFiles/${req.body.meta.name}`,
        rawData,
        (err) => {
            if (err) {
                next(err);
                return;
            }
            res.send("Success!");
        });
});

app.listen(7777, () => console.log(`
    The Express server process has begun listening on port 7777 ~
`));