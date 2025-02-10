import express from "express";
import { TicketController } from "./ticket.controller";
import { Role } from "@prisma/client";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ticketValidation } from "./ticket.validation";

const router = express.Router();

router.post("/", TicketController.createComplaintTicket);
router.get(
  "/allTickets",
  auth(Role.ADMIN),
  TicketController.getAllComplaintTickets
);
router.get(
  "/:id",
  validateRequest(ticketValidation.createTicketSchema),
  auth(Role.CUSTOMER),
  TicketController.getSingleComplaintTickets
);
router.patch(
  "/:id",
  auth(Role.CUSTOMER),
  validateRequest(ticketValidation.updateTicketSchema),
  TicketController.UpdateComplaintTickets
);
router.delete(
  "/:id",
  auth(Role.CUSTOMER),
  TicketController.DeleteComplaintTickets
);

export const ComplaintTicketsRoutes = router;
