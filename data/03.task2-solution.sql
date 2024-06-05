USE `final-challenge-master-schema`;
-- SQL encargada de calcular las ventas mensuales por categoría de producto
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

-- SQL encargada de identificar las ventas mensuales y del mes anterior por categoría de producto
SELECT 
    category,
    month,
    total_sales,
    -- https://dev.mysql.com/doc/refman/8.0/en/window-function-descriptions.html#function_lag
    -- Obtiene el/los n registro(s) anterior(es)
    LAG(total_sales, 1) OVER (PARTITION BY category ORDER BY month) AS previous_month_sales
    -- sales_by_category_month -> Resultado del SQL anterior
FROM sales_by_category_month;

-- SQL encargada de identificar el porcentaje de crecimiento del total de ventas respecto al mes anterior por categoría de producto
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

-- SQL agrupada para obtener solución al cálculo del porcentaje de crecimiento del total de ventas respecto al mes anterior por categoría de producto
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