import express from "express";
import auth from "./auth";

const router = express.Router();

router.get('/test', (req,res,ext) => {
  res.status(200).send('test');
})

router.use('/auth', auth)

export default router;
