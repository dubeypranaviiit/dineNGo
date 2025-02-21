// import Sidebar from "@/Components/AdminComponent/Sidebar"
// import Image from "next/image"
// import { assets } from "@/Assets/assets"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
// import { UserButton } from "@clerk/nextjs";
export default function adminLayout({children}){
return (
    <>
    <div className="flex">
        <ToastContainer theme="dark" />
        {/* <Sidebar/> */}
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                <h3 className="font-medium text-3xl ">Admin Panel</h3>
                {/* <UserButton /> */}
{/*  */}
            </div>
                         {
        children
                      }
        </div>
    </div>
    
    </>
)
}