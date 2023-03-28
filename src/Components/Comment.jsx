import { useState } from "react";
import React from "react";
import Reply from "./Reply.jsx";
import iconReply from "../assets/icon-reply.svg";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";
import AddReplyBox from "./AddReplyBox.jsx";

export default function Comment(props) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(props.commentContent);

  function handleReplying() {
    setIsReplying((prevIsReplying) => !prevIsReplying);
    props.setReplyingToData({
      id: props.id,
      username: props.commentUser,
    });
  }

  function handleEditing() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  return (
    <>
      <article className="my-4 grid grid-cols-2 gap-y-4 rounded-lg bg-white p-5 md:grid-cols-[1fr_9fr] md:gap-x-2">
        <div className="md:self-top row-start-3 flex max-w-[6rem] items-center justify-between rounded-lg bg-very-light-gray py-1.5 px-3 md:col-start-1 md:row-span-2 md:h-24 md:max-w-[2.5rem] md:flex-col md:justify-self-center">
          <button
            className="font-bold text-light-grayish-blue focus:text-moderate-blue"
            onClick={() => props.handleScore(props.id, "upvote")}
          >
            +
          </button>
          <span className="font-medium text-moderate-blue">
            {props.commentScore}
          </span>
          <button
            className="font-bold text-light-grayish-blue focus:text-moderate-blue"
            onClick={() => props.handleScore(props.id, "downvote")}
          >
            -
          </button>
        </div>

        <div className="col-span-2 flex items-center gap-4 md:col-start-2 md:row-start-1">
          <img src={props.commentPfp} alt="Profile-Pic" className="w-8" />
          <p className="font-medium">{props.commentUser}</p>
          {props.commentUser === props.currentUser.username ? (
            <div className=" -ml-2 rounded-sm bg-moderate-blue px-1 text-sm font-medium text-white">
              you
            </div>
          ) : null}
          <span className="text-grayish-blue">{props.commentDate}</span>
        </div>

        <div className="col-span-2 flex flex-col md:col-start-2">
          {!isEditing ? (
            <p className="text-grayish-blue">{props.commentContent}</p>
          ) : (
            <>
              <textarea
                name="edit-comment"
                id="edit-comment"
                cols="30"
                rows="3"
                className="w-full resize-none rounded-md border py-2 px-4 "
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button
                className="mt-3 max-w-[7rem] self-end rounded-lg bg-moderate-blue py-2 px-6 font-medium uppercase text-white hover:opacity-80"
                onClick={() => {
                  props.updateComment(props.id, content);
                  handleEditing();
                }}
              >
                Update
              </button>
            </>
          )}
        </div>

        {props.commentUser === props.currentUser.username ? (
          <div className="flex cursor-pointer items-center gap-8 justify-self-end md:col-start-2 md:row-start-1">
            <button
              className="flex items-center gap-2 font-medium text-soft-red hover:opacity-70"
              onClick={() => props.handleIsDeleting(props.id)}
            >
              <img src={iconDelete} alt="delete" /> Delete
            </button>
            <button
              className="flex items-center gap-2 font-medium text-moderate-blue hover:opacity-70"
              onClick={handleEditing}
            >
              <img src={iconEdit} alt="edit" />
              Edit
            </button>
          </div>
        ) : (
          <div
            className="flex cursor-pointer items-center gap-2 justify-self-end hover:opacity-70 md:col-start-2 md:row-start-1 "
            onClick={handleReplying}
          >
            <img src={iconReply} alt="reply" />
            <span className="font-medium text-moderate-blue">Reply</span>
          </div>
        )}
      </article>

      {isReplying && (
        <AddReplyBox
          profilePic={props.currentUser.image.webp}
          replyingTo={props.commentUser}
          setIsReplying={setIsReplying}
          addReply={props.addReply}
        />
      )}

      {props.commentReplies.length != 0 ? (
        <div className="mt-4 flex flex-col gap-4 border-l-[2px] pl-4 md:ml-14 md:pl-8">
          {props.commentReplies?.map((reply) => {
            return (
              <Reply
                key={reply.id}
                id={reply.id}
                currentUser={props.currentUser}
                replyContent={reply.content}
                replyScore={reply.score}
                replyDate={reply.createdAt}
                replyPfp={reply.user.image.webp}
                replyUsername={reply.user.username}
                replyingTo={reply.replyingTo}
                handleIsDeleting={props.handleIsDeleting}
                handleScore={props.handleScore}
                updateReply={props.updateComment}
                setReplyingToData={props.setReplyingToData}
                addReply={props.addReply}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}
