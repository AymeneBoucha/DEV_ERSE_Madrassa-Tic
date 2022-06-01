<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard en tant que Responsable et User</h1>
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
  width: 300px;
  height: 200px;
  margin-left: 10px;
}
.text{
  font-size: 18px;
}
</style>