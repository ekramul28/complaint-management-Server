import { z } from "zod";

const createTicketSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  customerId: z.string().min(1, { message: "Customer ID is required" }),
});

const updateTicketSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
export const ticketValidation = {
  createTicketSchema,
  updateTicketSchema,
};
