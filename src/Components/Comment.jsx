import React from "react";
import Reply from "./Reply.jsx";
import iconReply from "../assets/icon-reply.svg";
import data from "../data.json";

export default function Comment(props) {
  return (
    <>
      <article className="grid grid-cols-2 gap-y-4 rounded-lg bg-white p-5 md:grid-cols-[1fr_9fr] md:gap-x-2">
        <div className="md:self-top row-start-3 flex max-w-[6rem] items-center justify-between rounded-lg bg-very-light-gray py-1.5 px-3 md:col-start-1 md:row-span-2 md:h-24 md:max-w-[2.5rem] md:flex-col md:justify-self-center">
          <button className="font-bold text-light-grayish-blue">+</button>
          <span className="font-medium text-moderate-blue">
            {props.commentScore}
          </span>
          <button className="font-bold text-light-grayish-blue ">-</button>
        </div>

        <div className="col-span-2 flex items-center gap-4 md:col-start-2 md:row-start-1">
          <img src={props.commentPfp} alt="Profile-Pic" className="w-8" />
          <p className="font-medium">{props.commentUser}</p>
          {props.commentUser === data.currentUser.username ? (
            <div>you</div>
          ) : null}
          <span className="text-grayish-blue">{props.commentDate}</span>
        </div>

        <div className="col-span-2 md:col-start-2">
          <p className="text-grayish-blue">{props.commentContent}</p>
        </div>

        <div className="flex cursor-pointer items-center gap-2 justify-self-end hover:opacity-70 md:col-start-2 md:row-start-1">
          <img src={iconReply} alt="reply" />
          <span className="font-medium text-moderate-blue">Reply</span>
        </div>
      </article>

      {props.commentReplies ? (
        <div className="mt-4 flex flex-col gap-4 border-l-[2px] pl-4 md:ml-14 md:pl-8">
          {props.commentReplies.map((reply) => {
            return (
              <Reply
                key={reply.id}
                id={reply.id}
                replyContent={reply.content}
                replyScore={reply.score}
                replyDate={reply.createdAt}
                replyPfp={reply.user.image.webp}
                replyUsername={reply.user.username}
                replyingTo={reply.replyingTo}
              />
            );
          })}
        </div>
      ) : null}
    </>
  );
}
