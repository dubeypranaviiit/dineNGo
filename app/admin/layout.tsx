import Sidebar from "@/components/admin/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar - Fixed on the left */}
        <div className="w-64 bg-gray-800 text-white fixed h-full">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-64 p-6">
          <ToastContainer theme="dark" />
          {children}
        </div>
      </div>
    </>
  );
}
