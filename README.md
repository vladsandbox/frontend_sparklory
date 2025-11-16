# ✨ Sparklory - E-commerce Frontend

This is the frontend for **Sparklory**, a modern and elegant e-commerce application for a jewelry store. The project is built with modern web technologies to provide a fast, responsive, and user-friendly experience.

## 🚀 Key Features

*   **User Authentication:** Sign-up and login using email/password, as well as social providers (Google, Facebook OAuth).
*   **Product Catalog:** Browse products with advanced filtering, sorting, and search functionality.
*   **Product Page:** Detailed product information, material and size selection, image gallery, and customer reviews.
*   **Shopping Cart:** Add, remove, and update the quantity of items. Cart functionality supports both authenticated and guest users, including coupon application.
*   **Wishlist:** Ability to add products to a personal wishlist with persistence for both guests and logged-in users.
*   **Checkout Process:** A multi-step checkout process with shipping address validation, delivery method selection, and payment processing.
*   **Customer Profile:** A dedicated user dashboard with contact information, account security, and a detailed order history.
*   **Customer Reviews:** Users can leave reviews and upload photos for products they've purchased.
*   **Responsive Design:** The interface is optimized for a seamless experience across various devices, from mobile to desktop.

## 🛠️ Tech Stack

| Category          | Technology                                               |
| :---------------- |:---------------------------------------------------------|
| **Frontend**      | React, TypeScript                                        |
| **Build Tool**    | Vite                                                     |
| **State Mngmt**   | Redux Toolkit, React Redux                               |
| **Routing**       | React Router DOM                                         |
| **Styling**       | Sass (SCSS)                                              |
| **HTTP Client**   | Axios                                                    |
| **Forms**         | Formik for form management and Yup for validation        |
| **UI Components** | Keen Slider for sliders, Tippy.js for tooltips           |
| **Notifications** | React Toastify                                           |

## 📂 Project Structure

The project follows a modular and feature-driven structure for easy navigation and scalability.

```
frontend_sparklory/
├── src/
│   ├── api/          # Axios configuration and API requests
│   ├── assets/       # All the project icons, fonts and images
│   ├── components/   # Reusable UI components (Buttons, Inputs, Layout, etc.)
│   ├── pages/        # Main application pages/views (Home, Catalog, Product, etc.)
│   ├── store/        # Redux-related files (slices, thunks, middleware)
│   ├── styles/       # Global styles, Sass variables, and mixins
│   ├── types/        # TypeScript types and interfaces
│   ├── utils/        # Utility functions and custom hooks
│   ├── App.tsx       # Main component with routing configuration
│   └── main.tsx      # Application entry point
├── .env.example      # Example environment variables file
└── vite.config.ts    # Vite configuration
```

## ⚙️ Setup and Launch

To run the project locally, follow these steps.

#### 1. Clone the Repository
```bash
  git clone https://github.com/vladsandbox/frontend_sparklory.git
  cd frontend_sparklory
```

#### 2. Install Dependencies
```bash
  npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the project's root directory by copying the contents of `.env.example`, and fill it with your configuration data.

#### 4. Run the Project
```bash
  npm run dev
```
The application will be available at `http://localhost:3000`.

---

### 📜 Available Scripts

*   `npm run dev` — Starts the project in development mode with Hot Module Replacement (HMR).
*   `npm run build` — Builds the project for production into the `dist` directory.
*   `npm run lint` — Runs ESLint to check the code for errors and style consistency.
*   `npm run preview` — Starts a local server to preview the production build.