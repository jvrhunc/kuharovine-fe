import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8082/v1",
  headers: {
    "Content-type": "application/json"
  }
});