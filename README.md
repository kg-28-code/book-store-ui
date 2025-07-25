# BookStore - Modern React TypeScript Application

A full-featured book store management system built with React, TypeScript, Tailwind CSS, and Vite. This application provides a complete solution for managing books, customers, and orders with a beautiful, responsive user interface.

## ✨ Features

### 📚 Book Management

- **CRUD Operations**: Create, read, update, and delete books
- **Search & Filter**: Real-time search by title and author
- **Inventory Tracking**: Stock management with visual indicators
- **Detailed View**: Comprehensive book details page
- **Price Management**: Support for pricing and currency formatting

### 👥 Customer Management

- **Customer Database**: Maintain customer information
- **Email Support**: Optional email addresses for notifications
- **Search Functionality**: Find customers by name or email
- **Easy Management**: Simple CRUD operations

### 🛒 Shopping Cart & Orders

- **Interactive Cart**: Add, remove, and update quantities
- **Real-time Totals**: Dynamic price calculations
- **Order Placement**: Complete checkout process
- **Customer Selection**: Associate orders with customers
- **Order Confirmation**: Success notifications and order tracking

### 🎨 User Interface

- **Modern Design**: Clean, professional Tailwind CSS styling
- **Responsive Layout**: Works perfectly on all devices
- **Interactive Components**: Smooth animations and transitions
- **Toast Notifications**: User-friendly feedback system
- **Modal Dialogs**: Elegant forms and confirmations
- **Loading States**: Proper loading indicators

### ⚡ Performance & Architecture

- **TypeScript**: Full type safety and better developer experience
- **React Context**: Efficient state management
- **Optimized Rendering**: Minimal re-renders with proper memoization
- **Error Handling**: Comprehensive error management
- **API Integration**: Clean separation with Axios
- **Code Organization**: Well-structured component hierarchy

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone and setup**

   ```bash
   git clone <repository-url>
   cd book-store-ui
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Modal, etc.)
│   ├── books/          # Book-related components
│   ├── customers/      # Customer management components
│   ├── cart/           # Shopping cart components
│   └── layout/         # Layout and navigation components
├── contexts/           # React Context providers
├── pages/              # Main application pages
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── styles/             # Global styles and Tailwind CSS
└── config/             # Configuration files
```

## 📋 API Requirements

The application expects a REST API with the following endpoints:

### Books API

- `GET /api/books?page=0&size=10` - Get paginated books
- `GET /api/books/{id}` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Customers API

- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer

### Orders API

- `POST /api/orders` - Place new order

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Development**: ESLint, PostCSS, Autoprefixer

## 🎯 Key Features Implemented

### State Management

- **Books Context**: Manages book inventory and pagination
- **Customers Context**: Handles customer data operations
- **Cart Context**: Shopping cart state and order placement
- **Error Handling**: Comprehensive error states and messaging

### UI Components

- **Button**: Multiple variants, sizes, and loading states
- **Input**: Validation, error states, and helper text
- **Modal**: Accessible modals with backdrop and keyboard handling
- **Card**: Consistent content containers
- **Badge**: Status indicators with multiple variants
- **LoadingSpinner**: Various sizes for different contexts

### Advanced Features

- **Search & Filter**: Real-time filtering across books and customers
- **Responsive Design**: Mobile-first approach with responsive grids
- **Form Validation**: Client-side validation with error messages
- **Toast Notifications**: Success, error, and info messages
- **Keyboard Navigation**: Full keyboard accessibility support
- **Stock Management**: Visual stock indicators and out-of-stock handling

## 🔧 Configuration

### API Configuration

Update `src/config/api.ts` to change the backend URL:

```typescript
export const API_CONFIG = {
  BASE_URL: "http://localhost:8080", // Change this to your API URL
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
```

### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      }
    }
  }
}
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with multi-column layouts
- **Tablet**: Adapted layouts with touch-friendly interactions
- **Mobile**: Single-column layout with mobile navigation
- **All screen sizes**: Fluid grid system and flexible components

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Code formatting (recommended to setup in your editor)

## 🚀 Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

### Environment Variables

For production, set these environment variables:

- `VITE_API_BASE_URL` - Your production API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon library
- **Vite** for the lightning-fast build tool

---

**Built with ❤️ using modern web technologies**
#   b o o k - s t o r e - u i  
 #   b o o k - s t o r e - u i  
 #   b o o k - s t o r e - u i  
 