export default function SignUp() {
  return (
    <div className="p-20">
      <h4>SIGN UP</h4>
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
