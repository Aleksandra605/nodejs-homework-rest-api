const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify) {
    res.status(401).send({ message: 'Email or password is wrong' });
  }

  const compareResult = bcrypt.compareSync(password, user.password);
  if (!compareResult) {
    res.status(401).send({ message: 'Email or password is wrong' });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: `${email}`,
      subscription: 'starter',
    },
  });

  return;
};

module.exports = login;
