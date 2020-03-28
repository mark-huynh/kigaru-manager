This web application is published at kigaru-sushi.com/manager (using a reference) and was developed as a replacement for previous [management application](https://github.com/mark-huynh/kigaruwebmanager) which is now deprecated.


## Introduction
The Kigaru management application was created to allow for management of the Kigaru Sushi establishment to be able to perform creating, updating, and deleting operations on the items on the [Kigaru Sushi](kigaru-sushi.com) website at this [repo](https://github.com/mark-huynh/kigaruweb).

## Intergration Summary
Using REST AWS API endpoints that I have developed, along with AWS Cognito for authorization for those endpoints, authorized users may modify data that is dynamically fetched on the Kigaru website. The data currently lies in a MongoDB database, where AWS Lambda functions perform the CRUD (Create, Read, Update, Delete) operations. 
