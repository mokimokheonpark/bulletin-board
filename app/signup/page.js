export default function SignUp() {
  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="username" type="text" placeholder="username" />
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
