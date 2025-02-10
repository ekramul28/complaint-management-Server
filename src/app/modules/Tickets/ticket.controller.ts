import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../shared/sendResponse";
import pick from "../shared/pick";
import { IAuthUser } from "../../interfaces/common";
import { TicketsServices } from "./ticket.services";

const createTickets = catchAsync(async (req: Request, res: Response) => {
  const result = await TicketsServices.createTicket(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Ticket Created successfully!",
    data: result,
  });
});

const getAllTickets = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  console.log("r", req.query);
  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTickets = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    console.log("user", user);
    const result = await userService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

export const TicketController = {
  getSingleTickets,
  getAllTickets,
  createTickets,
};
