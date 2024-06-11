import express from 'express'
import { keywordController } from './keyword.controller'

const router = express.Router()
router.get('/getOneKeyword/:id', keywordController.oneKeywordGet)
router.post('/insertKeyword', keywordController.keywordPost)
router.get('/getKeywords', keywordController.keywordGet)
//getTrendingKeywords
router.get(
  '/028f21e75f93744e5298e08733aecccc107792e94642dbfc92b89ce0589760e1',
  keywordController.trendingKeywordsGet,
)

export const KeywordRoute = router
