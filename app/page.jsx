"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./Components/UserCard";

export default function Home() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [numPages, setNumPages] = useState();
  const maxPage = Math.ceil(numPages / 10);
  const [sorting, setSorting] = useState("desc");

  //handle on key down
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchUsers();
    }
  };

  //page
  const [page, setPage] = useState(1);
  //per page
  const [limit, setLimit] = useState(10);

  //prevPage
  const handlePrevPage = () => {
    setPage((page) => {
      if (page === 1) return page;
      else return page - 1;
    });
  };

  //next page
  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const getUserReposCount = async (username) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const public_repos = response?.data?.public_repos;
      console.log("public_repos of ", username, public_repos);
      return public_repos;
    } catch (error) {
      throw new Error("Error fetching user repositories count.");
    }
  };

  const searchUsers = async () => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${username}`,
        {
          params: {
            page,
            per_page: limit,
            sort: "repositories",
            order: sorting,
          },
        }
      );
      console.log("data : ", data);

      const usersWithRepos = await Promise.all(
        data.items.map(async (user) => {
          try {
            const repos_length = await getUserReposCount(user.login);
            return {
              ...user,
              repos_length,
            };
          } catch (error) {
            console.error(
              `Error fetching repositories count for user ${user.login}:` +
                error
            );
            return {
              ...user,
              repos_length: 0,
            };
          }
        })
      );
      setUsers(usersWithRepos);
      //

      setNumPages(data.total_count);
      setSorting(sorting === "asc" ? "desc" : "asc");
      //changed
      return usersWithRepos;
    } catch (error) {
      setErr("no user found");
    }
  };

  const handleSearchUsers = async () => {
    if (username.length > 0) {
      setPage(1);
      const items = await searchUsers();
      setUsers(items);
    } else {
      setErr("fill in the input");
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if (username) {
        const items = await searchUsers();
        setUsers(items);
      }
    };
    displayUsersOnChange();
  }, [page]);

  return (
    <main className="flex flex-col w-full items-center ">
      <div className="flex gap-x-6 my-10 w-full justify-center">
        <input
          type="text"
          placeholder="type login"
          value={username}
          className="border-[1px] border-slate-400 py-2 px-2 rounded-lg w-auto md:w-[500px] focus:outline-none focus:border-green-300"
          onChange={(e) => {
            setUsername(e.target.value);

            setErr(null);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => {
            handleSearchUsers();
          }}
          className="bg-green-200 hover:bg-green-300 px-3 py-2 rounded-lg shadow-md hover:shadow-sm"
        >
          Search
        </button>
      </div>

      {users?.length > 0 ? (
        <div className="flex flex-col items-center w-full ">
          <div className="flex flex-col items-center  gap-y-8">
            <button
              onClick={() => {
                searchUsers();
              }}
              className=" px-3 py-2 border-slate-500 border-[1px] rounded-lg mb-5 self-end mr-8 md:mr-5 shadow-md hover:shadow-sm"
            >
              Sort 🪄
            </button>
            {users.map((u) => (
              <div key={u.id}>
                <UserCard u={u} />
              </div>
            ))}
          </div>

          {/* pagination */}
          {users?.length > 0 && (
            <div className="flex flex-row gap-x-6 py-5 ">
              <button onClick={handlePrevPage}>Prev</button>
              <button onClick={handlePrevPage}>{page}</button>
              <button onClick={handleNextPage}>
                {page + 1 <= maxPage ? page + 1 : ""}
              </button>
              <button onClick={handleNextPage}>
                {" "}
                {page + 1 <= maxPage ? "Next" : ""}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 data-testid="err">{err}</h3>
        </div>
      )}
    </main>
  );
}
