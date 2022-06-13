<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements en Attente de Traitement</h1>
    <v-container>
      <v-btn small outlined color="blue" @click="trierSignalement()" class="mr-2 TRS" dark v-bind="attrs" v-on="on">
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Trier par date</span>
            </v-btn>
      <v-card-actions class="btnsChEnAt">
        <v-btn outlined color="primary" class="btn" to="/SigEnTraitement">
          <v-icon>mdi-sync</v-icon>
          <span>En Cours de Traitement</span>
        </v-btn>
        <v-btn outlined color="green" class="btn" to="SigTraite">
          <v-icon>mdi-check-outline</v-icon>
          <span>Signalements Traités</span>
        </v-btn>
        <v-btn outlined color="orange" class="btn" to="SigSuspendu">
          <v-icon>mdi-alert</v-icon>
          <span>Signalements Suspendus</span>
        </v-btn>
      </v-card-actions>
      <v-layout row wrap>
        <v-flex
          v-for="(Signalement, index) in Signalements"
          :key="Signalement.titre"
        >
          <v-card class="text-center ma-3 card">
            <div class="imgSEA">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
         :src= Signalement.picture
      ></v-img>
      </div>
            <v-card-text class="titre4">
              <div class="subheading sigT">{{ Signalement.title }}</div>
              <div class="grey-text sig">
                <strong>Catégorie: </strong>{{ Signalement.category }}
              </div>
              <div class="grey-text sig">
                <strong>Affecter le: </strong>{{ Signalement.dateOf.split("T")[0] }}
              </div>
              <div class="grey-text sig">
                <strong>Description: </strong>{{ Signalement.description }}
              </div>
              <div class="grey-text sig">
                <strong>Lieu: </strong>{{ Signalement.site,}}, {{ Signalement.etage}}, {{ Signalement.salle}}  
              </div>
            </v-card-text>
            <div class="boot4">
            <v-card-actions class="bout">
              <v-dialog
                v-model="dialog1"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn outlined color="primary" class="cn" @click="Modifier(index)"  v-on="on">
                    <v-icon small left>mdi-eye</v-icon>
                    <span >Consulter</span>
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
                      <v-text-field
                        label="lieu"
                        v-model="localisation"
                        prepend-icon="place"
                        disabled
                        type="text"
                      ></v-text-field>
                      <v-text-field
                        label="image"
                        v-model="picture"
                        prepend-icon="place"
                        readonly
                        type="text"
                      ></v-text-field>
                    </div>
                    <div class="bouttonsD">
                      <v-btn class="" @click="dialog1 = false"
                        ><span>Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialog3"
                :retain-focus="false"
                persistent
                max-width="400px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    outlined
                    color="green"
                    class="tr"
                    @click="Confirmer(index)"
                    v-on="on"
                  >
                    <v-icon small left>mdi-checkbox-marked-circle</v-icon>
                    <span>Confirmer le traitement</span>
                  </v-btn>
                </template>
                <v-card class="cardT">
                  <v-card-text>
                    <h2 class="subheading grey--text pt-7 text-center">
                      Est ce que vous confirmer la traitement de cet signalement
                      ?
                    </h2>
                    <div class="bouttonsV">
                      <v-btn @click="dialog3 = false"
                        ><span>Annuler</span></v-btn
                      >
                      <v-btn class="blue-grey darken-2" @click="ConfirmerTr()"
                        ><span>Confirmer</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
            </div>
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
  name: "SignalementTraiter",
  components: {},
  data() {
    return {
      dialog1: false,
      dialog2: false,
      width: '315',
      dialog3: false,
      selectedItem: 0,
      dialog: false,
      date: "",
      menu: false,
      menu2: false,
      dateOf: "",
      title: "",
      decription: "",
      varIndex: "",
      category: "",
      auteur: "",
      lieu:"",
      image: [],
      catégories: [],
      site: "",
      salle: "",
      etage: "",
      motif: "",
      probleme: "",
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
          id: "",
          title: "",
          category: "",
          dateOf: "",
          userId: "",
          auteur: "",
          state: "",
          image: "/sig.png",
          description: "",
          site: "",
          etage: "",
          salle: "",
          lieu:"ernsrnj",
          motif: "",
          probleme: "",
        },
      ],
    };
  },
  mounted: async function () {
    try {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/getAllCategories`
      );
      //this.categrories = res.data.;
      // console.log(res.data[0].name)
      //  console.log(res.data.length)
      let j = 0;
      while (j < res.data.length) {
        this.catégories.push(res.data[j].name);
        j++;
      }
    } catch {
      alert("Missing data from database");
    }
  },
  async created() {
    try {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/employer/getAllMyToDoReportsByEmployer`
      );
      this.Signalements = res.data;
             let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
           //this.Signalements[j].auteur = res.data[j].user.email;
        
        j++
      }
    } catch (e) {
      alert("Missing data from database");
    }
  },

    computed: {
    localisation: function () {
      if (this.site  && this.etage && this.salle)
      {return this.site + ' ' + this.etage + ' ' + this.salle}
      else {return ''}
    },
  },
  methods: {
    async ConfirmerTr() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      try {
        await axios.post(
          `http://localhost:8080/api/madrasa-tic/employer/acceptReportByEmployer/${
            this.Signalements[this.varIndex].id
          }`
        ),
        this.dialog3=false,
        this.Signalements.splice(this.varIndex, 1);
          alert("Signalement En cours de traitement");
      } catch (e) {
        alert("Erreur: Signalement pas traité");
      }
    },
    Confirmer(index) {
      this.varIndex = index;
    },
    onChange1(event) {
      {
        this.site = event.target.value;
        this.etage = "";
        this.salle = "";
      }
    },
    onChange2(event) {
      {
        this.etage = event.target.value;
        this.salle = "";
      }
    },
    onChange3(event) {
      {
        this.salle = event.target.value;
      }
    },
    async Modifier(index) {
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/employer/selectOneOfMyReportByEmployer/${
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
        this.dateOf = res.data.dateOf.split("T")[0];
        this.picture = res.data.picture;
        this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    trierSignalement(){
    this.Signalements.sort((a, b) => (a.dateOf<b.dateOf) ? 1 : -1)
    },
  },
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 950px;
  min-width: 950px;
  height: 180px;
}
.imgSEA {
  margin-left: 105px;
}
.sig {
  width: 400px;
  font-size: 15px;
  text-transform: none;
}
.sigT {
  width: 400px;
  font-size: 20px;
  font-weight: 550;;
  text-transform: none;
}
.titre4 {
  margin-left: 5px;
  line-height: 250%;
  text-align: left;
}
.etat {
  margin-left: 150px;
  line-height: 300%;
}
.bout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 50px;
}
.boot4{
  position: relative;
  margin-left: -130px;
}
.cn {
  margin-right: 100px;
}
.tr {
  position: relative;
  margin-top: 15px;
  margin-right: 100px;
}
.rf {
  position: relative;
  margin-top: 15px;
  margin-right: 90px;
}
.obs {
  text-transform: none;
  align-items: center;
  margin-bottom: 30px;
}
.TRS{
  position: absolute;
  margin-top: 13px;
  margin-left: -580px;
}
.btnsChEnAt{
  position: relative;
  margin-left: 278px;
}
</style>