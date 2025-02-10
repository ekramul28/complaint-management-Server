import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { userRoutes } from "../modules/Users/user.route";

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

  // {
  //   path: "/admin",
  //   router: AdminRouter,
  // },
  // {
  //   path: "/customer",
  //   router: CustomerRouter,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
