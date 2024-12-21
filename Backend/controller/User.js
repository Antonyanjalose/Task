const User = require('../models/User');


// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    return res.status(200).json({message:"New user Created Successfully",user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read Users
const getAllusers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({message:"User Deleted Successfully",user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createUser,getAllusers,updateUser,deleteUser}
