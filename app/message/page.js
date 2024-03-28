import LogInBtn from "../components/LogInBtn";

export default async function Message() {
  return (
    <div className="p-20">
      <h2>Please log in first.</h2>
      <LogInBtn />
    </div>
  );
}
