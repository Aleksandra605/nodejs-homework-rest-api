const { Contact } = require('../model/contact');

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id }).populate(
    'owner',
    '_id email'
  );

  if (!result) {
    res.status(404).send({ message: 'Not found' });
  }

  res.json({ status: 'success', code: 200, data: { result } });
};

module.exports = getAllContacts;
