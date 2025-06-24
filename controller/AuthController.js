const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Sign In (Login)
exports.signIn = async (req, res) => {
  console.log('req', req.body);
  const { email, password } = req.body;

  // Validasi input kosong
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Cek apakah pengguna terdaftar
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not registered' });
    }

    // Cek password 
    if (user.password !== password) {
      return res.status(401).json({ message: 'Email and password did not match' });
    }

    // Berikan token dan informasi user
    res.json({
      __id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      token: generateToken(user._id),
    });

    // Jika terjadi sebuah server error
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
