import { z } from "zod";

const createTicketValidation = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  customerId: z.string().min(1, { message: "Customer ID is required" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  expiryDate: z.date().optional(),
});

export const ticketValidation = {
  createTicketValidation,
};
