import http from "../http-slike";

class SlikeDataService {
  getAll() {
    return http.get("/slike");
  }
  addSlika(file, id, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);

    return http.post("/slike/add/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    })
  }
}

export default new SlikeDataService();