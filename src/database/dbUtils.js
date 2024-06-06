import { Sequelize } from 'sequelize';

// Function to create a new database
export async function createDatabase(sequelize, databaseName) {
    try {
        // Connect to the default database
        await sequelize.authenticate();

        // Create the new database
        await sequelize.query(`CREATE DATABASE ${databaseName}`);

        console.log(`Database ${databaseName} created successfully.`);
    } catch (error) {
        console.error('Unable to create database:', error);
    }
}

// Connect to the default database
const defaultDB = 'postgresql://koag9:admin@localhost:5432/forum';
export const sequelize = new Sequelize(defaultDB, {
    define: {
        timestamps: false
    }
});
