CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(255),
    status boolean
);