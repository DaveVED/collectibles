Designing a well-structured and scalable API for your Trading Card Game (TCG) reference data is crucial for ensuring maintainability, flexibility, and ease of use. Below, I’ll outline a RESTful API design tailored to your requirements, covering endpoints for Cards and Sets, along with best practices for using path parameters and query parameters.

1. API Design Principles

Before diving into specific endpoints, it's essential to adhere to the following RESTful principles:

    Resource-Oriented URLs: Design URLs around resources (e.g., cards, sets) rather than actions.
    Use HTTP Methods Appropriately:
        GET: Retrieve data.
        POST: Create new data.
        PUT/PATCH: Update existing data.
        DELETE: Remove data.
    Statelessness: Each request should contain all the information necessary to process it.
    Consistent Naming Conventions: Use consistent plural nouns and case conventions (e.g., kebab-case or snake_case).
    Versioning: Incorporate versioning to manage changes over time (e.g., /v1/cards).

For your use case, we'll focus on GET endpoints since you’re primarily retrieving data. However, I’ll also outline other HTTP methods for completeness. 2. Base URL and Versioning

Start with a base URL that includes versioning. This approach allows you to introduce breaking changes in the future without disrupting existing clients.

arduino

https://api.yourdomain.com/v1/

3. Endpoints for Sets
   a. List All Sets

Endpoint:

bash

GET /v1/sets

Description: Retrieve a paginated list of all card sets.

Query Parameters:

    game (optional): Filter sets by game name (e.g., OnePiece, Pokemon).
    limit (optional): Number of items per page (default: 20, max: 100).
    nextToken (optional): Token for pagination.
    sortBy (optional): Attribute to sort by (e.g., releaseDate, setName).
    order (optional): Sorting order (asc or desc).

Example Request:

bash

GET /v1/sets?game=OnePiece&limit=50&sortBy=releaseDate&order=desc

Example Response:

json

{
"sets": [
{
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"releaseDate": "2024-05-01",
"createdAt": "2024-04-01T12:34:56Z",
"updatedAt": "2024-04-10T09:20:30Z"
},
// More sets...
],
"nextToken": "eyJwYWdlIjo1MH0="
}

b. Retrieve a Specific Set

Endpoint:

bash

GET /v1/sets/{setCode}

Description: Retrieve detailed information about a specific set identified by its setCode.

Path Parameters:

    setCode (required): Unique identifier for the set (e.g., OP02).

Example Request:

bash

GET /v1/sets/OP02

Example Response:

json

{
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"releaseDate": "2024-05-01",
"createdAt": "2024-04-01T12:34:56Z",
"updatedAt": "2024-04-10T09:20:30Z",
"cards": [
{
"cardNumber": "001",
"cardName": "Luffy",
"rarity": "Rare",
"price": 15.00,
"createdAt": "2024-05-15T08:00:00Z",
"updatedAt": "2024-05-16T10:15:30Z"
},
// More cards...
]
}

c. Create a New Set

Endpoint:

bash

POST /v1/sets

Description: Create a new card set. (Typically restricted to administrative users.)

Request Body:

json

{
"setCode": "OP03",
"setName": "New Adventures",
"game": "OnePiece",
"releaseDate": "2024-09-01"
}

Example Response:

json

{
"message": "Set OP03 created successfully.",
"set": {
"setCode": "OP03",
"setName": "New Adventures",
"game": "OnePiece",
"releaseDate": "2024-09-01",
"createdAt": "2024-08-15T10:00:00Z",
"updatedAt": "2024-08-15T10:00:00Z"
}
}

4. Endpoints for Cards
   a. List All Cards

Endpoint:

bash

GET /v1/cards

Description: Retrieve a paginated list of all cards, with optional filtering and sorting.

Query Parameters:

    game (optional): Filter cards by game name.
    setCode (optional): Filter cards by set code.
    rarity (optional): Filter cards by rarity (e.g., Common, Rare).
    priceMin and priceMax (optional): Filter cards within a price range.
    limit (optional): Number of items per page.
    nextToken (optional): Token for pagination.
    sortBy (optional): Attribute to sort by (e.g., price, cardName).
    order (optional): Sorting order (asc or desc).

Example Request:

bash

GET /v1/cards?game=OnePiece&setCode=OP02&rarity=Rare&priceMin=10&priceMax=20&limit=50&sortBy=price&order=asc

Example Response:

json

{
"cards": [
{
"cardNumber": "001",
"cardName": "Luffy",
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"rarity": "Rare",
"price": 15.00,
"createdAt": "2024-05-15T08:00:00Z",
"updatedAt": "2024-05-16T10:15:30Z"
},
// More cards...
],
"nextToken": "eyJwYWdlIjo1MH0="
}

b. Retrieve a Specific Card

Endpoint:

bash

GET /v1/cards/{setCode}/{cardNumber}

Description: Retrieve detailed information about a specific card identified by its setCode and cardNumber.

Path Parameters:

    setCode (required): Identifier for the set (e.g., OP02).
    cardNumber (required): Unique number of the card within the set (e.g., 001).

Example Request:

bash

GET /v1/cards/OP02/001

Example Response:

json

