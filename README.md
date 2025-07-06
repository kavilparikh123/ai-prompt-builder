
# AI Prompt Builder

AI Prompt Builder is a full-stack web application that allows users to create custom AI prompts and interact with them in a chat interface. Built using modern technologies such as Next.js, tRPC, Prisma, Tailwind CSS, and OpenAI.

## Features

- Create, edit, and delete prompt templates
- Chat with AI using your custom prompt context
- Full chat history persistence per prompt
- Real-time response generation using OpenAI GPT-3.5
- Modern stack using the App Router, TypeScript, and Tailwind

## Tech Stack

- **Frontend:** Next.js 13+ (App Router), React, Tailwind CSS
- **Backend:** tRPC, Prisma, SQLite
- **AI Integration:** OpenAI GPT-3.5 API
- **ORM:** Prisma
- **Database:** SQLite (local development)

## Getting Started


### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY=your_openai_api_key
```

You can get your OpenAI API key from: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

### 3. Set Up the Database

```bash
npx prisma migrate dev --name init
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
src/
├─ app/               # Next.js App Router
│  ├─ builder/        # Prompt creation/editing
│  ├─ chat/[id]/      # Chat interface per prompt
│  ├─ _components/    # Shared UI components
├─ server/
│  ├─ api/            # tRPC routers
│  ├─ db.ts           # Prisma client instance
├─ styles/            # Tailwind CSS
├─ trpc/              # tRPC client and types
```

## Deployment

This project can be deployed on platforms like Vercel. SQLite is sufficient for demos, but consider Postgres for production.

To deploy:

* Set environment variables in the Vercel dashboard
* Use Vercel CLI or GitHub integration
