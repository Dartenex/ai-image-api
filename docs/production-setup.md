## How to launch project on production?

### Requirements
- Docker
- Docker Swarm
- Docker Compose

#### To start the project execute following commands:
```
docker stack deploy --compose-file docker-compose.prouction.yaml production_gio_ai
```

Wait until all services are in RUNNING state