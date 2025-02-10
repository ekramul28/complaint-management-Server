import express from "express";
import { ReplyController } from "./reply.controller";

const router = express.Router();

router.post("/", ReplyController.createReply);
router.get("/:id", ReplyController.GetReply);

router.delete("/:id", ReplyController.DeleteReply);

export const replyRoutes = router;
