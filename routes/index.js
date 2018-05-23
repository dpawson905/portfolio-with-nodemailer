var express = require("express");
var router = express.Router();
var request = require("request");
var nodemailer = require("nodemailer");
var nodemailerSendgrid = require("nodemailer-sendgrid");

// root Route
router.get("/", function(req, res) {
  res.render("index", { message: req.flash("success") });
});

// setup for flash messages
router.get("/success", function(req, res) {
  req.flash("success", "Your message has been sent... Thank You!");
  res.redirect("/#contact");
});

router.get("/error", function(req, res) {
  req.flash("error", "Something went wrong, I will look into it ASAP");
  res.redirect("/#contact");
});

router.post("/send", function(req, res) {
  const captcha = req.body["g-recaptcha-response"];
  if (!captcha) {
    console.log(req.body);
    req.flash("error", "Please select captcha");
    return res.redirect("/#contact");
  }
  // secret key
  var secretKey = process.env.CAPTCHA;
  // Verify URL
  var verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${
    req.connection.remoteAddress
  }`;
  // Make request to Verify URL
  request.get(verifyURL, (err, response, body) => {
    // if not successful
    if (body.success !== undefined && !body.success) {
      req.flash("error", "Captcha Failed");
      return res.redirect("/#contact");
    }
    const transport = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
      })
    );

    var mailOptions = {
      from: req.body.email,
      to: "darrells.webdesign@gmail.com",
      replyTo: req.body.email,
      subject: "Portfolio contact request from: " + req.body.name,
      text:
        "You have received an email from... Name: " +
        req.body.name +
        "  Email: " +
        req.body.email +
        " Message: " +
        req.body.message,
      html:
        "<h3>You have received an email from...</h3><ul><li>Name: " +
        req.body.name +
        " </li><li>Email: " +
        req.body.email +
        " </li></ul><p>Message: <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        req.body.message +
        " </p>"
    };

    transport.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err);console.log(err);
        res.redirect("/error");
      } else {
        res.redirect("/success");
      }
    });
  });
});
module.exports = router;
