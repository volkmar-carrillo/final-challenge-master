module.exports.handler = async (event) => {
  try {
    const { people } = JSON.parse(event.body);

    if (!Array.isArray(people)) {
      throw new Error("Invalid input");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(people.sort((a, b) => b.age - a.age)),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred", error: error }),
    };
  }
};
