docker run \
    --name postgres \
    -e POSTGRES_USER=castmoon \
    -e POSTGRES_PASSWORD='castmoon' \
    -e POSTGRES_DB=strategy \
    -p 5432:5432 \
    -d \
    postgres

docker logs postgres
docker exec -it postgres psql --username castmoon --dbname strategy
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;


docker run \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=castmoon \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -p 27017:27017 \
    -d \
    mongo:4

docker logs mongodb