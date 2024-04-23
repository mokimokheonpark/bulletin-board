export default async function Home() {
  return (
    <div className="p-20">
      <h1>Welcome to Bulletin-Board!</h1>
      <div className="mb">
        <h4>
          Bulletin-Board is an interactive web application crafted for sharing
          ideas, exchanging information, and expressing feelings.
        </h4>
        <h4>
          You're welcome to engage with other users through posts and comments.
        </h4>
        <h4>The following are user experience features:</h4>
      </div>
      <div className="mb">
        <p>
          - <strong>User Authentication</strong>: Seamlessly create accounts and
          manage access to the platform.
        </p>
        <p>
          - <strong>GitHub Login</strong>: Conveniently log in using your GitHub
          credentials.
        </p>
        <p>
          - <strong>Posts Section</strong>: Share your ideas, feelings,
          information, and questions with fellow users.
        </p>
        <p>
          - <strong>Post Management</strong>: Have full control over your posts
          with easy editing and deletion options.
        </p>
        <p>
          - <strong>Image Handling</strong>: Easily add, update, or remove
          images associated with your posts.
        </p>
        <p>
          - <strong>Comments Interaction</strong>: Engage in meaningful
          discussions with other users through the comments section on posts.
        </p>
        <p>
          - <strong>Comment Management</strong>: Manage your comments
          effortlessly with edit and delete functionalities.
        </p>
        <p>
          - <strong>Like Functionality</strong>: Show appreciation for posts by
          liking them, enhancing interaction and engagement.
        </p>
        <p>
          - <strong>Profile Page</strong>: Keep track of your activity and
          interactions with a personalized profile page.
        </p>
        <p>
          - <strong>User Customization</strong>: Customize your username to
          reflect your personality and preferences seamlessly.
        </p>
        <p>
          - <strong>Dark Mode</strong>: Enhance readability with the sleek and
          comfortable dark mode option.
        </p>
      </div>

      <div className="mt-60">
        <hr />
        <h4>Feel free to use the following test account or create your own.</h4>
        <p>
          - Email: <strong>test@test.com</strong>
        </p>
        <p>
          - Password: <strong>test1234</strong>
        </p>
      </div>
    </div>
  );
}
