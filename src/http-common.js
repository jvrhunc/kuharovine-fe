import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/v1",
  headers: {
    "Content-type": "plain/text"
  }
});