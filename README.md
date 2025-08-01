# infokes

## Install dependencies

```bash
bun install
```

## Setting up the project

### Back-end Server

1. Copy file `./server/.env.example` to `./server/.env`

2. Fill the environment variables in `./server/.env`

3. Run database migrations and seeders
   ```bash
   # Run migrations
   bun run server:db:migrate

   # Run seeders
   bun run server:db:seed
   ```

4. Start the development server
   ```bash
   bun run server:dev
   ```

### Front-end App

1. Copy file `./app/.env.example` to `./app/.env`

2. Fill the environment variables in `./app/.env`

3. Start the development server
   ```bash
   bun run app:dev
   ```

## Tech Stacks & Packages

### Back-end Server

- ElysiaJS
- Drizzle ORM
- Bun
- TypeScript
- MySQL

### Front-end App

- Vue
- Vite
- Bun
- TypeScript
- TailwindCSS
- Pinia
- VueUse
- ofetch
