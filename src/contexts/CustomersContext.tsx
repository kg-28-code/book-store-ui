import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { CustomerDto, LoadingState } from "../types";
import { CustomersService } from "../services";

interface CustomersState extends LoadingState {
  customers: CustomerDto[];
  selectedCustomer: CustomerDto | null;
}

type CustomersAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CUSTOMERS"; payload: CustomerDto[] }
  | { type: "ADD_CUSTOMER"; payload: CustomerDto }
  | { type: "UPDATE_CUSTOMER"; payload: CustomerDto }
  | { type: "DELETE_CUSTOMER"; payload: number }
  | { type: "SET_SELECTED_CUSTOMER"; payload: CustomerDto | null };

const initialState: CustomersState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
};

const customersReducer = (
  state: CustomersState,
  action: CustomersAction
): CustomersState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
        isLoading: false,
        error: null,
      };
    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [action.payload, ...state.customers],
      };
    case "UPDATE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
        selectedCustomer: action.payload,
      };
    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
        selectedCustomer:
          state.selectedCustomer?.id === action.payload
            ? null
            : state.selectedCustomer,
      };
    case "SET_SELECTED_CUSTOMER":
      return { ...state, selectedCustomer: action.payload };
    default:
      return state;
  }
};

interface CustomersContextType {
  state: CustomersState;
  loadCustomers: () => Promise<void>;
  loadCustomer: (id: number) => Promise<void>;
  createCustomer: (customer: Omit<CustomerDto, "id">) => Promise<void>;
  updateCustomer: (
    id: number,
    customer: Omit<CustomerDto, "id">
  ) => Promise<void>;
  deleteCustomer: (id: number) => Promise<void>;
  setSelectedCustomer: (customer: CustomerDto | null) => void;
}

const CustomersContext = createContext<CustomersContextType | undefined>(
  undefined
);

export const CustomersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(customersReducer, initialState);

  const loadCustomers = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const customers = await CustomersService.getAll();
      dispatch({ type: "SET_CUSTOMERS", payload: customers });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const loadCustomer = useCallback(async (id: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const customer = await CustomersService.getById(id);
      dispatch({ type: "SET_SELECTED_CUSTOMER", payload: customer });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const createCustomer = useCallback(
    async (customer: Omit<CustomerDto, "id">) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const newCustomer = await CustomersService.create(customer);
        dispatch({ type: "ADD_CUSTOMER", payload: newCustomer });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    []
  );

  const updateCustomer = useCallback(
    async (id: number, customer: Omit<CustomerDto, "id">) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const updatedCustomer = await CustomersService.update(id, customer);
        dispatch({ type: "UPDATE_CUSTOMER", payload: updatedCustomer });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    []
  );

  const deleteCustomer = useCallback(async (id: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await CustomersService.delete(id);
      dispatch({ type: "DELETE_CUSTOMER", payload: id });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const setSelectedCustomer = useCallback((customer: CustomerDto | null) => {
    dispatch({ type: "SET_SELECTED_CUSTOMER", payload: customer });
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        state,
        loadCustomers,
        loadCustomer,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        setSelectedCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomers = (): CustomersContextType => {
  const context = useContext(CustomersContext);
  if (context === undefined) {
    throw new Error("useCustomers must be used within a CustomersProvider");
  }
  return context;
};
