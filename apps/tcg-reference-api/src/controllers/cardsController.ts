import { Request, Response } from "express";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../clients/awsClients";

export const setCard = async (req: Request, res: Response) => {
  try {
    const { setCode, cardNumber } = req.params;

    if (!setCode || !cardNumber) {
      res.status(400).json({
        message: 'setCode and cardNumber are required path parameters.',
      });
      return;
    }
    // Only OnePiece for now
    const gameName = 'OnePiece';
    const pk = `${gameName}#${setCode.toUpperCase()}`;
    const skPrefix = `CARD#${cardNumber}#`;

    const params = {
      TableName: 'collectibles-tcg-reference-data-dev',
      KeyConditionExpression: 'SetID = :pk AND begins_with(SK, :skPrefix)',
      ExpressionAttributeValues: {
        ':pk': pk,
        ':skPrefix': skPrefix,
      },
    };

    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items && response.Items.length > 0) {
      // Return all matching cards
      res.status(200).json({
        data: response.Items,
      });
    } else {
      res.status(404).json({ message: 'Card not found.' });
    }
  } catch (error) {
    console.error('Error retrieving card:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
