const passport = require('passport');
const localStartegy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var user = mongoose.model('User');

passport.use(
    new localStartegy({ usernameField: 'email' },
        (username, password, done) => {
            user.findOne({ email: 'username' },
                (err, user) => {
                    if (err)
                        return done(err)
                    //  unknw user
                    else if (!user)
                        return done(null, false, { message: "Email Not Registerd" })
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: "Wrong password" })
                    else
                        return done(null, user)
                });
        }
    )
)