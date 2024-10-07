import { Request, Response } from "express";

export const apiMetadata = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  const data = {
    data: {
      type: "metadata",
      id: "api-metadata",
      attributes: {
        version: "v1",
        endpoints: [
          "/v1/cards/{setCode}/{cardNumber}"
        ],
        documentation: "https://github.com/DaveVED/collectibles/tree/beta",
      },
    },
  };

  res.status(200).json(data);
};
