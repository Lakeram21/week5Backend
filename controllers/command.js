const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { CreateCommandBodyValid,UpdateCommandBodyValid } = require("../utils/dataValidation/commandsDataValidation")


/**********************************
 * GET: Getting all the Commands
 * ********************************/
const getAll = async (req, res) => {
try {
    const result = await mongodb.getDb().db().collection('commands').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  }).catch((error)=>{
    res.status(500).json({message:"Failed to retrieve the data from Database "|| error})
  });
} catch (error) {
    res.status(500).json(error);
}};


/*****************************************
 * GET{id}: GEtting all the Commands for a Specific
 * Software type
 * **************************************/
const getSpecificSoftwareType = async (req, res) => {
    try {
        const softwareType = (req.params.softwareType);
        const result = await mongodb.getDb().db().collection('commands').find({ softwareType: softwareType });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        }).catch((error)=>{
          res.status(500).json({message:"Failed to retrieve the data" || error})
        })   
    } catch (error) {
        res.status(500).json(error);
    }};

/*****************************************
 * POST: Create a new command
 * **************************************/
const createCommand = async (req, res) => {
try {

  // validate the body
    const {error} = await CreateCommandBodyValid(req.body)
   if(error)
   {
    return res.status(400).json(error)
   }
     // create a new command
    const command = {
    softwareType: req.body.softwareType,
    operatingSys: req.body.operatingSys,
    command: req.body.command,
    description: req.body.description,
    authorId: req.body.authorId,
    otherShortCut: req.body.otherShortCut,
  };

  // insert the new command
  const response = await mongodb.getDb().db().collection('commands').insertOne(command);
  // check creation of command
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'error occurred while creating the contact.');
  }
    
} catch (error) {
    res.status(500).json(error);
}};


/*****************************************
 * PUT: Update an exiting command
 * **************************************/
const updateCommand= async (req, res, next) => {
 // validate the Data comming in first
  try{
   // validate the body coming in
   const {error} = UpdateCommandBodyValid(req.body)
   if(error)
   {
     return res.status(400).json(error);
   }
   // then create the new object
    const command = {
    softwareType: req.body.softwareType,
    operatingSys: req.body.operatingSys,
    command: req.body.command,
    description: req.body.description,
    authorId: req.body.authorId,
    otherShortCut: req.body.otherShortCut,
  };
   // Then find and Replace
   const userId = new ObjectId(req.params.id);
      const response = await mongodb
          .getDb()
          .db()
          .collection('commands')
          .replaceOne({ _id: userId }, command);
        console.log(response);
        if (response.modifiedCount > 0) {
          res.status(204).send();
        } else {
          res.status(500).json(response.error || 'error occurred while updating the command.');
        }
  }
  catch (error){
    res.status(500).json({message: "Internal Server Error"})

  }
};

/*****************************************
 * DELETE: Delete an exisiting command
 * **************************************/
const deleteCommand = async (req, res) => {
  try {
      const userId = new ObjectId(req.params.id);
      if(userId == null)
      {
        res.status(400).json({message:"Invalid Id"})
      }
      const response = await mongodb.getDb().db().collection('commands').deleteOne({ _id: userId }, true);
      console.log(response);
      if (response.deletedCount > 0) {
        res.status(204).send();
      }
      else {
        res.status(500).json(response.error || 'Some error occurred while deleting the command.');
      }
    
  } catch (error) {
    res.status(500).json({message:error})
    
  }
 
};




/*****************************************
 * Export all logic created here
 * **************************************/
module.exports = {
  getAll,
  getSpecificSoftwareType,
  createCommand,
  updateCommand,
  deleteCommand
};
