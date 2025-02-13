import { Link } from "react-router-dom";
import type { Book } from "../Models/Book";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../Services/BookService";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Edit2 } from "lucide-react";
import { toast } from "react-toastify";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const books = await getBooks();
      setBooks(books);
    } catch {
      toast.error("Failed to fetch books");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    fetchBooks();
  };
  return (
    <div className="space-y-4 m-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="border hover:bg-slate-50  p-4 rounded shadow transition-transform duration-300 transform hover:scale-[1.01]"
        >
          <h2 className="text-xl font-bold">{book.title}</h2>
          <p className="text-lg font-semibold">Author: {book.author}</p>
          <div>
            <p className="text-lg font-semibold">Description:</p>
            <p>{book.description}</p>
          </div>
          <div className="mt-2 space-x-2">
            <Button
              variant="outline"
              className="bg-blue-600 hover:bg-blue-500 hover:text-white text-white"
              size="default"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="default"
              onClick={() => handleDelete(book.id)}
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      ))}
      <Button
        onClick={() => navigate("/books/new")}
        className="bg-green-600 hover:bg-green-500 text-white flex items-center gap-2 px-4 py-2 rounded-md shadow-md"
      >
        <Plus className="h-5 w-5" />
        Add New Book
      </Button>
    </div>
  );
}
