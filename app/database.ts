// database.ts
import { SQLiteDatabase } from 'expo-sqlite';

export const initDatabase = async (db: SQLiteDatabase) => {
    await db.execAsync(`
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
        time TEXT,
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
        );`
    )
};
