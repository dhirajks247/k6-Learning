import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 15,
  duration: "5s",
};

export default function () {
  const url = "https://dummyjson.com/auth/login";
  const body = JSON.stringify({
    username: "kminchelle",
    password: "0lelplR",
  });

  const param = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, body, param);

  check(res, {
    "response code is 200": (r) => r.status == 200,
    "response body has username ": (r) => r.body.includes("kminchelle"),
  });
}
