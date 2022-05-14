UPDATE [dbo].[CUSTOMERS]
SET [Name]=@Name,
    [Adress]=@Adress,
    [Phone]=@Phone,
    [ContactName]=@ContactName
WHERE [CustomerID]=@CustomerID

SELECT [CustomerID]
        ,[Name]
        ,[Adress]
        ,[Phone]
        ,[ContactName]
FROM [dbo].[CUSTOMERS]
WHERE [CustomerID]=@CustomerID