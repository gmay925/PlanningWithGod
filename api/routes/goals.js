const express = require('express');
const { createGoal, 
  getGoal,
  getGoals, 
  deleteGoal, 
  updateGoal } = require('../controllers/goalController');
  const protect = require('../middleware/requireAuth');

  const router = express.Router();
  
  router.use((req, res, next) => {
    console.log(req.path, req.method, 'goals')
    next()
  });  
  // require auth for all goal routes
  router.use(protect);
  
  // GET all goals
  router.get('/', getGoals);
  
  //GET a single Goal
  router.get('/:id', getGoal);
  
  // POST a new goal
  router.post('/', createGoal);
  
  // DELETE a goal
  router.delete('/:id', deleteGoal);
  
  // UPDATE a goal
  router.put('/:id', updateGoal);
  
  
  module.exports = router;