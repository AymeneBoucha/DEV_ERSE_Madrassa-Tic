<template>
  <div class="team">
    <h1 class="subheading grey--text">Gestion de Signalements</h1>
    <v-container >
      <v-layout row wrap>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SigEnAttent">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/check.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Signalements en Attente de Traitement</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SigEnTraitement">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/process.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Signalements en Cours de Traitement</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SigTraité">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/valid.jpg" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Signalements Traités</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SigRefusé">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white">
                     <img src="/Refused.png" alt=""  >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Signalements Refusés</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SigSuspendu">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white">
                     <img src="/alert.png" alt=""  >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Signalements Suspendus</div>
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