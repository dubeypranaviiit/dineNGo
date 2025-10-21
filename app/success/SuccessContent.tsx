"use client";
export const dynamic = "force-dynamic";



import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Processing reservation...");

  useEffect(() => {
    if (!sessionId) return;

    axios.get(`/api/reservation-success?session_id=${sessionId}`)
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        setMessage(err.response?.data?.error || "Something went wrong");
      });
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
