# RockarTech Technical Test

A simple graphql API written in Node for querying product and customer data

## Directory Structure

```bash
|-- data/ # Stores the CSV files
|-- db/ # Stores the prisma client loading setup
|-- prisma/ # Contains the db schema used by prisma
|-- src/
| |-- graphql/ # All graphql related code (resolvers & schema)
| |-- lib/ # General library code for querying the data
| | |--- csv/ # Data adaptors and readers for CSV mode
| | |--- db/ # Data adaptors and readers for DB mode
|-- tests/ #Jest unit tests
```

## Setup

`npm install`

copy `.env.example` to `.env`

If Database mode desired, add DATABASE_URL to `.env` (Postgres supported currently), and run
`npx prisma db push`

run `npm run dev`

navigate to `http://localhost:4000`
