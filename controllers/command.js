const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


/**********************************
 * GET: Getting all the Commands
 * ********************************/
const getAll = async (req, res) => {
try {
    const result = await mongodb.getDb().db().collection('commands').find();
    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
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
        });   
    } catch (error) {
        res.status(500).json(error);
    }};

/*****************************************
 * POST: Create a new command
 * **************************************/
const createCommand = async (req, res) => {
try {
    const command = {
    softwareType: req.body.softwareType,
    operatingSys: req.body.operatingSys,
    command: req.body.command,
    description: req.body.description,
    authorId: req.body.authorId,
    otherShortCut: req.body.otherShortCut,
  };
  const response = await mongodb.getDb().db().collection('commands').insertOne(command);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
    
} catch (error) {
    res.status(500).json(error);
}};



const updateCommand = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('commands')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteCommand = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('commands').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = {
  getAll,
  getSpecificSoftwareType,
  createCommand,
  updateCommand,
  deleteCommand
};
