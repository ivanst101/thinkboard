import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  async function handleSignUpForm(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors?.email) toast.error(data.errors.email);
        if (data.errors?.password) toast.error(data.errors.password);
        setErrors(data.errors);
        return;
      }

      toast.success("Logged in successfully!");
      setErrors({ email: "", password: "" });
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
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
          {errors.email && <div className="text-red-500">{errors.email}</div>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
          <button className="btn btn-primary">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
