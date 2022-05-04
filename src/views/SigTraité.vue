<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements Traités</h1>
    <v-container >
      <v-layout row wrap>
          <v-flex v-for="Signalement in Signalements" :key="Signalement.titre">
              <v-card class="text-center ma-3 card" color="#F0FFF0">
                  <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/p.png" alt="" >
                   </v-avatar>
                </v-responsive>
                  <v-card-text class="titre">
                      <div class="subheading sig">{{Signalement.titre}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.Catégorie}}</div>
                      <div class="grey-text"><strong>Traité le: </strong>{{Signalement.Date_de_Traitement}}</div>
                  </v-card-text>
                  <!--<v-card-text class="etat">
                      <div class="subheading ">Etat</div>
                      <div class="subheading green--text" >{{Signalement.Etat}}</div>
                  </v-card-text>-->
                  <v-card-actions>
                      <v-btn outlined color="green" class="trait" disabled>
                          <v-icon small left>task_alt</v-icon>
                          <span>Terminé</span>
                      </v-btn>
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

export default {
  name: 'SignalementTraité',
  components: {
   
  },
  data (){
      return{
          Signalements:[
              {
                  titre:"Prises endomagé",
                  Catégorie:"Electricité",
                  Date_de_Traitement:"05/04/2022",
                  Etat:"Traité",
                  Avatar:"/p.png"

              },
          ]
      }
  },
  async created() {
        try {
        const res = await axios.get(`http://localhost:3000/SignalementsTraité`);
        this.Signalements = res.data;
        } catch(e) {
        alert("Missing data from database");
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
  height: 300px;
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
    line-height: 250%;
    text-align: center;
 
}
.etat{
    margin-left: 150px;
    line-height: 300%;
}
.trait{
   
    align-content: center;
    align-items: center;
}
</style>