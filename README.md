# Link Shortener App

A modern, full-stack URL shortener application built with Next.js and NestJS, featuring user authentication, analytics, and a clean, responsive interface.

## 🚀 Features

- **URL Shortening**: Create short, shareable links from long URLs
- **User Authentication**: Secure sign-up and sign-in functionality
- **Analytics Dashboard**: Track click statistics with interactive charts
- **Date Range Filtering**: Analyze URL performance over custom time periods
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Real-time Statistics**: Live tracking of URL clicks and engagement

## 🏗️ Architecture

This is a monorepo application built with modern technologies and best practices:

### Frontend (Web App)
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 19 with Radix UI components
- **Styling**: TailwindCSS v4
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for analytics visualization
- **Authentication**: JWT with Jose library
- **Date Handling**: date-fns and React Day Picker

### Backend (API)
- **Framework**: NestJS with TypeScript
- **Architecture**: Domain-Driven Design (DDD) with CQRS pattern
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis with ioredis
- **Authentication**: JWT with Passport.js strategies
- **Password Hashing**: Argon2
- **Job Queue**: BullMQ for background processing
- **Testing**: Jest with comprehensive test coverage

### Infrastructure
- **Containerization**: Docker Compose for local development
- **Database**: PostgreSQL with persistent volumes
- **Cache**: Redis with persistent storage
- **Monorepo**: Turborepo for efficient builds and development
- **Package Manager**: npm with workspaces

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Frontend | Next.js, React, TypeScript, TailwindCSS |
| Backend | NestJS, TypeScript, Prisma, PostgreSQL |
| Caching | Redis, BullMQ |
| UI/UX | Radix UI, Lucide Icons, Recharts |
| Authentication | JWT, Passport.js, Argon2 |
| Development | Turborepo, ESLint, Prettier |
| Infrastructure | Docker, Docker Compose |

## 📦 Installation

### Prerequisites
- Node.js >= 18
- npm >= 11.5.1
- Docker and Docker Compose

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd link-shortener-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the infrastructure services**
   ```bash
   docker-compose up -d
   ```

4. **Setup the database**
   ```bash
   cd apps/api
   npm run db:migrate
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

This will start:
- Web app on `http://localhost:3000`
- API server on `http://localhost:3001`
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

## 🚦 Usage

### For Users

1. **Sign Up/Sign In**: Create an account or log in to access the dashboard
2. **Shorten URLs**: Enter a long URL to generate a short, shareable link
3. **View Analytics**: Track clicks, view statistics, and analyze performance
4. **Manage URLs**: View all your shortened URLs in one place
5. **Copy Links**: Use the copy-to-clipboard feature for easy sharing

### For Developers

#### Available Scripts

```bash
# Development
npm run dev          # Start all apps in development mode
npm run build        # Build all apps for production
npm run lint         # Lint all code
npm run format       # Format code with Prettier

# Database operations (from apps/api)
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio

# Testing (from apps/api)
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Run tests with coverage
```

#### Project Structure

```
link-shortener-app/
├── apps/
│   ├── web/                 # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/         # Next.js App Router pages
│   │   │   ├── features/    # Feature-based modules
│   │   │   └── components/  # Reusable UI components
│   │   └── package.json
│   └── api/                 # NestJS backend application
│       ├── src/
│       │   ├── gateway/     # API controllers
│       │   ├── shortener/   # URL shortening domain
│       │   ├── analytics/   # Analytics domain
│       │   └── auth/        # Authentication domain
│       └── package.json
├── docker-compose.yml       # Infrastructure services
├── turbo.json              # Turborepo configuration
└── package.json            # Root package configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/sign-up` - Create new user account
- `POST /auth/sign-in` - User login
- `POST /auth/logout` - User logout

### URL Management
- `POST /urls` - Create shortened URL
- `GET /urls` - Get user's URLs
- `GET /urls/:id` - Get specific URL details
- `GET /:code` - Redirect to original URL

### Analytics
- `GET /analytics/statistics/:urlId` - Get URL statistics
- `GET /analytics/statistics/:urlId?from=date&to=date` - Get statistics for date range

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

## 🏃‍♂️ Development Workflow

### Code Organization
- **Domain-Driven Design**: Business logic organized into domains
- **CQRS Pattern**: Separate command and query handling
- **Feature-Based Structure**: Frontend organized by features
- **Clean Architecture**: Clear separation of concerns

### Database Management
- **Migrations**: Use Prisma migrations for schema changes
- **Seeding**: Populate database with initial data
- **Studio**: Visual database browser with Prisma Studio

### Quality Assurance
- **TypeScript**: Full type safety across the stack
- **ESLint**: Code linting with consistent rules
- **Prettier**: Automated code formatting
- **Jest**: Comprehensive testing suite

## 🔒 Security Features

- **Password Hashing**: Argon2 for secure password storage
- **JWT Authentication**: Stateless authentication with secure tokens
- **Input Validation**: Comprehensive validation with Zod schemas
- **SQL Injection Protection**: Prisma ORM with prepared statements
- **Rate Limiting**: Built-in protection against abuse

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env` files in respective app directories:

**apps/api/.env**
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/link_shortener"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret"
```

**apps/web/.env.local**
```
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 📊 Performance Features

- **Caching**: Redis for fast URL lookups
- **Background Jobs**: BullMQ for processing analytics
- **Database Optimization**: Indexed queries and efficient schemas
- **Frontend Optimization**: Next.js optimizations and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For support, please create an issue in the repository or contact the development team.

---

Built with ❤️ using modern web technologies and best practices.