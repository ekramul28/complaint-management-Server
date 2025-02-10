import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { userRoutes } from "../modules/Users/user.route";
import { replyRoutes } from "../modules/Reply/reply.route";
import { ComplaintTicketsRoutes } from "../modules/ComplaintTickets/ticket.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/user",
    router: userRoutes,
  },
  {
    path: "/tickets",
    router: ComplaintTicketsRoutes,
  },

  {
    path: "/reply",
    router: replyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
