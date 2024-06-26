---
author: Jef Meijvis
id : 28
image : /post/028/logo.png
title: Azure Cost Management
date: 20240614
description : Discover tips, tricks and best practices to help you optimize your Azure spending.
category : Azure 
published : true
---

## Azure Cost Management
Managing cloud expenses is crucial for businesses nowadays. 
But cloud platforms such as Azure can make it hard to get a clear overview of all costs.
In this blog post, we will have a look at the various aspects of Azure Cost Management, including how to set budgets, monitor expenses, and consult the Cost Advisory module inside Azure. 

Each subscription or resource inside Azure has a Cost Management tab in the blade on the left side of the screen.
It allows us to inspect one of the following four items:

### Cost Analysis
Cost analysis provides us with a breakdown of the current costs, as well as a graph view of the forecast costs for the current billing period. The graph extrapolates the current spending rate to provide an expected cost. This can be a effective way to obtain the monthly costs of a new infrastructure setup.  

![Forecast [medium]](images/forecast.png)

The pie charts provide a more detailed view of the budget allocation, grouping the costs by resource, type, location, resource group, etc.

![Cost Analysis [medium]](images/cost-analysis.png)

The bar on top of the interface gives access to the mail subscription sidepanel. 
It allows seting up an email schedule with cost reporting. 
I personally use it to get a weekly email with cost analysis. 
The data get's embedded in the email as an image, so you don't have to open up the Azure portal just to check costs.
![Mail subscription [medium]](images/mail-subscription.png)

### Cost Alerts
TODO

### Budgets
![Alerts [small]](images/alerts.png)
TODO

### Advisor recommendations
![Advisory [small]](images/advisory.png)
TODO



## Further reading and relevant links
- https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/save-share-views#subscribe-to-cost-alerts

