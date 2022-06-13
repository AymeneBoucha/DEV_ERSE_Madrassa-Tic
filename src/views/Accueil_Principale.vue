<template>
  <div>
    <header class="page-header"></header>

    <div class="stat">
      <div class="Signalementsemaine">
        <v-col>
          <v-card>
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <h3>les signalement</h3>
                  <br />
                  <span>De cette semaine</span>
                </div>
                <v-avatar
                  size="60"
                  class="blue darken-1"
                  style="border: 3px solid #444"
                >
                  <span style="color: white"
                    ><h2>{{ Sigsemaine }} +</h2></span
                  >
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </div>
      <div class="annoncesemaine">
        <v-col>
          <v-card>
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <h3>Les annonces</h3>
                  <br />
                  <span>De cette semaine</span>
                </div>
                <v-avatar
                  size="60"
                  class="deep-orange darken-1"
                  style="border: 3px solid #444"
                >
                  <span style="color: white"
                    ><h2>{{ annoncesemaine }}+</h2></span
                  >
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </div>
      <div class="sigTraité">
        <v-col>
          <v-card>
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="d-flex justify-space-between align-center">
                <div>
                  <h3>Les signalements traités</h3>
                  <br />
                  <span>De cette semaine</span>
                </div>
                <v-avatar
                  size="53"
                  class="green darken-1"
                  style="border: 3px solid #444"
                >
                  <span style="color: white"
                    ><h2>{{ SigTraitésemaine }}+</h2></span
                  >
                </v-avatar>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
              </v-card-actions>
            </v-card>
          </v-card>
        </v-col>
      </div>
    </div>
    <br /><br /><br /><br />
    <h1 class="section-title subheading">L'actualité</h1>
    <div class="annonce-scroller">
      <v-flex v-for="Annonce in Annonces" :key="Annonce.titre">
        <v-card class="text-center ma-3 card2 grey lighten-3">
          <div class="annonce-element">
            <img :src="Annonce.picture" alt="" />
            <h3>
              <strong>{{ Annonce.title }}</strong>
            </h3>
            <div class="grey-text">
              <strong>Date: </strong>{{ Annonce.dateDebutEvent.split("T")[0] }}
            </div>
            <div class="grey-text">
              <strong>Lieu: </strong>{{ Annonce.localisation }}
            </div>
            <v-card-actions class="dialogAAR">
              <v-dialog
                v-model="dialog3"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                 @click="Details(index)"
                    outlined
                    color="green darken-1"
                    class="Dt"
                    v-on="on"
                  >
                    <span>Details</span>
                  </v-btn>
                </template>
                <v-card class="text-center cardM">
                  <v-card-text>
                    <div>
                      <h2 class="subheading">Annonce</h2>
                    </div>
                    <v-text-field
                      v-model="titleA"
                      :rules="[(v) => !!v || 'champs obligatoire']"
                      label="Titre"
                      required
                      prepend-icon="title"
                      disabled
                    ></v-text-field>
                    <v-text-field
                      label="Lieu"
                      v-model="localisationA"
                      prepend-icon="place"
                      type="text"
                      required
                      disabled
                    ></v-text-field>
                    <v-textarea
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Description"
                      v-model="descriptionA"
                      rows="2"
                      required
                      prepend-icon="description"
                      disabled
                      readonly
                    ></v-textarea>
                    <div class="date">
                      <v-text-field
                        v-model="dateDebutEventA"
                        label="Date Début"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        v-bind="attrs"
                        v-on="on"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="dateFinEventA"
                        label="Date Fin"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        v-bind="attrs"
                        v-on="on"
                        disabled
                      ></v-text-field>
                    </div>
                    <div class="date">
                      <v-text-field
                        v-model="dateDebutDisplayA"
                        label="Date d'Affichage"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        v-bind="attrs"
                        v-on="on"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="dateFinDisplayA"
                        label="Date d'Expiration"
                        prepend-icon="mdi-calendar"
                        readonly
                        required
                        v-bind="attrs"
                        v-on="on"
                        disabled
                      ></v-text-field>
                    </div>
                    <v-file-input
                      v-model="pictureA"
                      accept="image/*"
                      label="Ajouter une image "
                      prepend-icon="add_a_photo"
                      disabled
                    >
                    </v-file-input>
                    <div class="bouttonsD">
                      <v-btn @click="dialog3 = false"
                        ><span>Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </div>
        </v-card>
      </v-flex>
    </div>

    <br />
    <h1 class="section-title">Les signalements</h1>
    <div class="Signalement-scroller">
      <v-subheader class="py-0 d-flex justify-space-between rounded-lg tous">
        <v-btn color="success" router :to="voir.route"> Voir tous </v-btn>
      </v-subheader>
      <v-flex v-for="(Signalement,index) in Signalements" :key="Signalement.title">
        <v-card class="text-center ma-3 card grey lighten-4">
          <v-responsive class="pt-0 imgsig">
            <v-avatar size="100" class="white lighten-2">
              <img :src="Signalement.picture" alt="" />
            </v-avatar>
          </v-responsive>
          <v-card-text class="titreACPR">
            <div class="subheading sig">{{ Signalement.title }}</div>
            <div class="grey-text">
              <strong>Catégorie: </strong>{{ Signalement.category }}
            </div>
            <div class="grey-text">
              <strong>Date: </strong
              >{{ Signalement.dateOf.split("T")[0] }}
            </div>
          </v-card-text>
          <v-card-actions class="bouttons">
            <v-dialog
              v-model="dialog"
              :retain-focus="false"
              persistent
              max-width="800px"
              class="dialog"
             
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  outlined
                  color="blue"
                  class="consulter"
                  v-on="on"
                   @click="Consulter(index)"
                >
                  <v-icon small left> mdi-eye</v-icon>
                  <span>Consulter</span>
                </v-btn>
              </template>
              <v-card class="text-center cardM">
                <v-card-text>
                  <div class="signal">
                    <v-select
                      v-model="defaultCatégorie"
                      item-text="nom"
                      :items="catégories"
                      label="Catégorie"
                      disabled
                      prepend-icon="category"
                      required
                      :rules="[(v) => !!v || 'champs obligatoire']"
                    ></v-select>
                    <v-text-field
                      v-model="title"
                      :rules="[(v) => !!v || 'champs obligatoire']"
                      label="Titre"
                      disabled
                      required
                      prepend-icon="title"
                    ></v-text-field>
                    <v-textarea
                      clearable
                      clear-icon="mdi-close-circle"
                      label="Description (optionnelle)"
                      v-model="description"
                      disabled
                      readonly
                      prepend-icon="description"
                      rows="2"
                    ></v-textarea>
                    <v-text-field
                      label="Date"
                      v-model="dateOf"
                      prepend-icon="mdi-calendar"
                      disabled
                      type="text"
                    ></v-text-field>
                    <div class="lieu">
                      <div class="form-group">
                        <label for="site">Site</label>
                        <select
                          class="text1 form-control"
                          name="site"
                          id="site"
                          v-model="site"
                          @change="onChange1($event)"
                        >
                          <option value="" disabled selected>
                            Selectionnez le site
                          </option>
                          <option
                            v-for="option in sites_options"
                            v-bind:value="option.value"
                            v-bind:key="option.text"
                          >
                            {{ option.text }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="etage">Etage</label>
                        <select
                          class="text2 form-control"
                          name="etage"
                          id="etage"
                          v-model="etage"
                          @change="onChange2($event)"
                        >
                          <option value="" disabled selected>
                            Selectionnez l'etage
                          </option>
                          <option
                            v-for="option in etages_options[site]"
                            v-bind:value="option.text"
                            v-bind:key="option.text"
                          >
                            {{ option.text }}
                          </option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="salle">Salle</label>
                        <select
                          class="text3 form-control"
                          name="salle"
                          id="salle"
                          v-model="salle"
                          @change="onChange3($event)"
                        >
                          <option value="" disabled selected>
                            Selectionnez la salle
                          </option>
                          <option
                            v-for="option in salles_options[etage]"
                            v-bind:value="option.text"
                            v-bind:key="option.text"
                          >
                            {{ option.text }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <v-text-field
                      label="lieu"
                      v-model="localisation"
                      prepend-icon="place"
                      disabled
                      type="text"
                    ></v-text-field>
                  </div>
                  <div class="bouttonsD">
                    <v-btn class="" @click="dialog = false"
                      ><span>Annuler</span></v-btn
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
    <div class="area cards">
      <h1 class="text-left">Etat des signalements</h1>
      <div id="areachart">
        <apexchart
          type="area"
          width="550"
          :options="areaChartOptions"
          :series="areaseries"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import setAuthHeader from "@/utils/setAuthHeader";
export default {
  data() {
    return {
      SigTraitésemaine: "",
      Sigsemaine: "",
      annoncesemaine: "",
      voir: { text: "Voir tous", route: "/LesSignalements" },
      dialog: false,
      dialog3: false,
      value: 0,
      dateDebutEventA: "",
      dateFinEventA: "",
      dateDebutDisplayA: "",
      dateFinDisplayA: "",

      descriptionA: "",
      motifA: "",
      titleA: "",
      localisationA: "",
      pictureA: [],
      stateA: [],
      auteurA: "",
      title: "",
          category: "",
          dateOf: "",
          state: "",
          localisation:"",
          Avatar: "/sig.png",
          auteur: "",
          motif: "",
      areaseries: [
        { name: "Signalements déclaré", data: [] },
        { name: "Signalements Validé", data: [] },
        { name: "Signalements en cours de traitement", data: [] },
         { name: "Signalements en obstacle", data: [] },
        { name: "Signalements traités", data: [] },
      ],
      areaChartOptions: {
        chart: {
          redrawOnWindowResize: true,
          width: 400,
          type: "area",
        },
        markers: {
          size: 4,
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
          type: "time",
          title: { text: "date" },
        },
        yaxis: { title: { text: "signalement" } },
      },
      varIndex: "",
      catégories: [],
      site: "",
      salle: "",
      etage: "",
      sites_options: [
        { text: "Site Préparatoire", value: "Site Préparatoire" },
        { text: "Site Supérieur", value: "Site Supérieur" },
      ],
      etages_options: {
        "Site Préparatoire": [
          { text: "Rez-de-chaussée", value: "Rez-de-chaussée " },
          { text: "1er Etage", value: "1er Etage" },
        ],
        "Site Supérieur": [
          { text: "rez-de-chaussée", value: "rez-de-chaussée" },
          { text: "1er étage", value: "1er étage" },
          { text: "2ème étage", value: "2ème étage" },
        ],
      },
      salles_options: {
        "Rez-de-chaussée": [
          { text: "Amphi A" },
          { text: "Amphi B" },
          { text: "Salle TD 1" },
          { text: "Salle TD 2" },
          { text: "Salle TD 3" },
          { text: "Salle TD 4" },
          { text: "Salle TD 5" },
          { text: "Salle TD 6" },
          { text: "Couloir" },
          { text: "hall" },
          { text: "Bureau" },
          { text: "Sanitaires" },
        ],
        "rez-de-chaussée": [
          { text: "Amphi C" },
          { text: "Amphi D" },
          { text: "Amphi E" },
          { text: "Cabinet de Médecin" },
          { text: "Parking" },
          { text: "Local Alphabit" },
          { text: "Local Ingeniums" },
          { text: "Local GDG" },
          { text: "Loge des agents" },
          { text: "Sanitaires" },
          { text: "Salle de soutenance" },
          { text: "Salle de réunion " },
          { text: "Moussala Homme" },
          { text: "Moussala Femme" },
          { text: "Foyer" },
          { text: "Bibliothèque" },
          { text: "hall" },
          { text: "Couloir" },
          { text: "Bureau" },
          { text: "Salle TD 1" },
          { text: "Salle TD 2" },
          { text: "Salle TD 3" },
          { text: "Salle TD 4" },
          { text: "Salle TD 5" },
          { text: "Salle TD 6" },
          { text: "Salle A1" },
          { text: "Salle A2" },
          { text: "Salle A3" },
          { text: "Salle A4" },
          { text: "Cour" },
        ],
        "1er Etage": [
          { text: "Salle TD 7" },
          { text: "Salle TD 8" },
          { text: "Salle TD B1" },
          { text: "Salle TD B2" },
          { text: "Salle TP 1" },
          { text: "Salle TP 2" },
          { text: "Salle TP 3" },
          { text: "Salle TP 4" },
          { text: "Salle de réunion" },
          { text: "Bureau" },
          { text: "Couloir" },
          { text: "hall" },
          { text: "Sanitaires" },
        ],
        "1er étage": [
          { text: "Salle TP 1" },
          { text: "Salle TP 2" },
          { text: "Salle TP 3" },
          { text: "Salle TP 4" },
          { text: "Salle TP 5" },
          { text: "Salle TP 6" },
          { text: "Salle TP 7" },
          { text: "Salle de lecture" },
          { text: "Cabinet de Médecin" },
          { text: "Magasin" },
          { text: "Administration" },
          { text: "Couloir" },
          { text: "Sanitaires" },
          { text: "hall" },
        ],
        "2ème étage": [
          { text: "Salle TP 8" },
          { text: "Salle TP 9" },
          { text: "Salle TP 10" },
          { text: "Laboratoire de recherche" },
          { text: "Couloir" },
          { text: "Sanitaires" },
          { text: "hall" },
        ],
      },
      Signalements: [
        {
          title: "",
          category: "",
          dateOf: "",
          site: "",
          etage: "",
          salle: "",
          state: "",
          localisation:"",
          Avatar: "/sig.png",
          auteur: "",
          motif: "",
        },
      ],

      Annonces: [
        {
          title: "",
          description: "",
          localisation: "",
          dateDebutEvent: "",
          dateFinEvent: "",
          auteur: "",
          picture: [],
          Avatar: "/p.png",
        },
      ],
    };
  },
    
  async created() {
    try {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllReportsByUser`
      );
      this.Signalements = res.data;
      let i = 0;
      while (i < this.Signalements.length) {
      this.Signalements[i].localisation= this.Signalements[i].site + ' ' + this.Signalements[i].etage + ' ' + this.Signalements[i].salle

        this.Signalements[i].category = res.data[i].category.name;
        this.Signalements[i].auteur = res.data[i].user.email;
        i++;
        
      }

    } catch (e) {
      alert("Missing data from database");
    }
    try {
      const res1 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllDisplyedAnnouncementsByUser`
      );
      this.Annonces = res1.data;
      //console.log(this.Annonces);
    } catch (e) {
      alert("Missing data from database");
    }
  },

  async beforeCreate() {
    try {
    const res3 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats4ByUser`
      );
      this.areaseries[0].data = res3.data.list;
      window.dispatchEvent(new Event('resize'))
      
      // console.log(res3.data.list);

      // console.log(this.areaseries[0].data);

      const res4 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats5ByUser`
      );
      this.areaseries[1].data = res4.data.list;
      window.dispatchEvent(new Event('resize'))
      // console.log(res4.data.list);

      const res5 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats7ByUser`
      );
      this.areaseries[2].data = res5.data.list;
      window.dispatchEvent(new Event('resize'))
      // console.log(res5.data.list);

      const res6 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats8ByUser`
      );
      this.areaseries[3].data = res6.data.list;
      window.dispatchEvent(new Event('resize'))

       const res7 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats6ByUser`
      );
      this.areaseries[4].data = res7.data.list;
      window.dispatchEvent(new Event('resize'))


      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats1ByUser`
      );
        this.Sigsemaine = (res.data.vraiNb);
         window.dispatchEvent(new Event("resize"));

        
      // console.log(this.statuseries[0].data)

      const res1 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats3ByUser`
      );
            this.SigTraitésemaine = (res1.data.vraiNb);

      window.dispatchEvent(new Event("resize"));

      const res2 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getStats2ByUser`
      );
            this.annoncesemaine = (res2.data.vraiNb);
          console.log( this.annoncesemaine)
      window.dispatchEvent(new Event("resize"));

    } catch (e) {
      alert("Missing data from database");
    }
  },
  methodes: {
    async Details(index) {
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/user/selectOneAnnouncementByUser/${
            this.Annonces[this.varIndex].id
          }`
        );
        this.titleA = res.data.title;
        this.descriptionA = res.data.description;
        this.localisationA = res.data.localisation;
        this.dateDebutEventA = res.data.dateDebutEvent.split("T")[0];
        this.dateFinEventA = res.data.dateFinEvent.split("T")[0];
        this.dateDebutDisplayA = res.data.dateDebutDisplay.split("T")[0];
        this.dateFinDisplayA = res.data.dateFinDisplay.split("T")[0];
        this.picture = res.data.picture;
      } catch {
        alert("Missing data from database");
      }
    },


    async Consulter(index) {
      console.log(index);
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/user/selectOneReportByUser/${
            this.Signalements[this.varIndex].id
          }`
        );
        this.title = res.data.title;
        this.description = res.data.description;
        this.category = res.data.category;
        this.localisation = res.data.localisation;
        this.site = res.data.site;
        this.etage = res.data.etage;
        this.salle = res.data.salle;
        this.dateOf = res.data.dateOf;
        this.picture = res.data.picture;
        this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
  },
};
</script>
<style scoped>
.tous {
  position: relative;
  left: 13cm;
}
.sig {
  font-weight: 550;
  font-size: 18px;
}
.Signalement-scroller {
  height: 350px;
  width: 650px;
  overflow-y: auto;
  overflow-x: hidden;
}
.titreACPR {
  margin-left: -30px;

  line-height: 250%;
  text-align: center;
}
.imgsig {
  position: relative;
  margin-left: 10px;
}
.annonce-scroller {
  display: grid;
  grid-auto-flow: column;
  overscroll-behavior-inline: contain;
  height: 320px;
  overflow-x: auto;
}
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  min-width: 600px;
  height: 130px;
}
.card2 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  min-width: 250px;
  height: 270px;
}
.annonce-element {
  display: grid;
  grid-template-rows: min-content;
  justify-content: space-around;
  width: 250px;
  min-width: 250px;
  height: 300px;
}

.annonce-element > img {
  inline-size: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.section-title {
  padding-inline-start: var(--size-8);
  margin-block: var(--size-9) var(--size-3);
}
.Signalementsemaine {
  height: 50px;
  width: 290px;
  position: relative;
  left: 1cm;
}
.annoncesemaine {
  height: 50px;
  width: 290px;
  position: relative;
  left: 3cm;
}

.sigTraité {
  height: 50px;
  width: 290px;
  position: relative;
  left: 5cm;
}
.stat {
  display: flex;
  flex-direction: row;
}
.area {
  margin-top: 10px;
  position: absolute;
  left: 19cm;
  top: 14cm;
}
.text1 {
  position: relative;
  left: 10px;
  border: 1px solid grey;
  border-radius: 3px;
}
.text2 {
  position: relative;
  left: 10px;
  border: 1px solid grey;
  border-radius: 3px;
}
.text3 {
  position: relative;
  left: 10px;
  border: 1px solid grey;
  border-radius: 3px;
}
.lieu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.date {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.Dt {
  position: relative;
  left: 2cm;
}
</style>