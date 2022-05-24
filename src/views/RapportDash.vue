<template>
  <div class="team">
    <h1 class="subheading grey--text">Rapports</h1>
    <v-container >
      <v-layout row wrap>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="RapportsEnvoyésChef">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/fileUp.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Rapports Envoyés</div>
                </v-card-text>
                </router-link>
        </v-card>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="RapportsValidésChef">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/fileYes.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Rapports Validés</div>
                </v-card-text>
                </router-link>
        </v-card>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="RapportsAcompleterChef">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/filePlus.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Rapports À compléter</div>
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
  name: 'RapportDash',
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