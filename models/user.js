const mongoose = require("mongoose");
// const crypto = require("crypto");
// const uuidv1 = require("uuid/v1");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
        required: [true,'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide valid email'
        ],
        unique: true,
    },
    hashed_password: {
      type:String,
      required:[true,'please provide password'],
      minlength: 6,
    },
  //   about: {
  //     type: String,
  //     trim: true,
  //   },
  //   salt: String,
  //   role: {
  //     type: Number,
  //     default: 0,
  //   },
  //   payment_accounts: {
  //     type: Array,
  //     default: [],
  //   },
  // },
  // { timestamps: true }
  })
  userSchema.pre('save', async function(){
    
    const salt = await bcrypt.genSalt(10)
    this.hashed_password = await bcrypt.hash(this.hashed_password,salt)
    
})
userSchema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,username:this.username}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}
userSchema.methods.comparePassword = async function(canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword,this.hashed_password)
  return isMatch
}

// // virtual field
// userSchema
//   .virtual("password")
//   .set(function (password) {
//     this._password = password;
//     this.salt = uuidv1();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// userSchema.methods = {
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },

//   encryptPassword: function (password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
// };

module.exports = mongoose.model("User", userSchema);
