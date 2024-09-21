# Collectibles TCG Bot

The collectibles platform relys on TCG card reference data (and price). This bot scrapes the [TCG Player](https://www.tcgplayer.com/) site for the intial load of reference data, and to keep data up to date (ie price). Data is stored and can be referenced using our API.

## Storage Schema 

Table Name: TCG_Cards
Primary Key:

    Partition Key (PK): GameName#SetCode
    Sort Key (SK): ItemType#CardNumber

Attributes:

    GameName (e.g., "OnePiece", "Pokemon")
    SetCode (e.g., "OP02")
    SetName (e.g., "Paramount War")
    CardNumber (e.g., "001")
    Rarity
    Price
    CreatedAt
    UpdatedAt
    ItemType (e.g., "CARD", "SET")

Design Explanation:

    Composite Primary Key:
        The Partition Key combines GameName and SetCode to ensure uniqueness across all games and sets.
        The Sort Key uses ItemType#CardNumber, where ItemType distinguishes between cards and set metadata.

    Storing Cards and Sets Together:
        Set Metadata Entry:
            PK: GameName#SetCode
            SK: SET
            Attributes: SetName, CreatedAt, UpdatedAt
        Card Entries:
            PK: GameName#SetCode
            SK: CARD#CardNumber
            Attributes: Rarity, Price, CreatedAt, UpdatedAt

    Efficient Query Patterns:
        Get a Specific Card:
            Query with PK = GameName#SetCode and SK = CARD#CardNumber.
        Get All Cards in a Set:
            Query with PK = GameName#SetCode and SK BEGINS_WITH 'CARD#'.
        Get Set Metadata:
            Query with PK = GameName#SetCode and SK = 'SET'.

    Global Secondary Indexes (GSIs):
        GSI1 (By GameName):
            Partition Key: GameName
            Sort Key: SetCode#CardNumber
            Allows querying all cards in a specific game.
        GSI2 (By Rarity):
            Partition Key: Rarity
            Sort Key: GameName#SetCode#CardNumber
            Allows querying cards by rarity across all games and sets.
        GSI3 (By Price Range):
            Partition Key: PriceBucket (e.g., "0-10", "10-20")
            Sort Key: GameName#SetCode#CardNumber
            Facilitates efficient price range queries.

    Scalability Considerations:
        Even Data Distribution: Combining GameName and SetCode in the partition key helps distribute data evenly across partitions.
        Avoiding Hot Partitions: By ensuring that no single partition key receives a disproportionate amount of traffic, you prevent performance bottlenecks.

Benefits of This Design:

    Uniqueness Across All TCGs: The composite keys prevent collisions and ensure each card is uniquely identifiable.
    Flexible Querying: Supports efficient queries for various access patterns without the need for full table scans.
    Easily Extensible: Adding new games or sets doesn't require changes to the table schema.
    DynamoDB Best Practices: Aligns with DynamoDB's recommendations for composite keys and index usage.

Example Entries:

    Set Metadata Item:

    vbnet

PK: "OnePiece#OP02"
SK: "SET"
SetName: "Paramount War"
CreatedAt: "2023-01-01"
UpdatedAt: "2023-01-02"

Card Item:

vbnet

    PK: "OnePiece#OP02"
    SK: "CARD#001"
    Rarity: "Rare"
    Price: 15.00
    CreatedAt: "2023-01-01"
    UpdatedAt: "2023-01-02"

Handling Future Expansions:

    Adding New TCGs: Simply use the new game's name in the GameName attribute.
    Adding New Sets: Include the new SetCode and SetName as needed.
    Adding New Attributes: DynamoDB's schema-less design allows you to add new attributes without modifying existing items.

## ???
https://www.tcgplayer.com/sitemap/index.xml
https://www.tcgplayer.com/sitemap/one-piece-card-game.0.xml