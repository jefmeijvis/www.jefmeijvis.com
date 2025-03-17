---
author: Jef Meijvis
id : 31
image : /post/031/logo.png
title: SQL Server access via security groups
date: 20250313
description : SQL Server access via security groups
category : Azure
published : false
---

# Secure and Simplify SQL Database Access with Entra ID Security Groups  

Managing database access for a team can be a hassle—granting individual logins, keeping track of permissions, and ensuring security best practices. Fortunately, with **Entra ID Security Groups**, you can streamline access management while keeping things secure.  

## Why Use Entra ID Security Groups for SQL Access?  
Instead of assigning permissions per user, you **grant access to a group**. Add or remove team members in Entra ID, and their database access updates automatically—**no more manual user management in SQL Server**.  

This approach ensures:  
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
   - **Group name**: `cupido-team` (or your preferred name)  
   - **Membership type**: Assigned or Dynamic (for automated membership)  
4. Add the necessary team members and create the group.  

### 2. Create a Login for the Security Group in SQL Server  
Run the following command to register the security group as a login in your SQL Server:  

```sql
CREATE LOGIN [cupido-team] FROM EXTERNAL PROVIDER;
```  

### 3. Grant Database Access and Assign Roles  
Within each database, create a user for the security group and assign roles:  

```sql
CREATE USER [cupido-team] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [cupido-team];
ALTER ROLE db_datawriter ADD MEMBER [cupido-team];
ALTER ROLE db_ddladmin ADD MEMBER [cupido-team];
```  

Now, everyone in **cupido-team** has the necessary permissions to read, write, and modify database objects.  

## Why Configure Access Like This?  
Manually managing database users is inefficient and insecure. With Entra ID Security Groups, you:  

- **Avoid credential sprawl** – Users don’t need separate SQL logins.  
- **Reduce maintenance overhead** – Control access at the group level, not per user.  
- **Ensure consistency** – All team members get the same permissions instantly.  
- **Improve compliance** – Auditors love clear, centralized access control.  

## Read More  
- [Microsoft Docs: Azure AD Authentication for SQL Server](https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-overview)  
- [Best Practices for Entra ID Groups](https://learn.microsoft.com/en-us/entra/identity/groups-overview)  
- [Managing Database Permissions in SQL Server](https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/)  

By setting up **Entra ID Security Groups for SQL access**, you simplify user management while keeping your database secure and compliant. Give it a try!  
