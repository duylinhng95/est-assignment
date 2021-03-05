import express from "express";
import EventController from "@Controller/EventController";
import {authenticate} from "@Middleware/AuthenticateMiddleware";
import {createEventValidator} from "@RequestValidate/EventValidate";
import {validate} from "@Helper/validation";

const router = express.Router();

router.get('/list', authenticate, EventController.list);
router.post('/create', authenticate, createEventValidator(), validate, EventController.create);

export default router;
