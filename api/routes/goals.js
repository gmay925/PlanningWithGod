const express = require('express');
const { createGoal, 
  getGoal,
  getGoals, 
  deleteGoal, 
  updateGoal } = require('../controllers/goalController');
  const protect = require('../middleware/requireAuth');

  const router = express.Router();
  
  // require auth for all goal routes
  router.use(protect);
  
  // GET all goals
  router.get('/api/goals', getGoals);
  
  //GET a single Goal
  router.get('/api/goals/:id', getGoal);
  
  // POST a new goal
  router.post('/api/goals', createGoal);
  
  // DELETE a goal
  router.delete('/api/goals/:id', deleteGoal);
  
  // UPDATE a goal
  router.patch('api/goals/:id', updateGoal);
  
  
  module.exports = router;