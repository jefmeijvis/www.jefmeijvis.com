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

Entra id security group my-security-group
Create login on the sql server


```sql
CREATE LOGIN [Your-Security-Group-Name] FROM EXTERNAL PROVIDER;
```

Give permissions per database

```sql
CREATE USER [cupido-team] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [cupido-team];
ALTER ROLE db_datawriter ADD MEMBER [cupido-team];
ALTER ROLE db_ddladmin ADD MEMBER [cupido-team];
```

## Further reading and relevant links