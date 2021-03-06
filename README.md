A simple HTML and js game.
Credit: https://www.w3schools.com/graphics/game_intro.asp


Running the Game
To run the game, simply open index.html in a browser. Or, alternatively, run a local server like http-server or local-web-server (required to run the start script from package.json). These are packages that would need to be installed locally or globally on the system.

::: Task :::
============

1. Add keyboard events for up, down, left and right arrow keys.
2. Add user login and logout. Upon login, the user should be able to see their highest score so far.
3. Track the games played by the user and their scores. [Not local or session storage; at db level]
4. Allow only 10 attempts per user per day.

Notes -
* Do not use social or third party auth
* MongoDB or a comparable no-sql db should be used

## Project Structure 

```
	.
	├── api-gateway                 # Nginx API Gateway Configuration
	├── client             	        # Frontend Web App
	├── db                          # MongoDB data
	├── server      	        # API Server
	├── docker-compose.yml		# Development Docker-Compose Configuration
	└── README.md	                # This file
```



## To Run
```	
## Use ubuntu, as docker is mounting volumes from host, 
## may produce issues in windows/macosx

## Start the system in development mode with hot code loading
docker-compose up --build

## To see the running logs of the system
docker-compose logs --follow

## Stop the system
docker-compose down

## To play the game, open browser at: 
http://localhost

```
Refer to the docker-compose.yml script for detailed information.

## API Sheet
```
## Postman Collection
https://documenter.getpostman.com/view/401954/S11GRzgf

```