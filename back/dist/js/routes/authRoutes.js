import express from "express";
import AuthController from "../controller/AuthController.js";
const authRoute = express.Router();
authRoute
    .post("/auth/register", AuthController.register)
    .get("/auth/login/:email/:password", AuthController.login)
    .get("/auth/login/manager/:email/:password", AuthController.loginManager);
export default authRoute;
//# sourceMappingURL=authRoutes.js.map