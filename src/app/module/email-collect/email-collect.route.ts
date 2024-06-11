import express from 'express'
import { EmailCollectController } from './email-collect.controller'

// import { FileUploadHelper } from '../../../helper/fileUploader'
const router = express.Router()
//api

router.post('/send', EmailCollectController.emailCollect)
router.get('/all', EmailCollectController.getAllEmailCollect)

export const EmailCollectRoute = router
