const { User } = require('../../model/user');

const currentUser = async (req, res) => {
  const { _id } = req.user;

  const current = await User.findById(_id);

  if (!current) {
    res.status(401).json({ message: 'Not authorized' });
  }

  res
    .status(200)
    .json({ email: current.email, subscription: current.subscription });
  return;
};

module.exports = currentUser;
