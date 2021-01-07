<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card card-default">
        <div class="card-header">Nalozi sliko</div>
        <div class="card-body">
          <div>
            <div v-if="currentFile" class="progress">
              <div
                  class="progress-bar progress-bar-info progress-bar-striped"
                  role="progressbar"
                  :aria-valuenow="progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  accept="image/jpeg, image/png"
                  :style="{ width: progress + '%' }"
              >
                {{ progress }}%
              </div>
            </div>

            <label class="btn btn-default">
              <input type="file" ref="file" @change="selectFile"/>
            </label>

            <button class="btn btn-success" :disabled="!selectedFiles" @click="upload">
              Nalozi
            </button>

            <div class="alert alert-light" role="alert">{{ message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import SlikeDataService from "@/services/SlikeDataService";

import ReceptiDataService from "@/services/ReceptiDataService";

export default {
  name: "add-image",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
      uporabnik: null
    };
  },
  created() {
    this.getUporabnikById(this.$route.params.userId);
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);

      // SlikeDataService.addSlika(this.currentFile, this.$route.params.id, event => {
      //   this.progress = Math.round((100 * event.loaded) / event.total);
      // }).then(response => {
      //     console.log(response);
      //     this.$router.push("/recepti/" + this.$route.params.id)
      //   });

      this.$router.push("/" + this.uporabnik.id + "/recepti/" + this.$route.params.id);

      this.selectedFiles = undefined;
    },
    getUporabnikById(userId) {
      ReceptiDataService.getUporabnikById(userId)
          .then(response => {
            console.log(response.data);
            this.uporabnik = response.data;
          })
          .catch(e => {
            console.log(e);
          });
    }
  }
};
</script>