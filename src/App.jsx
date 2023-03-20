import { useState } from "react";
import AddCommentBox from "./Components/AddCommentBox.jsx";
import Comment from "./Components/Comment.jsx";
import data from "./data.json";
import Modal from "./Components/Modal.jsx";

function App() {
  const comments = data.comments.map((comment) => {
    return (
      <Comment
        key={comment.id}
        id={comment.id}
        commentContent={comment.content}
        commentDate={comment.createdAt}
        commentScore={comment.score}
        commentUser={comment.user.username}
        commentPfp={comment.user.image.webp}
        commentReplies={comment.replies}
      />
    );
  });

  return (
    <>
      <main className="relative mx-auto mt-4 max-w-3xl px-4 py-6">
        {comments}
        <AddCommentBox profilePic={data.currentUser.image.webp} />
      </main>
      {/* <div className="fixed top-0 z-10 flex h-[100vh] w-[100%] items-center justify-center bg-overlay">
        <Modal />
      </div> */}
    </>
  );
}

export default App;
