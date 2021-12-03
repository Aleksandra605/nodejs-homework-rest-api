const validation = (schema) => {
  const contactValidation = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: 'bad request' });
    }

    next();
  };
  return contactValidation;
};

module.exports = validation;
