import { Request, Response } from "express";

export const healthReadiness = (req: Request, res: Response) => {
  res.status(200).json({ STATUS: "UP" });
};

export const healthLiveness = (req: Request, res: Response) => {
  res.status(204).send();
};
