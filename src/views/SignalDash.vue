<template>
  <div class="team">
    <h1 class="subheading grey--text">Signalements</h1>
    <v-container >
      <v-layout row wrap>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="addSignal">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/add.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Ajouter un Signalement</div>
                </v-card-text>
                </router-link>
              </v-card>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="CompleterSignalement">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/complete.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading"> Signalements à Completer </div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="MesSignalements">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/mes.jpg" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Mes Signalements</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="LesSignalements">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/tous.jpg" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Tous les Signalements</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SignalementsEnregistres">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/brouillon.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading"> Brouillons </div>
                </v-card-text>
                </router-link>
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
<style>
.const {
  width: 300px;
  height: 200px;
  margin-left: 10px;
}
.text{
  font-size: 18px;
}
</style>