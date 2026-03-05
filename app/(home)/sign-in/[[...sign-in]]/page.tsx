import { SignIn } from "@clerk/nextjs";
import { assets } from '@/public/assets/assets'
export default function Page() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
       backgroundImage: `url(${assets.signin.src})`,
      }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
