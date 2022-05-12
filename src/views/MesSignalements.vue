<template>
  <div class="LesSignalements">
    <h1 class="subheading grey--text">Mes Signalements</h1>
    <v-container>
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
      <v-card class="cardS" min-width="950" width="950" tile>
        <v-list dense>
          <v-list-item-group class="lig" v-model="selectedItem" color="primary">
            <v-list-item>
              <v-list-item-content @click="TousSign()">
                <v-list-item-title>Tous Les Signalements</v-list-item-title>
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
        <v-flex v-for="Signalement in Signalements" :key="Signalement.title">
          <v-card class="text-center ma-3 card1">
            <v-responsive class="pt-0 img">
              <v-avatar size="100" class="red lighten-2">
                <img src="/sig.png" alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text class="titre">
              <div class="subheading tt">{{ Signalement.title }}</div>
              <div class="grey--text">
                <strong>Catégorie : </strong>{{ Signalement.category }}
              </div>
              <div class="grey--text">
                <strong>Publié le : </strong>{{ Signalement.dateOf }}
              </div>
            </v-card-text>
            <v-card-text class="etatM">
              <div class="subheading tt">Etat</div>
              <div class="subheading">{{ Signalement.state }}</div>
            </v-card-text>
            <v-card-actions class="bouttons">
                        <v-dialog v-model="dialog"  :retain-focus="false" persistent max-width="800px" class="dialog">
                        <template v-slot:activator="{ on }">
                        <v-btn outlined color="blue" class="consulter" v-on="on" >
                             <v-icon small left > mdi-eye</v-icon>
                             <span @click="Modifier(index)">Consulter</span>
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
                  </div>
                  <div class="bouttonsD">
                    <v-btn class="" @click="dialog = false"><span>Annuler</span></v-btn>
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
            date: '',
            menu: false,
        menu2: false,
        dateOf: '',
         title: '',
        decription: '',
        varIndex: '',
        category:'',
        image: [],
        catégories: ["Hygiène", "Sécurité", "Problèmes techniques", "Santé","Electricité","Plomberie","Problèmes d'équipement","Objet perdu"],
        site: '',
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
      Signalements: [
        {
                    id:'',
                    title : 'fuite',
                    category: '',
                    dateOf: '',
                    userId: '',
                    state: '',
                    image: '/sig.png',
                    description: '',
                     site: '',
                    etage:'',
                    salle:'',
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
  async created() {
    const acc = localStorage.getItem("xaccesstoken");
    setAuthHeader(acc);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
      console.log(this.Signalements);
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
    async TousSign() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);

      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
    },
    async SignEnAtt() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;
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
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].state !== "Rejeté") {
          this.Signalements.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    async Filtrer(categorie) {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
     /* const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyReportsByUser`
      );
      this.Signalements = res.data;*/
      let i = 0;
      while (i < this.Signalements.length) {
        if (this.Signalements[i].category !== categorie) {
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
  margin-right: 80px;
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
</style>