{
"cardNumber": "001",
"cardName": "Luffy",
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"rarity": "Rare",
"price": 15.00,
"createdAt": "2024-05-15T08:00:00Z",
"updatedAt": "2024-05-16T10:15:30Z",
"metadata": {
"abilities": ["Gear Fourth", "Haki"],
"description": "Monkey D. Luffy, the captain of the Straw Hat Pirates...",
// Additional metadata...
}
}

c. Create a New Card

Endpoint:

bash

POST /v1/cards

Description: Create a new card. (Typically restricted to administrative users.)

Request Body:

json

{
"setCode": "OP02",
"cardNumber": "002",
"cardName": "Zoro",
"rarity": "Common",
"price": 10.00,
"metadata": {
"abilities": ["Santoryu", "Haki"],
"description": "Roronoa Zoro, the swordsman of the Straw Hat Pirates...",
// Additional metadata...
}
}

Example Response:

json

{
"message": "Card OP02-002 created successfully.",
"card": {
"cardNumber": "002",
"cardName": "Zoro",
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"rarity": "Common",
"price": 10.00,
"createdAt": "2024-05-16T09:00:00Z",
"updatedAt": "2024-05-16T09:00:00Z",
"metadata": {
"abilities": ["Santoryu", "Haki"],
"description": "Roronoa Zoro, the swordsman of the Straw Hat Pirates..."
// Additional metadata...
}
}
}

5. Additional Endpoints and Features
   a. Search Cards

Endpoint:

bash

GET /v1/cards/search

Description: Provide more advanced search capabilities, such as full-text search or filtering on multiple attributes.

Query Parameters:

    query (required): Search term for card names or descriptions.
    game, setCode, rarity, priceMin, priceMax, etc. (optional): Additional filters.
    limit, nextToken, sortBy, order (optional): Pagination and sorting.

Example Request:

bash

GET /v1/cards/search?query=Luffy&game=OnePiece&limit=10

Example Response:

json

{
"cards": [
{
"cardNumber": "001",
"cardName": "Luffy",
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"rarity": "Rare",
"price": 15.00,
"createdAt": "2024-05-15T08:00:00Z",
"updatedAt": "2024-05-16T10:15:30Z"
},
// More matching cards...
],
"nextToken": "eyJwYWdlIjo1MH0="
}

Implementation Note: For advanced search features, consider integrating with AWS Amazon Elasticsearch Service (Amazon OpenSearch Service) or AWS DynamoDB Streams with AWS Lambda to maintain search indices.
b. Retrieve All Cards in a Set

Although this can be achieved with query parameters on /v1/cards, having a dedicated endpoint can simplify client interactions.

Endpoint:

bash

GET /v1/sets/{setCode}/cards

Description: Retrieve all cards belonging to a specific set.

Path Parameters:

    setCode (required): Identifier for the set (e.g., OP02).

Query Parameters:

    limit, nextToken, sortBy, order (optional): Pagination and sorting.

Example Request:

bash

GET /v1/sets/OP02/cards?limit=50&sortBy=cardNumber&order=asc

Example Response:

json

{
"cards": [
{
"cardNumber": "001",
"cardName": "Luffy",
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"rarity": "Rare",
"price": 15.00,
"createdAt": "2024-05-15T08:00:00Z",
"updatedAt": "2024-05-16T10:15:30Z"
},
// More cards...
],
"nextToken": "eyJwYWdlIjo1MH0="
}

c. Health Check and Metadata Endpoints

Health Check:

bash

GET /v1/health

Description: Check the health status of the API.

Example Response:

json

{
"status": "ok",
"timestamp": "2024-09-21T14:00:00Z"
}

API Metadata:

bash

GET /v1

Description: Retrieve API metadata, such as available endpoints, version, and documentation links.

Example Response:

json

{
"version": "v1",
"endpoints": [
"/v1/sets",
"/v1/sets/{setCode}",
"/v1/sets/{setCode}/cards",
"/v1/cards",
"/v1/cards/{setCode}/{cardNumber}",
"/v1/cards/search",
"/v1/health"
// More endpoints...
],
"documentation": "https://docs.yourdomain.com/api/v1"
}

6. Best Practices for Using Path and Query Parameters
   a. Path Parameters

Use When:

    Identifying a specific resource or a hierarchy of resources.
    The parameter is required to locate the resource.

Examples:

    /v1/sets/{setCode}
    /v1/cards/{setCode}/{cardNumber}
    /v1/sets/{setCode}/cards

Rationale: Path parameters define the resource's location within the API's resource hierarchy. They make the URL intuitive and meaningful.
b. Query Parameters

Use When:

    Filtering, sorting, or paginating resources.
    Optional parameters that refine the request.

Examples:

    /v1/cards?game=OnePiece&rarity=Rare
    /v1/sets?limit=50&sortBy=releaseDate
    /v1/cards/search?query=Luffy

Rationale: Query parameters provide flexibility in how resources are retrieved without altering the resource's identity. They are ideal for optional and dynamic criteria.
c. Combining Path and Query Parameters

You can combine both to create powerful and flexible endpoints. For example:

    Endpoint: /v1/sets/{setCode}/cards
    Query Parameters: rarity=Rare&priceMin=10&priceMax=20

Example Request:

bash

GET /v1/sets/OP02/cards?rarity=Rare&priceMin=10&priceMax=20

Example Response:

json

