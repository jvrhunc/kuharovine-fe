import http from "../http-recepti";

class ReceptiDataService {
  getAll() {
    return http.get("/recepti");
  }
  getById(id) {
    return http.get("/recepti/" + id);
  }
  saveRecept(data, userId) {
    return http.post("/recepti/add/" + userId, data);
  }
  updateRecept(data, receptId) {
    return http.put("/recepti/update/" + receptId, data);
  }
  deleteRecept(id) {
    return http.delete("/recepti/delete/" + id);
  }
  getAllUporabniki() {
    return http.get("/recepti/uporabniki");
  }
  getUporabnikById(id) {
    return http.get("/recepti/uporabniki/" + id);
  }
}

export default new ReceptiDataService();