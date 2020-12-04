const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const models  = require('../models');

const users = models.user;

const jwtOptions ={}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

jwtOptions.secretOrKey = "mySecret";

module.exports = passport => { 

  passport.use(new JwtStrategy(
    jwtOptions,(jwt_payload,done) =>{
      users.findOne({where:{id:jwt_payload.id}})
      .then(user =>{
        if(user){
          return done(null,user);
        }
        return done(null,false);
      })
      .catch(err =>{
        console.log(err);
      });
    }
  ));
};