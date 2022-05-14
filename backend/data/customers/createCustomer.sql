INSERT INTO [dbo].[CUSTOMERS]
(
    [Name],
    [Adress],
    [Phone],
    [ContactName]
)
VALUES (
    @Name,
    @Adress,
    @Phone,
    @ContactName
)

SELECT SCOPE_IDENTITY() AS CustomerID