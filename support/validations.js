const settingFields = (req, res, next) => {
  const
    date = /^\d{2}[./-]\d{2}[./-]\d{4}$/,
    author = /(^([\S]+)([ ])([\S]+)([ ])([\w\d]+)|^(.*)|^(.*)(.*))/gm,
    description = /(^([\S]+)([ ])([\S]+)([ ])([\w\d]+)|^(.*)|^(.*)(.*))/gm,
    image = /^[a-zA-ZА-Яа-я-]{0,100}$/,
    title = /(^([\S]+)([ ])([\S]+)([ ])([\w\d]+)|^(.*)|^(.*)(.*))/gm;
  const { body } = req;
  if (body.date && !date.test(body.date)) {
    return res.status(400).json({
      message: 'Invalid date',
    });
  }
  if (body.author && !author.test(body.author)) {
    return res.status(400).json({
      message: 'Invalid author',
    });
  }
  if (body.description && !description.test(body.description)) {
    return res.status(400).json({
      message: 'Invalid description',
    });
  }
  if (body.image && !image.test(body.image)) {
    return res.status(400).json({
      message: 'Invalid image',
    });
  }
  if (body.title && !title.test(body.title)) {
    return res.status(400).json({
      message: 'Invalid title',
    });
  }
  next();
};

module.exports = { settingFields };
