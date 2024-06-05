USE `final-challenge-master-schema`;

CREATE TABLE product(
    id INT PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100)
);

CREATE TABLE sale (
    id INT PRIMARY KEY,
    product_id INT,
    date DATE,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (product_id) REFERENCES product(id)
);