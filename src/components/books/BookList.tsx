import React from "react";
import { BookDto } from "../../types";
import { LoadingSpinner } from "../ui";
import BookCard from "./BookCard";

interface BookListProps {
  books: BookDto[];
  loading?: boolean;
  onAddToCart?: (book: BookDto) => void;
  onEdit?: (book: BookDto) => void;
  onDelete?: (id: number) => void;
  onView?: (book: BookDto) => void;
  showAdminActions?: boolean;
  emptyMessage?: string;
}

const BookList: React.FC<BookListProps> = ({
  books,
  loading = false,
  onAddToCart,
  onEdit,
  onDelete,
  onView,
  showAdminActions = false,
  emptyMessage = "No books found.",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">{emptyMessage}</div>
        <p className="text-gray-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
          showAdminActions={showAdminActions}
        />
      ))}
    </div>
  );
};

export default BookList;
