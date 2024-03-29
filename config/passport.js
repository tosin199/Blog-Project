const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config()

const models  = require('../models');

const users = models.user;

const jwtOptions ={}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

jwtOptions.secretOrKey = process.env.SECRET;

module.exports = passport => { 
  passport.use(new JwtStrategy(
    jwtOptions,(jwt_payload,done) =>{
      console.log(jwt_payload,'>>>>>>>');
      models.isLoggedOut.findOne({where:{userId:jwt_payload.id,status:true}})
      .then(yeah =>{
        if (yeah){
          return done(null,false)
        }
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
      })
      .catch(err =>{
        console.log(err);
      });
    }
  ));
  
};