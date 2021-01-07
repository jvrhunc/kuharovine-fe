<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card card-default">
        <div class="card-header">Dodaj Recept</div>

        <div class="submit-form">
          <div v-if="!submitted">
            <div class="form-group col-md-12">
              <div class="form-item">
                <label for="ime">Ime recepta:</label>
                <input
                    type="text"
                    class="form-control"
                    id="ime"
                    required
                    v-model="recept.ime"
                    name="ime"
                />
              </div>
              <div class="form-item">
                <label for="opis">Opis recepta:</label>
                <textarea
                    type="textarea"
                    class="form-control"
                    id="opis"
                    required
                    v-model="recept.opis"
                    name="opis"
                />
              </div>
              <div class="form-item">
                <label for="radioTip" >Tip recepta:</label>
                <div id="radioTip" class="form-control">

                  <input type="radio" id="pred" value="GLAV" v-model="recept.tip">
                  <label for="pred">Predjed</label>
                   |
                  <input type="radio" id="glavna" value="PRED" v-model="recept.tip">
                  <label for="glavna">Glavna jed</label>
                  |
                  <input type="radio" id="slad" value="SLAD" v-model="recept.tip">
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
              <button @click="saveRecept" class="btn btn-success button-edit">Dodaj</button>
            </div>
          </div>
          <div v-else>
            <h4>Uspešno ste dodali svoj recept!</h4>
            <button class="btn btn-success" @click="newRecept">Dodaj novega</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import ReceptiDataService from "@/services/ReceptiDataService";

export default {
  name: "add-recept",
  data() {
    return {
      recept: {
        id: null,
        ime: "",
        opis: "",
        tip: "",
        sestavine: []
      },
      submitted: false
    };
  },
  methods: {
    saveRecept() {
      let data = {
        receptId: this.recept.id,
        ime: this.recept.ime,
        opis: this.recept.opis,
        tip: this.recept.tip,
        uporabnikId: 1,
        sestavine: []
      };

      console.log(data);
      // TODO ne dela post zarad corsa
      // ReceptiDataService.saveRecept(data)
      // .then(response => {
      //   console.log(response.data);
      //   this.recept.id = response.data.id;
      //   this.submitted = true;
      // })
      // .catch(e => {
      //   console.log(e);
      // });

      this.submitted = true;

    },
    newRecept() {
      this.recept = {};
      this.submitted = false;
    }
  }
};
</script>
<style>

.form-group {
  padding: 20px;
}

.form-item {
  margin-top: 10px;
}

.form-control {
  border: 1px solid #000000 !important;
}

.button-edit {
  margin-bottom: 10px;
}

</style>