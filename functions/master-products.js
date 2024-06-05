module.exports.handler = async (event) => {
  try {
    const { products, minPrice } = JSON.parse(event.body);

    if (!Array.isArray(products) || typeof minPrice !== "number") {
      throw new Error("Invalid input");
    }

    const filteredProducts = products
      .filter((product) => product.price > minPrice)
      .map((product) => product.name.toUpperCase());

    return {
      statusCode: 200,
      body: JSON.stringify({ filteredProducts }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred", error: error }),
    };
  }
};
