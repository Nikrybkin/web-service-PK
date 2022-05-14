INSERT INTO [dbo].[ORDERS]
(
    [DeliveryID]
    ,[CustomerID]
    ,[ProductID]
    ,[OrderCount]
    ,[Date]
)
VALUES (
    @DeliveryID,
    @CustomerID,
    @ProductID,
    @OrderCount,
    @Date
)

SELECT SCOPE_IDENTITY() AS OrderID