import express from "express";
import {authenticateValidationRules} from "@RequestValidate/AuthValidate";
import {validate} from "@Helper/validation";
import AuthController from "@Controller/AuthController";

const router = express.Router();

router.post('/register', authenticateValidationRules(), validate, AuthController.register);

router.post('/login', authenticateValidationRules(), validate, AuthController.login);

export default router;
