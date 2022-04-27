<template>
  <div class="signalementpageItem">
    <h1 class="subheading grey--text">Signalements en attente</h1>
    <v-container>
      
      <v-card flat  v-for="Signalement in Signalements" :key="Signalement.titre" class="mb-1">
        <v-card row wrap :class="`pa-3`">
              <v-row align="center">
                <v-col cols="3" xs12 md6>
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/fig2.png" alt="" >
                   </v-avatar>
                </v-responsive>
                    <!-- <div class="caption grey--text">Titres</div>
                    <div >{{project.titre}}</div> -->
                </v-col>
                <v-col cols="4" xs6 sm4 md2>
                    <!-- <div class="text-h5">{{Signalement.titre}}</div>
                    <v-card-subtitle>{{Signalement.Date}}</v-card-subtitle>
                    <v-card-text>par {{Signalement.persone}}</v-card-text> -->
                    <v-card-text class="titre">
                      <div class="subheading sig">{{Signalement.titre}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.Catégorie}}</div>
                      <div class="grey-text"><strong>Affecter le: </strong>{{Signalement.Date_de_affecter}}</div>
                      <div class="grey-text"><strong>Description: </strong>{{Signalement.Description}}</div>
                      <div class="grey-text"><strong>Lieu: </strong>{{Signalement.lieu}}</div>
                      <div class="grey-text"><strong>State: </strong>{{Signalement.State}}</div>
                      <div class="grey-text"><strong>Service: </strong>{{Signalement.Service}}</div>
                  </v-card-text>
                </v-col>
                <v-col cols="5" xs6 sm4 md2>
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
                                    <span class="caption text-lowercase">Orienter</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                v-for="Service in Services"
                                :key="Service.nom"
                                @click="orienter(Signalement.id-1,Service.nom)"
                                >
                                <v-list-item-title>{{ Service.nom }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            </v-menu>
                            <v-btn small outlined color="red" @click="rejeter(Signalement.id-1)" class="mr-2" dark>
                                <v-icon left small>delete</v-icon>
                                <span class="caption text-lowercase">Rejeter</span>
                            </v-btn>
                            <v-btn small outlined color="orange" @click="info(Signalement.id-1)" class="mr-2" dark>
                                <v-icon left small>add</v-icon>
                                <span class="caption text-lowercase">Demender info</span>
                            </v-btn>
                            <v-btn small outlined color="orange" @click="$router.push('Res_modifier_signalement')" class="mr-2" dark>
                                <v-icon left small>settings</v-icon>
                                <span class="caption text-lowercase">Modifier</span>
                            </v-btn>
                </v-col>
              </v-row>
          </v-card>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";


export default {
  name: 'projectsItem',
  components: {
   
  },
  data: () => ({
    // projects : [
    //   {titre: 'fuite de gas', persone :'khaled', Date: '31/03/2022', status:'pending'},
    //   {titre: 'objet Perdu ', persone :'Iyad', Date: '02/03/2022', status:'pending'},
    //   {titre: 'Coding challenge', persone :'Allphabit Club', Date: '01/05/2022', status:'pending'},
    // ],
    Signalements:[
              {
                  id: "1",
                  titre:"Prises endomager",
                  Catégorie:"Electriciter",
                  Date_de_affecter:"04/04/2022",
                  State:"pending",
                  Avatar:"/prise.jpg",
                  Description:"",
                  lieu:"A2",
                  Personne:"Rachid",
                  Service:""
              },
               {
                  id: "2",
                  titre:"Fuite de Gaz",
                  Catégorie:"Plombier",
                  Date_de_affecter:"05/04/2022",
                  State:"pending",
                  Avatar:"/p.png",
                  Personne:"Aymen",
                  Service:""
              },
               {
                  id: "3",
                  titre:"Poubelle",
                  Catégorie:"Hygiéne",
                  Date_de_affecter:"05/04/2022",
                  State:"pending",
                  Avatar:"/p.png",
                  Personne:"Alphabit club",
                  Service:""
              },
      ],
    Services : [
      {nom: 'Securité'},
      {nom: 'Plombier'},
      {nom: 'Electricité'},
      {nom: 'Hygiéne'},
      {nom: 'Santé'},
      {nom: 'Probleme technique'},
      {nom: "Probléme d'équipement"},
      {nom: 'Objet perdu'}
    ],
    lns:
        [
            {name:'Plombier', path:''}, 
            {name:'Sécurité', path:''},
            {name:'Electricité', path:''}, 
            {name:'Hygiéne', path:''}, 
            {name:'Santé', path:''},
            {name:'Problem Technique', path:''},
            {name:"Probléme d'équipement", path:''},
            {name:'Object perdu', path:''},
        ],
  }),
  methods: {
    async UpdateUser () {
        try{
         await axios.put("http://localhost:3000/signalements",
          this.Signalements)
          alert("Le signalement a été modifié")
        }catch (e) {
          alert("There is a problem")
        }
    },
    changePath(lns) {
        this.$router.push({ path: lns });
    },

    sortBy(prop){
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1:1)
    },
    valider(id){
        this.Signalements[id].State = "validated";
    },
    rejeter(id){
        this.Signalements[id].State = "rejected";
    },
    info(id){
        this.Signalements[id].State = "needMoreInfos";
    },
    orienter(id,service){
        this.Signalements[id].Service = service;
    }
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/signalements`);
      this.Signalements = res.data;
    } catch(e) {
      alert("There are some errors");
    }
  },
  
}
</script>
<style >
  .project.complete {
      border-left: 4px solid #3cd1c2;
  }
  .project.no {
      border-left: 4px solid orange;
  }
  .project.up {
      border-left: 4px solid red;
  }
  .project.yes {
      border-left: 4px solid yellow;
  }
   .v-chip.complete {
      color: #3cd1c2;
  }
  .p.ovnored {
      color: orange;
  }
  .p.up {
      color:  red;
  }
  .p.yes {
      color:  yellow;
  }
</style>
