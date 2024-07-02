const { sendMailToSos } = require("./email_Sender.js");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require('multer');
const app = express();
const port = 8080;
const path = require('path');

const mongoURI = "mongodb://localhost:27017/PetHelpDb"; // Replace with your actual MongoDB URI

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB database.");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });



// Set the path to the views folder
app.use(express.static(path.join(__dirname, '..', 'html')));

// Serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const { SOS, Volunteer, DonatePet, ContactUs, DonateMoney, AdoptPet } = require("./schema.js");
app.post("/sos", async (req, res) => {
  let {
    name,
    email,
    address1,
    address2,
    contact_no,
    user_recommend,
    comment,
  } = req.body;

  const sosRequest = new SOS({
    name,
    email,
    address1,
    address2,
    contact_no,
    user_recommend,
    comment,
  });
  await sosRequest.save();
  console.log("SOS Request saved successfully.");

  let template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <style>
    /* Reset styles */
    body, h1, h2, h3, h4, p, ul, ol, li, table, tr, th, td {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    /* Table data styles */
    td {
      vertical-align: top;
    }

    /* Footer styles */
    footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Email Response</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td>Address 1</td>
        <td>${address1}</td>
      </tr>
      <tr>
        <td>Address 2</td>
        <td>${address2}</td>
      </tr>
      <tr>
        <td>Contact No</td>
        <td>${contact_no}</td>
      </tr>
    
      <tr>
        <td>User Recommend</td>
        <td>${user_recommend}</td>
      </tr>
      <tr>
        <td>Comment</td>
        <td>${comment}</td>
      </tr>
    </table>
    <footer>
    "Expect a doctor to arrive at your door for personalized pet care within the hour." 

      This is an automated email. Please do not reply.
    </footer>
  </div>
</body>
</html>
`;
  // Send email
  try {
    await sendGmail(
      email,
      "SOS Request Received",
      "We Received Your SOS Request.",
      template
    );
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle email sending error if needed
  }

  // Send response with alert message
  const alert = `
    <script>
      alert("sos request accepted, thank you for trusting us ${name}!");
    </script>
  `;
  res.send(alert);
});

app.post("/volunteer", async (req, res) => {
  let { name, email, address, city, state, country, number } = req.body;
  const volunteerReq = new Volunteer({
    name,
    email,
    address,
    city,
    state,
    country,
    number
  });
  await volunteerReq.save();
  console.log("volunteer Request saved successfully.");
  let template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Request For Become Volunteer</title>
  <style>
    /* Reset styles */
    body, h1, h2, h3, h4, p, ul, ol, li, table, tr, th, td {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    /* Table data styles */
    td {
      vertical-align: top;
    }

    /* Footer styles */
    footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>We Received Your Request For Become Volunteer</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td>Address </td>
        <td>${address}</td>
      </tr>
      <tr>
        <td>city</td>
        <td>${city}</td>
      </tr>
      <tr>
        <td>Contact No</td>
        <td>${number}</td>
      </tr>
      
    </table>
   
    <footer>
    We will review your profile and get back to you when we need volunteer.<br>
    This is an automated email. Please do not reply.
    </footer>
  </div>
</body>
</html>
`;

  // Send email
  try {
    await sendGmail(
      email,
      "Volunteer Request Received",
      "We Received Your Request For Become Volunteer.",
      template
    );
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle email sending error if needed
  }

  // Send response with alert message
  const alert = `
    <script>
      alert("We Received Your Request For Become Volunteer, ${name}!");
      window.location.href = "";
    </script>
  `;
  res.send(alert);
});



const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Create Photo model from schema
const Photo = mongoose.model('PetPhoto', photoSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define filename for uploaded files
    cb(null, '' + file.originalname);
  }
});

// Create multer instance with defined storage configuration
const upload = multer({ storage: storage });


