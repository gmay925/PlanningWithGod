const express = require('express');
const { createJournal, 
  getJournal,
  getJournals, 
  deleteJournal, 
  updateJournal } = require('../controllers/journalControllers');
  const protect = require('../middleware/requireAuth');

  const router = express.Router();
  
 router.use((req, res, next) => {
    console.log(req.path, req.method, 'journal')
    next()
  });
  // require auth for all journal routes
  router.use(protect);
  
  // GET all journals
  router.get('/', getJournals)
  
  //GET a single journal
  router.get('/:id', getJournal)
  
  // POST a new journal
  router.post('/', createJournal)
  
  // DELETE a journal
  router.delete('/', deleteJournal)
  
  // UPDATE a journal
  router.patch('/:id', updateJournal)
  
  
  module.exports = router;