const express = require('express');
const { createAffirmation, 
  getAffirmation,
  getAffirmations, 
  deleteAffirmation, 
 updateAffirmation } = require('../controllers/affirmationController');
const protect = require('../middleware/requireAuth');

const router = express.Router();
  
router.use((req, res, next) => {
  console.log(req.path, req.method, 'affirmations')
  next()
});  

// require auth for all workout routes
router.use(protect);
  // GET all affirmations
  router.get('/', getAffirmations)
  
  //GET a single affirmation
  router.get('/:id', getAffirmation)
  
  // POST a new affirmation
  router.post('/', createAffirmation)
  
  // DELETE a affirmation
  router.delete('/:id', deleteAffirmation)
  
  // UPDATE affirmation
  router.put('/:id', updateAffirmation)
  
  
  module.exports = router