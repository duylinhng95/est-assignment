import express from "express";
import auth from "./auth";
import event from "./event";

const router = express.Router();

router.use('/auth', auth);
router.use('/event', event);

export default router;
