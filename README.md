### PEGA Protocol — An open, modular escrow protocol for work and DAO coordination, built by ChileDAO.

         ..-+*#%%##*+-.  -+++++:      ++++++. :+++++-  ++++++.       .=+++++++++++++=.
            .-@@@@@@@@@@@@@@: *@@@@@-      @@@@@@. =@@@@@+  @@@@@@.       .#@@@@@@@@@@@@@#.
           .%@@@@@@@@@@@@@@@: *@@@@@-      @@@@@@. =@@@@@+  @@@@@@.       .#@@@@@@@@@@@@@#.
          .@@@@@@@*:....:-#@: *@@@@@-      @@@@@@. =@@@@@+  @@@@@@.       .#@@@@@-.........
         .+@@@@@#.          . *@@@@@*======@@@@@@. =@@@@@+  @@@@@@.       .#@@@@@=:::::.
         .#@@@@@-             *@@@@@@@@@@@@@@@@@@. =@@@@@+  @@@@@@.       .#@@@@@@@@@@@-
         .#@@@@@-             *@@@@@@@@@@@@@@@@@@. =@@@@@+  @@@@@@.       .#@@@@@@@@@@@-
         .+@@@@@#.          . *@@@@@=::::::@@@@@@. =@@@@@+  @@@@@@.       .#@@@@@=:::::.
          .@@@@@@@*:....:-#@= *@@@@@-      @@@@@@. =@@@@@+  @@@@@@:........#@@@@@-.........
           .#@@@@@@@@@@@@@@@= *@@@@@-      @@@@@@. =@@@@@+  @@@@@@@@@@@@@@.#@@@@@@@@@@@@@#.
             -@@@@@@@@@@@@@@= *@@@@@-      @@@@@@. =@@@@@+  @@@@@@@@@@@@@@.#@@@@@@@@@@@@@#.
               .-+*##%##*+-.  -+++++:      ++++++. :+++++-  ++++++++++++++.=+++++++++++++=.

          :==========-.             :=====-            .:=*####+=:.
          -@@@@@@@@@@@@@#:         :%@@@@@@-         :%@@@@@@@@@@@@*.        ...
          -@@@@@@@@@@@@@@@%:.     .+@@@@@@@%:      .#@@@@@@@@@@@@@@@@+.   .=@@@@#.
          -@@@@@#:::=%@@@@@@:     -@@@@@@@@@*.    .@@@@@@@%=--+%@@@@@@*   .%@@@@@=
          -@@@@@*    .*@@@@@@.   :@@@@@-@@@@@=   .*@@@@@%.     .-@@@@@@-  .-%@@@*. ..=*+:.
          -@@@@@*     .%@@@@@-  .#@@@@*.-@@@@@:  :#@@@@@:        +@@@@@#    ....   :@@@@@*.
          -@@@@@*     .%@@@@@-  +@@@@@:..*@@@@%. :#@@@@@:        =@@@@@#           -@@@@@#.
          -@@@@@*     +@@@@@@. -@@@@@@@@@@@@@@@+..*@@@@@#.      :%@@@@@=   :*%@#-  .-#@%+.
          -@@@@@*...:%@@@@@@= .@@@@@@@@@@@@@@@@@- :@@@@@@@*:..-#@@@@@@#   .#@@@@@-
          -@@@@@@@@@@@@@@@@=..*@@@@@*++++++@@@@@@: .%@@@@@@@@@@@@@@@@*.   .*@@@@@:
          -@@@@@@@@@@@@@@=   =@@@@@*.      -@@@@@#.  -@@@@@@@@@@@@@#.       :+*-
          :*********+=:.    .******.       .=*****:    .-*#%%%##+-.

## Project Structure

```
.
├── backend/               # Backend API (Node.js/Express)
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utility functions
│   └── prisma/           # Database schema and migrations
│
└── frontend/             # Frontend (Next.js)
    ├── src/
    │   ├── components/   # React components
    │   ├── lib/          # Utility functions
    │   ├── pages/        # Next.js pages
    │   └── styles/       # CSS styles
    └── public/           # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- MetaMask or other Web3 wallet

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- Task creation and management
- Escrow system for task rewards
- User reputation system
- Wallet integration
- Task categories and filtering
- Search functionality
- User profiles and portfolios

## Smart Contracts

The platform uses two main smart contracts:

1. ChileDAO Token (ERC-20)

   - Manages the $CHILE token
   - Handles token transfers and approvals

2. Escrow Contract
   - Manages task escrows
   - Handles task completion and reward distribution

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
