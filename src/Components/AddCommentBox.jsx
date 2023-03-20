import React from "react";

export default function AddCommentBox(props) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-y-6 rounded-lg bg-white px-5 py-6 md:grid-cols-[1fr_4fr_1fr] md:items-start">
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
        placeholder="Add a comment..."
      ></textarea>
      <button className="justify-self-end rounded-lg bg-moderate-blue py-2 px-6 font-medium uppercase text-white hover:opacity-80">
        Send
      </button>
    </div>
  );
}
