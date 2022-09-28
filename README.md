# School Project

### Execution

```sh
cd $PROJECT_DIR
docker compose --file docker-compose.yaml --env-file ./conf/db.env --env-file ./conf/app.env up
```

### Removal

```sh
docker compose --file docker-compose.yaml down --volumes --remove-orphans
```
