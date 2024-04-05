import http from "k6/http";
import { sleep, check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const url = "https://website-v3.geekyants.com";
const loginUrl = "https://dummyjson.com/auth/login";

const loginPayload = {
  username: "kminchelle",
  password: "0lelplR",
};

const pages = [loginUrl];

export const options = {
  stages: [
    { duration: "5s", target: 2 },
    { duration: "20s", target: 5 }, // 5 VUs for 20 seconds
    { duration: "5s", target: 2 },
  ],
};

export default function () {
  // Loop over pages and make requests
  for (const page of pages) {
    if (page === loginUrl) {
      const loginRes = http.post(loginUrl, loginPayload);
      check(loginRes, {
        "login successful": (res) => res.status === 200,
        "response body has email ": (res) =>
          res.body.includes("kminchelle@qq.com"),
      });
    } else {
      const res = http.get(page);
      sleep(1);

      check(res, {
        "response code is 200": (r) => r.status == 200,
      });
    }
  }
}

export function handleSummary(data) {
  const filename = `K6Report-${url.replace(/(^\w+:|^)\/\//, "")}.html`; // Extract domain from URL
  return {
    [filename]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
