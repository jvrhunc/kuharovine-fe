<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card card-default">
        <div class="card-header">Izberite uporabnika</div>
        <div class="card-body">
          <div v-for="user in this.uporabniki" :key="user.id">
            <div class="row justify-content-center selectUser">
              <div class="col-md-12" v-on:click="selectUporabnik(user.id)">
                <img class="img2" v-bind:src="user.imageUrl"/>
                <h2>{{ user.ime }} {{ user.priimek }}</h2>
                <p>Username: {{ user.username }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReceptiDataService from "@/services/ReceptiDataService";

export default {
  name: "home",
  data() {
    return {
      uporabniki: null
    }
  },
  created() {
    this.getUporabniki();
  },
  methods: {
    getUporabniki() {
      ReceptiDataService.getAllUporabniki()
          .then(response => {
            this.uporabniki = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    selectUporabnik(id) {
      this.$router.push("/" + id + "/recepti");
    }
  }
};
</script>
<style>

.img2 {
  max-width: 200px !important;
  max-height: 200px !important;
}

.selectUser {
  border: 1px solid #bfbdbd;
  margin-top: 10px;
  border-radius: 30px;
}

.selectUser:hover {
  background-color: #8ca4ab;
  cursor: pointer;
}
</style>