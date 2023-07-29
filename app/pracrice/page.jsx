"use client";
import React from "react";
import { useState } from "react";
import { AiOutlineStar, AiFillGithub } from "react-icons/ai";
import { RiGitRepositoryLine } from "react-icons/ri";

function page() {
  const [open, setOpen] = useState();
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col border-[1px] hover:shadow-lg hover:bg-green-200/20 rounded-xl mx-5 px-5 md:px-8 md:w-[600px]"
        key={1}
      >
        <div
          onClick={() => setOpen(!open)}
          className="flex flex-row gap-x-10 md:gap-x-16 py-5 items-center"
        >
          {/* //left */}
          <div className="rounded-full w-[140px] h-[140px] relative border-red overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              className="h-full w-full object-cover"
            />
          </div>
          {/* //right */}
          <div>
            <h2 className="text-[20px] md:text-[22px] font-semibold">
              kate lo
            </h2>
            <p className="flex items-center gap-x-2">
              Number of repos: <span className="font-medium">35</span>
            </p>
          </div>
        </div>

        {open && (
          <div className="flex flex-col gap-y-2 pb-5">
            <div className="flex items-center gap-x-2 ">
              <AiOutlineStar className="text-yellow-600 text-[20px]" />
              <p>Score: 15 </p>
            </div>
            <div className="flex items-center gap-x-2 ">
              <AiFillGithub className="text-purple-800 text-[20px]" />
              <a href="" className="hover:text-purple-900 hover:font-medium">
                Look at their profile on github
              </a>
            </div>

            <div className="flex items-center gap-x-2 ">
              <RiGitRepositoryLine className="text-sky-800 text-[20px]" />
              <a href="" className="hover:text-sky-900 hover:font-medium">
                Explore repos
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
