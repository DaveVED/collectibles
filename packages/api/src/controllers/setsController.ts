import { Request, Response } from "express";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../clients/awsClients";

function formatSetName(input: string): string {
  return input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const sets = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  try {
    const gameName = "OnePiece";
    const pkPrefix = `${gameName}#`;
    const skValue = `SET`;

    const params = {
      TableName: "collectibles-tcg-reference-data-dev",
      IndexName: "SK-SetID-index",
      KeyConditionExpression: "SK = :skValue AND begins_with(SetID, :pkPrefix)",
      ExpressionAttributeValues: {
        ":skValue": skValue,
        ":pkPrefix": pkPrefix,
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items && response.Items.length > 0) {
      res.status(200).json({
        data: response.Items,
      });
    } else {
      res.status(404).json({ message: "No sets found." });
    }
  } catch (error) {
    console.error("Error retrieving sets:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const setCardsByCode = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  try {
    const { setCode } = req.params;

    const gameName = "OnePiece";
    const pk = `${gameName}#${setCode.toUpperCase()}`;
    const skPrefix = `CARD#`;

    const params = {
      TableName: "collectibles-tcg-reference-data-dev",
      KeyConditionExpression: "SetID = :pk AND begins_with(SK, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": pk,
        ":skPrefix": skPrefix,
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items && response.Items.length > 0) {
      res.status(200).json({
        data: response.Items,
      });
    } else {
      res.status(404).json({ message: "Set cards not found." });
    }
  } catch (error) {
    console.error("Error retrieving card:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const setCardsBySetName = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  try {
    const { setName } = req.params;
    const skPrefix = `CARD#`;

    const params = {
      TableName: "collectibles-tcg-reference-data-dev",
      IndexName: "SetName-SK-index",
      KeyConditionExpression:
        "SetName = :setName AND begins_with(SK, :skPrefix)",
      ExpressionAttributeValues: {
        ":setName": formatSetName(setName),
        ":skPrefix": skPrefix,
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items && response.Items.length > 0) {
      res.status(200).json({
        data: response.Items,
      });
    } else {
      res.status(404).json({ message: "Set cards not found." });
    }
  } catch (error) {
    console.error("Error retrieving card:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const setByCode = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  const data = {
    data: {
      to: "do - need to think about schema. But for now we can just create a mapping.",
    },
  };

  res.status(200).json(data);
};

export const setByName = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  try {
    const { setName } = req.params;

    const params = {
      TableName: "collectibles-tcg-reference-data-dev",
      IndexName: "SetName-SK-index",
      KeyConditionExpression: "SetName = :setName AND SK = :skPrefix",
      ExpressionAttributeValues: {
        ":setName": formatSetName(setName),
        ":skPrefix": "SET",
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items && response.Items.length > 0) {
      res.status(200).json({
        data: response.Items,
      });
    } else {
      res.status(404).json({ message: "Set cards not found." });
    }
  } catch (error) {
    console.error("Error retrieving card:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const setCardByCardCode = async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/vnd.api+json");

  try {
    const { setName, cardCode } = req.params;

    const [setCode, cardNumber] = cardCode.split("-");

    if (!setCode || !cardNumber) {
      return res.status(400).json({ message: "Invalid card code format." });
    }

    const formattedSetName = formatSetName(setName);
    const gameName = "OnePiece";

    // Create the SetID to check against
    const setID = `${gameName}#${setCode.toUpperCase()}`;
    const skPrefix = `CARD#${cardNumber}`;

    const params = {
      TableName: "collectibles-tcg-reference-data-dev",
      IndexName: "SetName-SK-index",
      KeyConditionExpression:
        "SetName = :setName AND begins_with(SK, :skPrefix)",
      FilterExpression: "SetID = :setID",
      ExpressionAttributeValues: {
        ":setName": formattedSetName,
        ":skPrefix": skPrefix,
        ":setID": setID,
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items && response.Items.length > 0) {
      res.status(200).json({
        data: response.Items,
      });
    } else {
      res.status(404).json({ message: "Card not found." });
    }
  } catch (error) {
    console.error("Error retrieving card:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};