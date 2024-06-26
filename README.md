# **Lambda + SQL Challenge**

> **Nota:** No es obligatorio instalar recursos para probar estas implementaciones, todo está alojado en los servicios AWS (Database, Lambdas, ApiGateway, Secrets). Aunque si desea usar estas implementaciones en su cuenta puede realizar lo siguiente:
>
> - Clonar este proyecto
> - `npm install` - Instalar las dependencias necesarias del proyecto
> - Configurar su AWS Local, consulte en https://docs.aws.amazon.com/es_es/cli/latest/userguide/cli-chap-configure.html
> - `npx serverless deploy` - Desplegará todos los recursos (excepto base de datos y secretos) en su cuenta AWS
> - Crear manualmente en su cuenta AWS la BD RDS con motor MySQL Community (en la raíz del proyecto se proporciona el esquema y data de prueba)
> - Según la configuración de la BD, RDS crea los secretos (username y password) únicamente administrados por dicho servicio, puede crear nuevos secretos para las demás environments de configuración

## **Sección 1: Funciones Lambda**

### **Tarea 1: Filtrar y Transformar Datos**
**Descripción:** Dado objeto con información de productos en una tienda, escribe una función lambda que filtre los productos cuyo precio sea mayor a $10.000 y que devuelva una lista con los nombres de esos productos en mayúsculas.

**PROPUESTA DE SOLUCIÓN**

Se crea la lambda `final-challenge-dev-master-products` en un entorno ServerlessFramework configurada con un desencadenador APIGateway.

![alt_text](/assets/section01/lambda_products.png)

Para la solución de este ejercicio se opta por una combinación de `filter` y `map` para obtener los resultados esperados, si bien, esta combinación nos ofrece una complejidad algorítmica de `O(n)`

```js
const filteredProducts = products
      .filter((product) => product.price > minPrice)
      .map((product) => product.name.toUpperCase());
```

Para probar esta lambda se puede hacer consumo mediante Postman con la siguiente información:

**Endpoint:** https://1urhkd6mbe.execute-api.us-east-2.amazonaws.com/dev/products

**Method:** POST

**BODY:** raw/JSON

***Request:***
- **minPrice:** Rango mínimo de los productos a consultar (Ej: price > minPrice)
- **products:** Array de productos (de prueba en este caso)
```json
{
  "minPrice": 10000,
  "products": [
    {
      "name": "Auriculares Xiaomi Basic",
      "price": 12000
    },
    {
      "name": "Funda para Smartphone",
      "price": 6000
    },
    {
      "name": "Cargador Rápido USB",
      "price": 15000
    },
    {
      "name": "Memoria USB 32GB SanDisk",
      "price": 18000
    },
    {
      "name": "Lámpara LED de Escritorio",
      "price": 12000
    },
    {
      "name": "Cuaderno Argollado",
      "price": 5000
    },
    {
      "name": "Termo de Agua 500ml",
      "price": 8000
    },
    {
      "name": "Mouse Inalámbrico Logitech",
      "price": 15000
    },
    {
      "name": "Teclado USB HP",
      "price": 20000
    },
    {
      "name": "Altavoz Bluetooth Portátil",
      "price": 15000
    },
    {
      "name": "Protector de Pantalla para Smartphone",
      "price": 8000
    },
    {
      "name": "Calculadora Científica Casio",
      "price": 18000
    },
    {
      "name": "Audífonos Estéreo Panasonic",
      "price": 18000
    },
    {
      "name": "Organizador de Escritorio",
      "price": 10000
    },
    {
      "name": "Portarretratos Digital",
      "price": 20000
    },
    {
      "name": "Almohada Cervical",
      "price": 16000
    },
    {
      "name": "Botella Deportiva 1L",
      "price": 7000
    },
    {
      "name": "Cámara Web USB",
      "price": 19000
    },
    {
      "name": "Kit de Limpieza para Laptop",
      "price": 10000
    },
    {
      "name": "Base Enfriadora para Laptop",
      "price": 14000
    }
  ]
}
```

