<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard </h1>
    <v-container >
      <v-layout row wrap>
              <v-card class="text-center ma-3 const" color="hsl(209, 100%, 100%)" to="SignalementsEnAttente">
                  <div class="CardNew">
                <v-responsive class="pt-4 responsive">
                   <v-avatar size="100" class=" lighten-2">
                     <img src="/siren.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <hr class="hr1" />
                <v-card-text class="textNew">
                  <div class="subheading grey--text">Gestion des Signalements</div>
                </v-card-text>
                </div>
              </v-card>
               <v-card class="text-center ma-3 const" color="hsl(209, 100%, 100%)" to="GestionCategories">
                  <div class="CardNew">
                <v-responsive class="pt-4 responsive">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/app.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <hr class="hr2" />
                <v-card-text class="textNew">
                  <div class="subheading grey--text">Gestion des Catégories</div>
                </v-card-text>
                </div>
              </v-card>
              <v-card class="text-center ma-3 const" color="hsl(209, 100%, 100%)" to="Comptes">
                <div class="CardNew">
                <v-responsive class="pt-4 responsive">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/user.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <hr class="hr3" />
                <v-card-text class="textNew">
                  <div class="subheading grey--text">Gestion des Comptes</div>
                </v-card-text>
                </div>
              </v-card>
              <v-card class="text-center ma-3 const" color="hsl(209, 100%, 100%)" to="LesRapportsRes">
                <div class="CardNew">
                <v-responsive class="pt-4 responsive">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/report.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <hr class="hr4" />
                <v-card-text class="textNew">
                  <div class="subheading grey--text">Gestion des Rapports</div>
                </v-card-text>
                </div>
              </v-card>
              <v-card class="text-center ma-3 const" color="hsl(209, 100%, 100%)" to="AnnonceAfficheRes">
                <div class="CardNew">
                <v-responsive class="pt-4 responsive">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/promote.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <hr class="hr5" />
                <v-card-text class="textNew">
                  <div class="subheading grey--text">Gestion des Annonces</div>
                </v-card-text>
                </div>
              </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'teamItem',
  components: {
   
  },
  data : () => ({
  
  }),
}
</script>
<style scoped>
.const {
  max-width: 350px;
  max-height: 170px;
  margin-left: 10px;
}
.responsive{
  text-align: center;
}
.textNew{
  font-size: 18px;
  margin-top: 40px;
  text-align: center;
}
.hr1 {
        margin-top: -48px;
        border: 0;
        height: 2px;
        background-image: linear-gradient(to right, rgba(67, 67, 48, 0.156), rgb(253, 0, 59), rgba(67, 67, 48, 0.156));
        z-index: 2;
      }
.hr2 {
        margin-top: -48px;
        border: 0;
        height: 2px;
        background-image: linear-gradient(to right, rgba(67, 67, 48, 0.156), rgb(6, 180, 255), rgba(67, 67, 48, 0.156));
        z-index: 2;
      }
.hr3 {
        margin-top: -48px;
        border: 0;
        height: 2px;
        background-image: linear-gradient(to right, rgba(67, 67, 48, 0.156), rgb(56, 27, 119), rgba(67, 67, 48, 0.156));
        z-index: 2;
      }
.hr4 {
        margin-top: -48px;
        border: 0;
        height: 3px;
       background-image: linear-gradient(to right, rgba(67, 67, 48, 0.156), rgb(255, 243, 6), rgba(67, 67, 48, 0.156));
        z-index: 2;
      }
.hr5 {
        margin-top: -48px;
        border: 0;
        height: 3px;
        background-image: linear-gradient(to right, rgba(67, 67, 48, 0.156), rgb(16, 122, 244), rgba(67, 67, 48, 0.156));
        z-index: 2;
      }
.hr6{
  margin-top: -48px;
        border: 0;
        height: 3px;
        background-image: linear-gradient(to right, rgba(67, 67, 48, 0.156), rgb(244, 16, 179), rgba(67, 67, 48, 0.156));
        z-index: 2;
}
</style>