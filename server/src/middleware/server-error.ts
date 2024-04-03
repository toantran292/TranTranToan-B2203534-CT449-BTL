import logger from "@cofig/logger";
import { NextFunction, Request, Response } from "express";

const ServerError = () => (err: any, req: Request, res: Response, _next: NextFunction) => {
  let message = "";
  logger.debug("ServerError");
  if (Array.isArray(err.error)) {
    message = err.error.map((e: any) => `${e.param}: ${e.msg}`).toString();
  } else {
    message = !err.error ? err.message : `${err.error.message} ${err.error.detail || ""}`;
  }

  return res.status(500).json({ code: 500, message: "Internal server error.", detail: message });
};

export default ServerError;