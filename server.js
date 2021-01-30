import app from "./index.js";

// specify the port
const port = 3000;

// listen for errors
app.listen(port, (err) => {
    if (err) throw err
    console.log("Server running on port: " + port)
})
