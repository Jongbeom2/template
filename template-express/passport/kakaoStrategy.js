const KakaoStrategy = require('passport-kakao').Strategy;
const con = require('../database');

module.exports = (passport) => {
  console.log(process.env.KAKAO_ID)
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const snsId = profile.id;
      const provider = 'kakao';
      const sql1 = 'SELECT * FROM USER WHERE SnsId = ?';
      con.query(sql1, [snsId], async (err, rows) => {
        try {
          console.log(rows);
          // Check
          if (rows.length !== 0) {
            done(null, rows[0]);
          }else{
            // Insert
            const newUser = {
              Name :profile._json.kakao_account.profile.nickname,
              SnsId: profile.id,
              Provider: 'kakao',
            }
            console.log(profile,newUser);
            const sql2 = "INSERT INTO USER (Id, Name, Email, Password, Provider, SnsId) VALUES (?, ?, ?, ?, ?, ?)";
            const value = [null, newUser.Name, null, null, newUser.Provider, newUser.SnsId];
            con.query(sql2, value, (err, result) => {
              try {
                done(null, newUser);
              } catch (err) {
                console.log(err);
                done(error);
              }
            });
          }
        } catch (err) {
         console.log(err);
         done(error);
        }
      });
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};