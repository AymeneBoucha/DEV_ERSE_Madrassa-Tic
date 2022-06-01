<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Les Annonces Validés</h1>
    <v-btn small outlined color="blue" @click="trierAnnonce()" class="mr-2 AVR" dark v-bind="attrs" v-on="on">
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Trier par date</span>
            </v-btn>
            <v-card-actions class="btnsAVR">
        <v-btn outlined color="red" class="btn" to="AnnonceAfficheRes">
          <v-icon>mdi-bullhorn-outline</v-icon>
          <span>Annonces En Attente</span>
        </v-btn>
        <v-btn outlined color="orange" class="btn" to="AnnonceAnnuleRes">
          <v-icon>mdi-cancel</v-icon>
          <span>Annonces Annulées</span>
        </v-btn>
        <v-btn outlined color="green" class="btn" to="AnnonceExpireRes">
          <v-icon>mdi-check-all</v-icon>
          <span>Annonces Expirées</span>
        </v-btn>
      </v-card-actions>
  <div class="containAVR">
    <v-card class="cardS" min-width="1050" width="350" tile>
      <v-list dense >
        <v-list-item-group class="ligAVR" v-model="selectedItem" color="primary">
          <v-list-item>
            <v-list-item-content @click="Affiche()">
              <v-list-item-title>Affichées</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item>
            <v-list-item-content @click="Valide()">
              <v-list-item-title>Validées</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
    <v-container>
      <v-layout row wrap>
        <v-flex v-for="(Annonce, index) in Annonces" :key="Annonce.title">
          <v-card class="text-center ma-3 cardAVR" color="#E5E4E2">
            <v-responsive>
              <v-avatar tile width="300" height="200" class="white lighten-2">
                <img :src= Annonce.picture alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text class="under">
              <v-col cols="7" class="titre">
                <div class="subheading sig">{{ Annonce.title }}</div>
                <div class="grey-text">
                  <strong>Date: </strong
                  >{{ Annonce.dateDebutEvent.split("T")[0] }}
                </div>
                <div class="grey-text">
                  <strong>Lieu: </strong>{{ Annonce.localisation }}
                </div>
              </v-col>
              <v-card-text cols="1" class="else">
                <v-card-actions class="boutAVR">
                  <v-dialog
                    v-model="dialog3"
                    :retain-focus="false"
                    persistent
                    max-width="800px"
                    class="dialog"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        outlined
                        color="primary"
                        class="Dt"
                        @click="Details(index)"
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
                <v-card-actions class="boutAVR2">
                  <v-dialog
                    v-model="dialog4"
                    :retain-focus="false"
                    persistent
                    max-width="600px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        outlined
                        color="red"
                        @click="Annule(index)"
                        class="Sa"
                        dark
                        v-on="on"
                      >
                        <span>Annuler</span>
                      </v-btn>
                    </template>
                    <v-card class="cardT">
                      <v-card-text>
                        <h2 class="subheading grey--text pt-7 text-center">
                          Veuillez préciser la raison de l'annulation ?
                        </h2>
                        <v-card-text>
                          <div class="signal">
                            <v-textarea
                              clearable
                              clear-icon="mdi-close-circle"
                              label="Raison d'annulation"
                              v-model="motifA"
                              rows="3"
                            ></v-textarea>
                          </div>
                        </v-card-text>
                        <div class="bouttonsV">
                          <v-btn @click="dialog4 = false"
                            ><span>Fermer</span></v-btn
                          >
                          <v-btn class="blue-grey darken-2" @click="Annuler(),dialog4 = false"
                            ><span>Confirmer</span></v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-dialog>

                </v-card-actions>
              </v-card-text>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import setAuthHeader from "@/utils/setAuthHeader";

export default {
  name: "AnnonceValideRes",
  components: {},
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      varIndex: "",
      selectedItem: 0,

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

      Annonces: [
        {
          title: "",
          description: "",
          localisation: "",
          state: "",
          dateDebutEvent: "",
          dateFinEvent: "",
          dateDebutDisplay: "",
          dateFinDisplay: "",
          auteur: "",
          picture: [],
          motif: "",
          Avatar: "/p.png",
        },
      ],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getAllDisplyedAnnouncementsByModerator`
      );
      this.Annonces = res.data;
      console.log(this.Annonces);
    } catch (e) {
      alert("Missing data from database");
    }
  },

  methods: {
    async Details(index) {
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/moderator/selectOneAnnouncementByModerator/${
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
        //this.picture = res.data.picture;
      } catch {
        alert("Missing data from database");
      }
    },
    async Annuler() {
      try { 
        const data = {
        motif: this.motifA,}
        await axios.post(
          `http://localhost:8080/api/madrasa-tic/moderator/cancelAnnouncementByModerator/${
            this.Annonces[this.varIndex].id
          }`,data
        ),
        this.Annonces.splice(this.varIndex, 1);
          alert("Annonce annulée");
      } catch {
        alert("Annonce pas annulée");
      }
    },
    async Annule(index) {
      this.varIndex = index;
    },
    async Affiche() {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getAllDisplyedAnnouncementsByModerator`
      );
      this.Annonces = res.data;
    },
    async Valide() {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getAllValidatedAnnouncementsByModerator`
      );
      this.Annonces = res.data;
    },
     trierAnnonce(){
    this.Annonces.sort((a, b) => (a.dateDebutEvent<b.dateDebutEvent) ? 1 : -1)},
  },
};
</script>


<style scoped>
div.flex {
  max-width: 350px;
}
.cardAVR {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-left: 10px;
  height: 350px;
}
.img {
  align-items: center;
}
.sig {
  font-weight: 550;
  font-size: 18px;
  text-align: left;
}
.Dt {
  text-transform: none;
}

.Sa {
  position: relative;
  text-transform: none;
  margin-top: -70px;
}
.under {
  display: flex;
  flex-direction: row;
}
.titre {
  margin-bottom: 40px;
  line-height: 250%;
  text-align: left;
  align-items: left;
  margin-left: -10px;
}
.else {
  margin-left: 20px;
  margin-bottom: 20px;
  line-height: 250%;
}
.boutAVR {
  margin-bottom: 50px;
  margin-left: 150px;
}
.boutAVR2 {
  margin-bottom: 50px;
   margin-left: 148.5px;
}
.containAVR{
  width: 400px;
  margin-left: 35px;
}
.AVR{
  margin-top: 15px;
  margin-left: 33px;
}
.ligAVR {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 25px;
}
.btnsAVR{
  margin-left: 500px;
  margin-top: -40px;
}
</style>