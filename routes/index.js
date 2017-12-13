var express    = require("express");
var router     = express.Router();


// root Route
router.get("/", function(req, res){
    res.render("index");
});

module.exports = router;