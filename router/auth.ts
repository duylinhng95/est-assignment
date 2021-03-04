import express from "express";
import {registerValidationRules} from "@RequestValidate/AuthValidate";
import {validate} from "@Helper/validation";
import AuthController from "@Controller/AuthController";

const router = express.Router();

router.post('/register', registerValidationRules(), validate, AuthController.register);

export default router;
