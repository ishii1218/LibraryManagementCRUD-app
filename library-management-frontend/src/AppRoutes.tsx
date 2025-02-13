import { Routes, Route } from "react-router-dom";
import BookList from "./Pages/BookList";
import BookForm from "./Pages/BookForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/books/new" element={<BookForm />} />
      <Route path="/books/:id" element={<BookForm />} />
    </Routes>
  );
};

export default AppRoutes;
