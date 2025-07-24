import React from "react";
import { Button, Badge } from "../ui";
import { ShoppingCart, Book, Users, Menu } from "lucide-react";
import { useCart } from "../../contexts";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onToggleMobileMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage,
  onToggleMobileMenu,
}) => {
  const { state: cartState } = useCart();

  const navItems = [
    { id: "books", label: "Books", icon: Book },
    { id: "customers", label: "Customers", icon: Users },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-primary-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">
                BookStore
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPage === item.id
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              onClick={() => onNavigate("cart")}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartState.cart.totalItems > 0 && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5"
                >
                  {cartState.cart.totalItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={onToggleMobileMenu}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
