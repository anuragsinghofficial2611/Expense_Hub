CREATE TABLE expense_splits (
    id SERIAL PRIMARY KEY,

    expense_id INTEGER NOT NULL
        REFERENCES expenses(id)
        ON DELETE CASCADE,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);