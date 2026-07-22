function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 text-white p-12">
          <h1 className="text-5xl font-bold">
            AI Recruitment Platform
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            Hire smarter with AI-powered recruitment, talent management,
            interview scheduling, and workforce analytics.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-10">
          {children}
        </div>

      </div>
    </div>
  );
}

export default AuthLayout;