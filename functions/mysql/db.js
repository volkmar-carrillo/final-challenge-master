const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');

const secretsManager = new AWS.SecretsManager();

const getDbCredentials = async (secretName) => {
  const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
  return JSON.parse(secretValue.SecretString);
};

const getDbConnection = async () => {
  // AWS Secrets Manager
  const databaseRDSInformation = await getDbCredentials("database-rds-information");
  const databaseRDSSecurity = await getDbCredentials("rds!db-d40f12f5-1fce-45a2-b8b4-f2e9f06ed202");

  // MySQL Settings
  const connection = await mysql.createConnection({
    host: databaseRDSInformation.host,
    user: databaseRDSSecurity.username,
    password: databaseRDSSecurity.password,
    database: databaseRDSInformation.name,
    port: databaseRDSInformation.port,
  });
  return connection;
};

const getAllProducts = async (connection) => {
  const [rows] = await connection.execute('SELECT * FROM product');
  return rows;
};

const getTotalSalesByProduct = async (connection) => {
  const [rows] = await connection.execute('SELECT p.id AS product_id, p.name AS product_name, SUM(s.quantity) AS total_sales FROM product p LEFT JOIN sale s ON p.id = s.product_id GROUP BY p.id, p.name;');
  return rows;
};

const getProductWithHighestPrice = async (connection) => {
  const [rows] = await connection.execute('SELECT p.id AS product_id, p.name AS product_name, s.price FROM product p JOIN sale s ON p.id = s.product_id ORDER BY s.price DESC LIMIT 1;');
  return rows[0];
};

module.exports = {
  getDbConnection,
  getAllProducts,
  getTotalSalesByProduct,
  getProductWithHighestPrice,
};
