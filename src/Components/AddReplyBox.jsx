import React from "react";
import { useState } from "react";

export default function AddReplyBox(props) {
  const [content, setContent] = useState("");

  return (
    <form
      className="mt-3 mb-5 grid grid-cols-2 gap-y-6 gap-x-4 rounded-lg bg-white px-5 py-6 md:grid-cols-[1fr_4fr_1fr] md:items-start"
      onSubmit={(e) => {
        e.preventDefault();
        props.setIsReplying(false);
      }}
    >
      <img
        src={props.profilePic}
        alt="profile-pic"
        className="row-start-2 w-8 self-center md:row-start-1 md:ml-6 md:w-10 md:self-start md:justify-self-center"
      />
      <textarea
        name="add-reply"
        id="add-reply"
        cols="30"
        rows="3"
        className="col-span-2 resize-none rounded-md border py-2 px-4 md:col-span-1"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="justify-self-end rounded-lg bg-moderate-blue py-2 px-6 font-medium uppercase text-white hover:opacity-80"
        onClick={() => props.addReply(content)}
      >
        Reply
      </button>
    </form>
  );
}
