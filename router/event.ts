import express from "express";
import EventController from "@Controller/EventController";
import {authenticate} from "@Middleware/AuthenticateMiddleware";

const router = express.Router();

router.get('/list', authenticate, EventController.list);


export default router;
