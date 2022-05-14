UPDATE [dbo].[ORDERS]
SET [DeliveryID]=@DeliveryID
    ,[CustomerID]=@CustomerID
    ,[ProductID]=@ProductID
    ,[OrderCount]=@OrderCount
    ,[Date]=@Date
WHERE [OrderID]=@OrderID


SELECT [OrderID]
    ,[DeliveryID]
    ,[CustomerID]
    ,[ProductID]
    ,[OrderCount]
    ,[Date]
FROM [dbo].[ORDERS]
WHERE [OrderID]=@OrderID