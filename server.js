import app from "./index.js";

// specify the port
const port = 3000;

// listen for errors
app.listen(process.env.PORT || port, (err) => {
    if (err) throw err
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})
