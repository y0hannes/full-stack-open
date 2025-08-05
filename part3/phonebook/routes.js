const express = require('express')
const {
  getInfo,
  getContacts,
  getContact,
  deleteContact,
  createContact,
  updateContact
} = require('./controller')

const router = express.Router()

router.get('/info', getInfo)
router.get('/contacts', getContacts)
router.get('/contacts/:id', getContact)
router.post('/contacts', createContact)
router.delete('/contacts/:id', deleteContact)
router.put('/contacts/:id', updateContact)

module.exports = router