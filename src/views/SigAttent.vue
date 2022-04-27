<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements En Attente</h1>
    <v-container >
      <v-layout row wrap>
          <v-flex v-for="Signalement in Signalements" :key="Signalement.titre">
              <v-card class="text-center ma-3 card">
                  <v-responsive class="pt-0 img">
                      <v-avatar size="100" class="red lighten-2">
                          <img src="prise.jpg" alt="">
                      </v-avatar>
                  </v-responsive>
                  <v-card-text class="titre">
                      <div class="subheading sig">{{Signalement.titre}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.Catégorie}}</div>
                      <div class="grey-text"><strong>Affecter le: </strong>{{Signalement.Date_de_affecter}}</div>
                      <div class="grey-text"><strong>Description: </strong>{{Signalement.Description}}</div>
                      <div class="grey-text"><strong>Lieu: </strong>{{Signalement.lieu}}</div>
                  </v-card-text>
                   <v-card-actions>
                      <v-btn outlined color="green" class="tr">
                          <v-icon small left >mdi-checkbox-marked-circle</v-icon>
                          <span>Traiter</span>
                      </v-btn>
                  </v-card-actions>
                  <!--<v-card-actions >
                    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="#00008B" dark v-on="on">
            <span>Afficher Détailes</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Détailles</span>
        </v-card-title>
        <v-flex v-for="Signalement in Signalements" :key="Signalement.titre">
        <v-card-text>
          <v-col cols="12" lg="8">
             <v-card-text class="titre">
                      <div class="subheading sig">{{Signalement.titre}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.Catégorie}}</div>
                      <div class="grey-text"><strong>Affecter le: </strong>{{Signalement.Date_de_affecter}}</div>
                      <div class="grey-text"><strong>Description: </strong></div>
                      <div class="grey-text"><strong>Lieu: </strong></div>
                  </v-card-text>
          <v-card-actions>
            <v-btn outlined color="green" >
                        <v-icon small left >mdi-checkbox-marked-circle</v-icon>
                        <span >Traiter</span>
                    </v-btn>
                    <v-btn outlined color="red">
                        <v-icon small left > mdi-cancel</v-icon>
                        <span >déclarer un obstacle</span>
                    </v-btn>
          </v-card-actions>
          <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-col>
        </v-card-text>
        </v-flex>-->
                  <!--<v-card-actions>
                      <v-btn outlined color="green" class="trait">
                          <span>Traiter</span>
                      </v-btn>
                  </v-card-actions>
                   <v-card-actions>
                      <v-btn outlined color="#FF7F50" class="tr">
                          <span>déclarer un obstacle</span>
                      </v-btn>
                  </v-card-actions>-->
                 
                
                <!--<v-card-text class="etat">
                    <div class="subheading ">Re-Orienter</div>
               <v-flex class="mt-5">
                   <v-menu offset-y>
                    <v-btn text v-on="on">
                     <v-icon bottom >expand_more</v-icon>
                    </v-btn>
                 </v-menu>
               </v-flex>
               <v-container class="select">
                <v-select
                    background-color="#FFFFF0"
                    :items="lns"
                    item-text="name"
                    label="Select"
                    solo
                ></v-select>
               </v-container>
                </v-card-text>-->
              </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'SignalementTraiter',
  components: {
   
  },
  data (){
      return{
          dialog: false,
          Signalements:[
              {
                  titre:"Prises endomager",
                  Catégorie:"Electriciter",
                  Date_de_affecter:"04/04/2022",
                  Etat:"Traiter",
                  Avatar:"/prise.jpg",
                  Description:"",
                  lieu:""
              },
               {
                  titre:"Fuite de Gaz",
                  Catégorie:"Plombier",
                  Date_de_affecter:"05/04/2022",
                  Etat:"Traiter",
                  Avatar:"/p.png"

              },
               {
                  titre:"Poubelle",
                  Catégorie:"Hygiéne",
                  Date_de_affecter:"05/04/2022",
                  Etat:"Traiter",
                  Avatar:"/p.png"

              },
          ],
          lns:
        [
            {name:'Plombier', path:''}, 
            {name:'Sécurité', path:''},
            {name:'Electricité', path:''}, 
            {name:'Hygiene', path:''}, 
            {name:'Santé', path:''},
            {name:'Problem Thechnique', path:''},
            {name:'Probléme d équipement', path:''},
            {name:'Object perdu', path:''},
        ],
      }
  
  },
  methods: {
        changePath(lns) {
        this.$router.push({ path: lns });
    }
    }
}
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center ;
  width: 1200px;
  height: 1120px;
  margin-left: 10px;
  height: 200px;
}
.img{
    margin-left: 35px;
}
.sig{
    font-weight: 550;
    font-size: 18px;
}
.titre{
    color: "dark";
    margin-left: 25px;
    line-height: 250%;
    text-align: left;
}
.etat{
    margin-left: 150px;
    line-height: 300%;
}

</style>