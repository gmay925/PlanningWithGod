const Affirmation = require('../models/affirmationModel');
const mongoose = require('mongoose');

// get all affirmations
const getAffirmations = async (req, res) => {
  const user_id = req.user._id

  const affirmations = await Affirmation.find({user_id}).sort({createdAt: -1})

  res.status(200).json(affirmations)
}

// get a single affirmation
const getAffirmation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such affirmation'})
  }

  const affirmation = await Affirmation.findById(id)

  if (!affirmation) {
    return res.status(404).json({error: 'No such affirmation'})
  }
  
  res.status(200).json(affirmation)
}


// create new affirmation
const createAffirmation = async (req, res) => {
  const { affirmations, believe } = req.body

  let emptyFields = []

  if(!affirmations) {
    emptyFields.push('affirmations')
  }
  if(!believe) {
    emptyFields.push('believe')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const affirmation = await Affirmation.create({affirmations, believe, user_id})
    res.status(200).json(affirmation)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete an affirmation
const deleteAffirmation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such affirmation'})
  }

  const affirmation = await Affirmation.findOneAndDelete({_id: id})

  if (!affirmation) {
    return res.status(400).json({error: 'No such affirmation'})
  }

  res.status(200).json(affirmation)
}

// update an affirmation
const updateAffirmation = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such affirmation'})
  }

  const affirmation = await Affirmation.findOneAndUpdate({_id: id},vreq.body, {returnDocument:'after'});

  if (!affirmation) {
    return res.status(400).json({error: 'No such affirmation'})
  }

  res.status(200).json(affirmation)
}


module.exports = {
  createAffirmation, 
    getAffirmation,
    getAffirmations, 
    deleteAffirmation, 
   updateAffirmation }