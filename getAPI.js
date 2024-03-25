import http from "k6/http";
import sleep from "k6";
import { check } from "k6";

export const options = {
  vus: 500,
  duration: "5s",
};

export default function () {
  const res = http.get("https://astro.build/");

  check(res, {
    "response code is 200": (r) => r.status == 200,
    // "response body has username ": (r) => r.body.includes("kminchelle"),
  });
}
