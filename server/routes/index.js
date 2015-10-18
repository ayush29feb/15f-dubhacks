var express = require('express');
var request = require('request');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var FB = require('fb');
var request = require('request');
var router = express.Router();
var FACEBOOK_APP_ID = "957421080985378";
var FACEBOOK_APP_SECRET = "0d53e9e2387f0d3462c53cf6b3556016";
var User = require("../models/User");
var Connection = require("../models/Connection");


var BASE = "https://graph.facebook.com/"

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://52.89.113.127:3000/auth/facebook/"
      },
      function(accessToken, refreshToken, profile, done) {
          // asynchronous verification, for effect...
          process.nextTick(function () {
              // if user id is not in the db... then grab all friends and profile pics
              // as well as their own picture

              var x = User.findById(profile.id);
              FB.setAccessToken(accessToken);
              User.findById(profile.id).then(function(user) {
                  if (user === null) {
                      addNewUser(FB, profile);
                  }
              });
              // To keep the example simple, the user's Facebook profile is returned to
              // represent the logged-in user.  In a typical application, you would want
              // to associate the Facebook account with a user record in your database,
              // and return that user instead.
              return done(null, profile);
          });
      }
));

function addNewUser(FB, profile) {
    console.log(profile);
    var curUserName = profile.displayName;
    var curUserId = profile.id;

    FB.api('/me/?fields=picture', function(res) {
        // Get the user profile picture
        console.log(res.picture.data.url);
        var curUrl = res.picture.data.url;
        User.create({id: curUserId, name: curUserName, profileUrl: curUrl});
    });

    FB.api('/me/friends', function(res) {
        var data = res.data;
        for (friendIndex in data) {
            var friend = data[friendIndex];
            var friendUserId = friend.id;
            User.findById(friendUserId).then(function(profile) {
                if (profile === null) {
                    var friendName = friend.name;
                    FB.api('/me/?fields=picture', function(res) {
                        var friendURL = res.picture.data.url;
                        User.create({id: friendUserId, name: friendName, profileUrl: friendURL});
                    });
                }
            });
            // Create initial connection
            Connection.create({u1: curUserId, u2: friendUserId, status: 'none'});
        }
    });
}

var options = {
    scope: 'user_friends',
    failureRedirect: '/login',
    successRedirect: '/home'
};

router.get('/auth/facebook', passport.authenticate('facebook', options),
        function(req, res) {
            console.log("in call back");
        });

/**
 * Check if the user is in the DB, if the user is in the DB,
 * then don't grab friends, otherwise, grab the friends from
 * hitting the FB API.
 */
router.get('/home', function(req, res) {
    res.render('index', {title: "success!"});
});


router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.user);
    res.render('login', { title: 'Express'});
});


module.exports = router;
