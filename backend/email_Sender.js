const nodemailer = require("nodemailer");

// Create a transporter with Ethereal credentials

// Export the sendMail function
sendMailToSos = async function () {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "michelle.hand53@ethereal.email",
      pass: "zfDW1XVAA9FzTSmaes",
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: "panchalyagnik2411@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
    return info; // Return the info object if needed
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Throw error to handle it elsewhere if needed
  }
};

sendGmail = async function (email, subject, text, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "editorsbytes2411@gmail.com",
      pass: "xnlgbtchtliajikz",
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Pet-Help Update" <no-reply@pet-help.in>',
      to: email,
      subject: subject,
      text: text,
      html: html,
       // Set the "Reply-To" email address
    });

    console.log("Message sent: %s", info.messageId);
    return info; // Return the info object if needed
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    throw error; // Throw error to handle it elsewhere if needed
  }
};


module.exports;
