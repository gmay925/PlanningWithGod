const express = require('express');
const { createJournal, 
  getJournal,
  getJournals, 
  deleteJournal, 
  updateJournal } = require('../controllers/journalControllers');
  const protect = require('../middleware/requireAuth');

  const router = express.Router();
  
  // require auth for all journal routes
  router.use(protect);
  
  // GET all journals
  router.get('/api/journals', getJournals)
  
  //GET a single journal
  router.get('/api/journals/:id', getJournal)
  
  // POST a new journal
  router.post('/api/journals', createJournal)
  
  // DELETE a journal
  router.delete('/api/journals/:id', deleteJournal)
  
  // UPDATE a journal
  router.patch('/api/journals/:id', updateJournal)
  
  
  module.exports = router;