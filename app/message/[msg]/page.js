import { notFound } from "next/navigation";
import LogInBtn from "@/app/components/LogInBtn";
import SignUpBtn from "@/app/components/SignUpBtn";

export default function Message(props) {
  return (
    <div className="p-20">
      {props.params.msg === "write" ? (
        <h2>Please log in first to write a post.</h2>
      ) : props.params.msg === "my-posts" ? (
        <h2>Please log in first to check your posts.</h2>
      ) : props.params.msg === "my-likes" ? (
        <h2>Please log in first to check posts you have liked.</h2>
      ) : props.params.msg === "my-comments" ? (
        <h2>Please log in first to check your comments.</h2>
      ) : props.params.msg === "profile" ? (
        <h2>Please log in first to see your profile.</h2>
      ) : props.params.msg === "like" ? (
        <h2>Please log in first to like the post.</h2>
      ) : (
        notFound()
      )}
      <LogInBtn />
      <div className="mt-60">
        <hr />
        <h4>Do you not have an account? Create one now!</h4>
        <SignUpBtn />
      </div>
    </div>
  );
}
