export default function Write() {
  return (
    <div>
      <h4>Write something here... POST test</h4>
      <form action="/api/server" method="POST">
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
