INSERT INTO [dbo].[DELIVERY]
(
    [DeliveryPrice],
    [Speed]
)
VALUES (
    @DeliveryPrice,
    @Speed
)

SELECT SCOPE_IDENTITY() AS DeliveryID