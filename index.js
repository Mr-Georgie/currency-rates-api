import Express from "express";
import request from "request";

//create an instance of express js
const app = Express();

// include support for json data as it is a rest api
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// the url for the exchange rate api
const uri = "https://api.exchangeratesapi.io/latest"


app.get("/api/rates", (req, res, next) => {
    
    // check if the base value is not given
    if (req.query.base == undefined){
        res.status(400).json({
            "results": {
                "error": "Please specify the base (home) rate"
            }
        })
    } // check if the base value is not given 
    else if (req.query.currency == undefined){
        res.status(400).json({
            "results": {
                "error": "Please specify the currency/currencies"
            }
        })
    }// if both value are given, assign then to the variables base and symbols respectively
    else {
        const base =  req.query.base;
        const symbols = req.query.currency;

        // create a query string of the uri, base and currency provided
        const queryurl = {
            url: uri + "?base=" + base.toUpperCase() + "&symbols=" + symbols.toUpperCase(),
            json: true
        }

        // send request to the exchange rate api
        request.get(queryurl, (err, response) => {
            if (err) {
                next(err) // Pass errors to Express.
            } else {
                const results = {"results": response.body}
                res.status(response.statusCode).json(results);
            }
        });
    }
    

});


//Handle 500
app.use(function(err, req, res, next){
    res.sendStatus(500);
    res.render('500');
});

// export the app variable to enable its usage by external script
export default app;

