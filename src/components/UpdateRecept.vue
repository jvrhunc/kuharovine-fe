<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card card-default">
        <div class="card-header">Uredi recept</div>

        <div class="submit-form">
          <div class="form-group col-md-12">
            <div class="form-item">
              <label for="ime">Ime recepta:</label>
              <input
                  type="text"
                  class="form-control"
                  id="ime"
                  required
                  v-model="currentRecept.ime"
                  name="ime"
                  value="Test"
              />
            </div>
            <div class="form-item">
              <label for="opis">Opis recepta:</label>
              <textarea
                  type="textarea"
                  class="form-control"
                  id="opis"
                  required
                  v-model="currentRecept.opis"
                  name="opis"
              />
            </div>
          </div>
          <div class="form-item">
            <label for="radioTip" >Tip recepta:</label>
            <div id="radioTip" class="form-control">

              <input type="radio" id="pred" value="GLAV" v-model="currentRecept.tip">
              <label for="pred">Predjed</label>
              |
              <input type="radio" id="glavna" value="PRED" v-model="currentRecept.tip">
              <label for="glavna">Glavna jed</label>
              |
              <input type="radio" id="slad" value="SLAD" v-model="currentRecept.tip">
              <label for="slad">Sladica</label>

            </div>
          </div>
          <div class="form-item">
            <label for="sestavine" >Sestavine:</label>
            <p id="sestavine">TODO</p>
<!--            <input-->
<!--                type="text"-->
<!--                class="form-control"-->
<!--                id="sestavine"-->
<!--                required-->
<!--                v-model="currentRecept.sestavine"-->
<!--                name="ime"-->
<!--            />-->
          </div>
        </div>
        <button @click="updateRecept" class="btn btn-success button-edit">Posodobi</button>
      </div>
    </div>
  </div>
</template>
<script>
// import ReceptiDataService from "@/services/ReceptiDataService";
import ReceptiDataService from "@/services/ReceptiDataService";

export default {
  name: "update-recept",
  data() {
    return {
      currentRecept: null,
      uporabnik: null
    };
  },
  created() {
    this.getUporabnikById(this.$route.params.userId);
    this.getReceptById(this.$route.params.id);
  },
  methods: {
    getReceptById(id) {
      ReceptiDataService.getById(id)
          .then(response => {
            this.currentRecept = response.data.recept;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    updateRecept() {
      let data = {
        receptId: this.currentRecept.receptId,
        ime: this.currentRecept.ime,
        opis: this.currentRecept.opis,
        tip: this.currentRecept.tip,
        uporabnikId: 1,
        sestavine: []
      };

      console.log(data);
      // TODO ne dela PUT zarad corsa

      this.$router.push("/" + this.uporabnik.id + "/recepti/" + this.$route.params.id);
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