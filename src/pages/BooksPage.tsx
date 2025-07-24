import React, { useState, useEffect } from "react";
import { BookList, BookForm, BookDetails } from "../components/books";
import { Button, Modal, Input } from "../components/ui";
import { useBooks, useCart } from "../contexts";
import { BookDto } from "../types";
import { Plus, Search } from "lucide-react";
import toast from "react-hot-toast";

const BooksPage: React.FC = () => {
  const { state, loadBooks, createBook, updateBook, deleteBook } = useBooks();
  const { addToCart } = useCart();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDto | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const filteredBooks = state.books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBook = async (bookData: Omit<BookDto, "id">) => {
    try {
      await createBook(bookData);
      setIsCreateModalOpen(false);
      toast.success("Book created successfully!");
    } catch (error) {
      toast.error("Failed to create book");
    }
  };

  const handleUpdateBook = async (bookData: Omit<BookDto, "id">) => {
    if (!selectedBook?.id) return;

    try {
      await updateBook(selectedBook.id, bookData);
      setIsEditModalOpen(false);
      setSelectedBook(null);
      toast.success("Book updated successfully!");
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  const handleDeleteBook = async (id: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(id);
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const handleAddToCart = (book: BookDto) => {
    addToCart(book);
    toast.success(`Added "${book.title}" to cart!`);
  };

  const handleViewBook = (book: BookDto) => {
    setSelectedBook(book);
    setViewMode("details");
  };

  const handleEditBook = (book: BookDto) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  if (viewMode === "details" && selectedBook) {
    return (
      <BookDetails
        book={selectedBook}
        onAddToCart={handleAddToCart}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
        onBack={() => {
          setViewMode("list");
          setSelectedBook(null);
        }}
        showAdminActions={true}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Books</h1>
          <p className="text-gray-600">Manage your book inventory</p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {state.totalElements}
          </div>
          <div className="text-sm text-gray-600">Total Books</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {filteredBooks.length}
          </div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {filteredBooks.filter((book) => (book.stock ?? 0) > 0).length}
          </div>
          <div className="text-sm text-gray-600">In Stock</div>
        </div>
      </div>

      {/* Book List */}
      <BookList
        books={filteredBooks}
        loading={state.isLoading}
        onAddToCart={handleAddToCart}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
        onView={handleViewBook}
        showAdminActions={true}
        emptyMessage={
          searchQuery ? "No books match your search." : "No books found."
        }
      />

      {/* Create Book Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Book"
        size="md"
      >
        <BookForm
          onSubmit={handleCreateBook}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={state.isLoading}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBook(null);
        }}
        title="Edit Book"
        size="md"
      >
        <BookForm
          book={selectedBook}
          onSubmit={handleUpdateBook}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedBook(null);
          }}
          loading={state.isLoading}
        />
      </Modal>
    </div>
  );
};

export default BooksPage;
