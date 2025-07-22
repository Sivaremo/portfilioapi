// const mongoose = require('mongoose');

// // Use a proper MongoDB connection string
// mongoose.connect('mongodb+srv://sivarajt2001:Gjl8iSwPoPj26ns2@portfiolo.gnwjgj6.mongodb.net/portfolioDB?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("✅ Connected to MongoDB Atlas");
// }).catch((err) => {
//   console.error("❌ MongoDB connection error:", err);
// });

// // Define schemas
// const resumeSchema = new mongoose.Schema({
//   summary: String,
//   phone: String,
//   email: String,
//   location: String,
// }, { timestamps: true });

// const educationSchema = new mongoose.Schema({
//   degree: String,
//   start_year: String,
//   end_year: String,
//   college: String,
//   description: String,
// }, { timestamps: true });

// const experienceSchema = new mongoose.Schema({
//   title: String,
//   start_date: String,
//   end_date: String,
//   company: String,
//   responsibilities: String,
// }, { timestamps: true });

// const portfolioSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   image: String,
//   link: String,
// }, { timestamps: true });

// // Define models
// const Resume = mongoose.model('Resume', resumeSchema);
// const Education = mongoose.model('Education', educationSchema);
// const Experience = mongoose.model('Experience', experienceSchema);
// const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// module.exports = { Resume, Education, Experience, Portfolio };
