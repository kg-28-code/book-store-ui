import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";
import { BookDto, PageBookDto, LoadingState, PaginationParams } from "../types";
import { BooksService } from "../services";

interface BooksState extends LoadingState {
  books: BookDto[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
  selectedBook: BookDto | null;
}

type BooksAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_BOOKS"; payload: PageBookDto }
  | { type: "ADD_BOOK"; payload: BookDto }
  | { type: "UPDATE_BOOK"; payload: BookDto }
  | { type: "DELETE_BOOK"; payload: number }
  | { type: "SET_SELECTED_BOOK"; payload: BookDto | null }
  | { type: "SET_PAGE"; payload: number };

const initialState: BooksState = {
  books: [],
  totalPages: 0,
  totalElements: 0,
  currentPage: 0,
  pageSize: 10,
  selectedBook: null,
  isLoading: false,
  error: null,
};

const booksReducer = (state: BooksState, action: BooksAction): BooksState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "SET_BOOKS":
      return {
        ...state,
        books: action.payload.content,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        currentPage: action.payload.number,
        pageSize: action.payload.size,
        isLoading: false,
        error: null,
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [action.payload, ...state.books],
        totalElements: state.totalElements + 1,
      };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
        selectedBook: action.payload,
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        totalElements: state.totalElements - 1,
        selectedBook:
          state.selectedBook?.id === action.payload ? null : state.selectedBook,
      };
    case "SET_SELECTED_BOOK":
      return { ...state, selectedBook: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

interface BooksContextType {
  state: BooksState;
  loadBooks: (params?: PaginationParams) => Promise<void>;
  loadBook: (id: number) => Promise<void>;
  createBook: (book: Omit<BookDto, "id">) => Promise<void>;
  updateBook: (id: number, book: Omit<BookDto, "id">) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  setSelectedBook: (book: BookDto | null) => void;
  setPage: (page: number) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  const loadBooks = useCallback(
    async (params?: PaginationParams) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await BooksService.getAll({
          page: params?.page ?? state.currentPage,
          size: params?.size ?? state.pageSize,
        });
        dispatch({ type: "SET_BOOKS", payload: response });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    [state.currentPage, state.pageSize]
  );

  const loadBook = useCallback(async (id: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const book = await BooksService.getById(id);
      dispatch({ type: "SET_SELECTED_BOOK", payload: book });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const createBook = useCallback(async (book: Omit<BookDto, "id">) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const newBook = await BooksService.create(book);
      dispatch({ type: "ADD_BOOK", payload: newBook });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const updateBook = useCallback(
    async (id: number, book: Omit<BookDto, "id">) => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const updatedBook = await BooksService.update(id, book);
        dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    },
    []
  );

  const deleteBook = useCallback(async (id: number) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      await BooksService.delete(id);
      dispatch({ type: "DELETE_BOOK", payload: id });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, []);

  const setSelectedBook = useCallback((book: BookDto | null) => {
    dispatch({ type: "SET_SELECTED_BOOK", payload: book });
  }, []);

  const setPage = useCallback((page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  }, []);

  return (
    <BooksContext.Provider
      value={{
        state,
        loadBooks,
        loadBook,
        createBook,
        updateBook,
        deleteBook,
        setSelectedBook,
        setPage,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error("useBooks must be used within a BooksProvider");
  }
  return context;
};
