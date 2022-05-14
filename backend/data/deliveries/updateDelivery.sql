UPDATE [dbo].[DELIVERY]
SET [DeliveryPrice]=@DeliveryPrice,
    [Speed]=@Speed
WHERE [DeliveryID]=@DeliveryID

SELECT [DeliveryID]
        ,[DeliveryPrice]
        ,[Speed]
FROM [dbo].[DELIVERY]
WHERE [DeliveryID]=@DeliveryID