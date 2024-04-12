import { notFound } from "next/navigation";
import LogInBtn from "@/app/components/LogInBtn";

export default function Message(props) {
  return (
    <div className="p-20">
      {props.params.msg === "write" ? (
        <h2>Please log in first to write a post.</h2>
      ) : props.params.msg === "my-posts" ? (
        <h2>Please log in first to check your posts.</h2>
      ) : props.params.msg === "my-comments" ? (
        <h2>Please log in first to check your comments.</h2>
      ) : props.params.msg === "profile" ? (
        <h2>Please log in first to see your profile.</h2>
      ) : (
        notFound()
      )}
      <LogInBtn />
    </div>
  );
}
