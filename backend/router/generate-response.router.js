import { Router } from "express";
import { chatWithYourPeer } from "../controller/generate-response.controller.js";

const router = Router();

router.route("/chat").post(chatWithYourPeer);

export default router;
