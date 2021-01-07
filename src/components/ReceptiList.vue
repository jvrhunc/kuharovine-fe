<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="container">

        <div>
          <ul class="list-group">
            <li class="list-group-item"
                v-for="receptItem in this.recepti"
                :key="receptItem.recept.receptId"
                @click="selectedRecept(receptItem)">
              <div class="card card-default">
                <div class="card-header">
                  <p class="recept_name">{{ receptItem.recept.ime }}</p>
                </div>
                <div class="card-body">
                  <img class="img"
                       v-bind:src="retrieveSlika(receptItem.slika)"/>
                </div>
                <div class="card-footer">
                  <span>{{ receptItem.recept.created | formatDate }}
                    by {{ uporabnik.username }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReceptiDataService from "@/services/ReceptiDataService";

export default {
  name: "recepti-list",
  data() {
    return {
      recepti: [],
      uporabnik: null
    };
  },
  created() {
    this.getUporabnikById(this.$route.params.userId);
    this.retrieveRecepti();
  },
  methods: {
    retrieveRecepti() {
      ReceptiDataService.getAll()
          .then(response => {
            this.recepti = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    retrieveSlika(slika) {
      if(slika == null) {
        return "https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg";
      } else {
        return "http://localhost:8082/v1/slike/s3/getFile/" + slika.slikaId;
      }
    },
    selectedRecept(recept) {
      this.$router.push("/" + this.uporabnik.id + "/recepti/" + recept.recept.receptId);

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
}
</script>
<style>

.card-header {
  font-size: 20px;
}

.card-body {
  padding: 0.25rem;
}

.card-footer {
  float: right !important;
  color: #a7a9a4;
  font-size: 12px;
}

.list-group {
  margin-bottom: 5px;
  display: list-item;
}

.list-group-item {
  background-color: #e3e3e366;
}

.list-group-item:hover {
  background-color: rgba(157, 151, 151, 0.4);
  cursor: pointer;
}

.recept_name {
  font-size: 20px;
}

.img {
  max-height: 100%;
  max-width: 100%;
}
</style>