{
"cards": [
{
"cardNumber": "001",
"cardName": "Luffy",
"setCode": "OP02",
"setName": "Paramount War",
"game": "OnePiece",
"rarity": "Rare",
"price": 15.00,
"createdAt": "2024-05-15T08:00:00Z",
"updatedAt": "2024-05-16T10:15:30Z"
},
// More matching cards...
],
"nextToken": "eyJwYWdlIjo1MH0="
}

7. Implementing the API with TypeScript and AWS Lambda

Below is a high-level overview of how you might implement some of these endpoints using TypeScript with AWS Lambda and API Gateway. For brevity, I'll demonstrate two endpoints: Retrieve a Specific Card and List All Cards with Filtering.
Prerequisites

    AWS SDK for JavaScript (v3): Ensure you have the AWS SDK v3 installed.

    bash

    npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

    Serverless Framework or AWS SAM: Optional, but helpful for deploying Lambda functions and API Gateway.

a. Retrieve a Specific Card

Endpoint:

bash

GET /v1/cards/{setCode}/{cardNumber}

Lambda Function Example:

typescript

// getCard.ts

import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: 'your-region' });
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const handler: APIGatewayProxyHandler = async (event) => {
const { setCode, cardNumber } = event.pathParameters || {};

    if (!setCode || !cardNumber) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "setCode and cardNumber are required." }),
        };
    }

    const params = {
        TableName: "TCG_Cards",
        Key: {
            PK: `OnePiece#${setCode}`, // Adjust 'OnePiece' dynamically if supporting multiple games
            SK: `CARD#${cardNumber}`,
        },
    };

    try {
        const command = new GetCommand(params);
        const response = await docClient.send(command);

        if (!response.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Card not found." }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(response.Item),
        };
    } catch (error) {
        console.error("Error retrieving card:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." }),
        };
    }

};

b. List All Cards with Filtering

Endpoint:

bash

GET /v1/cards

Lambda Function Example:

typescript

// listCards.ts

import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: 'your-region' });
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const handler: APIGatewayProxyHandler = async (event) => {
const { game, setCode, rarity, priceMin, priceMax, limit = 20, nextToken, sortBy, order } = event.queryStringParameters || {};

    // Build DynamoDB parameters based on query
    let params: any = {
        TableName: "TCG_Cards",
        Limit: Number(limit),
    };

    let FilterExpression = '';
    let ExpressionAttributeValues: any = {};

    // Example: Filtering by game, setCode, rarity, and price range
    if (game) {
        FilterExpression += "game = :game";
        ExpressionAttributeValues[":game"] = game;
    }

    if (setCode) {
        FilterExpression += (FilterExpression ? " AND " : "") + "setCode = :setCode";
        ExpressionAttributeValues[":setCode"] = setCode;
    }

    if (rarity) {
        FilterExpression += (FilterExpression ? " AND " : "") + "rarity = :rarity";
        ExpressionAttributeValues[":rarity"] = rarity;
    }

    if (priceMin) {
        FilterExpression += (FilterExpression ? " AND " : "") + "price >= :priceMin";
        ExpressionAttributeValues[":priceMin"] = Number(priceMin);
    }

    if (priceMax) {
        FilterExpression += (FilterExpression ? " AND " : "") + "price <= :priceMax";
        ExpressionAttributeValues[":priceMax"] = Number(priceMax);
    }

    if (FilterExpression) {
        params.FilterExpression = FilterExpression;
        params.ExpressionAttributeValues = ExpressionAttributeValues;
    }

    // Handle pagination
    if (nextToken) {
        params.ExclusiveStartKey = JSON.parse(Buffer.from(nextToken, 'base64').toString('utf-8'));
    }

    try {
        // Decide whether to use Query or Scan
        // For simplicity, we'll use Scan here with filters
        // For better performance, design GSIs based on common query patterns
        const command = new ScanCommand(params);
        const response = await docClient.send(command);

        // Prepare nextToken if more items are available
        let newNextToken = null;
        if (response.LastEvaluatedKey) {
            newNextToken = Buffer.from(JSON.stringify(response.LastEvaluatedKey)).toString('base64');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                cards: response.Items,
                nextToken: newNextToken,
            }),
        };
    } catch (error) {
        console.error("Error listing cards:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." }),
        };
    }

};

Implementation Notes:

    Filter vs. Query: The above example uses a Scan operation with filters, which can be inefficient for large datasets. To optimize, consider using Query operations with Global Secondary Indexes (GSIs) tailored to your most frequent access patterns.
    Pagination: The example handles pagination using nextToken, which is encoded in Base64 to ensure it can be safely transmitted as a query parameter.
    Sorting: DynamoDB's Scan and Query operations have limited sorting capabilities. For complex sorting, consider integrating with Amazon OpenSearch Service or handling sorting at the application level.

8. Global Secondary Indexes (GSIs) for Enhanced Querying

To optimize your API for performance and cost, especially for endpoints that require filtering and sorting, implementing GSIs is essential. Below are some recommended GSIs based on common access patterns.
a. GSI for Filtering by Game and Set

Index Name: GameSet-index

Partition Key: game

Sort Key: setCode

Use Cases:

    Retrieve all sets for a specific game.
    Retrieve all cards within a specific game and set.

b. GSI for Filtering by Rarity

