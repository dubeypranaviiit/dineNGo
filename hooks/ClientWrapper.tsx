"use client"; 

import { useUser } from "@clerk/nextjs";
import SyncUser from "./SyncUser";

export default function ClientWrapper() {
  const { isSignedIn } = useUser();

  return <>{isSignedIn && <SyncUser />}</>;
}
