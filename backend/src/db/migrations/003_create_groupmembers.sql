CREATE TABLE group_members (
    id SERIAL PRIMARY KEY,

    group_id INTEGER NOT NULL
        REFERENCES groups(id)
        ON DELETE CASCADE,

    user_id INTEGER NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (group_id, user_id)
);