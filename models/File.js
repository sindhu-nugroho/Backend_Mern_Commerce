// Memanggil dependensi Mongoose
const mongoose = require('mongoose');
// Skema penyimpanan data image/cloudinary ke server
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('File', fileSchema);
