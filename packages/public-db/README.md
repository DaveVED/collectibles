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
CREATE TABLE public.collection_types (
    id SERIAL PRIMARY KEY,
    name TEXT,
    language TEXT,
    UNIQUE (name, language)
);

-- English collections
INSERT INTO public.collection_types (name, language) VALUES
('[OP-01] ROMANCE DAWN', 'English'),
('[OP-02] PARAMOUNT WAR', 'English'),
('[OP-05] Awakening of the New Era', 'English'),
('[SV] Scarlet & Violet 151', 'English');

-- Japanese collections
INSERT INTO public.collection_types (name, language) VALUES
('[OP-01] ROMANCE DAWN', 'Japanese'),
('[OP-02] PARAMOUNT WAR', 'Japanese'),
('[OP-05] Awakening of the New Era', 'Japanese'),
('[SV] Scarlet & Violet 151', 'Japanese');

-- Create collections table with reference to collection types
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    collection_type_id INTEGER REFERENCES public.collection_types(id),
    user_id UUID REFERENCES public.users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.users_cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES public.cards(id),
    // Optionally, add additional columns like quantity owned, purchase date, etc.
);

```
