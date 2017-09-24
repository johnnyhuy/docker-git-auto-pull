# Dockerised Git Auto Pull
Created with Nodejs to run `git pull` everytime you visit send a request to the server created with this script.

## Usage
There is a template docker-compose.yml file used to connect your project directory to the image.

### docker-compose.yml
```
version: "3"
services:
  git:
    command: [sh, -c, "node server.js proj"]
    image: johnnyhuy/docker-git-auto-pull:latest
    ports:
      - "3000:3000"
    restart: "no"
    volumes:
      - ./:/usr/src/app/proj
    working_dir: /usr/src/app
```

### Example
- Create git repository `example-repo.git` at `~/projects/example-repo`
- Place docker-compose.yml template file in project root directory (~/projects/example-repo)
- Run the following command:
```
docker-compose up -d git
```

# Credits
Full credits to [Keenpoint](https://github.com/Keenpoint) for the original auto git pull .js [script](https://github.com/Keenpoint/git-auto-pull). 
