require('dotenv').config();

const support = {
  dbConnected: (app, port, db) => {
    try {
      db.connect();
      app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
};

module.exports = support;
