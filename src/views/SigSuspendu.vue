<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements Suspendus</h1>
    <v-container >
      <v-layout row wrap>
          <v-flex v-for="(Signalement, index) in Signalements" :key="Signalement.titre">
              <v-card class="text-center ma-3 card" color="#F0FFF0">
                  <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/p.png" alt="" >
                   </v-avatar>
                </v-responsive>
                  <v-card-text class="titre">
                      <div class="subheading sig">{{Signalement.titre}}</div>
                      <div class="grey-text"><strong>Catégorie: </strong>{{Signalement.Catégorie}}</div>
                      <div class="grey-text"><strong>Obstacle: </strong>{{Signalement.Obstacle}}</div>
                  </v-card-text>
                  <v-card-actions>
                      <v-btn outlined color="blue" class="cont" >
                          <v-icon small left>mdi-play-circle</v-icon>
                          <span @click="Continuer(index)">Continuer le traitement</span>
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
  name: 'SignalementSuspendu',
  components: {
   
  },
  data (){
      return{
          Signalements:[
              {
                  titre:"Prises endomagé",
                  Catégorie:"Electricité",
                  Date_de_Traitement:"05/04/2022",
                  Etat:"Suspendu",
                  Avatar:"/p.png",
                  Obstacle: "J'ai besoin de quelques outils pour terminer"
              },
          ]
      }
  },
  methods: {
      async Continuer(index)  {
            try {
                this.Signalements[index].Etat = 'En cours de traitement'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
                this.Signalements.splice(index, 1)
                this.$router.push('SigEnTraitement')
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
  },
  async created() {
        try {
        const res = await axios.get(`http://localhost:3000/SignalementsSuspendu`);
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
  height: 370px;
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
    margin-bottom: 20px;
}
.etat{
    margin-left: 150px;
    line-height: 300%;
}
.cont{
    align-content: center;
    align-items: center;
    margin-bottom: 20px;
}
</style>