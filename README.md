# Backend

    npm install
    npm start

# Frontend

    npm install
    quasar dev

# Data Base

    CREATE TABLE CUSTOMERS
    (
        CustomerID INT PRIMARY KEY IDENTITY,
        Name NVARCHAR(20) NOT NULL,
        Adress NVARCHAR(50) NOT NULL,
        Phone NVARCHAR(20) UNIQUE NOT NULL,
        ContactName NVARCHAR(20) NOT NULL,
    )

    CREATE TABLE DELIVERY
    (
        DeliveryID INT PRIMARY KEY IDENTITY,
        DeliveryPrice INT NOT NULL,
        Speed INT
    )

    CREATE TABLE PRODUCTS
    (
        ProductID INT PRIMARY KEY IDENTITY,
        Price INT NOT NULL,
        Delivery NVARCHAR(20) NOT NULL,
        Description NVARCHAR(50)
    )

    CREATE TABLE ORDERS
    (
        OrderID INT PRIMARY KEY IDENTITY,
        DeliveryID INT REFERENCES DELIVERY (DeliveryID) NOT NULL,
        CustomerID INT REFERENCES CUSTOMERS (CustomerID) NOT NULL,
        ProductID INT REFERENCES PRODUCTS (ProductID) NOT NULL,
        OrderCount INT NOT NULL,
        Date DATETIME NOT NULL,
    )