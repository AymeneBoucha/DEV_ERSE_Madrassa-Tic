<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements en Cours de Traitement</h1>
    <v-container >
      <v-card-actions class="btnsChEnTr">
        <v-btn outlined color="red" class="btn" to="/SigEnAttent">
          <v-icon>mdi-alert-octagram</v-icon>
          <span>En Attente de Traitement</span>
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
          <v-flex v-for="(Signalement, index) in Signalements" :key="Signalement.titre">
              <v-card class="text-center ma-3 card" color="#F0FFF0">
                  <div class="imgCH">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
        :src= Signalement.picture
      ></v-img>
      </div>
                  <v-card-text class="titreET">
                      <div class="subheading sig">{{Signalement.title}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.category}}</div>
                      <div class="grey-text"><strong>Debut de traitement le: </strong>{{Signalement.dateOf.split("T")[0]}}</div>
                  </v-card-text>
                  <v-card-actions class="bout">
                    <v-dialog
                v-model="dialog1"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                      <v-btn outlined color="blue" class="trait2" @click="Consulter(index)"  v-on="on">
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
                      <v-dialog v-model="dialog" persistent max-width="600px" class="dialog">
                          <template v-slot:activator="{ on }">
                            <v-btn outlined color="orange" class="obs" v-on="on" >
                                <v-icon small left>warning</v-icon>
                                <span @click="obstacle(index)">Declarer un obstacle</span>
                            </v-btn>
                            </template>
                            <v-card class="cardT">
                                <v-card-text>
                                <v-textarea 
                                    clear-icon="mdi-close-circle"
                                    label="Motif"
                                    v-model="probleme"
                                    prepend-icon="description"
                                    rows="2"
                                    ></v-textarea>
                                    <div class="bouttonsD">
                                         <v-btn @click="dialog = false" ><span>Annuler</span></v-btn>
                                         <v-btn class=" blue-grey darken-2" @click="envoyer()"><span>Envoyer</span></v-btn>
                                    </div>
                                </v-card-text>
                            </v-card>
                      </v-dialog>
                            <v-dialog v-model="dialog2"  :retain-focus="false" persistent max-width="800px" class="dialog">
                       <template v-slot:activator="{ on }">
                            <v-btn  v-on="on" outlined color="green" class="trait" @click="Rapport(index)"> <v-icon small left>task_alt</v-icon> Marquer comme terminé</v-btn>
                       </template><!--@click="modifier(index)"-->
                        <v-card class="text-center  cardM">
                <v-card-text>
                  <div >
                      <h2 class="subheading">Rapport</h2>
                        <v-text-field
                            v-model="titleR"
                            :rules="[v => !!v || 'champs obligatoire']"
                            label="Titre"
                            required
                            prepend-icon="title"
                        ></v-text-field>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Description "
                            v-model="descriptionR"
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
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="dateOfR"
                                        label="Fin de traitement"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="dateOfR"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save"
                                ></v-date-picker>
                            </v-menu>
                        </div>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Matériel"
                            v-model="materialR"
                            prepend-icon="description"
                            rows="2"
                        ></v-textarea>
                        <v-file-input
                          v-model="pictureR"
                                                     @change="onFileSelected"

                          accept="image/*"
                          label="Ajouter une image "
                          prepend-icon="add_a_photo"
                        ></v-file-input>

                  </div>
                  <div class="bouttonsD">
                    <v-btn  @click="empty(), dialog2 = false"  ><span @click="empty()">Annuler</span></v-btn>
                   <v-btn class=" blue-grey darken-2" @click="envoyerRapport(), Terminer(), dialog2 = false " ><span>Envoyer</span></v-btn>
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

export default {
  name: 'SignalementEnTraitement',
  components: {
   
  },
  data (){
       return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      width: '297',
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
          picture: "",
      catégories: [],
      site: "",
      salle: "",
      etage: "",
      motif: "",
        description:'',
        material:'',
        categorie_rapport: '',
        datefin: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        datedebut:'',
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
          picture: "",
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
  },  mounted: async function () {
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
        const res = await axios.get(`http://localhost:8080/api/madrasa-tic/employer/getAllMyAcceptedReportsByEmployer`);
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
    },computed: {
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
    methods : {
        onFileSelected(event){
      console.log(event)
            console.log("this. beyna picture")

      this.selectedFile = event

      console.log(this.selectedFile)

    },
      Rapport(index) {
        this.varIndex = index
      },
      async envoyerRapport () {
       
           const data = new FormData()

   
   data.append('picture', this.selectedFile)
      data.append('title', this.titleR)
         data.append('description', this.descriptionR)
   data.append('material', this.materialR)
 
   data.append('dateOf', this.dateOfR)
    
          axios.post(`http://localhost:8080/api/madrasa-tic/employer/submitRaportByEmployer/${this.Signalements[this.varIndex].id}`,data)
        .then(
                res => {
                    console.log(res)
                    alert('Votre Rapport est envoyé avec succès');
                    this.Signalements.splice(this.varIndex, 1);
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
      },
        async Terminer()  {
            const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      try {
        await axios.post(
          `http://localhost:8080/api/madrasa-tic/employer/traiterReportByEmployer/${
            this.Signalements[this.varIndex].id
          }`
        ),
          alert(" Traitement terminé");
      } catch (e) {
        alert("Erreur: Signalement pas validé");
      }
        },
        async obstacle(index)  {
         this.varIndex = index;
        },
        async empty() {
          console.log(this.descriptionR);
            this.titleR="";
            this.selectedFile=null;
            this.descriptionR="";
            this.materialR="";
            this.dateOfR="";
            console.log(this.descriptionR);
        },
        async envoyer() {
             try {
        const data = {
          probleme: this.probleme,
        };
        await axios.post(
          `http://localhost:8080/api/madrasa-tic/employer/declarerObstacleReportByEmployer/${this.Signalements[this.varIndex].id}`,data);
                  alert("Traitement suspendu");

        this.$router.push("SigSuspendu");
      } catch (e) {
        alert("Il y a un probéme");
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
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  width: 300px;
  margin-left: 10px;
  height: 490px;
}
.cardT{
    height: 150px;
}
.bouttonsD{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.img{
    align-items: center;
}
.sig{
    font-weight: 550;
    font-size: 18px;
    text-align: center;
}
.titre{
    margin-bottom: 10px;
    line-height: 250%;
    text-align: center;
    align-items: center;
}
.etat{
    margin-left: 150px;
    line-height: 300%;
}
.bout{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.trait{
    position: relative;
    text-transform: none;
    align-items: center;
    margin-top: -25px;
}
.obs{
    text-transform: none;
    align-items: center;
    margin-bottom: 30px;
}
.trait2{
  margin-bottom: 8px;
  text-transform: none;
}
.imgCH{
  margin-top: 2px;
  left: -17.5px;
}
.titreET{
  position: absolute;
  margin-top: 200px;
}
.btnsChEnTr{
  position: relative;
  margin-left: 35%;
}
</style>