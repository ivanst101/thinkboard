import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSignUpForm(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto p-4 border border-[#00FF9D40] rounded-md">
        <form className="flex flex-col gap-3" onSubmit={handleSignUpForm}>
          <h2 className="text-2xl mb-3">Log in</h2>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="example@google.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md"
          />
          <div className="bg-error text-white"></div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md"
          />
          <div className="bg-error text-white"></div>
          <button className="btn btn-primary">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
