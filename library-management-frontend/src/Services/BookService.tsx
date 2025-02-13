import axios, { AxiosError } from "axios";
import { Book } from "../Models/Book";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5103/books";

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch books record");
    throw error;
  }
};

export const getBook = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch book record details");
    throw error;
  }
};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  try {
    const response = await axios.post(API_URL, book);
    toast.success("Book record created successfully");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to create book: " + error.response.data.message);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
    throw error;
  }
};

export const updateBook = async (id: string, book: Book): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, book);
    toast.success("Book record updated successfully");
  } catch (error) {
    toast.error("Failed to update book record");
    throw error;
  }
};

export const deleteBook = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("Book record deleted successfully");
  } catch (error) {
    toast.error("Failed to delete book record");
    throw error;
  }
};
