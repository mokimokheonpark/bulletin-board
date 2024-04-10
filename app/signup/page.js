export default function SignUp() {
  return (
    <div className="p-20">
      <h2>Sign Up</h2>
      <form method="POST" action="/api/auth/signup">
        <input name="username" type="text" placeholder="Username" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input
          name="passwordCheck"
          type="password"
          placeholder="Password-Check"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