Index Name: Rarity-index

Partition Key: rarity

Sort Key: price (or another relevant attribute)

Use Cases:

    Retrieve all cards of a specific rarity.
    Retrieve cards of a specific rarity within a price range.

c. GSI for Price-Based Queries

Index Name: Price-index

Partition Key: price

Sort Key: cardNumber (or another relevant attribute)

Use Cases:

    Retrieve all cards within a specific price.
    Support range queries on price.

d. Implementation with GSIs

When using GSIs, adjust your Lambda functions to utilize the appropriate index for Query operations instead of Scan operations. Here's an example of querying using the Rarity-index.

Example Lambda Function for Filtering by Rarity:

typescript

// listCardsByRarity.ts

import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: 'your-region' });
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const handler: APIGatewayProxyHandler = async (event) => {
const { rarity, limit = 20, nextToken, sortBy, order } = event.queryStringParameters || {};

    if (!rarity) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "rarity parameter is required." }),
        };
    }

    const params = {
        TableName: "TCG_Cards",
        IndexName: "Rarity-index",
        KeyConditionExpression: "rarity = :rarity",
        ExpressionAttributeValues: {
            ":rarity": rarity,
        },
        Limit: Number(limit),
        // Optionally add ScanIndexForward based on 'order'
        ScanIndexForward: order === 'desc' ? false : true,
    };

    if (nextToken) {
        params.ExclusiveStartKey = JSON.parse(Buffer.from(nextToken, 'base64').toString('utf-8'));
    }

    try {
        const command = new QueryCommand(params);
        const response = await docClient.send(command);

        let newNextToken = null;
        if (response.LastEvaluatedKey) {
            newNextToken = Buffer.from(JSON.stringify(response.LastEvaluatedKey)).toString('base64');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                cards: response.Items,
                nextToken: newNextToken,
            }),
        };
    } catch (error) {
        console.error("Error querying cards by rarity:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error." }),
        };
    }

};

Benefits of Using GSIs:

    Performance: Query operations on GSIs are more efficient than Scan operations.
    Cost-Efficiency: Reduced read capacity consumption by avoiding full table scans.
    Flexibility: Support multiple access patterns without redesigning the primary table.

9. Security and Authentication

Ensure that your API is secure by implementing the following:

    Authentication and Authorization:
        Use AWS IAM, Cognito, or other authentication services to secure your endpoints.
        Implement role-based access control to restrict sensitive operations (e.g., creating or deleting cards and sets).

    Input Validation:
        Validate all incoming data to prevent injection attacks and ensure data integrity.
        Use libraries like Joi or Validator.js for robust validation.

    Rate Limiting and Throttling:
        Protect your API from abuse by implementing rate limiting using API Gateway’s built-in features.

    HTTPS Enforcement:
        Always use HTTPS to encrypt data in transit.

10. Documentation and Discoverability

Provide comprehensive documentation to ensure that developers can easily understand and interact with your API.

    API Documentation Tools:
        Swagger/OpenAPI: Define your API using the OpenAPI specification for interactive documentation.
        API Gateway Integration: If using AWS API Gateway, leverage its integration with Swagger for easy documentation.

    Examples and Tutorials:
        Offer example requests and responses for each endpoint.
        Provide tutorials or quick-start guides to help users get started.

    Versioning and Deprecation Notices:
        Clearly communicate version changes and deprecate old endpoints gracefully.

11. Monitoring and Logging

Implement robust monitoring and logging to maintain the health and performance of your API.

    AWS CloudWatch:
        Monitor Lambda function metrics (e.g., invocation count, duration, errors).
        Set up CloudWatch Alarms for critical metrics.

    Logging:
        Log all API requests and responses for debugging and auditing purposes.
        Use structured logging (e.g., JSON format) for easier analysis.

    Error Tracking:
        Implement centralized error tracking using tools like Sentry or Datadog.

12. Example API Specification Using OpenAPI

For clarity, here's a simplified OpenAPI (Swagger) specification for some of the endpoints discussed:

yaml

openapi: 3.0.0
info:
title: TCG Reference API
version: v1
servers:

