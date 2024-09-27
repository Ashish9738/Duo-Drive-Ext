import { Router } from "express";
import {
  chatWithYourPeer,
  talkToYourPeer,
} from "../controller/generate-response.controller.js";

const router = Router();

router.route("/chat").post(chatWithYourPeer);

export default router;
