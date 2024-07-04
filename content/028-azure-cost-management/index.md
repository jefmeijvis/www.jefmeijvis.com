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
![Cost management tab [small]](images/cost-management-tab.png)

### Cost Analysis
Cost analysis provides us with a breakdown of the current costs, as well as a graph view of the forecast costs for the current billing period. The graph extrapolates the current spending rate to provide an expected cost. This can be a effective way to obtain the monthly costs of a new infrastructure setup.  

![Forecast [medium]](images/forecast.png)

The pie charts provide a more detailed view of the budget allocation, grouping the costs by resource, type, location, resource group, etc.

![Cost Analysis [medium]](images/cost-analysis.png)

The bar on top of the interface gives access to the mail subscription sidepanel. 
It allows setting up an email schedule with cost reporting. 
I personally use it to get a weekly email with cost analysis. 
The data get's embedded in the email as an image, so you don't have to open up the Azure portal just to check costs.
![Mail subscription [medium]](images/mail-subscription.png)

### Budgets
Budgets allow us to define monthly, quarterly or yearly budgets that we want to spend on a particular subscription or resource group.
Shown below is the interface when creating a new budget.
In this case, we are creating a monthly budget of €500 for our development resources.
The budget period is configured so that it aligns with the billing period.

> Please note that budgets are no hard spending limits. This means that whenever a resource surpasses a fixed budget, nothing will happen and costs will keep growing.
> Configure your budget and cost alerts in the right way to prevent an unforeseen cloud bill.  

![Creating a new budget [medium]](images/budgets.png)

#### Budget alerts
Budget alerts (not to be confused with the cost alerts mentioned below) allow us to create alerts on top of the earlier created budgets.
For the development budget created above we have set up a bunch of notification mails whenever a certain % of the budget is reached. 
For example:
- Send out an email when the forecasted budget at the end of the billing month will be 80% of the budget
- Send out an email when already spend budget exceeds 70% of the budget

![Alerts [small]](images/alerts.png)

### Cost Alerts
Cost alerts can be set up so that whenever an anomaly is detected, a mail gets send out to a set of recipients. 
There are 3 types of anomalies that get flagged by this:
- **New costs**: a new resource or resource group starts generating costs.
- **Removed costs**: a resource or resource group stops generating costs, as it is (unintentionally) shut down.
- **Changed costs**: an existing resource suddenly shows a big increase or decrease in cost due to a configuration change. 

Whenever one of these things happen, a recipients will receive a mail in their mailbox with a summary of the anomaly and the impact on the costs. 

### Advisor recommendations
![Advisory [small]](images/advisory.png)
The cost management advisor recommendations will display possible cost savings.
In my own personal experience, this tab is often empty. 
Microsoft has a list of possible recommendations that can be discovered [here](https://learn.microsoft.com/en-us/azure/advisor/advisor-reference-cost-recommendations).
Below are two possible examples, to get an idea of what kind of tips can be found there:

**Unused/Empty App Service plans**
Your App Service plan does not have any running applications associated with it. Consider deleting the resource to reduce expenses, or add new applications under it to utilize its capabilities.

**Consider taking action on your idle Azure Cosmos DB containers**
We haven't detected any activity over the past 30 days on one or more of your Azure Cosmos DB containers. Consider lowering their throughput, or deleting them if you don't plan on using them.
Learn more about App Service plans.


## Further reading and relevant links
- https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/save-share-views#subscribe-to-cost-alerts
- https://learn.microsoft.com/en-us/azure/advisor/advisor-reference-cost-recommendations