app.post("/donatePet", upload.single('file_upload'), async (req, res) => {
  try {
    // Extract form data from request body
    let {
      name,
      email,
      address,
      city,
      state,
      country,
      number,
      pet_type,
      pet_name,
      pet_color,
      pet_breed
    } = req.body;
    //  fileName=req.file.filename;
    // Create a new instance of DonatePet model with form data
    const donatePetReq = new DonatePet({
      name,
      email,
      address,
      city,
      state,
      country,
      number,
      pet_type,
      pet_name,
      pet_color,
      pet_breed,
      file_upload: req.file.filename,
    });

    // Save the DonatePet instance to the database
    await donatePetReq.save();
    console.log("Pet donated successfully.");

    const newPhoto = new Photo({
      name: req.file.filename
    });
    // Save the Photo instance to the database
    await newPhoto.save();
    console.log('Photo uploaded successfully:', req.file.filename);

    let template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Request For Become Volunteer</title>
  <style>
    /* Reset styles */
    body, h1, h2, h3, h4, p, ul, ol, li, table, tr, th, td {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    /* Table data styles */
    td {
      vertical-align: top;
    }

    /* Footer styles */
    footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>We Received Your Request For pet Donation</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td>Contact No</td>
        <td>${number}</td>
      </tr>
      </tr>
      <tr>
        <td>Pet Name</td>
        <td>${pet_name}</td>
      </tr>
      <tr>
        <td>Pet Type</td>
        <td>${pet_type}</td>
      </tr>
      <tr>
        <td>Pet Color</td>
        <td>${pet_color}</td>
      </tr>
      <tr>
        <td>Pet Breed</td>
        <td>${pet_breed}</td>
      </tr>
      
    </table>
   
    <footer>
    "We are expressing our intent to donate our cherished pet to your esteemed NGO. We kindly request your assistance in ensuring their well-being and finding them a loving forever home. Your organization's dedication to animal welfare gives us confidence that our beloved companion will be cared for with compassion and expertise."
    </footer>
  </div>
</body>
</html>
`;


    // Check if files are uploaded

    // Send email
    try {
      await sendGmail(
        email,
        "Donation Request Received",
        "We received your request and get back to you as soon as possible.",
        template
      );
      console.log("Email sent successfully.");
    } catch (error) {
      console.log("Error sending email:", error);
      // Handle email sending error if needed
    }

    // Create a new instance of Photo model for each uploaded file



    const alert = `
    <script>
      alert("We Received Your Request For pet donation, ${name}!");
    </script>
    `;

    // Send success response to the client
    res.send(alert);
  } catch (error) {
    // Handle errors
    console.error("Error handling pet donation request:", error);
    res.status(500).send("Internal server error.");
  }
  // Send response with alert message

  // res.send("alert");
});

app.post("/contact_us", async (req, res) => {
  let { contact_message,
    contact_name,
    contact_email } = req.body;
  const ContactUsReq = new ContactUs({
    contact_message,
    contact_name,
    contact_email
  });
  await ContactUsReq.save();
  console.log("your message will received");

  let template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <style>
    /* Reset styles */
    body, h1, h2, h3, h4, p, ul, ol, li, table, tr, th, td {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    /* Table data styles */
    td {
      vertical-align: top;
    }

    /* Footer styles */
    footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>We Received Your Issue</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${contact_name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${contact_email}</td>
      </tr>
      <tr>
        <td>Message</td>
        <td>${contact_message}</td>
      </tr>
    </table>
    <footer>
    We received your issues and try to fix it as soon as possible.<br>
    This is an automated email. Please do not reply.
    </footer>
  </div>
</body>
</html>
`;

  // Send email
  try {
    await sendGmail(
      contact_email,
      "Complain Received",
      "We received your issues and try to fix it as soon as possible.",
      template
    );
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    // Handle email sending error if needed
  }

  // Send response with alert message
  const alert = `
    <script>
      alert("We Received Your Issue, ${contact_name}!");
    </script>
  `;
  res.send(alert);
});



const receiptPhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const ReceiptPhoto = mongoose.model('ReceiptPhoto', receiptPhotoSchema);

const storageReceipt = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'receiptphoto/');
  },
  filename: function (req, file, cb) {
    cb(null, '' + file.originalname);
  }
});

const uploadReceipt = multer({ storage: storageReceipt });


app.post("/donate_money", uploadReceipt.single('receipt_upload'), async (req, res) => {
  try {
    let { name, email, address, city, state, country, number } = req.body;
    const donateMoneyReq = new DonateMoney({
      name,
      email,
      address,
      city,
      state,
      country,
      number,
      receipt_upload: req.file.filename,
    });
    await donateMoneyReq.save();
    console.log("Money donated successfully");

    const newReceiptPhoto = new ReceiptPhoto({
      name: req.file.filename
    });
    await newReceiptPhoto.save();
    console.log('Receipt photo uploaded successfully:', req.file.filename);



    let template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <style>
    /* Reset styles */
    body, h1, h2, h3, h4, p, ul, ol, li, table, tr, th, td {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    /* Table data styles */
    td {
      vertical-align: top;
    }

    /* Footer styles */
    footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Thank you For Donation</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td>Number</td>
        <td>${number}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>${address}</td>
      </tr>
      <tr>
        <td>City</td>
        <td>${city}</td>
      </tr>
      <tr>
        <td>State</td>
        <td>${state}</td>
      </tr>
      <tr>
        <td>Country</td>
        <td>${country}</td>
      </tr>
    </table>
    <footer>
    <br>
    This is an automated email. Please do not reply.
    </footer>
  </div>
</body>
</html>
`;

    // Send email
    try {
      await sendGmail(
        email,
        "Thank you For Donation",
        "Thank you For Donation",
        template
      );
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle email sending error if needed
    }

    const alert = `
    <script>
      alert("Thank you, ${name}!");
    </script>
  `;
    res.send(alert);

  } catch (error) {
    console.error("Error handling donation request:", error);
    res.status(500).send("Internal server error.");
  }

});


app.post("/adoptpet", async (req, res) => {
  try {
    let { name, email, address, city, number } = req.body;
    const adoptPetReq = new AdoptPet({
      name,
      email,
      address,
      city,

      number,

    });
    await adoptPetReq.save();
    console.log("Pet Adoption successfully");





    let template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
  <style>
    /* Reset styles */
    body, h1, h2, h3, h4, p, ul, ol, li, table, tr, th, td {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    /* Container styles */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Header styles */
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    /* Table styles */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
      text-align: left;
    }

    /* Table data styles */
    td {
      vertical-align: top;
    }

    /* Footer styles */
    footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Thank you For Adopt Pet</h2>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>${email}</td>
      </tr>
      <tr>
        <td>Number</td>
        <td>${number}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>${address}</td>
      </tr>
      <tr>
        <td>City</td>
        <td>${city}</td>
      </tr>
      
    </table>
    <footer>
    <br>
    This is an automated email. Please do not reply.
    </footer>
  </div>
</body>
</html>
`;

    // Send email
    try {
      await sendGmail(
        email,
        "Thank you For Adopt Pet",
        "Thank you For Adopt Pet",
        template
      );
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle email sending error if needed
    }

    const alert = `
    <script>
      alert("Thank you, ${name}!");
    </script>
  `;
    res.send(alert);

  } catch (error) {
    console.error("Error handling donation request:", error);
    res.status(500).send("Internal server error.");
  }

});
