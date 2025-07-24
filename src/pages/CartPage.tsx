import React, { useEffect } from "react";
import { CartItem, CartSummary } from "../components/cart";
import { Card, Button } from "../components/ui";
import { useCart, useCustomers } from "../contexts";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    state: cartState,
    updateQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
  } = useCart();
  const { state: customersState, loadCustomers } = useCustomers();

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const handleCheckout = async (customerId: number) => {
    try {
      await placeOrder(customerId);
      toast.success("Order placed successfully!");
      onNavigate("books");
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast.success("Cart cleared");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate("books")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">
              {cartState.cart.totalItems}{" "}
              {cartState.cart.totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {cartState.cart.totalItems > 0 && (
          <Button variant="outline" onClick={handleClearCart}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      {cartState.cart.totalItems === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">Your cart is empty</div>
          <p className="text-gray-400 mb-6">
            Browse our books and add some to your cart!
          </p>
          <Button onClick={() => onNavigate("books")}>Browse Books</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <div className="divide-y divide-gray-200">
                {cartState.cart.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              cart={cartState.cart}
              customers={customersState.customers}
              onCheckout={handleCheckout}
              loading={cartState.isLoading}
            />
          </div>
        </div>
      )}

      {/* Order Success Message */}
      {cartState.lastOrder && (
        <Card className="border-green-200 bg-green-50">
          <div className="text-center py-6">
            <div className="text-green-800 text-lg font-semibold mb-2">
              Order Placed Successfully! 🎉
            </div>
            <p className="text-green-700 mb-4">
              Order #{cartState.lastOrder.orderId} has been confirmed.
            </p>
            <Button
              variant="outline"
              onClick={() => onNavigate("books")}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Continue Shopping
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CartPage;
