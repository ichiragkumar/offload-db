# offload-db



Setup for redist with ioredis

```bash
npm install ioredis
```


## Redis

```bash
docker run -d --name offload-db-redis -p 6379:6379 redis
```
    ### Install Redis with homebrew
    ```bash
    brew install redis
    ```

    ### Start Redis
    ```bash
    brew services start redis
    ```

    ### Confirm Redis is running
    ```bash
    redis-cli ping
    ```

    ### Stop Redis
    ```bash
    brew services stop redis
    ```
## MongoDB

```bash
docker run -d --name offload-db-mongo -p 27017:27017 mongo
```

## Run

```bash
npm run start
```

