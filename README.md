# 🌐 MindLink

MindLink is a cutting-edge, AI-powered full-stack application built with modern technologies. It features a robust NestJS backend integrated with OpenAI and Pinecone for advanced AI capabilities, and a sleek, responsive Next.js frontend.

---

## 🚀 Features

- **AI Integration**: Leverages OpenAI and Pinecone for intelligent data processing and vector search.
- **Modern UI/UX**: Built with Next.js 15, Tailwind CSS, and Framer Motion for smooth animations.
- **Robust Backend**: Powered by NestJS and Prisma for scalable server-side logic.
- **Dockerized Setup**: Easy deployment and development with Docker Compose.
- **Internationalization**: Support for multiple languages (i18n).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Vector DB**: [Pinecone](https://www.pinecone.io/)
- **AI/ML**: [OpenAI](https://openai.com/) & [LangChain](https://www.langchain.com/)

---

## 🏗️ Project Structure

```bash
MindLink/
├── frontend/     # Next.js web application
├── backend/      # NestJS API server
├── docker-compose.yml
└── .gitignore
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Docker & Docker Compose
- PostgreSQL (if not using Docker)

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd PulseNode
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create a .env file based on .env.example (if available)
   npm run start:dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Database (Docker)**:
   In the root directory, run:
   ```bash
   docker-compose up -d
   ```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
