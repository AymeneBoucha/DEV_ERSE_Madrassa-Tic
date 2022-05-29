<template>
    <div class="LesSignalements">
        <h1 class="subheading grey--text">Signalements En Cours De Traitement</h1>
        <v-container>
          <v-card-actions class="btnsET">
        <v-btn outlined color="red" class="btn" to="SignalementsEnAttente">
          <v-icon>mdi-alert-octagram</v-icon>
          <span>Signalements En Attente</span>
        </v-btn>
        <v-btn outlined color="primary" class="btn" to="SignalementsACompleterRes">
          <v-icon>mdi-alert-plus</v-icon>
          <span>Signalements à Completer</span>
        </v-btn>
        <v-btn outlined color="orange" class="btn" to="SignalementsSuspendus">
          <v-icon>mdi-timer-off</v-icon>
          <span>Signalements Suspendus</span>
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
                </v-col>
            <v-layout row wrap>
                <v-flex  v-for="(Signalement, index) in Signalements" :key="Signalement.id">
                    <v-card class="text-center ma-3 card1">
                     <div class="img">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
        src="sig.png"
      ></v-img>
      </div>
                    <v-card-text class="titre">
                    <div class="subheading tt">{{Signalement.title}}</div>
                    <div class="grey--text"><strong>Catégorie: </strong>{{Signalement.category}}</div>
                    <div class="grey--text"><strong>Publié le: </strong>{{Signalement.dateOf}}</div>
                    </v-card-text>
                    <v-card-text class="etat" >
                </v-card-text>
                    <v-card-actions class="bouttons">
                        <v-dialog v-model="dialog"  :retain-focus="false" persistent max-width="800px" class="dialog">
                        <template v-slot:activator="{ on }">
                        <v-btn outlined color="blue" @click="Modifier(index)" class="consulter3" v-on="on" >
                             <v-icon small left > mdi-eye</v-icon>
                             <span>Consulter</span>
                        </v-btn>
                </template>
                <v-card class="text-center  cardM">
                <v-card-text>
                  <div class="signal">
                        <v-select
                            v-model="defaultCatégorie"
                            item-text="nom"
                            :disabled="disabled"
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
                            :disabled="disabled"
                            required
                            prepend-icon="title"
                        ></v-text-field>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Description (optionnelle)"
                            v-model="description"
                            :disabled="disabled"
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
                        disabled
                        type="text"
                        ></v-text-field>
                        <v-file-input
                          v-model="picture"
                          accept="image/*"
                          :disabled="disabled"
                          label="Ajouter une image "
                          prepend-icon="add_a_photo"
                        ></v-file-input>
                  </div>
                  <div class="bouttonsD">
                    <v-btn @click="dialog = false"  ><span>Sortir</span></v-btn>
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
import axios from 'axios'
import setAuthHeader from '@/utils/setAuthHeader'
    const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);
export default {
    name : 'LesSignalements',
    components : {
    },
    data() {
        return {
          conf : false,
          disabled: true,
            btn: false,
            width: '290',
            selectedItem: 0,
            dialog: false,
            dialog2: false,
            dialog3: false,
            dialog4: false,
            date: '',
            menu: false,
        menu2: false,
        dateOf: '',
         title: '',
        decription: '',
        varIndex: '',
        category:'',
        auteur:'',
        image: [],
        catégories: [],
        site: '',
        motif:'',
        salle: '',
        etage: '',
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
                    userId: '',
                    auteur:'',
                    state: '',
                    image: '/sig.png',
                    description: '',
                     site: '',
                    etage:'',
                    salle:'',
                    motif:''
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
        this.catégories.push(res.data[j].name);
        j++
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
        `http://localhost:8080/api/madrasa-tic/moderator/getAllRefusedReportsByByModerator`
      );
      this.Signalements = res.data;
                        let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
           this.Signalements[j].auteur = res.data[j].user.email;
        
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
   //dateOf: function () {
     //    if (this.date  && this.time )
    //{return this.date + ' ' + this.time }
      //else {return ''}
     
    //},
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
         async Modifier (index) {
      try {
        
        this.varIndex=index
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/moderator/selectOneReportByModerator/${this.Signalements[this.varIndex].id}`
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
       /* async Confirmer (id) {
         const data = {
                title: this.title,
                description: this.decription,
                category: this.category,
                localisation: this.localisation,
                picture: this.picture,
            };
          axios.post('http://localhost:3000',data, id)
        .then(
                res => {
                    console.log(res)
                    alert('Votre signalement est envoyé avec succès');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
        },*/
         async enregistrer () {
       const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
         const data = {
           //report_id: this.report_id,
                title: this.title,
                description: this.description,
                category: this.category,
                localisation: this.localisation,
                site : this.site,
                etage : this.etage,
                salle : this.salle,
                picture: this.picture,
            };
          axios.put(`http://localhost:8080/api/madrasa-tic/moderator/updateReportByModerator/${this.Signalements[this.varIndex].id}`,data)
        .then(
                res => {
                    console.log(res)
                    alert('Votre signalement est modifié avec succès');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
    },
        async validerSig() {
            const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
            try{
              await axios.post(`http://localhost:8080/api/madrasa-tic/moderator/validateReportByModerator/${this.Signalements[this.varIndex].id}`),
              alert("Signalemet validé")
            }catch(e){
              alert("Erreur: Signalement pas validé")
            }
        },
        async rejeterSig() {
            const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
            try{
              const data = {
          
                motif: this.motif,
       
            };
             this.Signalements[this.varIndex].motif= this.motif
              console.log(this.motif)
              console.log(data)
              await axios.post(`http://localhost:8080/api/madrasa-tic/moderator/rejectReportByModerator/${this.Signalements[this.varIndex].id}`,data),
              alert("Signalemet rejeté")
            }catch(e){
              alert("Erreur: Signalement pas rejeté")
            }
        },
        async infoSig() {
            const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
            try{
              const data = {
                motif: this.motif,
            };
              
              await axios.post(`http://localhost:8080/api/madrasa-tic/moderator/needMoreInfosReportByModerator/${this.Signalements[this.varIndex].id}`,data),
              alert("Signalemet modifié")
            }catch(e){
              alert("Erreur: Signalement pas modifié")
            }
        },
        valider(index) {
          this.varIndex = index
        },
        rejeter(index){
          this.varIndex = index
        },
        info(index){
          this.varIndex = index
        },
        Filtrer(categorie) {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
          let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].category !== categorie){
              this.Signalements.splice(i, 1)
            }else {
              i++
            }
          }
        }
    }
}
</script>
<style>
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
.etat {
    display: flex;
    flex-direction: column;
    margin-right: -20px;
    line-height: 300%;
}
.deleteS{
    margin-right: 40px;
}
.lig{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 25px;
}
.filtre{
  display: flex;
  flex-direction: row;
  margin-left: -14px;
}
.bouttonsD{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: relative;
  margin-top: 20px;
}

.signal {
  width: 70%;
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
.bt {
  width: 130px;
}
.consulter3{
  margin-right: 80px;
}
.date
{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bouttonsV{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: relative;
  margin-top: 20px;
}
.img{
  left: -34px;
}
.btnsET{
  position: absolute;
  margin-left: 230px;
}
</style>