# Containers

Using command `docker-compose up -d` containers should be running,
it there's no images of postgre or pgAdmin those will be pulled from
dockerhub. Check it using `docker ps -a`, something like this should
be there:

![docker ps -a](./pgAdmin_example.jpg)

To connecto to docker pgAdmin access [localhost:5050](http://localhost:5050)
get postgres container ip using `docker inspect <CONTAINER_ID>`, to get the
CONTAINER_ID, just run `docker ps -a`

![CONTAINER_ID](./container_id.png)

Using the CONTAINER_ID we will get the container ip, so using 29e84b3aa6b9
we will inspect de id (29e84b3aa6b9 is my container id), to make this simpler
I will use grep also a bash pipeline, just like this

![IP](./IPAddress.png)

Using `docker inspect 29e84b3aa6b9 | grep "IPAddress"` I got 172.22.0.2 that's
my postgres container ip. Now I can got to pgAdmin at [localhost:5050](http://localhost:5050)

# PgAdmin

![pgAdmin](./pgAdmin.png)

User is "admin@mail.com" and password "root"; same as compose.yml, Once we are in
we can connect to our database using "Add New Server" icon

![Add Server](./add_server.png)

Fill up "name" as you want, I will use my database name, then click on "connection"

![How to](./how_to.png)

Finally fill up "connection" using the data that you have, in this example password for DB
is "admin123", it's same as compose.yml

![Connection](./connection.png)

To check if everything is working just see if there's you server name mine is "Zigma"

![Zigma](./works.png)

