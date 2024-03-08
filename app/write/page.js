export default function Write() {
  return (
    <div className="p-20">
      <form action="/api/write" method="POST">
        <input name="title" placeholder="Title" required />
        <input name="content" placeholder="Content" required />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
