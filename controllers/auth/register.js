const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).send({ message: 'Email in use' });
  }

  const image = gravatar.url('sasha@gmail.com');

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL: image,
  });

  res.status(201).json({
    user: {
      email: `${email}`,
      subscription: 'starter',
      avatarURL: image,
    },
  });

  return newUser;
};

module.exports = register;
