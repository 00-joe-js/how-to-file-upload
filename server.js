const express = require('express');

const app = express();

app.use(express.static(__dirname + "/front-end"));

app.get("/", () => {
    res.sendFile(__dirname + "/front-end/index.html");
});

app.listen(7777, () => console.log(`
    The Express server process has begun listening on port 7777 ~
`));