# Project 2: Full-stack Web Application
**Web Application created by Senem Osmanova and Bartosz Dubinski as a part of Full-stack Web Developer Bootcamp in Ironhack**

discountGub is an application to create a share discounts in popular retail chains in the Netherlands. 


[discountHUB DEMO](https://discounthubnl.adaptable.app/)

---
### Technical Requirements
1. Use Express as a foundation.
2. Use Mongoose for models and database communication.
2. Have 2 models or more. Having one for users is a no-brainer. The other one(s) should represent the main functionality of your app. Don’t force it if having more than two models doesn’t make sense.
3. Have validation on the models with feedback for users if their submission is invalid.
4. Include sign up, log in & log out functionality with encrypted passwords (and/or social logins) and authorization (logged in users can do extra things).
4. Implement all CRUD actions on models other than users. You should have the Create, Read, Update and Delete features even if they aren’t all for the same model.
6. Have a repo on GitHub.
7. Have at least 1 commit per day that you worked on.
8. Be deployed online using Adaptable so that anybody could use your app.
9. Responsive design is not a requirement, but it’s nice to have.
---
## MVP
### Deployment
- [x] Application is deployed on Adaptable
- [x] IMPORTANT: all tests in this checklist must be done on PRODUCTION.

### Auth
**SIGNUP / REGISTER**
- [x] I can create an account
- [x] (validation) If I try to create an account without required data (ex. without email. without password...), I receive proper feedback
- [x] (validation) If I try to create an account with an email/username already taken, I receive proper feedback

**LOG-IN**
- [x] I can login
- [x] (validation) If I try to login without required fields, I receive proper feedback
- [x] (validation) If I try to login with wrong credentials, I receive proper feedback

**LOG-OUT**
- [x] As a logged-in user, I can logout

### CRUD (ex. Recipe model)

**CREATE**
- [x] I can Create a resource
- [x] (validation) If I try to create a resource without required data, I receive proper feedback
- [x] (validation) If I try to create a resource with invalid data (ex. typing a string in a field where you expect a number), I receive proper feedback

**READ**
- [x] Display list of resources
- [x] Display the details of a single resource

**UPDATE**
- [x] I can Update a resource
- [x] The form to Update is pre-populated with the correct data
- [x] (validation) same cases as "create" will probably apply

**DELETE**
- [x] I can DELETE a resource

### Protected routes
- [x] Some functionality is only available for logged-in users (ex. create, update, delete)

### Bonus
- [ ] I can not Update or Delete resources from other users (ie. I can only U+D if I am the owner of a resource)
- [x] Test Responsive