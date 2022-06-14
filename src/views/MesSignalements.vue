<template>
  <div class="MesSignalements">
    <h1 class="subheading grey--text">Mes Signalements</h1>
    <v-container>
      <v-card-actions class="btns">
        <v-btn outlined color="primary" class="btn" to="/addSignal">
          <v-icon>mdi-plus-box-multiple</v-icon>
          <span>Ajouter Un Signalement</span>
        </v-btn>
        <v-btn outlined color="red" class="btn" to="SignalementsACompleter">
          <v-icon>mdi-alert-plus</v-icon>
          <span>Signalements à Completer</span>
        </v-btn>
        <v-btn outlined color="orange" class="btn" to="SignalementsEnregistres">
          <v-icon>mdi-pencil</v-icon>
          <span>Brouillons</span>
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
              v-for="catégorie in catégories"
              :key="catégorie"
              @click="Filtrer(catégorie)"
            >
              <v-list-item-title>{{ catégorie }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn small outlined color="blue" @click="trierSignalement()" class="mr-2" dark v-bind="attrs" v-on="on">
              <v-icon left small>check</v-icon>
              <span class="caption text-lowercase">Trier par date</span>
            </v-btn>
      </v-col>
      <v-card class="cardS" min-width="950" width="950" tile>
        <v-list dense>
          <v-list-item-group class="lig" v-model="selectedItem" color="primary">
            <v-list-item>
              <v-list-item-content @click="TousSign()">
                <v-list-item-title>Tous Mes Signalements</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider vertical></v-divider>
            <v-list-item>
              <v-list-item-content @click="SignEnAtt()">
                <v-list-item-title>Signalements En Attente</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider vertical></v-divider>
            <v-list-item>
              <v-list-item-content @click="SignVal()">
                <v-list-item-title>Signalements Validés</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider vertical></v-divider>
            <v-list-item>
              <v-list-item-content @click="SignTrait()">
                <v-list-item-title>Signalements Traités</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider vertical></v-divider>
            <v-list-item>
              <v-list-item-content @click="SignRej()">
                <v-list-item-title>Signalements Rejetés</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-layout row wrap>
        <v-flex v-for="(Signalement, index) in Signalements" :key="Signalement.title">
          <v-card class="text-center ma-3 card1">
             <div class="img">
           <a :href="Signalement.picture">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
         :src= "Signalement.picture"
      ></v-img>
      </a>
      </div>
            <v-card-text class="titre">
              <div class="subheading tt">{{ Signalement.title }}</div>
              <div class="grey--text">
                <strong>Catégorie : </strong>{{ Signalement.category }}
              </div>
              <div class="grey--text">
                <strong>Publié le : </strong>{{ Signalement.dateOf.split("T")[0] }}
              </div>
            </v-card-text>
            <v-card-text class="etatM">
              <div class="subheading tt">Etat</div>
              <div class="subheading">{{ Signalement.state }}</div>
            </v-card-text>
            <v-card-actions class="bouttons">
                        <v-dialog v-model="dialog"  :retain-focus="false" persistent max-width="800px" class="dialog">
                        <template v-slot:activator="{ on }">
                        <v-btn outlined color="blue" class="consulter" @click="Modifier(index)" v-on="on" >
                             <v-icon small left > mdi-eye</v-icon>
                             <span >Consulter</span>
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
                            disabled
                            prepend-icon="category"
                            required
                            :rules="[v => !!v || 'champs obligatoire']"
                        ></v-select>
                        <v-text-field
                            v-model="title"
                            :rules="[v => !!v || 'champs obligatoire']"
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
                  </div>
                  <div class="bouttonsD">
                    <v-btn class="" @click="dialog = false"><span>Annuler</span></v-btn>
                  </div>
                </v-card-text>
              </v-card>
              </v-dialog>
                    </v-card-actions>


                <!-- <v-card-actions class="boutARA">
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
                        @click="Motif(index)"
                        class="Sa"
                        dark
                        v-on="on"
                      >
                        <span>Motif</span>
                      </v-btn>
                    </template>
                    <v-card class="cardT">
                      <v-card-text>
                        <h2 class="subheading grey--text pt-7 text-center">
                          La raison de rejet:
                        </h2>
                        <v-card-text>
                          <div class="signal">
                            <v-textarea
                              clearable
                              clear-icon="mdi-close-circle"
                              label="Raison de rejet"
                              v-model="motifA"
                              rows="3"
                              disabled
                            ></v-textarea>
                          </div>
                        </v-card-text>
                        <div class="bouttonsV">
                          <v-btn @click="dialog4 = false"
                            ><span>Fermer</span></v-btn
                          >
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-card-actions> -->


          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import setAuthHeader from '@/utils/setAuthHeader'
    const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);
export default {
  name: "MesSignalements",
  components: {},
  data() {
    return {
      selectedItem: 0,
            dialog: false,
            dialog4: false,
            width: '290',
            date: '',
            menu: false,
        menu2: false,
        MotifA: "",
        dateOf: '',
         title: '',
        decription: '',
        varIndex: '',
        category:'',
                picture: '',
        catégories: [],
        site: '',
        salle: '',
        etage: '',
        motif:'',
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
      Signalements: [
        {
                    id:'',
                    title : '',
                    category: '',
                    dateOf: '',
                            picture: '',
                    userId: '',
                    state: '',
                    
                    description: '',
                     site: '',
                    etage:'',
                    salle:'',
                    motif:'',
                    obstacle: ''
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
        console.log(this.catégories)
        j++
      }
    } catch {
      alert("Missing data from database");
    }
  },
   async created() {
    const acc = localStorage.getItem("xaccesstoken");
    setAuthHeader(acc);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
                  let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        j++
      }
     // console.log(this.Signalements);
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
      async Motif(index) {
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/user/selectOneOfMyReportsByUser/${
            this.Signalements[this.varIndex].id
          }`
        );
        this.motifA = res.data.motif;
        console.log(this.motifA)
      } catch {
        alert("Missing data from database");
      }
    },
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
        console.log(this.varIndex)
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
        this.dateOf = res.data.dateOf.split("T")[0];
        this.picture = res.data.picture;
        this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    async TousSign() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);

      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
       let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        j++
      }
    },
    async SignEnAtt() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
       let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        j++
      }
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].state !== "En Attente") {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    async SignVal() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
       let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        j++
      }
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].state !== "Validé") {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    async SignTrait() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
       let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        j++
      }
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].state !== "Traité") {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    async SignRej() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
       let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        j++
      }
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].state !== "Rejeté") {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    trierSignalement(){
    this.Signalements.sort((a, b) => (a.dateOf< b.dateOf) ? 1 : -1)
    },
    async Filtrer(catégorie) {
      console.log(catégorie);
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
     /* const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;*/
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].category !== catégorie) {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
  },
};
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
.etatM {
  margin-left: 280px;
  line-height: 300%;
}
.deleteS {
  margin-right: 40px;
}
.lig {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 25px;
}
.filtre {
  display: flex;
  flex-direction: row;
  margin-left: -14px;
}
.img{
  position: relative;
  left: -34px;
}
.img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  cursor: pointer;
}
.btn{
  text-transform: none;
}
.btns{
  position: absolute;
  margin-left: 350px;
}
</style>