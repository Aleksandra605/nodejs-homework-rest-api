const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const sendMail = require('../../helpers/sendMail');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).send({ message: 'Email in use' });
  }

  const image = gravatar.url('sasha@gmail.com');

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL: image,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };

  await sendMail(mail);

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
