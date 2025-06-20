const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary")

// Menambil data semua product
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDetailProduct = async (req, res) => {
    try {
        const { id } = req.paramsl // Access the dynamic 'id' from the URL

        // Fetch the product from the database using Mongoose
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

    // Return the found product as a response
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message:"Server error" });
    }
};

// Menambahkan product baru
exports.createProduct = async (req, res) => {
    try {
    // Mengunggah file ke Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    // Membuat produk dengan data dari body dan menambahkan thumbnail URL
    const product = new Prodyct({
        ...req.body, // Spread operator untuk menambahkan semua data dari body
        thumbnail: result?.secure_url, // Tambahkan URL dari Cloudinary
        cloudinaryId: result?.public_id,
        });
    // Menyimpan produk di database
    await product.save()
    
    
    res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });  
    }
};
    // Menghapus produk dari database
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        // Hapus file dari Cloudinary
        await cloudinary.uploader.destroy(product.cloudinaryId);

        // Hapus file dari MongoDB (Database)
        await productdeleteOne();

        res.status(200).json({ message:"Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete Product" })
    }
};
    // Mencari produk berdasarkan id
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Ambil id dari parameter

        // Cari produk berdasarkan ID
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        console.log('req.file', req.file);
        let result;
        if (req.file) {
            // Hapus gambar lama dari Cloudinary
            await cloudinary.uploader.destroy(product.cloudinaryId);

            // Unggah gambar baru ke Cloudinary
            result = await cloudinary.uploader.upload(req.file.path);
        }
        // Perbau data produk
        const updateProduct = {
            ...req.body, // Data lain dari request body
            thumbnail: result?.secure_url || product.thumbnail,
            cloudinaryId: result?.publid_id || product.cloudinaryId,
        };

        // Simpan pembaruan ke database
        product = await Product.findByIdAndUpdate(id, updateProduct, {new: true});

        // Kirim respon
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};