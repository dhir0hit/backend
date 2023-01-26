var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const sendMail = (type, name, mailId, subject, body) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: "support@dhir0hit.com",
      pass: "rohitdhir2002",
    },
  });

  if (type.toLowerCase() == "hiring") {
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: '"Rohit Dhir" <support@dhir0hit.com>',
      to: mailId,
      subject: "Hiring - reply",
      text: `
Thanks for Connecting with me regarding "Hiring" Purposes.
Subject
Subject written here

Body

Body
Rohit Kumar Dhir
Full Stack Developer
dhir0hit.com
    `,
      html: `    
<h1 style="font-family: sans-serif; font-weight: 500; padding: 0; margin: 0;">Thanks for Connecting with me regarding &quot;Hiring&quot; Purposes.</h1>
<div>
  <div style="margin-block: 0.5rem;">
    <h2 style="font-family: sans-serif; font-weight: 500; margin: 0;">Subject</h2>
    <h2 data-darkreader-inline-bgcolor="" style='font-family: "Open Sans", sans-serif; font-weight: 500; font-size: 1.3rem; margin: 0px; background-color: rgba(0, 0, 0, 0.3); padding-block: 0.2rem; padding-inline: 0.5rem; --darkreader-inline-bgcolor: rgba(0, 0, 0, 0.3);'>${subject}</h2>
    <br>
    <h2 style="font-family: sans-serif; font-weight: 500; margin: 0;">Body</h2>
    <p data-darkreader-inline-bgcolor="" style='font-family: "Open Sans", sans-serif; font-weight: 500; font-size: 1rem; margin: 0px; background-color: rgba(0, 0, 0, 0.3); padding-block: 0.2rem; padding-inline: 0.5rem; --darkreader-inline-bgcolor: rgba(0, 0, 0, 0.3);'>${body}</p>
  </div>
<h4 style="margin:0;font-family: sans-serif; font-weight: 500;">Please do not reply to this mail,</h4>
<h4 style="margin:0;font-family: sans-serif; font-weight: 500;">this is auto-generated email.</h4>
</div>
<div style="padding: 0.2rem;">
  <img style="width: 300px;" src="https://user-images.githubusercontent.com/91639870/214675161-1e437f91-6ae4-4474-b45b-e68cef573521.svg" alt="Logo">
  <h3 style="font-weight: 500; font-family: monospace; margin: 0;">Rohit Kumar Dhir</h3>
  <h3 style="font-weight: 500; font-family: monospace; margin: 0;">Full Stack Developer</h3>
  <a href="https://dhir0hit.com" style="font-weight: 500; font-family: monospace;">dhir0hit.com</a>
</div>
    `,
    });

    return info.messageId;
  } else {
    // send mail with defined transport object
    let info = transporter.sendMail({
      from: '"Rohit Dhir" <support@dhir0hit.com>',
      to: mailId,
      subject: `${subject} - reply`,
      text: `
Thanks for Connecting with me.
Subject
${subject}

Body
${body}

Please do no reply to this mail,
This is auto-generated email.

Rohit Kumar Dhir
Full Stack Developer
dhir0hit.com
    `,
      html: `    
<h1 style="font-family: sans-serif; font-weight: 500; padding: 0; margin: 0;">Thanks for Connecting with me, ${name}</h1>
<div>
  <div style="margin-block: 0.5rem;">
    <h2 style="font-family: sans-serif; font-weight: 500; margin: 0;">Subject</h2>
    <h2 data-darkreader-inline-bgcolor="" style='font-family: "Open Sans", sans-serif; font-weight: 500; font-size: 1.3rem; margin: 0px; background-color: rgba(0, 0, 0, 0.3); padding-block: 0.2rem; padding-inline: 0.5rem; --darkreader-inline-bgcolor: rgba(0, 0, 0, 0.3);'>${subject}</h2>
    <br>
    <h2 style="font-family: sans-serif; font-weight: 500; margin: 0;">Body</h2>
    <p data-darkreader-inline-bgcolor="" style='font-family: "Open Sans", sans-serif; font-weight: 500; font-size: 1rem; margin: 0px; background-color: rgba(0, 0, 0, 0.3); padding-block: 0.2rem; padding-inline: 0.5rem; --darkreader-inline-bgcolor: rgba(0, 0, 0, 0.3);'>${body}</p>
  </div>
<h4 style="margin:0;font-family: sans-serif; font-weight: 500;">Please do not reply to this mail,</h4>
<h4 style="margin:0;font-family: sans-serif; font-weight: 500;">this is auto-generated email.</h4>
</div>
<div style="padding: 0.2rem;">
  <img style="width: 300px;" src="https://user-images.githubusercontent.com/91639870/214675161-1e437f91-6ae4-4474-b45b-e68cef573521.svg" alt="Logo">
  <h3 style="font-weight: 500; font-family: monospace; margin: 0;">Rohit Kumar Dhir</h3>
  <h3 style="font-weight: 500; font-family: monospace; margin: 0;">Full Stack Developer</h3>
  <a href="https://dhir0hit.com" style="font-weight: 500; font-family: monospace;">dhir0hit.com</a>
</div>
`,
    });
    return info.messageId;
  }
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sendmail", function (req, res, next) {
  // sendMail("rohit@dhir0hit.com", "nothing", "body body body");
  let mailType = req.body.type;
  let mailName = req.body.name;
  let mailId = req.body.mail;
  let mailSubject = req.body.subject;
  let mailBody = req.body.body;

  console.log(mailId);
  if (mailType !== "" && mailId !== "" && mailBody !== "") {
    console.log("Everything filled 47");
    /*
     * If purpose of contact is not hiring and there is no subject ask for it
     * */
    console.log(mailType.toLowerCase() !== "hiring" && mailSubject === "");
    if (mailType.toLowerCase() !== "hiring" && mailSubject === "") {
      res.send({
        state: 0,
        log: "Please Enter Appropriate Subject",
      });
    } else {
      /*
       * If everything is filled
       * */

      /*
       * checking if there is any error with mail sending
       * */
      console.log("sending");
      console.log(sendMail(mailType, mailName, mailId, mailSubject, mailBody));
      res.send({
        state: 1,
        log: "message sent",
      });
    }
  } else {
    console.log("not everything filled 73");
    /*
     * If something is missing ether type or mailID or MailBody
     * */
    let log = "Please enter ";
    if (mailType === "" || mailType.toLowerCase() === "purpose of contact") {
      log += "Purpose of Contact, ";
    }
    if (mailId === "") {
      log += "Email Address, ";
    }
    if (mailBody === "") {
      log += "Body, ";
    }

    log += "and try again";
    res.send({
      state: 0,
      log: log,
    });
  }
});

module.exports = router;