***Response:***
- **filteredProducts:** Array con los nombres (en mayúscula) de los productos con precio mayor a 10000.
```json
{
    "filteredProducts": [
        "AURICULARES XIAOMI BASIC",
        "CARGADOR RÁPIDO USB",
        "MEMORIA USB 32GB SANDISK",
        "LÁMPARA LED DE ESCRITORIO",
        "MOUSE INALÁMBRICO LOGITECH",
        "TECLADO USB HP",
        "ALTAVOZ BLUETOOTH PORTÁTIL",
        "CALCULADORA CIENTÍFICA CASIO",
        "AUDÍFONOS ESTÉREO PANASONIC",
        "PORTARRETRATOS DIGITAL",
        "ALMOHADA CERVICAL",
        "CÁMARA WEB USB",
        "BASE ENFRIADORA PARA LAPTOP"
    ]
}
```

![alt_text](/assets/section01/lambda_products_postman.png)

### **Tarea 2: Ordenar Datos**
**Descripción:** Escribe una función lambda para ordenar una lista de tuplas (nombre, edad) en orden descendente por edad.

**PROPUESTA DE SOLUCIÓN**

Se crea la lambda `final-challenge-dev-master-people` en un entorno ServerlessFramework configurada con un desencadenador APIGateway.

![alt_text](/assets/section01/lambda_people.png)

Para la solución de este ejercicio se opta por usar el método de ordenamiento sort ya que dependiendo del navegador (en sus últimas versiones) emplea buenos métodos de ordenamiento como Timsort. https://stackoverflow.com/questions/57763205/what-is-array-prototype-sort-time-complexity 

```js
people.sort((a, b) => b.age - a.age)
```

Para probar esta lambda se puede hacer consumo mediante Postman con la siguiente información:

**Endpoint:** https://1urhkd6mbe.execute-api.us-east-2.amazonaws.com/dev/people

**Method:** POST

**BODY:** raw/JSON

***Request:***
- **people:** Array de objetos (`name`, `age`, de prueba en este caso)
```json
{
  "people": [
    {
      "name": "Alice",
      "age": 25
    },
    {
      "name": "Bob",
      "age": 30
    },
    {
      "name": "Charlie",
      "age": 22
    },
    {
      "name": "David",
      "age": 35
    },
    {
      "name": "Eve",
      "age": 28
    },
    {
      "name": "Frank",
      "age": 40
    },
    {
      "name": "Grace",
      "age": 27
    },
    {
      "name": "Hannah",
      "age": 24
    },
    {
      "name": "Ivy",
      "age": 31
    },
    {
      "name": "Jack",
      "age": 29
    },
    {
      "name": "Kathy",
      "age": 32
    },
    {
      "name": "Leo",
      "age": 26
    },
    {
      "name": "Mona",
      "age": 33
    },
    {
      "name": "Nick",
      "age": 23
    },
    {
      "name": "Olivia",
      "age": 21
    },
    {
      "name": "Paul",
      "age": 34
    },
    {
      "name": "Quinn",
      "age": 36
    },
    {
      "name": "Rachel",
      "age": 30
    },
    {
      "name": "Steve",
      "age": 38
    },
    {
      "name": "Tina",
      "age": 25
    }
  ]
}
```

***Response:***
- Array ordenado por edad descendentemente
```json
[
    {
        "name": "Frank",
        "age": 40
    },
    {
        "name": "Steve",
        "age": 38
    },
    {
        "name": "Quinn",
        "age": 36
    },
    {
        "name": "David",
        "age": 35
    },
    {
        "name": "Paul",
        "age": 34
    },
    {
        "name": "Mona",
        "age": 33
    },
    {
        "name": "Kathy",
        "age": 32
    },
    {
        "name": "Ivy",
        "age": 31
    },
    {
        "name": "Bob",
        "age": 30
    },
    {
        "name": "Rachel",
        "age": 30
    },
    {
        "name": "Jack",
        "age": 29
    },
    {
        "name": "Eve",
        "age": 28
    },
    {
        "name": "Grace",
        "age": 27
    },
    {
        "name": "Leo",
        "age": 26
    },
    {
        "name": "Alice",
        "age": 25
    },
    {
        "name": "Tina",
        "age": 25
    },
    {
        "name": "Hannah",
        "age": 24
    },
    {
        "name": "Nick",
        "age": 23
    },
    {
        "name": "Charlie",
        "age": 22
    },
    {
        "name": "Olivia",
        "age": 21
    }
]
```

