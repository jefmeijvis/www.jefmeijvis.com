---
author: Jef Meijvis
id : 33
image : /post/033/logo.png
title: Integrating Groq AI with your Azure environment
date: 20250721
description : Integrate Groq AI into your Azure in a secure way, by making use of Azure API Management. 
category : Azure, AI, Security
published : true
---
# Integrating Groq AI into your Azure environment

## Groq
[Groq](https://groq.com/) provides a nice and flexible API service, allowing external programs to make calls to their [collection of open-source LLM's](https://console.groq.com/docs/models). Their prices are [relatively cheap](https://groq.com/pricing), especially when compared with the prices that Azure offers for their internal LLM capabilities.
This makes it an excellent choice for integrating AI services into your own application. 

![Groq logo [medium]](images/groq-logo.png)

### Security and observability concerns
But allowing all Azure development teams and applications to receive an API key and query the Groq API can be a bit of a security concern. 
This moves some of the control to the Groq dashboard, when everything else is often managed inside of Azure. 
What we really want is to manage all API connections to Groq, by introducing ratelimiting, individual key management and logging.

## Azure API Management
Enter Azure API Management, or APIM for short, which will allow us to seamlessly integrate an external API into our Azure environment.

![Azure API Management [medium]](images/apim.png)

In the following steps we're going to enroll an external API into API Management:
1. Go to the [Azure portal](https://portal.azure.com)
2. Search for the 'API Management services' service. 
3. Create a new service and fill out all required information. Enable Log Analytics and Application Insights to allow for monitoring. Note that these extra services need to exist before you can add them here. 
4. Make sure you have an account on Groq.com, and create an API key. Note down both the API key and the endpoint url. 
5. Back inside of APIM create a new HTTP API with a GET operation. Fill in the endpoint url to make the request contact the Groq url. 
6. Under Operations, add the following inbound policy. Replace the 'MY-SECRET-KEY' with your own API key. 

```xml
<policies>
    <inbound>
        <base />
        <set-header name="Authorization" exists-action="append">
            <value>bearer MY-SECRET-KEY</value>
        </set-header>
    </inbound>
</policies>
```


## Read More

- [groq.com](https://groq.com/)
- [learn.microsoft.com : API management key concepts](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts)

