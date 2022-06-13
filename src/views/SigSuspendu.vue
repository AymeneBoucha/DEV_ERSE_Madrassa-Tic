<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements Suspendus</h1>
    <v-container >
      <v-card-actions class="btnsChSu">
        <v-btn outlined color="red" class="btn" to="/SigEnAttent">
          <v-icon>mdi-alert-octagram</v-icon>
          <span>En Attente de Traitement</span>
        </v-btn>
        <v-btn outlined color="primary" class="btn" to="SigEnTraitement">
          <v-icon>mdi-sync</v-icon>
          <span>En Cours de Traitement</span>
        </v-btn>
        <v-btn outlined color="green" class="btn" to="SigTraité">
          <v-icon>mdi-check-outline</v-icon>
          <span>Signalements Traités</span>
        </v-btn>
      </v-card-actions>
      <v-layout row wrap>
          <v-flex v-for="(Signalement, index) in Signalements" :key="Signalement.titre">
              <v-card class="text-center ma-3 card" color="#F0FFF0">
                  <div class="imgChSu">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
       
         :src= Signalement.picture
      ></v-img>
      </div>
                  <v-card-text class="titreChSu">
                      <div class="subheading sig">{{Signalement.title}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.category}}</div>
                      <div class="grey-text"><strong>Obstacle: </strong>{{Signalement.probleme}}</div>
                  </v-card-text>
                  <v-card-actions class="b">
                      <v-btn outlined color="green" class="cont" >
                          <v-icon small left>mdi-play-circle</v-icon>
                          <span @click="Continuer(index)">Continuer le traitement</span>
                      </v-btn>
                      <v-dialog
                v-model="dialog1"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                      <v-btn outlined color="blue" class="trait1" @click="Consulter(index)"  v-on="on">
                          <v-icon small left>task_alt</v-icon>
                          <span>Details</span>
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
                    </div>
                    <div class="bouttonsD">
                      <v-btn class="" @click="dialog1 = false"
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
import axios from 'axios'
import setAuthHeader from "@/utils/setAuthHeader";
const acc = localStorage.getItem("xaccesstoken");
setAuthHeader(acc)

export default {
  name: 'SignalementSuspendu',
  components: {
   
  },
  data (){
     return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      selectedItem: 0,
      width: '297',
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
          lieu:"",
          motif: "",
          probleme: "",
        },
      ],
    };
  },
    async created() {
        try {
        const res = await axios.get(`http://localhost:8080/api/madrasa-tic/employer/getAllMyObstacleReportsByEmployer`);
        this.Signalements = res.data;
                let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
           //this.Signalements[j].auteur = res.data[j].user.email;
        
        j++
      }
        } catch(e) {
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
        async Terminer(index)  {
      try {
        await axios.post(
          `http://localhost:8080/api/madrasa-tic/employer/traiterReportByEmployer/${this.Signalements[index].id}`
        ),
          alert("Signalemet validé");
      } catch (e) {
        alert("Erreur: Signalement pas validé");
      }
        },
      async Continuer(index)  {
            try {
               
               await axios.post(
          `http://localhost:8080/api/madrasa-tic/employer/acceptReportByEmployer/${this.Signalements[index].id}`
        ),
                this.Signalements.splice(index, 1)
                this.$router.push('SigEnTraitement')
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
         async Consulter(index) {
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
    } 
  },

}
</script>
<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  width: 300px;
  margin-left: 10px;
  height: 460px;
}
.img{
    align-items: center;
}
.sig{
    font-weight: 550;
    font-size: 18px;
    text-align: center;
}
.titreChSu{
  position: absolute;
    line-height: 250%;
    text-align: center;
    margin-top: 200px;
}
.b{
  display: flex;
  flex-direction: column;
  
}
.etat{
    margin-left: 150px;
    line-height: 300%;
}
.cont{
    align-content: center;
    align-items: center;
    margin-bottom: 20px;
    text-transform: none;
}
.imgChSu{
  margin-top: 2px;
  left: -17.5px;
}
.trait1{
  text-transform: none;
}
.btnsChSu{
  position: relative;
  margin-left: 36%;
}
</style>