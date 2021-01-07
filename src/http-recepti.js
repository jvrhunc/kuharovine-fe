import axios from "axios";

export default axios.create({
  baseURL: "http://34.120.90.22/v1",
  headers: {
    "Content-type": "application/json"
  }
});