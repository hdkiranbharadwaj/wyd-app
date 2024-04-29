-- To create Database
CREATE DATABASE IF NOT EXISTS wyd;

-- To create the users table 
CREATE OR REPLACE FUNCTION generate_unique_userid()
RETURNS TRIGGER AS $$
BEGIN
    NEW.userid := LEFT(MD5(random()::text), 5);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userid CHAR(5) UNIQUE NOT NULL,
    fullname VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER generate_userid_trigger
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION generate_unique_userid();


CREATE TABLE notes(
    statusid SERIAL PRIMARY KEY,
    userid VARCHAR(10),
    status VARCHAR(500),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userid) REFERENCES users(userid)
);



-- Create a function to delete records older than 24 hours
CREATE OR REPLACE FUNCTION delete_old_notes()
RETURNS void AS
$$
BEGIN
    DELETE FROM notes
    WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$
LANGUAGE plpgsql;

-- Schedule the function to run periodically
-- This example schedules it to run every hour
CREATE OR REPLACE FUNCTION schedule_delete_old_notes()
RETURNS void AS
$$
BEGIN
    LOOP
        PERFORM pg_sleep(3600); -- Sleep for 1 hour (3600 seconds)
        PERFORM delete_old_notes(); -- Call the function to delete old notes
    END LOOP;
END;
$$
LANGUAGE plpgsql;

-- Start the background process to execute the scheduled function
-- This ensures that the function runs even when there are no active connections to the database
SELECT pg_notify('schedule_delete_old_notes', '');