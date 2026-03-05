import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/database/dbConnect";
import User from "@/database/models/user.modal";
export async function getUserRole() {
  const { userId } = await auth();

  if (!userId) return null;

  await dbConnect();

  const user = await User.findOne({ clerkUserId: userId });

  return user?.role || "customer";
}