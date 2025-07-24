import React, { ReactNode } from "react";
import { BooksProvider } from "./BooksContext";
import { CustomersProvider } from "./CustomersContext";
import { CartProvider } from "./CartContext";

export { useBooks } from "./BooksContext";
export { useCustomers } from "./CustomersContext";
export { useCart } from "./CartContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <BooksProvider>
      <CustomersProvider>
        <CartProvider>{children}</CartProvider>
      </CustomersProvider>
    </BooksProvider>
  );
};
