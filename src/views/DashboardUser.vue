<template>
  <div class="team">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container >
      <v-layout row wrap>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="SignalDash">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/sig.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Signalements</div>
                </v-card-text>
                </router-link>
              </v-card>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="Annonces">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/dec.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Annonces</div>
                </v-card-text>
                </router-link>
              </v-card>
              <!-- <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="Modifier_Profile">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img src="/fig1.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Modifier le compte</div>
                </v-card-text>
                </router-link>
              </v-card> -->
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