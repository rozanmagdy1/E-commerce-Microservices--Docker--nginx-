to run the project you need to create .env file inside each server.

Inside Auth, order and shopping servers in .env files add :-
1- the database URI and save it in variable "MONGO_URI"
docker link "mongodb://nosql-db:27017"
2- put database name at "DB_Name"
3- put port of each server at "PORT"

and inside the authentication server also in .env file add :-
1- the key of sending emails and save it in variable "EMAIL_SECRET_KEY"

* Command to build image and run the containers  :-
docker compose build ; docker compose up

* after deploy the app open postman file and to make requests to apis in authentication server :-
link_deployed/authentication/........ or 
link_deployed/.........

* to make requests to apis in order server :-
link_deployed/order/........ 

* to make requests to apis in shopping server :-
link_deployed/shopping/........ 