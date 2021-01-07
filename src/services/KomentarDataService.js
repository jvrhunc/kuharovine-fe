import http from "../http-komentarji";

class KomentarDataService {
  getAll() {
    return http.get("/komentarji");
  }
  saveKomentar(receptId, data) {
    return http.post("komentarji/add/" + receptId, data);
  }
}

export default new KomentarDataService();