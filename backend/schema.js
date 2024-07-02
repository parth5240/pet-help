const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
  name: String,
  email: String,
  address1: String,
  address2: String,
  contact_no: String,
  role: String,
  user_recommend: String,
  comment: String,
  timestamp: { type: Date, default: Date.now },
});

const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  number: String,
  timestamp: { type: Date, default: Date.now },
});

const donatePetSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  number: String,
  pet_type: String,
  pet_name: String,
  pet_color: String,
  pet_breed: String,
  file_upload: String,
  timestamp: { type: Date, default: Date.now },
});

const contactUsSchema = new mongoose.Schema({
  contact_message: String,
  contact_name: String,
  contact_email: String,
  timestamp: { type: Date, default: Date.now },
});

const donateMoneySchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  number: String,
  receipt_upload: String,
  timestamp: { type: Date, default: Date.now },
});
const adoptPetSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  
  number: String,
 
  timestamp: { type: Date, default: Date.now },
});

const SOS = mongoose.model("SOS", sosSchema);
const Volunteer = mongoose.model("Volunteer", volunteerSchema);
const DonatePet = mongoose.model("DonatePet", donatePetSchema);
const ContactUs = mongoose.model("ContactUs", contactUsSchema);
const DonateMoney = mongoose.model("DonateMoney", donateMoneySchema);
const AdoptPet = mongoose.model("AdoptPet", adoptPetSchema);
module.exports = {SOS, Volunteer, DonatePet, ContactUs, DonateMoney,AdoptPet};