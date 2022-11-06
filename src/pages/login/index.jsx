import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { APP_LOGIN, TEAMS_MANAGEMENT_ACTIONS } from "@/constants/api";
import httprequest from "@/utils/client/axios";

/*
NOTE - Cannot send croos domain cookies


*/
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  function handleSubmit(e) {
    e.preventDefault();
    fetch(APP_LOGIN.LOGIN, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        router.push("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleCheckCookie() {
    fetch("https://localhost:7030/WeatherForecast", {
      mode: "cors",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="login-body flex h-[100vh] w-full items-center justify-center bg-slate-900 md:justify-start">
      <section className="login-container h-[60%] w-[80%] md:ml-10 md:h-[600px] md:w-[500px]">
        <form id="login-form" onSubmit={handleSubmit}>
          <h3>Login Here</h3>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Email or Phone"
            id="username"
            className="text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className=" mt-3 w-[50%] border-black bg-white p-2 text-black"
            type="submit"
            form="login-form"
            value="Submit"
          >
            Submit
          </button>
          <div className="social">
            <div className="go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="fb">
              <i className="fab fa-facebook"></i> Facebook
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
