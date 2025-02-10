import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../shared/sendResponse";
import { IAuthUser } from "../../interfaces/common";
import { ReplyServices } from "./reply.service";

const createReply = catchAsync(async (req: Request, res: Response) => {
  const result = await ReplyServices.createReplyFromDb(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply Created successfully!",
    data: result,
  });
});

const GetReply = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    console.log("user", user);
    const result = await ReplyServices.getRepliesByTicketId(req.body.ticketId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "GetReply data fetched!",
      data: result,
    });
  }
);

const DeleteReply = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const { replyId, userId } = req.body;
    const result = await ReplyServices.deleteReplyById(replyId, userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Delete Successfully!",
      data: result,
    });
  }
);

export const ReplyController = {
  GetReply,
  createReply,
  DeleteReply,
};
