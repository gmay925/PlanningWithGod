// const express = require('express');
// const { createJournal, 
//   getJournal,
//   getJournals, 
//   deleteJournals, 
//   updateJournal } = require('../controllers/workoutControllers');
//   const requireAuth = require('../middleware/requireAuth')

//   const router = express.Router()
  
//   // require auth for all journal routes
//   router.use(requireAuth)
  
//   // GET all journals
//   router.get('/', getJournals)
  
//   //GET a single journal
//   router.get('/:id', getJournal)
  
//   // POST a new journal
//   router.post('/', createJournal)
  
//   // DELETE a journal
//   router.delete('/:id', deleteJournal)
  
//   // UPDATE a journal
//   router.patch('/:id', updateJournal)
  
  
//   module.exports = router