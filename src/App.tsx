import React, { useState } from "react";
import { AppProvider } from "./contexts";
import Layout from "./components/layout/Layout";
import BooksPage from "./pages/BooksPage";
import CustomersPage from "./pages/CustomersPage";
import CartPage from "./pages/CartPage";
import "./styles/index.css";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("books");

  const renderPage = () => {
    switch (currentPage) {
      case "books":
        return <BooksPage />;
      case "customers":
        return <CustomersPage />;
      case "cart":
        return <CartPage onNavigate={setCurrentPage} />;
      default:
        return <BooksPage />;
    }
  };

  return (
    <AppProvider>
      <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
        {renderPage()}
      </Layout>
    </AppProvider>
  );
};

export default App;
