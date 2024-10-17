const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined');
  process.exit(1); 
}

// Register user
exports.registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;  // Accept role in request body

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user with the provided role or default to 'user'
        const user = await User.create({
            username,
            email,
            password,  
            role: role || 'user'  
        });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            user,
            token
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user!' });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'User not found' });
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });
  
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(500).json({ error: 'Login failed!' });
    }
};  