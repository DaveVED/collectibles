```sql
-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE,
    email TEXT UNIQUE,
    image TEXT,
    bio TEXT,
    location TEXT,
    joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    next_auth_id INTEGER REFERENCES next_auth.users(id)
);

-- Create collections lookup table
CREATE TABLE IF NOT EXISTS public.collection_types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE
);

-- Populate the lookup table with predefined collection types
INSERT INTO public.collection_types (name) VALUES
    ('scarlet-and-violet'),
    ('romance-dawn');

-- Create collections table with reference to collection types
CREATE TABLE IF NOT EXISTS public.collections (
    id SERIAL PRIMARY KEY,
    collection_type_id INTEGER REFERENCES public.collection_types(id),
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example insertion of a collection
INSERT INTO public.collections (collection_type_id, user_id)
VALUES
    (1, 1);  -- Assuming scarlet-and-violet (ID=1) owned by user with ID=1

    CREATE TABLE IF NOT EXISTS public.cards (
    id SERIAL PRIMARY KEY,
    collection_id INTEGER REFERENCES public.collections(id),
    name TEXT,
    description TEXT,
    image_url TEXT,
    // Add more columns as needed
);

CREATE TABLE IF NOT EXISTS public.users_cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES public.cards(id),
    // Optionally, add additional columns like quantity owned, purchase date, etc.
);

INSERT INTO public.collections (collection_type_id, user_id)
VALUES
    (1, 1);  -- Assuming collection type (scarlet-and-violet) with ID=1, owned by user with ID=1

-- Inserting cards into a collection
INSERT INTO public.cards (collection_id, name, description, image_url)
VALUES
    (1, 'Card 1', 'Description of Card 1', '/images/card1.jpg'),
    (1, 'Card 2', 'Description of Card 2', '/images/card2.jpg');

-- Assuming user with ID=1 owns Card 1 and Card 2 from Collection 1
INSERT INTO public.users_cards (user_id, card_id)
VALUES
    (1, 1),  -- User 1 owns Card 1
    (1, 2);  -- User 1 owns Card 2

```



