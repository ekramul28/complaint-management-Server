import prisma from "../shared/prisma";

const createTicket = async (req: any) => {
  const data = req.body;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now

  const newTicket = await prisma.ticket.create({
    data: {
      subject: data.subject,
      description: data.description,
      customerId: data.customerId,
      status: "OPEN",
      priority: data.priority || "MEDIUM", // Default to 'Medium'
      expiryDate: expiryDate,
    },
  });

  return newTicket;
};

export const TicketsServices = {
  createTicket,
};
