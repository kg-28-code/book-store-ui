import React, { useState } from "react";
import { Cart, CustomerDto } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { Button, Card } from "../ui";
import { ShoppingBag } from "lucide-react";

interface CartSummaryProps {
  cart: Cart;
  customers: CustomerDto[];
  onCheckout: (customerId: number) => Promise<void>;
  loading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  cart,
  customers,
  onCheckout,
  loading = false,
}) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | "">("");

  const handleCheckout = () => {
    if (selectedCustomerId && typeof selectedCustomerId === "number") {
      onCheckout(selectedCustomerId);
    }
  };

  if (cart.totalItems === 0) {
    return (
      <Card className="text-center py-8">
        <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">Your cart is empty</p>
        <p className="text-gray-400">Add some books to get started!</p>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Items ({cart.totalItems})</span>
            <span>{formatCurrency(cart.totalAmount)}</span>
          </div>

          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span className="text-primary-600">
                {formatCurrency(cart.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Customer *
            </label>
            <select
              value={selectedCustomerId}
              onChange={(e) =>
                setSelectedCustomerId(
                  e.target.value ? Number(e.target.value) : ""
                )
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            >
              <option value="">Choose a customer...</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} {customer.email && `(${customer.email})`}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleCheckout}
            disabled={!selectedCustomerId || loading}
            loading={loading}
            className="w-full"
            size="lg"
          >
            Place Order
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartSummary;
