import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../middlewares/catchAsync";
import sendResponse from "../shared/sendResponse";
import { IAuthUser } from "../../interfaces/common";
import { TicketsServices } from "./ticket.services";

const createComplaintTicket = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TicketsServices.createComplaintTicket(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "ComplaintTicket Created successfully!",
      data: result,
    });
  }
);

const getAllComplaintTickets = catchAsync(
  async (req: Request, res: Response) => {
    console.log("r", req.query);
    const result = await TicketsServices.GetAllComplaintTicket(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "getAllComplaintTickets data fetched!",

      data: result,
    });
  }
);

const getSingleComplaintTickets = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    console.log("user", user);
    const result = await TicketsServices.GetSingleComplaintTicket(
      user as IAuthUser
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "getSingleComplaintTickets data fetched!",
      data: result,
    });
  }
);
const UpdateComplaintTickets = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    console.log("user", user);
    const result = await TicketsServices.UpdateComplaintTicket(
      user as IAuthUser,
      req.body.ticketId,
      req.body.updatedData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "getSingleComplaintTickets data fetched!",
      data: result,
    });
  }
);
const DeleteComplaintTickets = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await TicketsServices.DeleteComplaintTicket(
      user as IAuthUser,
      req.body.ticketId
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "getSingleComplaintTickets data fetched!",
      data: result,
    });
  }
);

export const TicketController = {
  createComplaintTicket,
  getAllComplaintTickets,
  getSingleComplaintTickets,
  DeleteComplaintTickets,
  UpdateComplaintTickets,
};
