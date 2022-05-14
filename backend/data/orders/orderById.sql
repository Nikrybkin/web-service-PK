SELECT [OrderID]
        ,[DeliveryID]
        ,[CustomerID]
        ,[ProductID]
        ,[OrderCount]
        ,[Date]
FROM [dbo].[ORDERS]
WHERE [OrderID]=@OrderID