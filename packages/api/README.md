Descriptions and Usage

2.  Sets

    GET /v1/sets
    Fetch a list of all card sets. Use query parameters to filter and sort the results.

    GET /v1/sets/{setCode}
    Get detailed information about a specific set, including its associated cards if needed.

    POST /v1/sets
    Create a new set. Access to this endpoint should be secured and limited to authorized users.

    GET /v1/sets/{setCode}/cards
    Retrieve all cards within a specific set. Useful for clients that want to display all cards from a set.

3.  Cards

    GET /v1/cards
    Retrieve a list of cards across all sets and games. Supports filtering, sorting, and pagination.

    GET /v1/cards/{setCode}/{cardNumber}
    Fetch detailed information about a specific card.

    POST /v1/cards
    Create a new card. Should be restricted to authorized users.

    GET /v1/cards/search
    Perform advanced searches on cards using various criteria.

4.  Games (Optional)

    GET /v1/games
    Retrieve a list of all supported games. This can help clients dynamically display available games.

        // src/controllers/cardsController.ts

---

---

Explanation:

    Content-Type Header: Set to application/vnd.api+json as per JSON API.
    Response Structure: Wraps the data in a data object, including type, id, and attributes.
    Attributes: Contains version, endpoints, and documentation.

2.3. Integrate the Route into the Server

In your main server file (app.ts or server.ts):

typescript

import versionRoutes from './routes/versionRoutes';

// ... other imports and middleware

app.use(versionRoutes);

3. Implementing the /v1/games Endpoint
   3.1. Route Definition

src/routes/gamesRoutes.ts

typescript

import { Router } from 'express';
import { getGames } from '../controllers/gamesController';

const router: Router = Router();

router.get('/v1/games', getGames);

export default router;

3.2. Controller Implementation

src/controllers/gamesController.ts

typescript

import { Request, Response } from 'express';
import { getSupportedGames } from '../services/gamesService';

export const getGames = async (req: Request, res: Response) => {
try {
const games = await getSupportedGames();

    res.setHeader('Content-Type', 'application/vnd.api+json');

    const data = games.map((game) => ({
      type: 'games',
      id: game.toLowerCase(),
      attributes: {
        name: game,
      },
    }));

    res.status(200).json({ data });

} catch (error) {
console.error('Error retrieving games:', error);
res.setHeader('Content-Type', 'application/vnd.api+json');
res.status(500).json({
errors: [
{
status: '500',
title: 'Internal Server Error',
detail: 'An error occurred while retrieving the list of games.',
},
],
});
}
};

Explanation:

    Asynchronous Function: Uses async/await to handle asynchronous operations.
    Service Layer: Delegates the retrieval of games to a service function (getSupportedGames).
    Response Structure: Returns an array of game objects in the data array, each with type, id, and attributes.

3.3. Service Implementation

src/services/gamesService.ts

typescript

export const getSupportedGames = async (): Promise<string[]> => {
// In a real application, you might fetch this from a database or configuration file
return ['OnePiece', 'Pokemon', 'MagicTheGathering'];
};

Note: Currently returns a hardcoded list of games. Adjust as needed to fetch from a database or configuration.
3.4. Integrate the Route into the Server

In your main server file (app.ts or server.ts):

typescript

import gamesRoutes from './routes/gamesRoutes';

// ... other imports and middleware

app.use(gamesRoutes);

4. Testing the Endpoints
   4.1. Testing /v1 Endpoint

Request:

bash

GET http://localhost:3000/v1

Expected Response:

json

Headers:

    Content-Type: application/vnd.api+json

4.2. Testing /v1/games Endpoint

Request:

bash

GET http://localhost:3000/v1/games

Expected Response:

json

{
"data": [
{
"type": "games",
"id": "onepiece",
"attributes": {
"name": "OnePiece"
}
},
{
"type": "games",
"id": "pokemon",
"attributes": {
"name": "Pokemon"
}
},
{
"type": "games",
"id": "magicthegathering",
"attributes": {
"name": "MagicTheGathering"
}
}
]
}

