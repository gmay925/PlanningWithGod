const Journal = require('../models/journalModel');
const mongoose = require('mongoose');

// get all journals
const getJournals = async (req, res) => {
  const user_id = req.user._id

  const journals = await Journal.find({user_id}).sort({createdAt: -1})

  res.status(200).json(journals)
}

// // get a single journal
// const getJournal = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such journal'})
//   }

//   const journal = await Journal.findById(id)

//   if (!journal) {
//     return res.status(404).json({error: 'No such journal'})
//   }
  
//   res.status(200).json(journal)
// }


// // create new journal
// const createJournal = async (req, res) => {
//   const {title, gratitude, visualize} = req.body

//   let emptyFields = []

//   if(!title) {
//     emptyFields.push('title')
//   }
//   if(!gratitude) {
//     emptyFields.push('gratitude')
//   }
//   if(!visualize) {
//     emptyFields.push('visualize')
//   }
//   if(emptyFields.length > 0) {
//     return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
//   }

//   // add doc to db
//   try {
//     const user_id = req.user._id
//     const journal = await Journal.create({title, gratitude, visualize, user_id})
//     res.status(200).json(journal)
//   } catch (error) {
//     res.status(400).json({error: error.message})
//   }
// }

// // delete a journal
// const deleteJournal = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such journal'})
//   }

//   const journal = await Journal.findOneAndDelete({_id: id})

//   if (!journal) {
//     return res.status(400).json({error: 'No such journal'})
//   }

//   res.status(200).json(journal)
// }

// // update a journal
// const updateJournal = async (req, res) => {
//   const { id } = req.params

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({error: 'No such journal'})
//   }

//   const journal = await Journal.findOneAndUpdate({_id: id}, {
//     ...req.body
//   })

//   if (!journal) {
//     return res.status(400).json({error: 'No such journal'})
//   }

//   res.status(200).json(journal)
// }


// module.exports = {
//   getJournals,
//   getJournal,
//   createJournal,
//   deleteJournal,
//   updateJournal
// }