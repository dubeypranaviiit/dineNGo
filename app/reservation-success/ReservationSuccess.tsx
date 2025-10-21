"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";
type Status = "loading" | "success" | "error";
export default function ReservationSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState<string>("Processing your reservation...");
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!sessionId) return;

    const fetchStatus = async () => {
      try {
        const res = await axios.get(`/api/reservation-success?session_id=${sessionId}`);
        setMessage(res.data.message || "Your reservation is confirmed!");
        setStatus("success");

      
        setTimeout(() => router.push("/"), 5000);
      } catch (err: any) {
        console.error(err);
        setMessage(err.response?.data?.error || "Something went wrong");
        setStatus("error");
      }
    };

    fetchStatus();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-blue-100"
      >
        {status === "loading" && (
          <>
            <Loader2 className="mx-auto text-blue-500 w-16 h-16 animate-spin mb-4" />
            <h1 className="text-lg font-semibold text-gray-700">{message}</h1>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Reservation Confirmed 
            </h1>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-400 mt-2">Redirecting to home...</p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full transition-colors"
            >
              Back to Home
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="mx-auto text-red-500 w-16 h-16 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Something Went Wrong
            </h1>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 inline-block bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-5 rounded-full transition-colors"
            >
              Try Again
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
