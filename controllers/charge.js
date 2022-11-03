const Charge = require('../models/charge')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

// const Charge = require("../models/charge");
// const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createCharge = async (req, res) => {
  req.body.chargedBy = req.user.userId
  const charge = await Charge.create(req.body)
  res.status(StatusCodes.CREATED).json({charge})

  // console.log("create charge", req.body);
  // const charge = new Charge(req.body);

  // charge.save((err, charge) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).send({
  //       error: errorHandler(err),
  //     });
    }
  exports.getCharge = async (req, res) => {
    const {user:{userId},params:{id:chargeId}} = req

    const charge = await Charge.findOne({
      _id:chargeId,chargedBy:userId
    })
    if(!charge){
      throw new NotFoundError('No charge with id '+(chargeId))
    }
    res.status(StatusCodes.OK).json({charge})
  }
  exports.updateCharge = async (req, res) => {
    const {body:{name,description,price,duration},user:{userId},params:{id:chargeId}} = req
    if(name===''||price===''||duration===''){
      throw new BadRequestError('name,price and duration fields cannot be empty')
    }
    const charge = await Charge.findOneAndUpdate({_id:chargeId,chargedBy:userId},req.body,{new:true,runValidators:true})
    if(!charge){
      throw new NotFoundError('No charge with id '+(chargeId))
    }
    res.status(StatusCodes.OK).json({charge})
  }
  exports.deleteCharge = async (req, res) => {
    const {user:{userId},params:{id:chargeId}} = req
    const charge = await Charge.findOneAndRemove({_id:chargeId,chargedBy:userId})
    if(!charge){
      throw new NotFoundError('No job with id '+(chargeId))
  }
  res.status(StatusCodes.OK).send()
  }
  exports.getAllCharges = async (req, res) => {
    const charges = await Charge.find({chargedBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({charges,count:charges.length})
  }


//     return res.send(charge);
//   });
// };

// exports.remove = (req, res) => {
//   Charge.remove(req.body, function (err, removed) {
//     if (err) {
//       console.log(err);

//       return res.status(400).send({
//         error: errorHandler(err),
//       });
//     }
//     return res.send("Charge deleted successfully");
//   });
// };

// exports.list = (req, res) => {
//   Charge.find().exec((err, data) => {
//     if (err) {
//       return res.status(400).send({
//         error: errorHandler(err),
//       });
//     }
//     res.send(data);
//   });
// };
