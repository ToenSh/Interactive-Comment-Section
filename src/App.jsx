import { nanoid } from "nanoid";
import { useState, useEffect, createContext } from "react";
import AddCommentBox from "./Components/AddCommentBox.jsx";
import Comment from "./Components/Comment.jsx";
import Modal from "./Components/Modal.jsx";

export const CommentsContext = createContext();

function App() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [replyingToData, setReplyingToData] = useState({
    id: 0,
    username: "username",
  });

  //fetch data
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
        setComments(data.comments);
        setCurrentUser(data.currentUser);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  function addReply(content) {
    //build reply object
    const newReply = {
      id: nanoid(),
      content: content,
      createdAt: "just now",
      score: 0,
      replyingTo: replyingToData.username,
      user: {
        image: {
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };

    const updatedComments = comments.every(
      (comment) => comment.id !== replyingToData.id //check to see if it's an existing reply or comment that we're replying to
    )
      ? comments.map((comment) => {
          //logic if it is a reply
          return {
            ...comment,
            replies: comment.replies.some(
              (reply) => reply.id === replyingToData.id
            )
              ? comment.replies.concat(newReply)
              : comment.replies,
          };
        })
      : comments.map((comment) => {
          //and if it is a comment
          if (comment.id === replyingToData.id) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          } else return comment;
        });
    setComments(updatedComments);
  }

  //delete comment/reply
  function handleIsDeleting(id) {
    setIsDeleting((prevIsDeleting) => !prevIsDeleting);
    setIdToDelete(id);
  }

  function deleteComment() {
    const remainingComments = comments.every(
      (comment) => comment.id !== idToDelete
    )
      ? comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== idToDelete),
          };
        })
      : comments.filter((comment) => comment.id !== idToDelete);

    setComments(remainingComments);
    setIsDeleting((prevIsDeleting) => !prevIsDeleting);
  }

  //update score (cap score at +/- 1 not implemented)
  function handleScore(id, method) {
    const updatedComments = comments.every((comment) => comment.id !== id)
      ? comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === id) {
                return {
                  ...reply,
                  score:
                    method === "upvote" ? reply.score + 1 : reply.score - 1,
                };
              } else return reply;
            }),
          };
        })
      : comments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              score:
                method === "upvote" ? comment.score + 1 : comment.score - 1,
            };
          } else return comment;
        });
    setComments(updatedComments);
  }

  //edit comment/reply
  function updateComment(id, newContent) {
    const updatedComments = comments.every((comment) => comment.id !== id)
      ? comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              return {
                ...reply,
                content: reply.id === id ? newContent : reply.content,
              };
            }),
          };
        })
      : comments.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              content: newContent,
            };
          } else return comment;
        });
    setComments(updatedComments);
  }

  //display comments/replies
  const commentElements = comments?.map((comment) => {
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
        currentUser={currentUser}
        handleIsDeleting={handleIsDeleting}
        handleScore={handleScore}
        updateComment={updateComment}
        setReplyingToData={setReplyingToData}
        addReply={addReply}
      />
    );
  });

  return (
    <>
      <main className="relative mx-auto mt-4 max-w-3xl px-4 py-6">
        <CommentsContext.Provider value={{ comments, setComments }}>
          {commentElements}
          <AddCommentBox profilePic={currentUser?.image.webp} />
        </CommentsContext.Provider>
      </main>

      {isDeleting && (
        <div className="fixed top-0 z-10 flex h-[100vh] w-[100%] items-center justify-center bg-overlay">
          <Modal
            handleIsDeleting={handleIsDeleting}
            deleteComment={deleteComment}
          />
        </div>
      )}
    </>
  );
}

export default App;
