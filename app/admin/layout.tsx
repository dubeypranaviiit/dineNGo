import Sidebar from "@/components/admin/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { getUserRole } from "@/lib/getUserRole";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await getUserRole();

  // Prevent customers from accessing admin routes
  if (role === "customer") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      
      <div className="w-64 bg-gray-800 text-white fixed h-full">
        <Sidebar />
      </div>

    
      <div className="flex-1 flex flex-col ml-64 p-6">
        <ToastContainer theme="dark" />
        {children}
      </div>
    </div>
  );
}