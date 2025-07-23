// const mongoose = require('mongoose');

// // Connect to MongoDB (MongoDB Atlas in this case)
// mongoose.connect('mongodb+srv://sivarajt2001:Gjl8iSwPoPj26ns2@portfiolo.gnwjgj6.mongodb.net/portfolioDB?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Resume model
// const Resume = mongoose.model("Resume", new mongoose.Schema({
//     summary: String,
//     phone: String,
//     email: String,
//     location: String
// }));

// // Education model
// const Education = mongoose.model("Education", new mongoose.Schema({
//     degree: String,
//     start_year: Number,
//     end_year: Number,
//     college: String,
//     description: String
// }));

// // Experience model
// const Experience = mongoose.model("Experience", new mongoose.Schema({
//     title: String,
//     start_date: Date,
//     end_date: Date,
//     company: String,
//     responsibilities: String
// }));

// // Portfolio model
// const Portfolio = mongoose.model("Portfolio", new mongoose.Schema({
//     title: String,
//     description: String,
//     image: String,
//     link: String
// }));

// module.exports = { Resume, Education, Experience, Portfolio };
