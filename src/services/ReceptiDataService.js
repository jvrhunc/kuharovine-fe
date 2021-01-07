import http from "../http-recepti";

class ReceptiDataService {
  getAll() {
    return http.get("/recepti");
  }
  getById(id) {
    return http.get("/recepti/" + id);
  }
  saveRecept(data) {
    return http.post("/recepti/add", data);
  }
  deleteRecept(id) {
    return http.delete("/recepti/delete/" + id);
  }
}

export default new ReceptiDataService();