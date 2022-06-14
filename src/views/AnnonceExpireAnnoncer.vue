<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Mes Annonces Expirées</h1>
    <v-btn small outlined color="blue" @click="trierAnnonce()" class="mr-2 AEA" dark v-bind="attrs" v-on="on">
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Trier par date</span>
            </v-btn>
            <v-card-actions class="btnsAEA">
        <v-btn outlined color="green" class="btn" to="MesAnnoncesAnnouncer">
          <v-icon>mdi-bullhorn-outline</v-icon>
          <span>Mes Annonces</span>
        </v-btn>
        <v-btn outlined color="orange" class="btn" to="AnnonceAnnuleAnnoncer">
          <v-icon>mdi-close-outline</v-icon>
          <span>Annonces Annulées</span>
        </v-btn>
        <v-btn outlined color="red" class="btn" to="AnnonceRejeteAnnoncer">
          <v-icon>mdi-cancel</v-icon>
          <span>Annonces Rejetées</span>
        </v-btn>
      </v-card-actions>
    <v-container>
      <v-layout row wrap>
        <v-flex v-for="(Annonce, index) in Annonces" :key="Annonce.title">
          <v-card class="text-center card" color="#E5E4E2">
           <a :href="Annonce.picture">
            <v-responsive >
              <v-avatar tile width="300" height="200" class="white lighten-2">
                <img  :src="Annonce.picture" alt="" />
              </v-avatar>
            </v-responsive>
            </a>
            <v-card-text class="underAEA">
              <v-col cols="7" class="titre">
                <div class="subheading sig">{{ Annonce.title }}</div>
                <div class="grey-text">  
                  <strong>Date: </strong>{{ Annonce.dateDebutEvent.split("T")[0] }}
                </div>
                <div class="grey-text">
                  <strong>Lieu: </strong>{{ Annonce.localisation }}
                </div>
              </v-col>
              <v-card-text cols="1" class="elseAEA">
                <v-card-actions class="bout">
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
                    readonly
                  ></v-text-field>
                  <v-text-field
                    label="Lieu"
                    v-model="localisationA"
                    prepend-icon="place"
                    type="text"
                    required
                    disabled
                    readonly
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
                    readonly
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
  name: "AnnonceExpireAnnouncer",
  components: {},
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      varIndex: "",

      dateDebutEventA: "",
      dateFinEventA: "",
      dateDebutDisplayA: "",
      dateFinDisplayA: "",

      descriptionA: "",
      motifA: "",
      titleA: "",
      localisationA: "",
      pictureA: [],
      stateA:[],
      auteurA:"",

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
        `http://localhost:8080/api/madrasa-tic/announcer/getAllMyFinishedAnnouncementsByAnnouncer`
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
          `http://localhost:8080/api/madrasa-tic/announcer/selectOneOfMyAnnouncementsByAnnouncer/${
            this.Annonces[this.varIndex].id
          }`
        );
        this.titleA = res.data.title;
        this.descriptionA = res.data.description;
        this.localisationA = res.data.localisation;
        this.dateDebutEventA =res.data.dateDebutEvent.split("T")[0];
         this.dateFinEventA =res.data.dateFinEvent.split("T")[0];
          this.dateDebutDisplayA =res.data.dateDebutDisplay.split("T")[0];
          this.dateFinDisplayA =res.data.dateFinDisplay.split("T")[0];
        //this.picture = res.data.picture;
      } catch {
        alert("Missing data from database");
      }
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
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-left: 10px;
  height: 370px;
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
.img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  cursor: pointer;
}
.Sa {
  position: relative;
  text-transform: none;
  
}
.underAEA {
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
}
.titre {
  line-height: 250%;
  text-align: left;
  align-items: left;
  margin-left:-10px;
}
.elseAEA {
  margin-left: 170px;
  line-height: 250%;
}
.bout {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30%;

}
.AEA{
  margin-top: 10px;
  margin-left: 34px;
}
.btnsAEA{
  margin-left: 500px;
  margin-top: -40px;
}
</style>