- url: https://api.yourdomain.com/v1
  paths:
  /sets:
  get:
  summary: List all sets
  parameters: - in: query
  name: game
  schema:
  type: string
  description: Filter sets by game name - in: query
  name: limit
  schema:
  type: integer
  default: 20
  description: Number of items per page - in: query
  name: nextToken
  schema:
  type: string
  description: Token for pagination
  responses:
  '200':
  description: A list of sets
  content:
  application/json:
  schema:
  type: object
  properties:
  sets:
  type: array
  items:
  $ref: '#/components/schemas/Set'
  nextToken:
  type: string
  /sets/{setCode}:
  get:
  summary: Retrieve a specific set
  parameters: - in: path
  name: setCode
  required: true
  schema:
  type: string
  description: Unique identifier for the set
  responses:
  '200':
  description: A set object
  content:
  application/json:
  schema:
  $ref: '#/components/schemas/SetDetail'
  '404':
  description: Set not found
  /cards:
  get:
  summary: List all cards with optional filtering
  parameters: - in: query
  name: game
  schema:
  type: string
  description: Filter cards by game name - in: query
  name: setCode
  schema:
  type: string
  description: Filter cards by set code - in: query
  name: rarity
  schema:
  type: string
  description: Filter cards by rarity - in: query
  name: priceMin
  schema:
  type: number
  description: Minimum price - in: query
  name: priceMax
  schema:
  type: number
  description: Maximum price - in: query
  name: limit
  schema:
  type: integer
  default: 20
  description: Number of items per page - in: query
  name: nextToken
  schema:
  type: string
  description: Token for pagination
  responses:
  '200':
  description: A list of cards
  content:
  application/json:
  schema:
  type: object
  properties:
  cards:
  type: array
  items:
  $ref: '#/components/schemas/Card'
  nextToken:
  type: string
  /cards/{setCode}/{cardNumber}:
  get:
  summary: Retrieve a specific card
  parameters: - in: path
  name: setCode
  required: true
  schema:
  type: string
  description: Identifier for the set - in: path
  name: cardNumber
  required: true
  schema:
  type: string
  description: Unique number of the card within the set
  responses:
  '200':
  description: A card object
  content:
  application/json:
  schema:
  $ref: '#/components/schemas/CardDetail'
  '404':
  description: Card not found
  components:
  schemas:
  Set:
  type: object
  properties:
  setCode:
  type: string
  setName:
  type: string
  game:
  type: string
  releaseDate:
  type: string
  format: date
  SetDetail:
  type: object
  properties:
  setCode:
  type: string
  setName:
  type: string
  game:
  type: string
  releaseDate:
  type: string
  format: date
  cards:
  type: array
  items:
  $ref: '#/components/schemas/Card'
  Card:
  type: object
  properties:
  cardNumber:
  type: string
  cardName:
  type: string
  setCode:
  type: string
  setName:
  type: string
  game:
  type: string
  rarity:
  type: string
  price:
  type: number
  createdAt:
  type: string
  format: date-time
  updatedAt:
  type: string
  format: date-time
  CardDetail:
  type: object
  properties:
  cardNumber:
  type: string
  cardName:
  type: string
  setCode:
  type: string
  setName:
  type: string
  game:
  type: string
  rarity:
  type: string
  price:
  type: number
  createdAt:
  type: string
  format: date-time
  updatedAt:
  type: string
  format: date-time
  metadata:
  type: object
  properties:
  abilities:
  type: array
  items:
  type: string
  description:
  type: string

Usage:

    Use tools like Swagger UI or Redoc to render interactive documentation based on the OpenAPI specification.
    Integrate the specification with your API Gateway for seamless documentation and testing.

13. Summary and Best Practices
    a. Use Path Parameters for Hierarchical Resources

        Examples:
            /v1/sets/{setCode}
            /v1/cards/{setCode}/{cardNumber}

Rationale: Path parameters clearly define the resource hierarchy and make URLs intuitive.
b. Use Query Parameters for Filtering, Sorting, and Pagination

    Examples:
        /v1/cards?game=OnePiece&rarity=Rare
        /v1/sets?limit=50&sortBy=releaseDate

Rationale: Query parameters provide flexibility without complicating the URL structure. They allow clients to specify criteria dynamically.
c. Implement Pagination to Handle Large Datasets

    Approaches:
        Offset-Based Pagination: Simple but can be inefficient for large datasets.
        Token-Based Pagination: More efficient, especially with DynamoDB’s LastEvaluatedKey.

Recommendation: Use token-based pagination with nextToken to ensure scalability and performance.
d. Optimize for Performance with GSIs

    Strategy:
        Identify common query patterns.
        Design GSIs to support these patterns, enabling efficient Query operations.

Benefit: Reduces reliance on Scan operations, lowering latency and cost.
e. Secure Your API

    Best Practices:
        Implement authentication and authorization mechanisms.
        Validate and sanitize all inputs.
        Use HTTPS exclusively.

f. Provide Comprehensive Documentation

    Tools:
        OpenAPI/Swagger: For standardized, interactive documentation.
        API Gateway Documentation: Utilize built-in features if using AWS API Gateway.

Benefit: Enhances developer experience and reduces integration friction.
g. Monitor and Log API Usage

    Tools:
        AWS CloudWatch: For monitoring metrics and setting up alarms.
        Centralized Logging: Use services like Sentry, Datadog, or Logstash for advanced logging and error tracking.

Benefit: Ensures reliability, aids in troubleshooting, and helps in optimizing performance. 14. Final Thoughts

Designing a robust and scalable API involves careful consideration of resource modeling, endpoint structure, and performance optimizations. By adhering to RESTful principles, utilizing DynamoDB’s strengths with GSIs, and implementing best practices for security and documentation, you can create an API that effectively serves your TCG reference data needs and scales seamlessly as your user base grows.
Key Takeaways:

    Resource-Oriented Design: Focus on representing entities as resources with meaningful URLs.
    Efficient Data Access: Leverage DynamoDB’s GSIs to support diverse query patterns.
    Scalability and Performance: Implement pagination and optimize queries to handle large datasets.
    Security and Reliability: Ensure your API is secure, monitored, and well-documented.

Feel free to expand upon these endpoints and practices based on evolving requirements and additional features. If you have further questions or need more detailed implementations, don’t hesitate to ask!

