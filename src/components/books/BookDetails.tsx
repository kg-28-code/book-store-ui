import React from "react";
import { BookDto } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { Card, Button, Badge } from "../ui";
import { ShoppingCart, Edit, Trash2, ArrowLeft } from "lucide-react";

interface BookDetailsProps {
  book: BookDto;
  onAddToCart?: (book: BookDto) => void;
  onEdit?: (book: BookDto) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
  showAdminActions?: boolean;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  book,
  onAddToCart,
  onEdit,
  onDelete,
  onBack,
  showAdminActions = false,
}) => {
  const isOutOfStock = (book.stock ?? 0) <= 0;

  return (
    <div className="max-w-4xl mx-auto">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Button>
      )}

      <Card className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Book Cover */}
          <div className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <div className="text-primary-600 font-bold text-2xl text-center px-6">
              {book.title}
            </div>
          </div>

          {/* Book Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600">by {book.author}</p>
            </div>

            {book.id && (
              <div className="text-sm text-gray-500">Book ID: {book.id}</div>
            )}

            <div className="space-y-4">
              {book.price && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">
                    Price:
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatCurrency(book.price)}
                  </span>
                </div>
              )}

              {book.stock !== undefined && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">
                    Stock:
                  </span>
                  <Badge
                    variant={
                      isOutOfStock
                        ? "danger"
                        : book.stock < 10
                        ? "warning"
                        : "success"
                    }
                    size="md"
                  >
                    {isOutOfStock ? "Out of Stock" : `${book.stock} available`}
                  </Badge>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6">
              {onAddToCart && (
                <Button
                  onClick={() => onAddToCart(book)}
                  disabled={isOutOfStock}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
              )}

              {showAdminActions && (
                <div className="flex gap-3">
                  {onEdit && (
                    <Button
                      variant="outline"
                      onClick={() => onEdit(book)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Book
                    </Button>
                  )}

                  {onDelete && book.id && (
                    <Button
                      variant="danger"
                      onClick={() => onDelete(book.id!)}
                      className="flex-1"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Book
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetails;
