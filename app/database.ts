// database.ts
import { SQLiteDatabase } from 'expo-sqlite';

export const initDatabase = async (db: SQLiteDatabase) => {
    await db.execAsync(`
        DROP TABLE IF EXISTS category;
        DROP TABLE IF EXISTS person;
        DROP TABLE IF EXISTS meeting;
        DROP TABLE IF EXISTS one_time_reminder;
        DROP TABLE IF EXISTS recurring_reminder;

        CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS person (
        id INTEGER PRIMARY KEY NOT NULL,
        category_id INTEGER,
        name TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id)
        );

        CREATE TABLE IF NOT EXISTS meeting (
        id INTEGER PRIMARY KEY NOT NULL,
        person_id INTEGER,
        name TEXT NOT NULL,
        time DATETIME,
        FOREIGN KEY (person_id) REFERENCES person(id)
        );

        CREATE TABLE IF NOT EXISTS one_time_reminder (
        id INTEGER PRIMARY KEY NOT NULL,
        person_id INTEGER,
        name TEXT NOT NULL,
        time TEXT,
        FOREIGN KEY (person_id) REFERENCES person(id)
        );

        CREATE TABLE IF NOT EXISTS recurring_reminder (
        id INTEGER PRIMARY KEY NOT NULL,
        person_id INTEGER,
        frequency_count INTEGER,
        frequency_unit TEXT,
        frequency_start TEXT,
        FOREIGN KEY (person_id) REFERENCES person(id)
        );

        -- Seed data
        INSERT INTO category (id, name) VALUES
        (1, 'Work'),
        (2, 'Personal');

        INSERT INTO person (id, category_id, name) VALUES
        (1, 1, 'Alice Smith'),
        (2, 1, 'Bob Johnson'),
        (3, 2, 'Charlie Brown');

        INSERT INTO meeting (id, person_id, name, time) VALUES
        (1, 1, 'Weekly Sync', '2025-04-10 09:00'),
        (2, 2, 'Project Update', '2025-04-12 11:00');

        INSERT INTO one_time_reminder (id, person_id, name, time) VALUES
        (1, 3, 'Dentist Appointment', '2025-04-15 14:30'),
        (2, 2, 'Submit Report', '2025-04-14 17:00');

        INSERT INTO recurring_reminder (id, person_id, frequency_count, frequency_unit, frequency_start) VALUES
        (1, 1, 1, 'week', '2025-04-01'),
        (2, 3, 2, 'month', '2025-04-05');
    `)
};

export default { initDatabase }
