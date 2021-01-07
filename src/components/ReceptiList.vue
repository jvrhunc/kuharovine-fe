<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="container">

        <div>
          <ul class="list-group">
            <li class="list-group-item"
                v-for="(receptItem, index) in this.recepti"
                :key="index"
                @click="setActiveRecept(receptItem, index)">
              <div class="card card-default">
                <div class="card-header">
                  <p class="recept_name">{{ receptItem.recept.ime }}</p>
                </div>
                <div class="card-body">
                  <img class="img"
                       v-bind:src="retrieveSlika(receptItem.slika)"/>
                </div>
                <div class="card-footer">
                  <span>{{ receptItem.recept.created | formatDate }} by TODO-uporabnik</span>
                </div>
              </div>
            </li>
          </ul>
          <button class="m-3 btn btn-sm btn-danger" @click="removeAllRecepts">
            Izbrisi vse
          </button>
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
      currentRecept: null,
      currentIndex: -1,
      title: ""
    };
  },
  created() {
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
      console.log(slika);
      if(slika == null) {
        return "https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg";
      } else {
        return "http://localhost:8082/v1/slike/s3/getFile/" + slika.slikaId;
      }
    },
    refreshList() {
      this.retrieveRecepti();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveRecept(recept, index) {
      console.log("Izbran recept: " + recept + ", index: " + index);
      this.currentTutorial = recept;
      this.currentIndex = index;

    },
    removeAllRecepts() {

    },
    mounted() {
      this.retrieveRecepti();
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
 max-height: 400px;
 max-width: 400px;
}
</style>