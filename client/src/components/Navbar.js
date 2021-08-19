import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ loginUser, setLoginUser }) => {
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/v1/sessions/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setLoginUser({});
    history.push("/");
  };

  console.log("loginsuer on nav", loginUser);
  return (
    <nav
      className="flex justify-between item-center h-16 bg-white text-black relative shadow-sm font-mono"
      role="navation"
    >
      {Object.keys(loginUser).length !== 0 ? (
        <Link to="/" className="p-8">
          Welcome to clothes(ex)press, {loginUser.username}
        </Link>
      ) : (
        <Link to="/" className="p-8">
          {" "}
          clothes(ex)press{" "}
        </Link>
      )}

      <div className="px-4 cursor-pointer md:hidden p-8">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </div>

      <div className="p-8 md:block hidden">
        {Object.keys(loginUser).length !== 0 ? (
          <>
            <Link className="p-4" to="/hang">
              Hang
            </Link>
            <Link className="p-4" to="/wardrobe">
              Wardrobe
            </Link>
            <Link className="p-4" to="/styleme">
              SOS Style
            </Link>
            <button onClick={handleSubmit}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </>
        ) : (
          <>
            <Link className="p-4" to="/signup">
              Create an Account
            </Link>
            <Link className="p-4" to="/login">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
