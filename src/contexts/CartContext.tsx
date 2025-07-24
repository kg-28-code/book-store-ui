import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import {
  CartItem,
  Cart,
  BookDto,
  PlaceOrderRequest,
  OrderResponseDto,
} from "../types";
import { OrdersService } from "../services";

interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
  lastOrder: OrderResponseDto | null;
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: BookDto }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { bookId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LAST_ORDER"; payload: OrderResponseDto };

const initialState: CartState = {
  cart: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
  lastOrder: null,
};

const calculateTotals = (
  items: CartItem[]
): { totalAmount: number; totalItems: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );
  return { totalAmount, totalItems };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload.id
      );
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = state.cart.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...state.cart.items,
          { ...action.payload, quantity: 1 },
        ];
      }

      const totals = calculateTotals(updatedItems);
      return {
        ...state,
        cart: {
          items: updatedItems,
          ...totals,
        },
      };
    }
    case "REMOVE_FROM_CART": {
      const updatedItems = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
      const totals = calculateTotals(updatedItems);
      return {
        ...state,
        cart: {
          items: updatedItems,
          ...totals,
        },
      };
    }
    case "UPDATE_QUANTITY": {
      const { bookId, quantity } = action.payload;
      if (quantity <= 0) {
        const updatedItems = state.cart.items.filter(
          (item) => item.id !== bookId
        );
        const totals = calculateTotals(updatedItems);
        return {
          ...state,
          cart: {
            items: updatedItems,
            ...totals,
          },
        };
      }

      const updatedItems = state.cart.items.map((item) =>
        item.id === bookId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(updatedItems);
      return {
        ...state,
        cart: {
          items: updatedItems,
          ...totals,
        },
      };
    }
    case "CLEAR_CART":
      return {
        ...state,
        cart: {
          items: [],
          totalAmount: 0,
          totalItems: 0,
        },
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_LAST_ORDER":
      return { ...state, lastOrder: action.payload, isLoading: false };
    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addToCart: (book: BookDto) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (customerId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = useCallback((book: BookDto) => {
    dispatch({ type: "ADD_TO_CART", payload: book });
  }, []);

  const removeFromCart = useCallback((bookId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: bookId });
  }, []);

  const updateQuantity = useCallback((bookId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { bookId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const placeOrder = useCallback(
    async (customerId: number) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const orderRequest: PlaceOrderRequest = {
          customerId,
          items: state.cart.items.map((item) => ({
            bookId: item.id!,
            quantity: item.quantity,
          })),
        };

        const order = await OrdersService.placeOrder(orderRequest);
        dispatch({ type: "SET_LAST_ORDER", payload: order });
        dispatch({ type: "CLEAR_CART" });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    [state.cart.items]
  );

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
