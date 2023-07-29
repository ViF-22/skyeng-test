"use client";
import React from "react";
import { useState } from "react";
import { AiOutlineStar, AiFillGithub } from "react-icons/ai";
import { RiGitRepositoryLine } from "react-icons/ri";

function UserCard({ u }) {
  const [open, setOpen] = useState();
  return (
    <div
      className="flex flex-col border-[1px] hover:shadow-lg hover:bg-green-200/20 rounded-xl mx-5 px-5 md:px-8 md:w-[600px]"
      key={u.id}
    >
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-row gap-x-10 md:gap-x-16 py-5 items-center"
      >
        {/* //left */}
        <div className="rounded-full h-[120px] w-[120px] md:w-[140px] md:h-[140px] relative border-red overflow-hidden">
          <img src={u.avatar_url} className="h-full w-full object-cover" />
        </div>
        {/* //right */}
        <div>
          <h2 className="text-[18px] md:text-[22px] font-semibold">
            {u.login}
          </h2>
          <p className="flex items-center gap-x-2 text-[14px] md:text-[16px]">
            Number of repos:{" "}
            <span className="font-medium">{u.repos_length}</span>
          </p>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-y-2 pb-5">
          <div className="flex items-center gap-x-2">
            <AiOutlineStar className="text-yellow-600 text-[20px]" />
            <p>Score: {u.score} </p>
          </div>
          <div className="flex items-center gap-x-2">
            <AiFillGithub className="text-purple-800 text-[20px]" />
            <a
              href={u.html_url}
              className="hover:text-purple-900 hover:font-medium"
            >
              Look at their profile
            </a>
          </div>

          <div className="flex items-center gap-x-2">
            <RiGitRepositoryLine className="text-sky-800 text-[20px]" />
            <a
              href={`https://github.com/${u.login}?tab=repositories`}
              className="hover:text-sky-900 hover:font-medium"
            >
              Explore repos
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCard;
