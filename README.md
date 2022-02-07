# Biblioteca IC

This project use Docker with Docker-Compose to manage applications. But for easy of use we use Bash Eco.

Bash Eco makes building and running Docker easy, passing the commands to docker-compose and simplifying helper commands, as `npm install`. See a example:

```bash
./eco build                     # build docker containers
./eco up                        # up containers
./eco back-end npm install      # run npm install into docker container
./eco back-end test             # run npm run test into docker container
./eco back-end shell            # acesss container via shell
./eco postgres                  # access postgres database via terminal client
```

To use Eco, create a `.env` file with `.env.example` file and, if you want, configure it. The, configure each project (back-end and front-end) separately.
