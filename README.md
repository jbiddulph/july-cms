# July CMS - Authentication System

A comprehensive Next.js authentication system built with modern web technologies and security best practices.

## 🚀 Features

- **Secure Authentication**: Password hashing with bcrypt and JWT token-based authentication
- **User Registration**: Easy signup process with email validation and password confirmation
- **Protected Routes**: Automatic redirection and route protection for authenticated content
- **Responsive Design**: Beautiful, mobile-first design built with Tailwind CSS
- **Fast & Modern**: Built with Next.js 15, React 19, and TypeScript
- **Persistent Sessions**: Cookie-based session management with automatic token renewal
- **Real-time State Management**: React Context API for authentication state
- **Form Validation**: Client-side validation with error handling
- **Demo Ready**: Includes demo credentials for testing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Session Management**: js-cookie
- **Token Handling**: jose library

## 🏃‍♂️ Quick Start

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Environment Setup**
   The `.env.local` file is already configured with a demo JWT secret. For production, update the `JWT_SECRET` variable with a secure random string.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

For testing the authentication system, use these demo credentials:

- **Email**: `admin@example.com`
- **Password**: `admin123`

## 📱 Pages & Routes

### Public Routes
- `/` - Homepage with feature overview
- `/login` - User login page
- `/register` - User registration page

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

## 🏗️ Project Structure

```
app/
├── contexts/
│   └── AuthContext.tsx     # Authentication context and provider
├── lib/
│   └── auth.ts            # Authentication utilities and mock database
├── types/
│   └── auth.ts            # TypeScript interfaces for authentication
├── login/
│   └── page.tsx           # Login page
├── register/
│   └── page.tsx           # Registration page
├── dashboard/
│   └── page.tsx           # Protected dashboard page
├── layout.tsx             # Root layout with AuthProvider
├── page.tsx               # Homepage
└── globals.css            # Global styles
```

## 🔧 Key Components

### AuthContext (`app/contexts/AuthContext.tsx`)
- Manages global authentication state
- Provides login, register, and logout functions
- Handles token verification and user persistence
- Automatically redirects unauthorized users

### Authentication Utilities (`app/lib/auth.ts`)
- Password hashing and verification
- JWT token creation and verification
- User creation and authentication
- Mock user database (replace with real database in production)

### Protected Dashboard (`app/dashboard/page.tsx`)
- Displays user information
- Shows authentication status
- Provides logout functionality
- Automatically redirects non-authenticated users

## 🔐 Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds
- Plain text passwords are never stored
- Password confirmation validation on registration

### JWT Tokens
- Secure token generation with jose library
- 24-hour token expiration
- Automatic token verification on protected routes
- Secure cookie storage with httpOnly flags

### Route Protection
- Automatic redirection for unauthenticated users
- Context-based authentication checks
- Loading states during authentication verification

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Tailwind CSS for consistent styling
- Modern gradient backgrounds
- Clean, professional interface

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Form validation with real-time feedback
- Smooth transitions and animations

### Forms
- Email and password validation
- Password confirmation matching
- Clear error messages
- Disabled states during submission

## 🚀 Production Deployment

### Environment Variables
1. Update `JWT_SECRET` in `.env.local` with a secure random string (min 32 characters)
2. Set `NEXT_PUBLIC_APP_URL` to your production domain

### Database Integration
The current implementation uses a mock in-memory user store. For production:

1. Replace the `users` array in `app/lib/auth.ts` with database calls
2. Implement proper user CRUD operations
3. Add user session management
4. Consider adding refresh tokens for enhanced security

### Security Enhancements
- Implement rate limiting for login attempts
- Add email verification for new registrations
- Implement password reset functionality
- Add two-factor authentication (2FA)
- Use HTTPS in production

## 📝 API Reference

### AuthContext Hook

```typescript
const { user, login, register, logout, loading } = useAuth();
```

#### Methods

**`login(email: string, password: string): Promise<boolean>`**
- Authenticates user with email and password
- Returns true if successful, false otherwise
- Automatically sets user state and token

**`register(email: string, password: string, name: string): Promise<boolean>`**
- Creates new user account
- Returns true if successful, false if email exists
- Automatically logs in the new user

**`logout(): void`**
- Clears user session and token
- Redirects to homepage
- Removes authentication cookies

#### Properties

- `user: User | null` - Current authenticated user or null
- `loading: boolean` - Loading state during authentication checks

## 🧪 Testing

### Manual Testing
1. **Registration Flow**
   - Go to `/register`
   - Fill out the form with valid data
   - Verify successful registration and auto-login

2. **Login Flow**
   - Go to `/login`
   - Use demo credentials or registered account
   - Verify successful login and dashboard redirect

3. **Protected Routes**
   - Try accessing `/dashboard` without authentication
   - Verify redirect to login page
   - Login and verify access to dashboard

4. **Session Persistence**
   - Login and refresh the page
   - Verify user remains logged in
   - Close browser and reopen - verify session persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure the development server is running
4. Check the browser's developer tools for additional debugging

---

**Built with ❤️ using Next.js, React, and TypeScript**
