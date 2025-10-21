"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

export default function SyncUser() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) return;

    async function sync() {
      try {
        const res = await axios.post("/api/auth/sync-user");
        if (res.data.success) console.log("User synced locally:", res.data.user);
      } catch (err) {
        console.error("Error syncing user:", err);
      }
    }

    sync();
  }, [isSignedIn]);

  return null;
}
