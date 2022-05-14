INSERT INTO [dbo].[PRODUCTS]
(
    [Price],
    [Delivery],
    [Description]
)
VALUES (
    @Price,
    @Delivery,
    @Description
)

SELECT SCOPE_IDENTITY() AS ProductID