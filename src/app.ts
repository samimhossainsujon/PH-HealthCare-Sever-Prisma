import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoute } from "./app/modules/User/user.route";


const app: Application = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Ph health care Server",
  });
});

app.use("/api/v1/user", userRoute);

export default app;
