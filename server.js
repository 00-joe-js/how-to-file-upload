const express = require('express'); // CommonJS require.

const app = express(); // "pipeline" --> requests go through there, to each middleware

app.use(express.static(__dirname + "/front-end")); // 1st portion of pipeline

app.get("/", () => {
    res.sendFile(__dirname + "/front-end/index.html");
});

app.listen(7777, () => console.log(`
    The Express server process has begun listening on port 7777 ~
`));