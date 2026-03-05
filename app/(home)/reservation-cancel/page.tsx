export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-6">
      <h1 className="text-3xl font-bold text-red-700 mb-3">
        Payment Cancelled 
      </h1>
      <p className="text-gray-700">Your reservation has not been made.</p>
    </div>
  );
}
