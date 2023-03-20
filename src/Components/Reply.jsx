import React from "react";
import iconReply from "../assets/icon-reply.svg";
import iconDelete from "../assets/icon-delete.svg";
import iconEdit from "../assets/icon-edit.svg";
import AddCommentBox from "./AddCommentBox";
import data from "../data.json";

export default function Reply(props) {
  return (
    <>
      {/* <AddCommentBox /> */}
      <article className="grid grid-cols-2 gap-y-4 rounded-lg bg-white p-5 md:grid-cols-[1fr_9fr] md:gap-x-2">
        <div className="md:self-top row-start-3 flex max-w-[6rem] items-center justify-between rounded-lg bg-very-light-gray py-1.5 px-3 md:col-start-1 md:row-span-2 md:h-24 md:max-w-[2.5rem] md:flex-col md:justify-self-center">
          <button className="font-bold text-light-grayish-blue">+</button>
          <span className="font-medium text-moderate-blue">
            {props.replyScore}
          </span>
          <button className="font-bold text-light-grayish-blue ">-</button>
        </div>

        <div className="col-span-2 flex items-center gap-4 md:col-start-2 md:row-start-1">
          <img src={props.replyPfp} alt="Amy Robson" className="w-8" />
          <p className="font-medium">{props.replyUsername}</p>
          {props.replyUsername === data.currentUser.username ? (
            <span className=" -ml-2 rounded-sm bg-moderate-blue px-1 text-sm font-medium text-white">
              you
            </span>
          ) : null}
          <span className="text-grayish-blue">{props.replyDate}</span>
        </div>

        <div className="col-span-2 md:col-start-2">
          <p className="text-grayish-blue">
            <span className="font-medium text-moderate-blue">
              @{props.replyingTo}
            </span>{" "}
            {props.replyContent}
          </p>
        </div>

        {props.replyUsername === data.currentUser.username ? (
          <div className="flex cursor-pointer items-center gap-8 justify-self-end md:col-start-2 md:row-start-1">
            <button className="flex items-center gap-2 font-medium text-soft-red hover:opacity-70">
              <img src={iconDelete} alt="delete" /> Delete
            </button>
            <button className="flex items-center gap-2 font-medium text-moderate-blue hover:opacity-70">
              <img src={iconEdit} alt="edit" />
              Edit
            </button>
          </div>
        ) : (
          <div className="flex cursor-pointer items-center gap-2 justify-self-end hover:opacity-70 md:col-start-2 md:row-start-1 ">
            <img src={iconReply} alt="reply" />
            <span className="font-medium text-moderate-blue">Reply</span>
          </div>
        )}
      </article>
    </>
  );
}