import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => {
const isLambda = process.env.BUILD_ENV === 'lambda';

return {
entryPoints: isLambda ? ['src/lambda.ts'] : ['src/app.local.ts'],
clean: true,
format: ['cjs'],
minify: isLambda,
bundle: true,
target: 'node18',
outDir: 'dist',
external: isLambda ? ['aws-sdk'] : [], // Only exclude aws-sdk for Lambda
sourcemap: isLambda, // Disable sourcemaps for Lambda
dts: false, // Disable TypeScript declarations for Lambda
splitting: false, // Disable code splitting
...options,
};
});

Base URL and Versioning

    Base URL: https://api.yourdomain.com/v1

Endpoints Overview

1.  Health and Metadata Endpoints

    GET /v1/health

        Description: Check the health status of the API.

        Response Example:

        json

    {
    "status": "ok",
    "timestamp": "2024-09-21T14:00:00Z"
    }

GET /v1

    Description: Retrieve API metadata, such as available endpoints, version, and documentation links.

    Response Example:

    json

        {
          "version": "v1",
          "endpoints": [
            "/v1/sets",
            "/v1/sets/{setCode}",
            "/v1/sets/{setCode}/cards",
            "/v1/cards",
            "/v1/cards/{setCode}/{cardNumber}",
            "/v1/cards/search",
            "/v1/health"
          ],
          "documentation": "https://docs.yourdomain.com/api/v1"
        }

2.  Sets Endpoints

    GET /v1/sets
    Description: Retrieve a paginated list of all card sets.
    Query Parameters (optional):
    game: Filter sets by game name (e.g., OnePiece, Pokemon).
    limit: Number of items per page (default: 20, max: 100).
    nextToken: Token for pagination.
    sortBy: Attribute to sort by (e.g., releaseDate, setName).
    order: Sorting order (asc or desc).

    GET /v1/sets/{setCode}
    Description: Retrieve detailed information about a specific set identified by its setCode.
    Path Parameters:
    setCode: Unique identifier for the set (e.g., OP02).

    POST /v1/sets

        Description: Create a new card set. (Typically restricted to administrative users.)

        Request Body:

        json

        {
          "setCode": "OP03",
          "setName": "New Adventures",
          "game": "OnePiece",
          "releaseDate": "2024-09-01"
        }

3.  Cards Endpoints

    GET /v1/cards
    Description: Retrieve a paginated list of all cards, with optional filtering and sorting.
    Query Parameters (optional):
    game: Filter cards by game name.
    setCode: Filter cards by set code.
    rarity: Filter cards by rarity (e.g., Common, Rare).
    priceMin: Minimum price to filter cards.
    priceMax: Maximum price to filter cards.
    limit: Number of items per page.
    nextToken: Token for pagination.
    sortBy: Attribute to sort by (e.g., price, cardName).
    order: Sorting order (asc or desc).

    GET /v1/cards/{setCode}/{cardNumber}
    Description: Retrieve detailed information about a specific card identified by its setCode and cardNumber.
    Path Parameters:
    setCode: Identifier for the set (e.g., OP02).
    cardNumber: Unique number of the card within the set (e.g., 001).

    POST /v1/cards

        Description: Create a new card. (Typically restricted to administrative users.)

        Request Body:

        json

        {
          "setCode": "OP02",
          "cardNumber": "002",
          "cardName": "Zoro",
          "rarity": "Common",
          "price": 10.00,
          "metadata": {
            "abilities": ["Santoryu", "Haki"],
            "description": "Roronoa Zoro, the swordsman of the Straw Hat Pirates..."
          }
        }

    GET /v1/sets/{setCode}/cards
    Description: Retrieve all cards belonging to a specific set.
    Path Parameters:
    setCode: Identifier for the set.
    Query Parameters (optional):
    limit: Number of items per page.
    nextToken: Token for pagination.
    sortBy: Attribute to sort by (e.g., cardNumber, cardName).
    order: Sorting order (asc or desc).

    GET /v1/cards/search
    Description: Provide advanced search capabilities for cards.
    Query Parameters:
    query: Search term for card names or descriptions.
    game, setCode, rarity, priceMin, priceMax, etc.: Additional filters.
    limit: Number of items per page.
    nextToken: Token for pagination.
    sortBy: Attribute to sort by.
    order: Sorting order (asc or desc).

4.  Additional Endpoints

    GET /v1/games (Optional)

        Description: Retrieve a list of supported games.

        Response Example:

        json

        {
          "games": ["OnePiece", "Pokemon", "MagicTheGathering"]
        }

Summary of Endpoints

Here's a summarized list for quick reference:

    Health and Metadata:
        GET /v1/health
        GET /v1

    Sets:
        GET /v1/sets
        GET /v1/sets/{setCode}
        POST /v1/sets
        GET /v1/sets/{setCode}/cards

    Cards:
        GET /v1/cards
        GET /v1/cards/{setCode}/{cardNumber}
        POST /v1/cards
        GET /v1/cards/search

    Games (Optional):
        GET /v1/games

Descriptions and Usage

1.  Health and Metadata

    GET /v1/health
    Use this endpoint to check if the API is running and healthy.

    GET /v1
    Retrieve general information about the API, including available endpoints and documentation links.

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

import { Request, Response } from "express";
import { getCardsBySetCodeAndCardNumber } from "../services/cardsService";

