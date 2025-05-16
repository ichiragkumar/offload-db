# 🚀 offload-db



## Setup for Redis with **ioredis**

```bash
npm install ioredis
```

---

## Redis Setup

### Using Docker

```bash
docker run -d --name offload-db-redis -p 6379:6379 redis
```

### Using Homebrew (macOS)

```bash
brew install redis
```

### Start Redis service

```bash
brew services start redis
```

### Confirm Redis is running

```bash
redis-cli ping
# Should reply: PONG
```

### Stop Redis service

```bash
brew services stop redis
```

---

## MongoDB Setup

### Using Docker

```bash
docker run -d --name offload-db-mongo -p 27017:27017 mongo
```

### Or use local MongoDB connection string in `.env`

```bash
MONGO_URI=mongodb://localhost:27017/writeoffload
```

---

## Run the Application

```bash
npm run start
```

---

## Run the Worker (Background Consumer)

```bash
npm run worker
```

---

## Test the Event Tracking API

Send a test event to Redis stream via HTTP POST. This request pushes data to Redis and will eventually be batch-inserted into MongoDB.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"user_id": "123", "event": "login", "timestamp": "2023-05-01T00:00:00.000Z"}' \
  http://localhost:3000/track_event
```

---

This setup ensures that your writes are **offloaded to Redis** first and then **batched into MongoDB** asynchronously, reducing immediate DB load and improving your app's performance.

---


