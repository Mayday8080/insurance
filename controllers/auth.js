const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
const {BadRequestError, UnauthenticatedError} = require('../errors')
const {StatusCodes} = require('http-status-codes')



// // using promise
// exports.signup = (req, res) => {
//   console.log("req.body", req.body);
//   const user = new User(req.body);
//   user.save((err, user) => {
//     console.log(err);
//     if (err) {
//       return res.status(400).send("Email is taken");
//     }
//     user.salt = undefined;
//     user.hashed_password = undefined;
//     // generate a signed token with user id and secret
//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//     // persist the token as 't' in cookie with expiry date
//     res.cookie("t", token, { expire: new Date() + 9999 });
//     // return response with user and token to frontend client
//     return res.json({ token, user });
//   });
// };

// using async/await
exports.signup = async (req, res) => {
    try {
            
      const user = await User.create({...req.body})
      const token = user.createJWT()
      res.status(StatusCodes.CREATED).json({user:{username:user.username},token})
        
    } catch (err) {
        console.error(err.message);
    }
};

exports.signin = async (req, res) => {
  const {email,hashed_password} = req.body

    if(!email || !hashed_password){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(hashed_password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }


    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{username:user.username},token})


  // // find the user based on email
  // const { username, password } = req.body;
  // User.findOne({ username }, (err, user) => {
  //   if (err || !user) {
  //     // return res.status(400).json({
  //     //   error: "User with that email does not exist. Please signup",
  //     // });
  //     return res
  //       .status(400)
  //       .send("User with that username does not exist. Please signup.");
  //   }
  //   // if user is found make sure the email and password match
  //   // create authenticate method in user model
  //   if (!user.authenticate(password)) {
  //     return res.status(401).send("Username and password dont match");
  //   }

  //   // generate a signed token with user id and secret
  //   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  //   // persist the token as 't' in cookie with expiry date
  //   res.cookie("t", token, { expire: new Date() + 9999 });
  //   // return response with user and token to frontend client
  //   const { _id, name, email, payment_methods, role } = user;
  //   return res.json({
  //     token,
  //     user: { _id, email, username, payment_methods, role },
  //   });
  // });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resourse! Access denied",
    });
  }
  next();
};

/**
 * google login full
 * https://www.udemy.com/instructor/communication/qa/7520556/detail/
 */