export const getCards = async (req: Request, res: Response) => {
try {
const { setCode, cardNumber } = req.params;

    if (!setCode || !cardNumber) {
      res.setHeader("Content-Type", "application/vnd.api+json");
      res.status(400).json({
        errors: [
          {
            status: "400",
            title: "Bad Request",
            detail: "setCode and cardNumber are required path parameters.",
          },
        ],
      });
      return;
    }

    const gameName = "OnePiece"; // Adjust as needed
    const items = await getCardsBySetCodeAndCardNumber(
      gameName,
      setCode,
      cardNumber
    );

    res.setHeader("Content-Type", "application/vnd.api+json");

    if (items && items.length > 0) {
      const cards = items.map((item) => ({
        type: "cards",
        id: item.SK,
        attributes: {
          SetID: item.SetID,
          CardName: item.CardName,
          // ... other attributes
        },
      }));

      res.status(200).json({ data: cards });
    } else {
      res.status(404).json({
        errors: [
          {
            status: "404",
            title: "Not Found",
            detail: "Card not found.",
          },
        ],
      });
    }

} catch (error) {
console.error("Error in getCards:", error);
res.setHeader("Content-Type", "application/vnd.api+json");
res.status(500).json({
errors: [
{
status: "500",
title: "Internal Server Error",
detail: "An error occurred while retrieving the card.",
},
],
});
}
};

// src/services/cardsService.ts

import { docClient } from "../clients/awsClients";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { TABLE_NAME } from "../config";

export const getCardsBySetCodeAndCardNumber = async (
gameName: string,
setCode: string,
cardNumber: string
) => {
const pk = `${gameName}#${setCode.toUpperCase()}`;
const skPrefix = `CARD#${cardNumber}#`;

const params = {
TableName: TABLE_NAME,
KeyConditionExpression: "SetID = :pk AND begins_with(SK, :skPrefix)",
ExpressionAttributeValues: {
":pk": pk,
":skPrefix": skPrefix,
},
};

const command = new QueryCommand(params);
const response = await docClient.send(command);
return response.Items;
};

Implementing the /v1 and /v1/games Endpoints Following JSON API Best Practices

Objective:

Create the /v1 and /v1/games endpoints in your Express.js application, adhering to the JSON API specification. These endpoints will:

    GET /v1: Provide API metadata, such as available endpoints and documentation links.
    GET /v1/games: Return a list of supported games.

1. Setting Up the Endpoints
   1.1. Define the Routes

Create a new route file for versioning and games:

    src/routes/versionRoutes.ts for the /v1 endpoint.
    src/routes/gamesRoutes.ts for the /v1/games endpoint.

1.2. Update the Server Configuration

Ensure your main server file includes these new routes. 2. Implementing the /v1 Endpoint
2.1. Route Definition

src/routes/versionRoutes.ts

typescript

import { Router } from 'express';
import { getApiMetadata } from '../controllers/versionController';

const router: Router = Router();

router.get('/v1', getApiMetadata);

export default router;

2.2. Controller Implementation

src/controllers/versionController.ts

typescript

import { Request, Response } from 'express';

export const getApiMetadata = (req: Request, res: Response) => {
res.setHeader('Content-Type', 'application/vnd.api+json');

const data = {
data: {
type: 'metadata',
id: 'api-metadata',
attributes: {
version: 'v1',
endpoints: [
'/v1/sets',
'/v1/sets/{setCode}',
'/v1/sets/{setCode}/cards',
'/v1/cards',
'/v1/cards/{setCode}/{cardNumber}',
'/v1/cards/search',
'/v1/health',
'/v1/games',
],
documentation: 'https://docs.yourdomain.com/api/v1',
},
},
};

res.status(200).json(data);
};

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

{
"data": {
"type": "metadata",
"id": "api-metadata",
"attributes": {
"version": "v1",
"endpoints": [
"/v1/sets",
"/v1/sets/{setCode}",
"/v1/sets/{setCode}/cards",
"/v1/cards",
"/v1/cards/{setCode}/{cardNumber}",
"/v1/cards/search",
"/v1/health",
"/v1/games"
],
"documentation": "https://docs.yourdomain.com/api/v1"
}
}
}

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

Headers:

    Content-Type: application/vnd.api+json

5.  Adhering to JSON API Best Practices
    5.1. Content-Type Header

        Always set the Content-Type header to application/vnd.api+json for both requests and responses.

5.2. Response Structure

    Data Object: Contains either a single resource object or an array of resource objects.
    Resource Objects: Must include type and id fields.
    Attributes: Any additional data should be nested under the attributes object.

5.3. Error Handling

    Errors should be returned in an errors array.
    Each error object may include status, title, and detail.

Example Error Response:

json

{
"errors": [
{
"status": "500",
"title": "Internal Server Error",
"detail": "An error occurred while retrieving the list of games."
}
]
}

5.4. Consistency

    Use consistent casing and naming conventions throughout your API (e.g., camelCase or snake_case).
    In the examples, we've used camelCase for JSON keys.

6.  Additional Recommendations
    6.1. Environment Variables and Configuration

        Endpoints and Documentation Links: Consider generating the list of endpoints dynamically or storing them in a configuration file.
        Base URL: If your API's base URL changes, update it in one place to reflect across all endpoints.

