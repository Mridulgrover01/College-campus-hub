const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Load users.json
let users = JSON.parse(fs.readFileSync("users.json"));

// Home route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Login API
app.post("/login", (req, res) => {
    const { registration, password } = req.body;

    const user = users.find(
        u => u.registration === registration && u.password === password
    );

    if (!user) {
        return res.status(400).json({ message: "Invalid registration or password!" });
    }

    res.json({ message: "Login successful!", user });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
