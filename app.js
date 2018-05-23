var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    flash          = require("connect-flash"),
    cookieParser   = require("cookie-parser"),
    helmet         = require("helmet"),
    session        = require("express-session");
    
// config dotenv
require("dotenv").load();

var port = process.env.PORT || 3000;

// Requiring routes    
var indexRoute    = require("./routes/index");
    
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(helmet());

// use this to remove .ejs from res.render()
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/projects"));
app.use(express.static(__dirname + "/node_modules"));
app.use(flash());
app.use(function(req, res, next) {
   res.locals.messages = require("express-messages")(req,res);
   next();
});
app.use(cookieParser());

app.use(session({
    secret: "I like Ch33s3c@ke F@ct0rY It is the BEst!",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoute);


// this is required for the server to init
app.listen(port, process.env.IP, function() {
    console.log("Web app has started!");
});