{
"errors": [
{
"status": "500",
"title": "Internal Server Error",
"detail": "An error occurred while retrieving the list of games."
}
]
}

{
"data": {
"type": "cards",
"id": "CARD#064#91985f5d",
"attributes": {
"cardName": "Alvida",
"rarity": "Common",
"price": 0.13
},
"relationships": {
"set": {
"data": {
"type": "sets",
"id": "OnePiece#OP01"
}
}
}
},
"included": [
{
"type": "sets",
"id": "OnePiece#OP01",
"attributes": {
"setName": "Romance Dawn",
"releaseDate": "2024-09-01"
}
}
]
}

{
"data": [
{
"type": "cards",
"id": "CARD#064#91985f5d",
"attributes": {
"cardName": "Alvida",
"rarity": "Common",
"price": 0.13
},
"relationships": {
"set": {
"data": {
"type": "sets",
"id": "OnePiece#OP01"
}
}
}
}
],
"included": [
{
"type": "sets",
"id": "OnePiece#OP01",
"attributes": {
"setName": "Romance Dawn",
"releaseDate": "2024-09-01"
}
}
]
}

6.2. Steps to Implement

    Parse the include Parameter:
        Check if the include query parameter is present in the request.
        Support multiple includes by parsing comma-separated values (e.g., include=set,creator).

    Fetch Related Resources:
        Retrieve related resources based on the relationships defined in the primary data.
        Use existing services or functions to fetch related data.

    Construct the included Array:
        Format each related resource according to JSON API specifications.
        Ensure that each resource object in included has type, id, and attributes.

    Include Relationships in Primary Data:
        Add a relationships object to the primary resource(s) that reference the related resources.

7. Conclusion

The included section in JSON API responses is a powerful feature that allows servers to provide related resources in a single response. By leveraging this feature, you can optimize your API to be more efficient and client-friendly.

Key Takeaways:

    Purpose: The included section is used to embed related resources alongside primary data.
    Benefits: Reduces the number of API calls needed, improving performance.
    Implementation: Requires careful structuring of responses and consideration of client needs.

Next Steps:

    Implement included in Your API: Start by identifying relationships in your data models and updating your endpoints to support the include parameter.
    Update Documentation: Clearly document how clients can use the include parameter and which related resources are available.
    Performance Testing: Monitor the impact on response sizes and performance to ensure that including related resources doesn't negatively affect your API.

Feel free to ask if you need further assistance with implementing the included section or any other aspects of the JSON API specification!

import { Request, Response } from "express";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../clients/awsClients";
import { getSetById } from "../services/setsService"; // You'll need to implement this service

export const setCard = async (req: Request, res: Response) => {
try {
const { setCode, cardNumber } = req.params;
const { include } = req.query;

    if (!setCode || !cardNumber) {
      res.status(400).json({
        errors: [
          {
            status: '400',
            title: 'Bad Request',
            detail: 'setCode and cardNumber are required path parameters.',
          },
        ],
      });
      return;
    }
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
      const cards = response.Items.map(item => ({
        type: 'cards',
        id: item.SK,
        attributes: {
          cardName: item.CardName,
          rarity: item.Rarity,
          price: item.Price,
          setName: item.SetName,
          // other attributes...
        },
        relationships: {
          set: {
            data: {
              type: 'sets',
              id: item.SetID,
            },
          },
        },
      }));

      const responsePayload: any = { data: cards };

      if (include === 'set') {
        // Fetch set details
        const setId = cards[0].relationships.set.data.id;
        const set = await getSetById(setId);

        if (set) {
          responsePayload.included = [
            {
              type: 'sets',
              id: setId,
              attributes: {
                setName: set.SetName,
                // other set attributes...
              },
            },
          ];
        }
      }

      res.status(200).json(responsePayload);
    } else {
      res.status(404).json({
        errors: [
          {
            status: '404',
            title: 'Not Found',
            detail: 'Card not found.',
          },
        ],
      });
    }

} catch (error) {
console.error('Error retrieving card:', error);
res.status(500).json({
errors: [
{
status: '500',
title: 'Internal Server Error',
detail: 'An error occurred while retrieving the card.',
},
],
});
}
};
