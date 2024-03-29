#!/bin/bash

if [ "$RUNNING_IN_DOCKER" = "true" ]
then
  echo "Running inside Docker. Using Docker DATABASE_URL."
  export DATABASE_URL=$DATABASE_URL_DOCKER
else
  echo "Running outside Docker. Using Local DATABASE_URL."
  export DATABASE_URL=$DATABASE_URL_LOCAL
fi

echo "Running Prisma migrations..."
npx prisma migrate deploy
echo "Generating Prisma client..."
npx prisma generate

exec "$@"