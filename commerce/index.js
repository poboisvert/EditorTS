// Middleware Router
const express = require("express");

// PORT
const PORT = 3000;

// Activate Midlleware
const app = express();

app.get("/", (req, res) => {
  res.send(`
  <div>
  <form>
  </div>

  `);
});

app.listen(PORT, () => {
  console.log(`The app is active on ${PORT}`);
});
