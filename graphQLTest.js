import http from "k6/http";
import { check } from "k6";

export default function () {
  const mutationQuery = `
    mutation CreatePerson {
        createPerson(person: { name: "dhiraj" }) {
            id
            name
            age
        }
    }
  `;

  const url = "https://graphql.postman-echo.com/graphql";

  const headers = {
    "Content-Type": "application/json",
  };

  const response = http.post(url, JSON.stringify({ query: mutationQuery }), {
    headers: headers,
  });

  check(response, {
    "Status is 200": (r) => r.status === 200,
  });

  const responseBody = JSON.parse(response.body);
  check(responseBody, {
    "Response contains name": (body) =>
      body.data &&
      body.data.createPerson &&
      body.data.createPerson.name !== undefined,
  });

  console.log("Response body:", response.body);
}
