---
author: Jef Meijvis
id : 31
image : /post/031/logo.png
title: SQL Server access via security groups
date: 20250313
description : SQL Server access via security groups
category : Azure, Security
published : true
---

# Secure and Simplify SQL Database Access with Entra ID Security Groups  

Managing database access for a team can be a hassle—granting individual logins, keeping track of permissions, and ensuring security best practices. Fortunately, with Entra ID Security Groups, we can streamline access management while keeping things secure.  

## Why Use Entra ID Security Groups for SQL Access?  
Instead of assigning permissions per user, you grant access to a group. Add or remove team members in Entra ID, and their database access updates automatically. This means no more manual user management in SQL Server.  

This approach gives us:  
- **Centralized access management** – Control access in one place (Azure Entra ID).  
- **Security best practices** – No direct user logins, reducing exposure to credential theft.  
- **Scalability** – Easily onboard and offboard team members without touching SQL.  

## How to Set It Up  

### 1. Create an Entra ID Security Group  
Before configuring SQL access, create a security group in **Azure Entra ID**:  

1. Go to the **Azure Portal** (https://portal.azure.com).  
2. Navigate to **Microsoft Entra ID** → **Groups**.  
3. Click **New group** and select:  
   - **Group type**: Security  
   - **Group name**: `jef-meijvis-demo-group` (or your preferred name)  
   - **Membership type**: Assigned or Dynamic (for automated membership)  
4. Add the necessary team members and create the group.  

### 2. Create a Login for the Security Group in SQL Server  
Run the following command to register the security group as a login in your SQL Server:  

```sql
CREATE LOGIN [jef-meijvis-demo-group] FROM EXTERNAL PROVIDER;
```  

### 3. Grant Database Access and Assign Roles  
Within each database, create a user for the security group and assign roles:  

```sql
CREATE USER [jef-meijvis-demo-group] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [jef-meijvis-demo-group];
ALTER ROLE db_datawriter ADD MEMBER [jef-meijvis-demo-group];
ALTER ROLE db_ddladmin ADD MEMBER [jef-meijvis-demo-group];
```  

Now, everyone in **jef-meijvis-demo-group** has the necessary permissions to read, write, and modify database objects.
These roles and permissions of course need to be adjusted to your specific needs.

## Why Configure Access Like This?  
Manually managing database users is inefficient and insecure. With security groups, you:  

- **Avoid separate credentials** – Users don’t need separate SQL logins.  
- **Reduce overhead** – Control access at the group level, not per user.  
- **Consistency** – All team members get the same permissions instantly.  

## Read More  
- [Microsoft Docs: Azure AD Authentication for SQL Server](https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-overview)  
- [Managing Database Permissions in SQL Server](https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/)  
- [Entra ID Best Practices](https://learn.microsoft.com/en-us/entra/architecture/secure-best-practices)