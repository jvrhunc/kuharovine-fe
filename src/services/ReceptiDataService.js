import http from "../http-common";

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

}

export default new ReceptiDataService();