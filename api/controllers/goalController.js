const Goal = require('../models/goalModel');
const mongoose = require('mongoose');

// get all goals
const getGoals = async (req, res) => {
  const user_id = req.user.id

  const goals = await Goal.find({user_id}).sort({createdAt: -1})

  res.status(200).json(goals)
}

// get a single goal
const getGoal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such goal'})
  }

  const goal = await Goal.findById(id)

  if (!goal) {
    return res.status(404).json({error: 'No such goal'})
  }
  
  res.status(200).json(goal)
}


// create new goal
const createGoal = async (req, res) => {
  const {goals, timeFrame} = req.body

  let emptyFields = []

  if(!goals) {
    emptyFields.push('goal')
  }
  if(!timeFrame) {
    emptyFields.push('timeFrame')
  }
  if(emptyFields.length < 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user.id
    const goal = await Goal.create({goals, timeFrame, user_id})
    res.status(200).json(goal)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a goal
const deleteGoal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such goal'})
  }

  const goal = await Goal.findOneAndDelete({_id: id})

  if (!goal) {
    return res.status(400).json({error: 'No such goal'})
  }

  res.status(200).json(goal)
}

// update a goal
const updateGoal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such goal'})
  }

  const goal = await Goal.findByIdAndUpdate({_id: id}, req.body, {returnDocument:'after'});
  console.log(req.body)
  console.log(goal)

  if (!goal) {
    return res.status(400).json({error: 'No such goal'})
  }

  res.status(200).json(goal)
}


module.exports = {
  getGoals,
  getGoal,
  createGoal,
  deleteGoal,
  updateGoal
}