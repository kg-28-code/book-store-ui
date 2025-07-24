import React from "react";
import { BookDto } from "../../types";
import { formatCurrency } from "../../utils/formatters";
import { Card, Button, Badge } from "../ui";
import { ShoppingCart, Edit, Trash2, Eye } from "lucide-react";

interface BookCardProps {
  book: BookDto;
  onAddToCart?: (book: BookDto) => void;
  onEdit?: (book: BookDto) => void;
  onDelete?: (id: number) => void;
  onView?: (book: BookDto) => void;
  showActions?: boolean;
  showAdminActions?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onAddToCart,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  showAdminActions = false,
}) => {
  const isOutOfStock = (book.stock ?? 0) <= 0;

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      {/* Book Cover Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-primary-600 font-bold text-lg text-center px-4">
          {book.title}
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>

        <p className="text-gray-600 mb-2">by {book.author}</p>

        <div className="flex items-center justify-between mb-4">
          {book.price && (
            <span className="text-xl font-bold text-primary-600">
              {formatCurrency(book.price)}
            </span>
          )}

          {book.stock !== undefined && (
            <Badge
              variant={
                isOutOfStock
                  ? "danger"
                  : book.stock < 10
                  ? "warning"
                  : "success"
              }
              size="sm"
            >
              {isOutOfStock ? "Out of Stock" : `${book.stock} in stock`}
            </Badge>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
              {onAddToCart && (
                <Button
                  onClick={() => onAddToCart(book)}
                  disabled={isOutOfStock}
                  className="flex-1"
                  size="sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}

              {onView && (
                <Button
                  variant="outline"
                  onClick={() => onView(book)}
                  size="sm"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
            </div>

            {showAdminActions && (
              <div className="flex gap-2">
                {onEdit && (
                  <Button
                    variant="outline"
                    onClick={() => onEdit(book)}
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}

                {onDelete && book.id && (
                  <Button
                    variant="danger"
                    onClick={() => onDelete(book.id!)}
                    size="sm"
                    className="flex-1"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookCard;
