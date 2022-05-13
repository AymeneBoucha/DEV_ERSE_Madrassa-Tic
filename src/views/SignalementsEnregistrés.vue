<template>
    <div class="SignalementsEnregistrés">
        <h1 class="subheading grey--text">Mes Signalements Enregistrés</h1>
        <v-container>
            <v-layout row wrap>
                <v-flex  v-for="(Signalement, index) in Signalements" :key="Signalement.titre">
                    <v-card class="text-center ma-3 card1">
                    <v-responsive class="pt-0 img">
                    <v-avatar size="100" class="red lighten-2">
                        <img src="/sig.png" alt="" >
                    </v-avatar>
                    </v-responsive>
                    <v-card-text class="titre" >
                    <div class="subheading tt">{{Signalement.title}}</div>
                    <div class="grey--text"><strong>Catégorie : </strong>{{Signalement.category}}</div>
                    <div class="grey--text"><strong>Enregistré le : </strong>{{Signalement.dateOf}}</div>
                    <div class="descriptif grey--text"><strong>Description : </strong>{{Signalement.description}}</div>
                    </v-card-text>
                    <v-card-actions class="bouttons">
                        <v-dialog v-model="dialog"  :retain-focus="false" persistent max-width="800px" class="dialog">
                        <template v-slot:activator="{ on }">
                        <v-btn outlined color="blue" class="deleteM" v-on="on" >
                             <v-icon small left > mdi-wrench</v-icon>
                             <span @click="Modifier(index)">Modifier</span>
                        </v-btn>
                        </template>
                        <v-card class="text-center  cardM">
                <v-card-text>
                  <div class="signal">
                        <v-select
                            v-model="defaultCatégorie"
                            item-text="nom"
                            :items="catégories"
                            label="Catégorie"
                            prepend-icon="category"
                            required
                            :rules="[v => !!v || 'champs obligatoire']"
                        ></v-select>
                        <v-text-field
                            v-model="title"
                            :rules="[v => !!v || 'champs obligatoire']"
                            label="Titre"
                            required
                            prepend-icon="title"
                        ></v-text-field>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Description (optionnelle)"
                            v-model="description"
                            prepend-icon="description"
                            rows="2"
                        ></v-textarea>
                        <div class="lieu">
                        <div class=" form-group">
                       <label for="site">Site</label>
                        <select class="text1 form-control" name="site" id="site" v-model="site" @change="onChange1($event)">
                          <option value='' disabled selected>Selectionnez le site</option>
                          <option v-for="option in sites_options" v-bind:value="option.value" v-bind:key="option.text" >{{option.text}}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="etage">Etage</label>
                        <select class="text2 form-control " name="etage" id="etage" v-model="etage" @change="onChange2($event)">
                          <option value="" disabled selected>Selectionnez l'etage</option>
                          <option v-for="option in etages_options[site]" v-bind:value="option.text" v-bind:key="option.text">{{option.text}}</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="salle">Salle</label>
                        <select class="text3 form-control " name="salle" id="salle" v-model="salle" @change="onChange3($event)">
                          <option value="" disabled selected>Selectionnez la salle</option>
                          <option v-for="option in salles_options[etage]" v-bind:value="option.text" v-bind:key="option.text">{{option.text}}</option>
                        </select>
                      </div>
                       </div>
                      <v-text-field 
                        label="lieu"
                        v-model="localisation"
                        prepend-icon="place"
                        type="text"
                        disabled
                        ></v-text-field>
                        <v-file-input
                          v-model="picture"
                          accept="image/*"
                          label="Ajouter une image "
                          prepend-icon="add_a_photo"
                        ></v-file-input>
                  </div>
                  <div class="bouttonsD">
                  <v-btn class=" blue-grey lighten-3 " @click="enregistrer()"><span>Enregistrer</span></v-btn>
                                    <v-btn class="" @click="dialog = false" ><span>Annuler</span></v-btn>
                  <v-btn class=" blue-grey darken-2" @click="envoyer()"><span>Envoyer</span></v-btn>
                  </div>
                </v-card-text>
              </v-card>
              </v-dialog>
                        <v-btn outlined color="red" class="deleteS">
                             <v-icon small left > mdi-delete</v-icon>
                             <span @click="DeleteSignal(index)">Supprimer</span>
                        </v-btn>
                    </v-card-actions>
                    </v-card>       
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import axios from "axios";
import router from "../router/index";
import setAuthHeader from "@/utils/setAuthHeader";
export default {
    name : 'SignalementsEnregistres',
    components : {
    },
    data() {
        return {
            selectedItem: 0,
            dialog: false,
            title: '',
            varIndex: '',
        description: "",
        category:'',
        picture: [],
        defaultCatégorie : '',
        catégories: [ ],
        site: '',
        salle: '',
        etage: '',
          defaultsite: '',
        defaultsalle: '',
        defaultetage: '',
        sites_options: [
          {text: "Site Préparatoire",value: 'Site Préparatoire'},
          {text: "Site Supérieur",value:'Site Supérieur' },
       ],
        etages_options: {
          'Site Préparatoire' : [{text:"Rez-de-chaussée", value: 'Rez-de-chaussée '},
                                 {text:"1er Etage", value: '1er Etage'},
                                 ],
          'Site Supérieur': [{text: "rez-de-chaussée", value: 'rez-de-chaussée'},
                             {text: "1er étage", value: '1er étage'},
                             {text: "2ème étage", value: '2ème étage'},
                             ],
          },
        salles_options: {
          'Rez-de-chaussée' : [{text:"Amphi A"},{text: "Amphi B"},{text: "Salle TD 1"},{text: "Salle TD 2"},
          {text: "Salle TD 3"},{text: "Salle TD 4"},{text: "Salle TD 5"},{text: "Salle TD 6"},{text: "Couloir"},
          {text: "hall"},{text:"Bureau"},{text: "Sanitaires"}],
          'rez-de-chaussée' : [{text:"Amphi C"},{text: "Amphi D"},{text: "Amphi E"},{text:"Cabinet de Médecin"},
          {text:"Parking"},{text: "Local Alphabit"},{text: "Local Ingeniums"},{text: "Local GDG"},
          {text: "Loge des agents"},{text: "Sanitaires"},{text: "Salle de soutenance"},{text: "Salle de réunion "},
          {text: "Moussala Homme"},{text: "Moussala Femme"},{text: "Foyer"},{text: "Bibliothèque"},{text: "hall"},{text: "Couloir"},{text:"Bureau"},{text: "Salle TD 1"},
          {text: "Salle TD 2"},{text: "Salle TD 3"},{text: "Salle TD 4"},{text: "Salle TD 5"},{text: "Salle TD 6"},
          {text: "Salle A1"},{text: "Salle A2"},{text: "Salle A3"},{text: "Salle A4"},{text: "Cour"}],
          '1er Etage' : [{text:"Salle TD 7"},{text: "Salle TD 8"},{text: "Salle TD B1"},{text: "Salle TD B2"},
          {text:"Salle TP 1"},{text: "Salle TP 2"},{text: "Salle TP 3"},{text: "Salle TP 4"},
          {text:"Salle de réunion"},{text:"Bureau"},{text: "Couloir"},{text: "hall"},{text: "Sanitaires"}],
          '1er étage' : [{text:"Salle TP 1"},{text: "Salle TP 2"},{text: "Salle TP 3"},{text: "Salle TP 4"},{text: "Salle TP 5"},
          {text: "Salle TP 6"},{text: "Salle TP 7"},{text: "Salle de lecture"},{text: "Cabinet de Médecin"},{text: "Magasin"},
          {text: "Administration"},{text: "Couloir"},{text: "Sanitaires"},{text: "hall"}],
          '2ème étage' : [{text:"Salle TP 8"},{text: "Salle TP 9"},{text: "Salle TP 10"},{text: "Laboratoire de recherche"},
          {text: "Couloir"},{text: "Sanitaires"},{text: "hall"}],
            },
            Signalements : [
                {
                  id:'',
                    title : '',
                    category: '',
                    dateOf: '',
                   
                    
                    Avatar: '/sig.png',
                    description: "",
                    site: '',
                    etage:'',
                    salle:'',
                },
            ],
        }
    },
     mounted: async function () {
    try {
      const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);
      const res = await axios.get(`http://localhost:8080/api/madrasa-tic/getAllCategories`);
      //this.categrories = res.data.;
     // console.log(res.data[0].name)
   //  console.log(res.data.length)
        let j = 0;
      while (j < res.data.length) {
        this.categrories.push(res.data[j].name);
        j++
      }
    } catch {
      alert("Missing data from database");
    }
  },
    computed: {
    localisation: function () {
      if (this.site  && this.etage && this.salle)
      {return this.site + ', ' + this.etage + ', ' + this.salle}
      else {return ''}
    },
  },
 async created() {
    try {
          const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
      const res = await axios.get(`http://localhost:8080/api/madrasa-tic/user/getAllMySavedReportsByUser`);

      
   // console.log(res.data[0].category.name)
      this.Signalements = res.data
      
      let i = 0;
      while (i < this.Signalements.length) {
        this.Signalements[i].category = res.data[i].category.name;
        i++
      }
      
     // this.Signalements.category= res.data.category
    //  console.log(this.Signalements.category)
    } catch(e) {
      alert("Missing data from database");
    }
  },
    methods: {
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
        DeleteSignal (index) {
               const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      axios.delete(
        `http://localhost:8080/api/madrasa-tic/user/deleteSavedReportByUser/${this.Signalements[index].id}/`
      );
      this.Signalements.splice(index, 1)
    },
    async Modifier (index) {
      try {
        console.log('cv ana rachid')
        this.varIndex=index
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/user/selectOneOfMyReportsByUser/${this.Signalements[this.varIndex].id}`
        );
        this.title = res.data.title;
        this.description = res.data.description;
        this.category = res.data.category;
        this.localisation = res.data.localisation;
        this.site = res.data.site;
        this.etage = res.data.etage;
        this.salle = res.data.salle;
        this.dateOf = res.data.dateOf;
        //this.picture = res.data.picture;
        this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    async enregistrer () {
      const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
         const data = {
                title: this.title,
                description: this.description,
                 site : this.site,
        etage : this.etage,
        salle : this.salle,
                category: this.defaultCatégorie,
               // localisation: this.localisation,
                picture: this.picture,
                dateOf: this.dateOf
            };
          await axios.put(`http://localhost:8080/api/madrasa-tic/user/userEditReportAndSave/${this.Signalements[this.varIndex].id}`,data)
        .then(
                res => {
                    console.log(res)
                    alert(res.data.message);
                    if (res.status==201) { router.push("/SignalDash");} 
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
      },
      async envoyer () {
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
         const data =  {
                title: this.title,
                description: this.description,
                category: this.defaultCatégorie,
              //  localisation: this.localisation,
                  site : this.site,
        etage : this.etage,
        salle : this.salle,
                picture: this.picture,
                dateOf: this.dateOf
            };
         await  axios.put(`http://localhost:8080/api/madrasa-tic/user/userEditReportAndSubmit/${this.Signalements[this.varIndex].id}`,data)
        .then(
                res => {
                    console.log(res)
                    alert(res.data.message);
                    if (res.status==201) { router.push("/SignalDash");} 
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
      },
    }
}
</script>
<style scoped>
.card1 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 950px;
    min-width: 950px;
    height: 164px;
}
.img {
    margin-left: 35px;
}
.tt {
    font-weight: 550;
    font-size: 18px;
}
.titre {
    margin-left: 25px;
    line-height: 250%;
    text-align: left;
}
.descriptif{
    width: 500px;
    max-height: 50px;
}
.deleteS{
    margin-right: 40px;
    margin-top: 30px;
}
.deleteM{
    margin-right: 34px;
}
.lig{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 25px;
}
.bouttons{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.bouttonsD{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.text {
  margin-left: 3cm;
  font-size: 13px;
}
.signal {
  width: 700px;
  padding: 10px;
   margin-top: 10px;
   position: relative;
   margin-left: auto;
   margin-right: auto;
}
.envoie{
    position: relative;
    left: 4cm;
    width: 15%;
  }
.enregistrer{
    position: relative;
    left: -4cm;
  }
.cycle{
 position: relative;
    left: -4.5cm;
  }
.form-control{
  position: relative;
    left: 0.5cm;
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
  border: 1px solid  grey;
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
</style>