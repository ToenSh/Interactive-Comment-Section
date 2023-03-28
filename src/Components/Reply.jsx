import React from "react";
import { useState } from "react";
import iconReply from "../assets/icon-reply.svg";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";
import AddReplyBox from "./AddReplyBox";

export default function Reply(props) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(props.replyContent);

  function handleReplying() {
    setIsReplying((prevIsReplying) => !prevIsReplying);
    props.setReplyingToData({
      id: props.id,
      username: props.replyUsername,
    });
  }

  function handleEditing() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  return (
    <>
      <article className="grid grid-cols-2 gap-y-4 rounded-lg bg-white p-5 md:grid-cols-[1fr_9fr] md:gap-x-2">
        <div className="md:self-top row-start-3 flex max-w-[6rem] items-center justify-between rounded-lg bg-very-light-gray py-1.5 px-3 md:col-start-1 md:row-span-2 md:h-24 md:max-w-[2.5rem] md:flex-col md:justify-self-center">
          <button
            className="font-bold text-light-grayish-blue focus:text-moderate-blue"
            onClick={() => props.handleScore(props.id, "upvote")}
          >
            +
          </button>
          <span className="font-medium text-moderate-blue">
            {props.replyScore}
          </span>
          <button
            className="font-bold text-light-grayish-blue focus:text-moderate-blue"
            onClick={() => props.handleScore(props.id, "downvote")}
          >
            -
          </button>
        </div>

        <div className="col-span-2 flex items-center gap-4 md:col-start-2 md:row-start-1">
          <img src={props.replyPfp} alt="Amy Robson" className="w-8" />
          <p className="font-medium">{props.replyUsername}</p>
          {props.replyUsername === props.currentUser.username ? (
            <span className=" -ml-2 rounded-sm bg-moderate-blue px-1 text-sm font-medium text-white">
              you
            </span>
          ) : null}
          <span className="text-grayish-blue">{props.replyDate}</span>
        </div>

        <div className="col-span-2 flex flex-col md:col-start-2">
          {!isEditing ? (
            <p className="text-grayish-blue">
              <span className="font-medium text-moderate-blue">
                @{props.replyingTo}
              </span>{" "}
              {props.replyContent}
            </p>
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
                  props.updateReply(props.id, content);
                  handleEditing();
                }}
              >
                Update
              </button>{" "}
            </>
          )}
        </div>

        {props.replyUsername === props.currentUser.username ? (
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
          replyingTo={props.replyUsername}
          setIsReplying={setIsReplying}
          addReply={props.addReply}
        />
      )}
    </>
  );
}
