import mysql from 'mysql2/promise';

export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'Haris',
      database: 'QuoteDb',
      port: 3307,
      password: '123',
    });
    console.log('MySQL connection successful!');
    return connection;
  } catch (err) {
    console.error('MySQL connection failed:', err);
    throw err;
  }
}; 
