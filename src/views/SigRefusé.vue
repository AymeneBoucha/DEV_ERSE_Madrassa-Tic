<template>
  <div class="SignalementRefusé">
    <h1 class="subheading grey--text">Signalements Refusés</h1>
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
                      <div class="grey-text"><strong>Motif: </strong>{{Signalement.Motif}}</div>
                  </v-card-text>
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
  name: 'SignalementRefusé',
  components: {
   
  },
  data (){
      return{
          Signalements:[
              {
                  titre:"Prises endomager",
                  Catégorie:"Electricité",
                  Date_de_Traitement:"05/04/2022",
                  Etat:"Traité",
                  Avatar:"/p.png",
                  Motif: "Ce n'est pas mon domaine"
              },
          ]
      }
  },
  async created() {
        try {
        const res = await axios.get(`http://localhost:3000/SignalementsRefusé`);
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
</style>