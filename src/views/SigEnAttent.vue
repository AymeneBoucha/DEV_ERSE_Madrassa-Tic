<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Signalements en Attente de Traitement</h1>
    <v-container >
      <v-layout row wrap>
          <v-flex v-for="(Signalement, index) in Signalements" :key="Signalement.titre">
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
                   <v-card-actions class="bout">
                      <v-btn outlined color="green" class="tr">
                          <v-icon small left >mdi-checkbox-marked-circle</v-icon>
                          <span @click="Traiter(index)">Confirmer le traitement</span>
                      </v-btn>
                      <v-dialog v-model="dialog" persistent max-width="600px" class="dialog">
                          <template v-slot:activator="{ on }">
                      <v-btn outlined color="red" class="rf"  v-on="on">
                          <v-icon small left >mdi-cancel</v-icon>
                          <span @click="Refuser(index)">Refuser le traitement</span>
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
                                         <v-btn class=" blue-grey darken-2" @click="envoyer()"><span>Envoyer</span></v-btn>
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
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'SignalementTraiter',
  components: {
   
  },
  data (){
      return{
          dialog: false,
          motif: '',
          Signalements:[
              {
                  titre:"Prises endomager",
                  Catégorie:"Electricité",
                  Date_de_affecter:"04/04/2022",
                  Etat:"Traiter",
                  Avatar:"/prise.jpg",
                  Description:"wch responsable rak mlih",
                  lieu:"Site B, Etage 1, Salle TD 5"
              },
               {
                  titre:"Fuite de Gaz",
                  Catégorie:"Plomberie",
                  Date_de_affecter:"05/04/2022",
                  Etat:"Traiter",
                  Avatar:"/p.png",
                  Description:"rani l9it probleme",
                  lieu:"Site A, Etage 1, Salle A2"
              },
               {
                  titre:"Poubelle",
                  Catégorie:"Hygiéne",
                  Date_de_affecter:"05/04/2022",
                  Etat:"Traiter",
                  Avatar:"/p.png"

              },
          ],
      }
  
  },
  async created() {
        try {
        const res = await axios.get(`http://localhost:3000/SignalementsEnAttenteDeTraitement`);
        this.Signalements = res.data;
        } catch(e) {
        alert("Missing data from database");
        }
    },
  methods: {
        async Traiter(index)  {
            try {
                this.Signalements[index].Etat = 'En cours de traitement'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
                this.Signalements.splice(index, 1)
                this.$router.push('SigEnTraitement')
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
        async Refuser(index)  {
            try {
                this.Signalements[index].Etat = 'Refused'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
        async envoyer() {
            try {
                //this.Signalements[index].Etat = 'Suspendu'
                //await axios.put(`http://localhost:3000/Signalements/${index}`, this.Signalements)
                //this.Signalements.splice(index, 1)
                this.$router.push('SigRefusé')
            }catch(e) {
                alert("Il y a un probéme")
            }
        },
    },    
}
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
    width: 950px;
    min-width: 950px;
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
    margin-left: 25px;
    line-height: 250%;
    text-align: left;
}
.etat{
    margin-left: 150px;
    line-height: 300%;
}
.bout{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
.tr{
    margin-right: 100px;
}
.rf{
    position: relative;
    margin-top: 25px;
    margin-right: 110px;
}
.obs{
    text-transform: none;
    align-items: center;
    margin-bottom: 30px;
}
</style>