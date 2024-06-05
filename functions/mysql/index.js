const { getDbConnection, getAllProducts, getTotalSalesByProduct, getProductWithHighestPrice } = require('./db');

exports.handler = async (event) => {
  let connection;

  try {
    connection = await getDbConnection();

    const products = await getAllProducts(connection);
    const totalSales = await getTotalSalesByProduct(connection);
    const highestPricedProduct = await getProductWithHighestPrice(connection);

    const response = {
      products,
      totalSales,
      highestPricedProduct,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred", error: error }),
    };
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};
