<template>
  <div class="row justify-content-center">
    <div class="col-md-8">
      <button class="btn btn-primary" style="margin-bottom: 30px; float: left" @click="nazaj">Nazaj</button>
    </div>
    <div class="col-md-8">
      <div class="card card-default">
        <div class="card-header">
          <h2>{{ currentRecept.recept.ime }}</h2>
        </div>
        <div class="card-body overflow-hidden">
          <div class="row">
            <div class="col-md-6">
              <img class="img"
                   v-bind:src="retrieveSlika(currentRecept.slika)"/>
              <span style="font-size: 16px;">by {{ getUsername(currentRecept.recept.uporabnikId) }}</span>
            </div>
            <div class="col-md-6">
              <label for="opis"><b>Opis:</b></label>
              <p id="opis">{{ currentRecept.recept.opis }}</p>
              <label for="datum"><b>Ustvarjen:</b></label>
              <p id="datum">{{ currentRecept.recept.created | formatDate }}</p>
              <label for="tip"><b>Tip jedi:</b></label>
              <p id="tip">{{ currentRecept.recept.tip }}</p>
              <label for="sestavine"><b>Sestavine:</b></label>
              <ul id="sestavine">
                <li v-for="sestavina in this.sestavine" :key="sestavina.sestavinaId">
                  {{ sestavina.ime }} - {{ sestavina.kolicina }} {{ sestavina.enotaKolicine }}
                </li>
              </ul>
            </div>
          </div>
          <div style="margin-top: 40px" class="row">
            <div class="col-md-12">
              <h4>Komentarji</h4>
              <div v-for="komentar in this.komentarji" :key="komentar.komentarId">
                <div class="row" style="border: 1px solid; border-radius: 10px; margin-bottom: 10px; padding: 10px;">
                  <div class="col-md-2">
                    {{ getUsername(komentar.uporabnikId) }}
                  </div>
                  <div class="col-md-5">
                    {{ komentar.komentar }}
                  </div>
                  <div class="col-md-2">
                    Ocena: {{ komentar.ocena }}
                  </div>
                  <div class="col-md-3">
                    {{ komentar.created | formatDate }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px" class="row">
            <div class="col-md-12">
              <h4>Dodaj nov komentar</h4>
              <div class="submit-form">
                <div v-if="!submitted">
                  <div class="form-group">
                    <div class="row">
                      <div class="col-md-8">
                        <textarea
                            type="textarea"
                            class="form-control"
                            id="dodaj_komentar"
                            required
                            v-model="komentar.komentar"
                            name="komentar"
                        />
                      </div>
                      <div class="col-md-2">
                        <select id="mySelect" v-model="komentar.ocena">
                          <option disabled value=1>Prosimo izberite oceno</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div class="col-md-2">
                        <button class="m-3 btn btn-sm btn-success" style="float: right" @click="dodajKomentar">Dodaj
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
                <div v-else>
                  <h6>Uspešno ste dodali svoj komentar!</h6>
                  <button class="btn btn-success" @click="newKomentar">Dodaj novega</button>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px" class="row" v-if="this.isHisPost()">
            <div class="col-md-4">
              <button class="btn btn-primary" @click="dodajSliko">Dodaj sliko</button>
            </div>
            <div class="col-md-4">
              <button class="btn btn-info" @click="urediRecept">Uredi recept</button>
            </div>
            <div class="col-md-4">
              <button class="btn btn-danger" @click="zbrisiRecept">Zbrisi recept</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReceptiDataService from "@/services/ReceptiDataService";
import KomentarDataService from "@/services/KomentarDataService";

export default {
  name: "recept-by-id",
  data() {
    return {
      currentRecept: null,
      uporabnikIdRecept: -1,
      sestavine: null,
      komentarji: null,
      submitted: false,
      komentar: {
        id: null,
        komentar: "",
        ocena: 1
      },
      uporabnik: null,
      uporabniki: {}
    };
  },
  created() {
    this.getAllUporabniki();
    this.getUporabnikById(this.$route.params.userId);
    this.getReceptById(this.$route.params.id);
  },
  methods: {
    getReceptById(id) {
      ReceptiDataService.getById(id)
          .then(response => {
            this.currentRecept = response.data;
            this.sestavine = response.data.recept.sestavine;
            this.komentarji = response.data.komentar;
            this.uporabnikIdRecept = response.data.recept.uporabnikId;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    retrieveSlika(slika) {
      if (slika == null) {
        return "https://health.gov/sites/default/files/2019-06/SVG%20Layer4.svg";
      } else {
        return "http://34.120.90.22/v1/slike/s3/getFile/" + slika.slikaId;
      }
    },
    dodajKomentar() {
      let data = {
        komentarId: this.komentar.id,
        komentar: this.komentar.komentar,
        ocena: this.komentar.ocena,
        uporabnikId: 1
      };

      console.log(data);
      // TODO POST komentar (CORS policy)
      KomentarDataService.saveKomentar(this.$route.params.id, data)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

      this.submitted = true;
      this.refreshRecept();
    },
    newKomentar() {
      this.submitted = false;
      this.komentar = {};
    },
    refreshRecept() {
      this.getReceptById(this.$route.params.id);
    },
    dodajSliko() {
      this.$router.push("/" + this.uporabnik.id + "/recepti/" + this.$route.params.id + "/add/image");
    },
    urediRecept() {
      this.$router.push("/" + this.uporabnik.id + "/recepti/" + this.$route.params.id + "/update");
    },
    zbrisiRecept() {
      // TODO delete ne delat zarad Cors Policy
      ReceptiDataService.deleteRecept(this.$route.params.id)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

      this.$router.push("/" + this.uporabnik.id + "/recepti");
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
    },
    getAllUporabniki() {
      ReceptiDataService.getAllUporabniki()
          .then(response => {
            console.log(response.data);
            let i;
            for(i = 0; i < response.data.length; i++) {
              this.uporabniki[response.data[i].id] = response.data[i].username;
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
    nazaj() {
      this.$router.push("/" + this.uporabnik.id + "/recepti");
    },
    isHisPost() {
      if (this.currentRecept.recept.uporabnikId === this.uporabnik.id) {
        return true;
      } else {
        return false;
      }
    },
    getUsername(userId) {
      console.log("UPORABNIKI");
      console.log(userId);
      console.log(this.uporabniki);
      let user = this.uporabniki[userId];
      return user;
    }
  }
};
</script>
<style>
.img {
  max-height: 100%;
  max-width: 100%;
}

#mySelect {
  min-height: 60px !important;
}

#mySelect:hover {
  cursor: pointer;
}
</style>