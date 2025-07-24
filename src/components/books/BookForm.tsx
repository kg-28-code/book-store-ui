import React, { useState, useEffect } from "react";
import { BookDto, FormErrors } from "../../types";
import {
  validateRequired,
  validatePositiveNumber,
  validateNonNegativeNumber,
} from "../../utils/validation";
import { Input, Button } from "../ui";

interface BookFormProps {
  book?: BookDto | null;
  onSubmit: (book: Omit<BookDto, "id">) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({
  book,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        price: book.price?.toString() || "",
        stock: book.stock?.toString() || "",
      });
    }
  }, [book]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.title)) {
      newErrors.title = "Title is required";
    }

    if (!validateRequired(formData.author)) {
      newErrors.author = "Author is required";
    }

    if (formData.price && !validatePositiveNumber(parseFloat(formData.price))) {
      newErrors.price = "Price must be a positive number";
    }

    if (
      formData.stock &&
      !validateNonNegativeNumber(parseInt(formData.stock))
    ) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const bookData: Omit<BookDto, "id"> = {
      title: formData.title,
      author: formData.author,
      price: formData.price ? parseFloat(formData.price) : undefined,
      stock: formData.stock ? parseInt(formData.stock) : undefined,
    };

    try {
      await onSubmit(bookData);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        required
        placeholder="Enter book title"
      />

      <Input
        name="author"
        label="Author"
        value={formData.author}
        onChange={handleChange}
        error={errors.author}
        required
        placeholder="Enter author name"
      />

      <Input
        name="price"
        label="Price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        error={errors.price}
        placeholder="0.00"
        helperText="Leave empty if price is not available"
      />

      <Input
        name="stock"
        label="Stock Quantity"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        error={errors.stock}
        placeholder="0"
        helperText="Leave empty if stock is not tracked"
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={loading} className="flex-1">
          {book ? "Update Book" : "Create Book"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BookForm;
