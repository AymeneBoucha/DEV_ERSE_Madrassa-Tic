<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Les Rapports à completer</h1>
    <v-container>
      <v-card-actions class="btnsACR">
         <v-btn outlined color="red" class="btn" to="LesRapportsRes">
          <v-icon>mdi-alert-circle-check-outline</v-icon>
          <span>Rapports En Attente</span>
        </v-btn>
        <v-btn outlined color="primary" class="btn" to="RapportsValRes">
          <v-icon>mdi-check-decagram</v-icon>
          <span>Rapports Validés</span>
        </v-btn>
      </v-card-actions>
      <v-col cols="5" xs6 sm4 md2 class="filtre">
        <v-menu offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              outlined
              color="green"
              class="mr-2"
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Filtrer par catégories</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="Service in Services"
              :key="Service.nom"
              @click="Filtrer(Service.nom)"
            >
              <v-list-item-title>{{ Service.nom }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn small outlined color="blue" @click="trierSignalement()" class="mr-2 " dark v-bind="attrs" v-on="on">
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Trier par date</span>
            </v-btn>
      </v-col>
      <v-layout row wrap>
        <v-flex v-for="(Rapport, index) in Rapports" :key="Rapport.title">
          <v-card class="text-center ma-3 card" color="#E5E4E2">
            <v-responsive class="pt-4">
              <v-avatar size="170" class="red lighten-2">
                <img  :src= Rapport.picture alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text class="titreAC">
              <div class="subheading sig">{{ Rapport.title }}</div>
              <div class="grey-text">
                <strong>Catégorie: </strong>{{ Rapport.category }}
              </div>
              <div class="grey-text">
                <strong>Motif: </strong>{{ Rapport.motif }}
              </div>
            </v-card-text>
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
                      <h2 class="subheading">Rapport</h2>
                      <v-text-field
                        v-model="titleR"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Titre"
                        required
                        disabled
                        prepend-icon="title"
                      ></v-text-field>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Description "
                        v-model="descriptionR"
                        disabled
                        prepend-icon="description"
                        rows="2"
                      ></v-textarea>
                      <div class="date">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateOfR"
                              label="Fin de traitement"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                              disabled
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="dateOfR"
                            :max="
                              new Date(
                                Date.now() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .substr(0, 10)
                            "
                            min="1950-01-01"
                          ></v-date-picker>
                        </v-menu>
                      </div>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Matériel"
                        v-model="materialR"
                        disabled
                        prepend-icon="description"
                        rows="2"
                      ></v-textarea>
                      <v-text-field
                        v-model="motif"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Motif"
                        required
                        disabled
                        prepend-icon="warning"
                      ></v-text-field>
                    </div>
                    <div class="bouttonsD">
                      <v-btn @click="dialog3 = false"
                        ><span>Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
            <v-card-actions>
              <v-dialog
                v-model="dialog"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn class="Sa" @click="Consulter(index)" v-on="on">
                    <span>Signalement Attaché</span>
                  </v-btn>
                </template>
                <v-card class="text-center cardM">
                  <v-card-text>
                    <div class="signal">
                      <v-select
                        v-model="defaultCatégorie"
                        item-text="nom"
                        disabled
                        :items="catégories"
                        label="Catégorie"
                        prepend-icon="category"
                        required
                        :rules="[(v) => !!v || 'champs obligatoire']"
                      ></v-select>
                      <v-text-field
                        v-model="titleS"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Titre"
                        disabled
                        required
                        prepend-icon="title"
                      ></v-text-field>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Description"
                        v-model="descriptionS"
                        disabled
                        prepend-icon="description"
                        rows="2"
                      ></v-textarea>
                      <v-text-field
                        label="Date de debut de traitement"
                        v-model="dateOfS"
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
                    </div>
                    <div class="bouttonsD">
                      <v-btn @click="dialog = false"
                        ><span>Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
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
  name: "LesRapportsRes",
  components: {},
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      motifR: "",
      varIndex: "",
      dateOfR: "",
      dateOfS: "",
      descriptionR: "",
      descriptionS: "",

      titleR: "",

      titleS: "",
      defaultCatégorie: "",
      catégories: [],
      categoryR: "",
      imageR: [],
      imageS: [],

      materialR: "",

      //   dateOfR: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      //    datedebut:'',
      site: "",
      salle: "",
      etage: "",

      Signalements: [
        {
          title: "",
          category: "",
          dateOf: "",
          state: "",
          Avatar: "/sig.png",
          auteur: "",
        },
      ],
      Rapports: [
        {
          title: "",
          description: "",
          category: "",
          state: "",
          dateOf: "",
          auteur: "",
          image: [],
          motif: "",
          Avatar: "/p.png",
        },
        {
          title: "",
          description: "",
          category: "",
          state: "",
          dateOf: "",
          auteur: "",
          image: [],
          motif: "",
          Avatar: "/p.png",
        },
        {
          title: "",
          description: "",
          category: "",
          state: "",
          dateOf: "",
          auteur: "",
          image: [],
          motif: "",
          Avatar: "/p.png",
        },
      ],
      Services: [
        { nom: "Sécurité" },
        { nom: "Plomberie" },
        { nom: "Electricité" },
        { nom: "Hygiène" },
        { nom: "Santé" },
        { nom: "Problèmes techniques" },
        { nom: "Problèmes d'équipement" },
        { nom: "Objet perdu" },
      ],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getAllneedMoreInfosRaportsByModerator`
      );
      this.Rapports = res.data;
console.log(this.Rapports)
      let i = 0;
      while (i < this.Rapports.length) {
        this.Rapports[i].category = res.data[i].report.category.name;
        i++;
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
   //dateOf: function () {
     //    if (this.date  && this.time )
    //{return this.date + ' ' + this.time }
      //else {return ''}
     
    //},
  },
  methods: {
    async Details(index) {
            try {
        
        this.varIndex=index
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/moderator/selectOneRaportsByModerator/${this.Rapports[this.varIndex].id}`
        );
        this.titleR = res.data.title;
        this.descriptionR = res.data.description;
this.materialR=res.data.material;
        this.dateOfR = res.data.dateOf;
        //this.picture = res.data.picture;
        this.motif = res.data.motif;

      } catch {
        alert("Missing data from database");
      }
    },
    async Valider(index) {
      try {
        this.varIndex = index;
        //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
        //this.Signalements.splice(index, 1)
        //this.$router.push('SigSuspendu')
      } catch (e) {
        alert("Il y a un probléme");
      }
    },
    async Consulter(index) {
      try {
        const acc = localStorage.getItem("xaccesstoken");
               
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/moderator/selectOneReportByModerator/${this.Rapports[index].reportId }`
        );
        this.titleS = res.data.title;
        this.descriptionS = res.data.description;
        this.catégories = res.data.category;
        this.localisation = res.data.localisation;
        this.site = res.data.site;
        this.etage = res.data.etage;
        this.salle = res.data.salle;
        this.dateOfS = res.data.dateOf;
        //this.picture = res.data.picture;
        this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    async validerRap() {
      try {
        await axios.post(
          `http://localhost:8080/api/madrasa-tic/moderator/validateRaportByModerator/${
            this.Rapports[this.varIndex].id
          }`
        ),
          alert("Rapport validé");
      } catch (e) {
        alert("Erreur: Rapport pas validé");
      }
    },
    async InfoRap() {
      try {
        const data = {
                motif: this.motifR,
            };
     await axios.post(
          `http://localhost:8080/api/madrasa-tic/moderator/needMoreInfosRaportByModerator/${
            this.Rapports[this.varIndex].id
          }`,data
        ),
          alert("Rapport a été renvoyé pour complement");
      } catch (e) {
        alert("Erreur");
      }
    },
    async ACompleter(index) {
      this.varIndex = index;
    },
    valider(index) {
      this.varIndex = index;
    },
    async Filtrer(categorie) {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      /*const res = await axios.get(`http://localhost:8080/api/madrasa-tic/user/getAllReportsByUser`);
          this.Signalements = res.data;*/
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].Catégorie !== categorie) {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
     trierSignalement(){
    this.Rapports.sort((a, b) => (a.dateOf<b.dateOf) ? 1 : -1)
    },
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
  height: 480px;
}
.cardT {
  height: 150px;
}
.bouttonsD {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.img {
  align-items: center;
}
.sig {
  font-weight: 550;
  font-size: 18px;
  text-align: center;
}
.titreAC {
  margin-bottom: 20px;
  line-height: 250%;
  text-align: center;
  align-items: center;
}
.etat {
  margin-left: 150px;
  line-height: 300%;
}
.bout {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 50px;
}
.Dt {
  text-transform: none;
}
.Val {
  position: relative;
  margin-left: 9px;
  text-transform: none;
}
.Acomp {
  position: relative;
  margin-left: 9px;
  text-transform: none;
}
.Sa {
  position: relative;
  text-transform: none;
  margin-top: -70px;
}
.bouttonsD {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.cardT {
  height: 170px;
}
.btnsACR{
  position: absolute;
  margin-left: 620px;
}
</style>