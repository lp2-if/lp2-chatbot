require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Building LP2 chatbot");
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server error", err);
    }

    console.log("server port : ", port);
});