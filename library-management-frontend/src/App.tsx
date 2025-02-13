import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        📚 Library Management System
      </h1>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
