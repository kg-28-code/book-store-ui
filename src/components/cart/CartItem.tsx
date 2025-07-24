import React from "react";
import { CartItem as CartItemType } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { Button } from "../ui";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove(item.id!);
    } else {
      onUpdateQuantity(item.id!, newQuantity);
    }
  };

  const itemTotal = (item.price || 0) * item.quantity;

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 last:border-b-0">
      {/* Book Cover */}
      <div className="w-16 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded flex items-center justify-center flex-shrink-0">
        <div className="text-xs text-primary-600 font-medium text-center px-1">
          {item.title}
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
        <p className="text-sm text-gray-600">by {item.author}</p>
        {item.price && (
          <p className="text-sm font-medium text-primary-600">
            {formatCurrency(item.price)}
          </p>
        )}
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-3 h-3" />
        </Button>

        <span className="w-8 text-center text-sm font-medium">
          {item.quantity}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Item Total & Remove */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-medium text-gray-900">
            {formatCurrency(itemTotal)}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id!)}
          className="text-red-600 hover:text-red-700 w-8 h-8 p-0"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
