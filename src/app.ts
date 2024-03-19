import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/User/user.route";
import { AdminRoutes } from "./app/modules/Admin/admin.route";
const app: Application = express();

// parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph health care Server",
  });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", AdminRoutes);

export default app;