![alt_text](/assets/section01/lambda_people_postman.png)

## **Sección 2: Consultas SQL**

### **Tarea 1: Consultas de Agregación**
**Descripción:** Dada la siguiente estructura de tablas en una base de datos de ventas, escribe una consulta SQL que devuelva el total de ventas por categoría de producto y por mes, junto con el porcentaje de crecimiento respecto al mes anterior.

```sql
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
```

**Instrucciones:**

1. La consulta debe agrupar las ventas por categoría de producto y por mes.
2. Debe calcular el total de ventas (en términos monetarios) por cada categoría y mes.
3. Debe incluir una columna adicional que muestre el porcentaje de crecimiento del total de ventas respecto al mes anterior para cada categoría.

***Output Esperado:*** Deberías obtener un resultado con columnas: `category`, `month`, `total_sales`, `growth_percentage`.

**PROPUESTA DE SOLUCIÓN**

Se crea la Base de Datos con el Schema de Tablas proporcionado en el servicio de `AWS RDS` usando el Motor de **MySQL Community** ***(Esta base de datos nos servirá para la sección siguiente)***

***A tener en cuenta: Actualmente la BD está configurada con un grupo de seguridad con reglas de entrada y salida que permite el acceso a cualquier IP (esto no es una práctica recomendada, pero es con fines de pruebas y acceso más fácil)***

![alt_text](/assets/section02/rds-console.png)

Para la solución, se descomponen las consultas de la siguiente manera:

**SQL encargada de calcular las ventas mensuales por categoría de producto**
```sql
SELECT 
    p.category,
    DATE_FORMAT(s.date, '%Y-%m') AS month,
    SUM(s.quantity * s.price) AS total_sales
FROM sale s
JOIN product p 
ON s.product_id = p.id
GROUP BY 
    p.category,
    DATE_FORMAT(s.date, '%Y-%m');
```

**SQL encargada de identificar las ventas mensuales y del mes anterior por categoría de producto**
```sql
SELECT 
    category,
    month,
    total_sales,
    -- https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html#function_lag
    -- Obtiene el/los n registro(s) anterior(es)
    LAG(total_sales, 1) OVER (PARTITION BY category ORDER BY month) AS previous_month_sales
    -- sales_by_category_month -> Resultado del SQL anterior
FROM sales_by_category_month;
```

**SQL encargada de identificar el porcentaje de crecimiento del total de ventas respecto al mes anterior por categoría de producto**
```sql
SELECT 
    category,
    month,
    total_sales,
    -- https://nextscenario.com/es/formula-del-porcentaje-de-crecimiento-un-analisis-detallado/
    ROUND((total_sales - previous_month_sales) / previous_month_sales * 100, 2) AS growth_percentage
    -- sales_with_growth -> Resultado del SQL anterior
FROM sales_with_growth
ORDER BY 
    category, 
    month;
```

**SQL agrupada para obtener solución al cálculo del porcentaje de crecimiento del total de ventas respecto al mes anterior por categoría de producto**
```sql
WITH sales_by_category_month AS (
    SELECT 
        p.category,
        DATE_FORMAT(s.date, '%Y-%m') AS month,
        SUM(s.quantity * s.price) AS total_sales
    FROM sale s
    JOIN product p 
    ON s.product_id = p.id
    GROUP BY 
        p.category, 
        DATE_FORMAT(s.date, '%Y-%m')
),
sales_with_growth AS (
    SELECT 
        category,
        month,
        total_sales,
        LAG(total_sales, 1) OVER (PARTITION BY category ORDER BY month) AS previous_month_sales
    FROM sales_by_category_month
)
SELECT 
    category,
    month,
    total_sales,
    ROUND((total_sales - previous_month_sales) / previous_month_sales * 100, 2) AS growth_percentage
FROM sales_with_growth
ORDER BY 
    category, 
    month;
```

**Pruebas SQL**
![alt_text](/assets/section02/sql.png)

