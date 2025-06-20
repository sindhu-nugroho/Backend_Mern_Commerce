const cloudinary = require('../config/cloudinary');
const File = require('../models/File')

// Upload file menggunakan ke Cloudinary
exports.uploadFile = async (req, res) => {
    try {
        // Mengunggah file ke Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        // console.log('result', result)

        // Menyimpan informasi file ke database MongoDB
        const file = new File({
            name: req.file.originalname,
            url: result.secure_url,
            cloudinaryId: result.public_id,
        });
        await file.save();
            req.status(201).json(file);
        
    // Output jika file gagal di upload
    
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'File upload failed' });
    }
};