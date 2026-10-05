CREATE TABLE settlements (
    id SERIAL PRIMARY KEY,

    group_id INTEGER NOT NULL
        REFERENCES groups(id)
        ON DELETE CASCADE,

    payer_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    receiver_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),

    settled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CHECK (payer_id <> receiver_id)
);