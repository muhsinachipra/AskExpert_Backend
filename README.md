# AskExpert Backend

## Project Overview

**AskExpert** is a platform designed to connect users with verified experts from around the world. It allows users to seek real-time advice through chat or video calls, ensuring they receive reliable information from genuine experts. The platform benefits users by providing accurate advice and allows experts to monetize their knowledge.

## Technology Stack

- **Frontend:** React, Tailwind CSS, Redux
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API Calls:** RTK Query
- **Architecture:** Clean Architecture
- **TypeScript:** Used for type safety and early error detection

### Key Features

- **Chatting:** Real-time chat between users and experts using Socket.io, with support for multimedia file sharing (images, videos) stored securely in AWS S3.
- **Video Calling:** Direct video calls via ZEGOCLOUD API, with Stripe integration for payments.
- **User and Expert Management:** Functionality for user registration, profile updates, OTP verification, and expert management.

## Folder Structure

```
backend
│   .dockerignore
│   .env
│   .gitignore
│   Dockerfile
│   package-lock.json
│   package.json
│
└───src
    │   index.ts
    │
    ├───controllerLayer
    ├───domainLayer
    ├───infrastructureLayer
    │   ├───config
    │   ├───database
    │   ├───middleware
    │   ├───route
    │   ├───services
    │   └───types
    └───usecaseLayer
        ├───handler
        ├───interface
        └───usecase
```

## Environment Variables

Ensure the following environment variables are set in your `.env` file:

```
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.erxet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_KEY=your_jwt_key
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
STRIPE_PRIVATE_KEY=your_stripe_key
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_BUCKET_NAME=your_bucket_name
AWS_BUCKET_REGION=your_bucket_region
BASE_URL=https://ask-expert-frontend.vercel.app
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables in a `.env` file.

5. Start the development server:

   ```bash
   npm start
   ```

## Usage

Refer to the [API](./[api-docs]()) for detailed information on available endpoints and usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
