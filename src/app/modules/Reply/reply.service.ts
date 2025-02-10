import prisma from "../shared/prisma";

const createReplyFromDb = async (req: any) => {
  const { ticketId, userId, message } = req.body;
  //   const userId = req.params?.id;
  // Validate required fields
  if (!ticketId || !userId || !message) {
    throw new Error("All fields (ticketId, customerId, message) are required.");
  }

  // Check if the customer exists in the database
  await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });

  // Create a new reply in the database
  const reply = await prisma.reply.create({
    data: {
      ticketId,
      userId,
      message,
    },
  });

  return reply;
};

const getRepliesByTicketId = (ticketId: string) => {
  if (!ticketId) {
    throw new Error("Ticket ID is required.");
  }

  const replies = prisma.reply.findMany({
    where: { ticketId },
    include: {
      user: { select: { id: true, role: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return replies;
};

const deleteReplyById = async (replyId: string, userId: string) => {
  if (!replyId || !userId) {
    throw new Error("Reply ID and User ID are required.");
  }

  // Check if the reply exists and belongs to the user
  const reply = await prisma.reply.findUnique({
    where: { id: replyId },
    select: { userId: true },
  });

  if (!reply) {
    throw new Error("Reply not found.");
  }

  if (reply.userId !== userId) {
    throw new Error("Unauthorized: You can only delete your own replies.");
  }

  // Delete the reply
  await prisma.reply.delete({
    where: { id: replyId },
  });

  return { message: "Reply deleted successfully." };
};

export const ReplyServices = {
  createReplyFromDb,
  getRepliesByTicketId,
  deleteReplyById,
};
