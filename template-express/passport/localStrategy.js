const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../schemas/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      User.findOne({email})
        .then((user) => {
          if (user !== null){
            const result = bcrypt.compareSync(password, user.password);
            console.log(result);
            if (result) {
              console.log(result);
              done(null, user);
            } else {
              done(null, false);
            }
          }else{
            done(null, user);  
          }
        })
        .catch((err) => {
          console.error(err);
          done(null, false, { message: err });
        });
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};