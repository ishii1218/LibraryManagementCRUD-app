import { useForm } from "react-hook-form";
import { Book } from "../Models/Book";
import { createBook, updateBook, getBook } from "../Services/BookService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm<Book>({
    defaultValues: {
      id: "",
      title: "",
      author: "",
      description: "",
    },
  });

  // Fetch book details if ID exists
  useEffect(() => {
    if (id) {
      getBook(id)
        .then((book) => {
          form.reset(book);
        })
        .catch(() => toast.error("Failed to fetch book details"));
    }
  }, [id, form]);

  const onSubmit = async (data: Book) => {
    if (id) {
      await updateBook(id, data);
    } else {
      await createBook(data);
    }
    navigate("/");
  };

  return (
    <div className="boarder shadow-lg bg-slate-50 rounded-lg p-10 mt-6 m-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        {id ? "Update" : "Add"} Book Record
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 m-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book ID</FormLabel>
                <FormControl>
                  <Input className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input className="bg-white" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    className="h-30 w-full border rounded p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-green-600 hover:bg-green-500 p-5" type="submit">
            {id ? "Update" : "Add"} Book
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
