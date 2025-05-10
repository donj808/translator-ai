import express from 'express';
import * as translate from './controllers/translate';
const router = express.Router();

router.post('/translate', translate.getTranslation );


export default router;