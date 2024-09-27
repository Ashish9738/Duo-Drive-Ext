import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import responseRouter from "../backend/router/generate-response.router.js";

app.use("/api/v1", responseRouter);

export default app;
