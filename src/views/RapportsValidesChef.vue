<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Rapports Validés</h1>
    <v-container>
      <v-btn small outlined color="blue" @click="trierSignalement()" class="mr-2 RVC" dark v-bind="attrs" v-on="on">
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Trier par date</span>
            </v-btn>
      <v-card-actions class="btnsVC">
         <v-btn outlined color="primary" class="btn" to="RapportsEnvoyesChef">
          <v-icon>mdi-send-check</v-icon>
          <span>Rapports Envoyés</span>
        </v-btn>
        <v-btn outlined color="red" class="btn" to="RapportsAcompleterChef">
          <v-icon>mdi-flag-plus</v-icon>
          <span>Rapports à Completer</span>
        </v-btn>
      </v-card-actions>
      <v-layout row wrap>
        <v-flex v-for="(Rapport, index) in Rapports" :key="Rapport.titre">
          <v-card class="text-center ma-2 card" color="#F0FFF0">
            <a :href="Rapport.picture">
            <v-responsive class="pt-4">
              <v-avatar size="170" class="red lighten-2">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
         :src= "Rapport.picture"
      ></v-img>
              </v-avatar>
            </v-responsive></a>
            <v-card-text class="titre">
              <div class="subheading sig">{{ Rapport.title }}</div>
              <div class="grey-text">
                <strong>Date fin de traitement: </strong>{{ Rapport.dateOf.split("T")[0]  }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-dialog
                v-model="dialog3"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="Consulter(index)"
                    outlined
                    color="blue"
                    class="DetRVC"
                    v-on="on"
                  >
                    <span >Details</span>
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
                          <!--v-date-picker
                                    v-model="datefin"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                ></v-date-picker-->
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

            <v-card-text class="mr-0">
              <v-dialog v-model="dialog" persistent max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="ConsulterSig(index)"
                    color="white"
                    class="SaRVC"
                    v-on="on"
                  >
                    <span >Signalement Attaché</span>
                  </v-btn>
                </template>
                <v-card class="text-center cardM">
                  <v-card-text>
                    <div>
                      <v-text-field
                        v-model="titleS"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Titre"
                        required
                        disabled
                        prepend-icon="title"
                      ></v-text-field>
                      <v-textarea
                        clearable
                        disabled
                        rows="3"
                        clear-icon="mdi-close-circle"
                        label="Description (optionnelle)"
                        v-model="descriptionS"
                        prepend-icon="description"
                      ></v-textarea>
                      <v-text-field
                        label="lieu"
                        v-model="localisation"
                        prepend-icon="place"
                        type="text"
                        disabled
                      ></v-text-field>
                      <v-text-field
                        v-model="imageS"
                        accept="image/*"
                        label="L'image"
                        prepend-icon="add_a_photo"
                        disabled
                      ></v-text-field>
                    </div>
                    <div class="bouttonsD">
                      <v-btn class="" @click="dialog = false"
                        ><span class="text-lowercase">Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
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

    const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);

export default {
  name: "RapportsEnvoyésChef",
  components: {},
  data() {
    return {
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
          auteur: "",
          image: [],
          motif: "",
        },
      ],
      selectedItem: 0,
      dialog: false,
      dialog3: false,
      des: "",

      titleS: "",
      descriptionS: "",
      categoryS: "",
      dateOfS: "",

      auteurS: "",
      imageS: [],
      site: "",
      salle: "",
      etage: "",
//lieuS:"",
      varIndex: "",

      catégories: [],

      // categorie_rapport: '',
      datefin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      datedebut: "",

      titleR: "",
      descriptionR: "",
      categoryR: "",
      auteurR: "",
      imageR: [],
      materailR:"",
      motifR: "",

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
    };
  },
/*
  computed: {
    categorie_rapport: function (index) {
      return this.Signalements[index].Catégorie;
    },
    datedebut: function (index) {
      return this.signalements[index].Date_de_Traitement;
    },
  },
  */

  async created() {
    try {
      const res = await axios.get(`http://localhost:8080/api/madrasa-tic/employer/getAllMyValidatedRaportsByEmployer`);
      this.Rapports = res.data;

      let i = 0;
      while (i < this.Rapports.length) {
        this.Rapports[i].category = res.data[i].report.category.name;
         this.Rapports[i].auteur = res.data[i].user.email;
        i++
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



  
  
  methods:{
        onChange1(event) {
            {this.site = event.target.value;
            this.etage='';
            this.salle=''}
        },
      onChange2(event) {
            {this.etage = event.target.value;
            this.salle=''}
        },
      onChange3(event) {
            {this.salle = event.target.value;}
        },
       async Consulter (index) {
      try {
        this.varIndex=index
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/employer/selectOneOfMyRaportsByEmployer/${this.Rapports[this.varIndex].id}`
        );
        this.titleR = res.data.title;
                this.materialR = res.data.material;

        this.descriptionR = res.data.description;
        this.dateOfR = res.data.dateOf.split("T")[0] ;
        this.picture = res.data.picture;
     //   this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    async ConsulterSig (index) {
       try {
        
        this.varIndex=index
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/employer/selectOneOfMyReportByEmployer/${this.Rapports[this.varIndex].reportId}`
        );
        this.titleS = res.data.title;
        this.descriptionS = res.data.description;
      //  this.categoryS = res.data.category;
      //  this.lieuS = this.localisation;
        
        this.site = res.data.site;
        this.etage = res.data.etage;
        this.salle = res.data.salle;
        this.dateOfS = res.data.dateOf.split("T")[0] ;
        this.imageS = res.data.picture;
       // this.defaultCatégorieS  = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    trierSignalement(){
    this.Rapports.sort((a, b) => (a.dateOf<b.dateOf) ? 1 : -1)
    },
  }
};

</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-left: 10px;
  height: 420px;
}
.img {
  align-items: center;
  margin-bottom: 10px;
}
.sig {
  font-weight: 550;
  font-size: 18px;
  text-align: center;
}
.titre {
  position: relative;
  line-height: 200%;
  text-align: center;
  margin-bottom: 30px;
}
.etat {
  margin-left: 150px;
  line-height: 200%;
}
.DetRVC {
  align-content: center;
  align-items: center;
  margin-bottom: -20px;
  bottom: 12px;
  text-transform: none;
}
.SaRVC{
  text-transform: none;
}
.RVC{
  position: absolute;
  margin-top: 13px;
  margin-left: -580px;
}
.btnsVC{
  position: relative;
  margin-left: 600px;
}
div.flex{
  max-width: 350px;
}
</style>