***IMPORTANTE:** En la raiz del proyecto se proporciona data de prueba para estas consultas `data`.*


## **Sección 3: Conexiones a Bases de Datos con Node.js en AWS Lambda**

### **Tarea 1: Conexión a una Base de Datos MySQL desde AWS Lambda**
**Descripción:** Crea una función Lambda en Node.js que se conecte a una base de datos MySQL, realice varias consultas y devuelva los resultados combinados como una respuesta JSON. La lógica de acceso a la base de datos debe estar implementada en un archivo separado del archivo principal de la función Lambda.

***Requisitos:***
1. La función debe utilizar la biblioteca `mysql2` para manejar la conexión a `MySQL`.
2. La configuración de la conexión (`host`, `user`, `password`, `database`, etc.) debe estar almacenada en `AWS Secrets Manager`.
3. Crea un archivo `db.js` que maneje la conexión y las consultas a la base de datos.
4. La función principal en `index.js` debe realizar las siguientes consultas a través de las funciones definidas en `db.js`:
    - Obtener todos los productos.
    - Obtener la cantidad total de ventas por producto.
    - Obtener el producto con el precio más alto.
5. Combina los resultados de las consultas en un solo objeto JSON y
devuélvelo.

**PROPUESTA DE SOLUCIÓN**

Se crea la lambda `final-challenge-dev-master-mysql-store` en un entorno ServerlessFramework configurada con un desencadenador APIGateway.

![alt_text](/assets/section03/store-console.png)

Se configuran los secretos en el servicio `AWS Secrets Manager`

![alt_text](/assets/section03/secrets-manager.png)


Para probar esta lambda se puede hacer consumo mediante Postman con la siguiente información:

**Endpoint:** https://1urhkd6mbe.execute-api.us-east-2.amazonaws.com/dev/store

**Method:** GET

***Response:***
```json
{
    "products": [
        {
            "id": 1,
            "name": "Laptop",
            "category": "Electronics"
        },
        {
            "id": 2,
            "name": "Smartphone",
            "category": "Electronics"
        },
        {
            "id": 3,
            "name": "Tablet",
            "category": "Electronics"
        },
        {
            "id": 4,
            "name": "Monitor",
            "category": "Electronics"
        },
        {
            "id": 5,
            "name": "Keyboard",
            "category": "Accessories"
        },
        {
            "id": 6,
            "name": "Mouse",
            "category": "Accessories"
        },
        {
            "id": 7,
            "name": "Headphones",
            "category": "Accessories"
        },
        {
            "id": 8,
            "name": "Charger",
            "category": "Accessories"
        },
        {
            "id": 9,
            "name": "Desk",
            "category": "Furniture"
        },
        {
            "id": 10,
            "name": "Chair",
            "category": "Furniture"
        }
    ],
    "totalSales": [
        {
            "product_id": 1,
            "product_name": "Laptop",
            "total_sales": "11"
        },
        {
            "product_id": 2,
            "product_name": "Smartphone",
            "total_sales": "16"
        },
        {
            "product_id": 3,
            "product_name": "Tablet",
            "total_sales": "16"
        },
        {
            "product_id": 4,
            "product_name": "Monitor",
            "total_sales": "15"
        },
        {
            "product_id": 5,
            "product_name": "Keyboard",
            "total_sales": "22"
        },
        {
            "product_id": 6,
            "product_name": "Mouse",
            "total_sales": "30"
        },
        {
            "product_id": 7,
            "product_name": "Headphones",
            "total_sales": "14"
        },
        {
            "product_id": 8,
            "product_name": "Charger",
            "total_sales": "16"
        },
        {
            "product_id": 9,
            "product_name": "Desk",
            "total_sales": "10"
        },
        {
            "product_id": 10,
            "product_name": "Chair",
            "total_sales": "15"
        }
    ],
    "highestPricedProduct": {
        "product_id": 1,
        "product_name": "Laptop",
        "price": "1000.00"
    }
}
```


**Nota:** Se proporciona Colección de Postman en la raíz del proyecto `assets`.

---

By<br>
Volkmar Carrillo<br>
Systems Engineer