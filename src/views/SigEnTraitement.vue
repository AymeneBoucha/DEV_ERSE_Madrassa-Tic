<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements en Cours de Traitement</h1>
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
                      <div class="grey-text"><strong>Debut de traitement le: </strong>{{Signalement.Date_de_Traitement}}</div>
                  </v-card-text>
                  <v-card-actions class="bout">
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
                                    v-model="motif"
                                    prepend-icon="description"
                                    rows="2"
                                    ></v-textarea>
                                    <div class="bouttonsD">
                                         <v-btn class="" @click="dialog = false" ><span>Annuler</span></v-btn>
                                         <v-btn class=" blue-grey darken-2" @click="envoyer(index)"><span>Envoyer</span></v-btn>
                                    </div>
                                </v-card-text>
                            </v-card>
                      </v-dialog>
                            <v-btn outlined color="green" class="trait">
                                <v-icon small left>task_alt</v-icon>
                                <span @click="Terminer(index)">Marquer comme terminé</span>
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
  name: 'SignalementEnTraitement',
  components: {
   
  },
  data (){
      return{
          dialog: false,
          motif: '',
          Signalements:[
              {
                  titre:"Prises endomagé",
                  Catégorie:"Electricité",
                  Date_de_Traitement:"05/04/2022",
                  Etat:"EnTraitement",
                  Avatar:"/p.png"
              },
              {
                  titre:"Fuite de gaz",
                  Catégorie:"Securité",
                  Date_de_Traitement:"15/04/2022",
                  Etat:"EnTraitement",
                  Avatar:"/p.png"
              },
              {
                  titre:"Animal Sauvage",
                  Catégorie:"Securité",
                  Date_de_Traitement:"30/04/2022",
                  Etat:"EnTraitement",
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
    methods : {
        async Terminer(index)  {
            try {
                this.Signalements[index].Etat = 'Traité'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
                this.Signalements.splice(index, 1)
                this.$router.push('SigTraité')
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
        async obstacle(index)  {
            try {
                this.Signalements[index].Etat = 'Suspendu'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
                //this.Signalements.splice(index, 1)
                //this.$router.push('SigSuspendu')
                console.log(index)
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
        async envoyer(index) {
            try {
                this.Signalements[index].Etat = 'Suspendu'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
                //this.Signalements.splice(index, 1)
                this.$router.push('SigSuspendu')
            }catch(e) {
                alert("Il y a un probéme")
            }
        }
    }
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
</style>