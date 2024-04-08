# Coffee Tracker

> [!NOTE]
> Check it out here
> [https://coffee.abraham.lat](https://coffee.abraham.lat)

## 📝 About the Project

This is a personal project that involves creating a coffee tracker, add new coffees you have tried and all their information (roaster, notes, and general data from the coffee) and also track when and how many coffees you've had today!

## 🛠 Tech Stack

- [Next.js (App Router)](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [TanStack Query](https://tanstack.com/query/latest)
- [shadcn/ui](https://ui.shadcn.com)
- [Neon (PostgreSQL)](https://neon.tech)
- [Vercel](https://www.vercel.com)

## 🚀 Get Started Locally

1. Modify `.env.example` to `.env` and fill in every field.

> [!WARNING]
> Failing to fill all `.env` fields will result in an error as they are required.

2. Run `bun install` to install all dependencies.

3. Run the development server with `bun dev`.

4. Open up [http://localhost:3000](http://localhost:3000) in your browser for the public view.

5. Open up [http://localhost:3000/dashboard](http://localhost:3000/dashboard) in your browser for the dashboard view where you can manage the application.

6. Enjoy tracking your coffee!

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                                  |
| :--------------- | :------------------------------------------------------ |
| `bun install`    | Installs dependencies                                   |
| `bun dev`        | Starts local dev server using Turbo at `localhost:3000` |
| `bun build`      | Build your production site to `.next`                   |
| `bun format`     | Format your code with Prettier                          |
| `bun db:push`    | Push your database schema to the database               |
| `bun db:studio`  | Open the database studio in your browser                |
| `bun db:migrate` | Generate database migrations                            |
| `bun typecheck`  | Typecheck your code with tsc                            |
| `bun lint`       | Lint your code with ESLint                              |
| `bun check`      | Format, typecheck, and lint your code with one command  |
