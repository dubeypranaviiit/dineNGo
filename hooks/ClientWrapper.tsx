"use client";

import { useUser } from "@clerk/nextjs";
import SyncUser from "./SyncUser";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn } = useUser();

  return (
    <>
      {isSignedIn && <SyncUser />}
      {children}
    </>
  );
}