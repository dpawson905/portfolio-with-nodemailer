var express    = require("express");
var router     = express.Router();
var request    = require("request");
var nodemailer = require("nodemailer");

// contact Route
router.get("/contact", function(req, res){
   res.render("message/contact"); 
});

router.post("/contact/send", function(req, res) {
    const captcha = req.body["g-recaptcha-response"];
    if (!captcha) {
      console.log(req.body);
      req.flash("error", "Please select captcha");
      return res.redirect("back");
    }
    // secret key
    var secretKey = process.env.CAPTCHA;
    // Verify URL
    var verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;
    // Make request to Verify URL
    request.get(verifyURL, (err, response, body) => {
      // if not successful
      if (body.success !== undefined && !body.success) {
        req.flash("error", "Captcha Failed");
        return res.redirect("back");
      }
        var smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
              user: 'darrells.webdesign@gmail.com',
              pass: process.env.GMAILPW
            }
        });
         
        var mailOptions = {
            from: 'Darrell Pawson <darrells.webdesign@gmail.com',
            to: 'darrells.webdesign@gmail.com',
            replyTo: req.body.email,
            subject: "Portfolio contact request from: " + req.body.name,
            text: 'You have received an email from... Name: '+ req.body.name + ' Phone: ' + req.body.phone + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
            html: '<h3>You have received an email from...</h3><ul><li>Name: ' + req.body.name + ' </li><li>Phone: ' + req.body.phone + ' </li><li>Email: ' + req.body.email + ' </li></ul><p>Message: <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + req.body.message + ' </p>'
        };
        
        smtpTransport.sendMail(mailOptions, function(err, info){
          if(err) {
            console.log(err)
            req.flash("error", "Something went wrong... Please try again later!");
            res.redirect("back");
          } else {
            req.flash("success", "Your email has been sent, we will respond within 24 hours.");
            res.redirect("/");
            
          }
        });
    });
});


module.exports = router;