6.2. Dynamic Data Retrieval

    Supported Games: Fetch the list of supported games from your database to ensure it stays up-to-date.
    Versioning: If you have multiple API versions, make sure the version information is accurate.

6.3. Middleware for Content-Type

To ensure the Content-Type header is set for all responses, you can create middleware:

typescript

// src/middleware/jsonApiMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const setJsonApiContentType = (
req: Request,
res: Response,
next: NextFunction
) => {
res.setHeader('Content-Type', 'application/vnd.api+json');
next();
};

Use in Server:

typescript

import { setJsonApiContentType } from './middleware/jsonApiMiddleware';

app.use(setJsonApiContentType);

6.4. Versioning Strategy

    Route Versioning: Keep versioning in your routes to manage breaking changes.
    Deprecation Notices: Provide deprecation headers or messages for outdated endpoints.

6.5. Documentation

    Use tools like Swagger or OpenAPI to document your API.
    Provide examples and usage instructions for developers.

7. Example Project Structure

css

src/
├── app.ts
├── controllers/
│ ├── gamesController.ts
│ └── versionController.ts
├── middleware/
│ └── jsonApiMiddleware.ts
├── routes/
│ ├── gamesRoutes.ts
│ └── versionRoutes.ts
├── services/
│ └── gamesService.ts
└── utils/
└── errorHandler.ts

8. Conclusion

You've now implemented the /v1 and /v1/games endpoints following JSON API best practices:

    Consistent Response Format: Adhering to the JSON API specification ensures consistency and predictability for API consumers.
    Centralized Middleware: Setting headers via middleware simplifies header management.
    Scalable Structure: The modular approach makes it easier to add new endpoints and features.

Next Steps:

    Implement Remaining Endpoints: Apply the same principles to your other endpoints (/v1/sets, /v1/cards, etc.).
    Error Handling Enhancements: Standardize error handling across all controllers.
    Data Validation: Use validation libraries like Joi or Yup to validate incoming requests.
    Testing: Write unit and integration tests to ensure your endpoints work as expected.

Feel free to reach out if you need assistance with further implementations or have any questions!
You said:
included what is this section normall used for?
ChatGPT

Understanding the included Section in JSON API Responses

Question:

In the context of the JSON API specification, what is the included section normally used for?

Answer:

The included section in a JSON API response is used to include related resources along with the primary data in a single response. This practice, often referred to as "side-loading," helps reduce the number of API calls a client needs to make to retrieve related data, improving efficiency and performance.

1. Purpose of the included Section
   1.1. Relationship Data

In APIs, resources often have relationships with other resources. For example, a card might belong to a set, or a post might have comments. The included section allows these related resources to be embedded directly in the response.
1.2. Reducing Network Requests

Without the included section, clients would need to make additional requests to fetch related resources. By including them, you minimize the number of round trips to the server. 2. Structure of the included Section

The included section is an array of resource objects that are related to the primary data but are not directly part of it.

Example JSON API Response with included Section:

json

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

3. When to Use the included Section
   3.1. Client-Side Needs

Use the included section when:

    Clients need related resources: If the client requires related data to display or process, including it reduces additional API calls.
    Improving Performance: Reduces latency and overhead associated with multiple network requests.

3.2. Sparse Fieldsets and Inclusion of Resources

Clients can request specific related resources using the include query parameter.

Example Request:

bash

GET /v1/cards/OP01/064?include=set

Explanation:

    The client is requesting the card resource and asking the server to include the related set resource.

4. Implementing the included Section
   4.1. Modify the Controller to Support include Parameter

Example Controller Update:

typescript

// src/controllers/cardsController.ts

import { Request, Response } from 'express';
import { getSetById } from '../services/setsService';

export const getCards = async (req: Request, res: Response) => {
try {
const { setCode, cardNumber } = req.params;
const { include } = req.query;

    // ... existing code to get the card(s)

    const responsePayload: any = { data: cards };

    // Check if 'include' parameter is present
    if (include === 'set') {
      // Fetch the related set data
      const setId = cards[0].attributes.SetID;
      const set = await getSetById(setId);

      if (set) {
        responsePayload.included = [
          {
            type: 'sets',
            id: setId,
            attributes: {
              setName: set.setName,
              releaseDate: set.releaseDate,
              // ... other set attributes
            },
          },
        ];
      }
    }

    res.status(200).json(responsePayload);

} catch (error) {
// ... error handling
}
};

4.2. Defining Relationships in Resource Objects

    Include a relationships object in your resource data to define the relationship between resources.

Example:

json

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
}
}

5.  Best Practices for Using the included Section
    5.1. Allow Clients to Specify Included Resources

        Use Query Parameters: Let clients request specific related resources via the include query parameter.
        Example: GET /v1/cards/OP01/064?include=set

5.2. Avoid Overloading Responses

    Limit Included Resources: Be cautious about including too much data, which can lead to large response sizes and performance issues.
    Depth of Inclusion: Consider limiting the depth of nested includes.

5.3. Consistency in Relationships

    Uniform Resource Identification: Use consistent type and id values for related resources.
    Define Relationships Clearly: Make sure that the relationships object accurately represents the associations.

6. Example of Using included in Your API
   6.1. Endpoint Implementation

Request:

bash

GET /v1/cards/OP01/064?include=set

Response:

json

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
