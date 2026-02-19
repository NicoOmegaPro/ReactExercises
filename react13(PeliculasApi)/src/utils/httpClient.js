const API = "https://api.themoviedb.org/3";

export function get(path) {
  return fetch(API + path, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDM5MWMyNjVmOTg4YmRhMjQyZmU5ZTNmZmJkNWMwYiIsIm5iZiI6MTc3MTUyMTA4NC42NTQsInN1YiI6IjY5OTc0NDNjMjYwY2JlN2MzMTFhZWEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8RUcMD51Cw6N37qbPQ8UKzaRnS2brMCYWmrNFvE8o_Q",
        "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());
}
