<template>
  <div class="team">
    <h1 class="subheading grey--text">Dashboard en tant que Chef de Service et User</h1>
    <v-container >
      <v-layout  row wrap>
              <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="TraitementSignalements">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/treatement.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div >Traitement des Signalements</div>
                </v-card-text>
                </router-link>
              </v-card>
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
  width: 500px;
  height: 200px;
}
.text{
  font-size: 18px;
}

</style>