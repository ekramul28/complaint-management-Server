import express from "express";
import { userRoutes } from "../modules/Users/user.route";
import { productRoutes } from "../modules/Product/product.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { shopRoutes } from "../modules/Shop/shop.route";
import { CustomerRouter } from "../modules/Customer/customer.route";
import { VendorRouter } from "../modules/Vendor/vendor.route";
import { AdminRouter } from "../modules/Admin/admin.route";
import { orderRoutes } from "../modules/Order/order.route";
import { CategoryRoutes } from "../modules/Category/Category.route";
import { CartRoutes } from "../modules/Cart/cart.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { followRoutes } from "../modules/followAndUnfollow/followAndUnfollow.route";
import { resentViewRoutes } from "../modules/ResentView/resentView.route";
import { ReviewRoutes } from "../modules/Review/review.routes";

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
    path: "/product",
    router: productRoutes,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/customer",
    router: CustomerRouter,
  },
  {
    path: "/vendor",
    router: VendorRouter,
  },
  {
    path: "/shop",
    router: shopRoutes,
  },
  {
    path: "/payment",
    router: PaymentRoutes,
  },
  {
    path: "/order",
    router: orderRoutes,
  },
  {
    path: "/review",
    router: ReviewRoutes,
  },
  {
    path: "/follow",
    router: followRoutes,
  },
  {
    path: "/cart",
    router: CartRoutes,
  },
  {
    path: "/resentView",
    router: resentViewRoutes,
  },
  {
    path: "/category",
    router: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
