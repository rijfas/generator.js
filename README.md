# generator.js 🖨

A powerful web-based admin interface for generating Express.js APIs. This tool allows you to create and manage APIs through an intuitive UI without writing boilerplate code.

## Features

### 1. App Management
- Create new apps through the web interface
- Organize your APIs into logical app groups
- Manage multiple apps from a central dashboard

### 2. Collection/Model Generation
- Create collections with a user-friendly form interface
- Define fields with various data types:
  - String
  - Number
  - Boolean
  - Date
  - ObjectId (for relationships)
  - Array
- Automatic generation of:
  - MongoDB schemas
  - CRUD API endpoints
  - Input validation
  - Error handling

### 3. Automatic API Generation
- RESTful API endpoints for each collection
- Standard CRUD operations:
  - GET /api/{collection} - List all items
  - GET /api/{collection}/:id - Get single item
  - POST /api/{collection} - Create new item
  - PUT /api/{collection}/:id - Update item
  - DELETE /api/{collection}/:id - Delete item
- Built-in pagination
- Filtering and sorting

### 4. Authentication & Security
- Built-in user authentication
- JWT-based API security
- Role-based access control
- API key management

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/express-api-generator.git
cd express-api-generator
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

## Quick Start

1. Access the admin interface at `http://localhost:3000/admin`

2. Log in with default credentials:
```
Email: admin@example.com
Password: admin123
```

3. Create a new app:
   - Click "New App" button
   - Enter app name
   - Click "Create App"

4. Create a collection:
   - Select your app
   - Click "New Collection"
   - Define collection name and fields
   - Click "Create Collection"

5. Your API is now ready! Access it at:
```
http://localhost:3000/api/{appName}/{collectionName}
```

## Project Structure

```
generator.js/
├── client/                 # React admin interface
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Admin interface pages
│   │   └── App.jsx       # Main React application
│   └── package.json
├── server/                # Express backend
│   ├── apps/             # Generated apps
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   └── admin/           # Admin API endpoints
├── templates/            # Code generation templates
└── package.json
```

## API Reference

### Authentication

```bash
# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Response
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### Generated API Endpoints

For each collection, the following endpoints are automatically created:

```bash
# List all items (with pagination)
GET /api/{app}/{collection}?page=1&limit=10

# Get single item
GET /api/{app}/{collection}/{id}

# Create item
POST /api/{app}/{collection}
{
  "field1": "value1",
  "field2": "value2"
}

# Update item
PUT /api/{app}/{collection}/{id}
{
  "field1": "new_value"
}

# Delete item
DELETE /api/{app}/{collection}/{id}
```

## Configuration

### Database Configuration
Edit `server/config/database.js`:
```javascript
{
  uri: process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
}
```

### API Configuration
Edit `server/config/api.js`:
```javascript
{
  prefix: '/api',
  version: 'v1',
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please:
- Open an issue on GitHub

## Roadmap

- [ ] GraphQL API generation
- [ ] Custom middleware support
- [ ] API documentation generation
- [ ] Database migration tools
- [ ] Multiple database support
- [ ] API testing interface
