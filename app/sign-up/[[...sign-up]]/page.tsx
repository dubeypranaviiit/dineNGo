import { assets } from '@/public/assets/assets'
import { SignUp } from '@clerk/nextjs'
export default function Page() {
  return (
   <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
       backgroundImage: `url(${assets.signin.src})`,
      }}
    >
  
              <SignUp
        appearance={{
          elements: {
            card: "backdrop-blur bg-white/70 shadow-xl border border-gray-200",
          },
        }}
      />

  </div>
  )
}