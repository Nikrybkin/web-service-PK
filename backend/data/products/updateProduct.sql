UPDATE [dbo].[PRODUCTS]
SET [Price]=@Price,
    [Delivery]=@Delivery,
    [Description]=@Description
WHERE [ProductID]=@ProductID

SELECT [ProductID]
        ,[Price]
        ,[Delivery]
        ,[Description]
FROM [dbo].[PRODUCTS]
WHERE [ProductID]=@ProductID