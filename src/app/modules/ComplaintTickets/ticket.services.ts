import { IAuthUser } from "../../interfaces/common";
import prisma from "../shared/prisma";

const createComplaintTicket = async (req: any) => {
  const newTicket = await prisma.ticket.create({
    data: req.body,
  });

  return newTicket;
};

const GetAllComplaintTicket = async (req: any) => {
  const newTicket = await prisma.ticket.create({
    data: req.body,
  });

  return newTicket;
};

const GetSingleComplaintTicket = async (user: IAuthUser) => {
  // Check if user object exists and has a valid userId
  if (!user?.userId) {
    throw new Error("User ID is required");
  }

  const complaintTicket = await prisma.ticket.findFirst({
    where: {
      customerId: user.userId,
    },
  });

  if (!complaintTicket) {
    throw new Error("No complaint ticket found for this user");
  }

  return complaintTicket;
};

const UpdateComplaintTicket = async (
  user: IAuthUser,
  ticketId: string,
  updatedData: { subject: string; description: string }
) => {
  if (!user?.userId) {
    throw new Error("User ID is required");
  }

  // Find the ticket to update
  const ticketToUpdate = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
      customerId: user.userId,
    },
  });

  if (!ticketToUpdate) {
    throw new Error("Ticket not found or doesn't belong to this user");
  }

  // Update the ticket
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      subject: updatedData.subject,
      description: updatedData.description,
    },
  });

  return updatedTicket;
};

const DeleteComplaintTicket = async (user: IAuthUser, ticketId: string) => {
  if (!user?.userId) {
    throw new Error("User ID is required");
  }

  // Find the ticket to delete
  const ticketToDelete = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
      customerId: user.userId,
    },
  });

  if (!ticketToDelete) {
    throw new Error("Ticket not found or doesn't belong to this user");
  }

  // Delete the ticket
  const deletedTicket = await prisma.ticket.delete({
    where: { id: ticketId },
  });

  return deletedTicket;
};

export const TicketsServices = {
  createComplaintTicket,
  GetSingleComplaintTicket,
  GetAllComplaintTicket,
  UpdateComplaintTicket,
  DeleteComplaintTicket,
};
