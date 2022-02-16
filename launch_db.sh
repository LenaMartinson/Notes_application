#!/bin/bash

docker run -it \
  --rm --name db \
  -e POSTGRES_USER=kena \
  -e POSTGRES_PASSWORD=123 \
  -e POSTGRES_DB=notes_database_2 \
  -p 5433:5432 \
  -v postgres_data_dev:/var/lib/postgresql/data/ \
  postgres:14.1
