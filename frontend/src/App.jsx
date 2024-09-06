import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Toaster } from "sonner";
import MainRoute from "./routes/MainRoute";
import { useEffect, useState } from "react";
import axiosInstance from "./utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setSession } from "./features/session/sessionReducer";

function App() {
  const [isPending, setIsPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentSession = async () => {
      try {
        const response = await axiosInstance.get("/sessions/current_session");
        dispatch(setSession(response.data));
      } catch (error) {
        console.log(error?.response.data?.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchCurrentSession();
  }, [dispatch]);

  return isPending ? (
    "loading..."
  ) : (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster richColors position="top-right" />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/*" element={<MainRoute />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
