<template>
  <div class="team">
    <h1 class="subheading grey--text">Rapports</h1>
    <v-container >
      <v-layout row wrap>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="LesRapportsRes">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/note_up.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Rapports En Attente de Validation</div>
                </v-card-text>
                </router-link>
        </v-card>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="RapportsValRes">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/note_yes.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Rapports Validés</div>
                </v-card-text>
                </router-link>
        </v-card>
        <v-card class="text-center ma-3 const" color="rgb(212, 212, 212)">
                <router-link to="RapportsACompRes">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/note_add.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text class="text">
                  <div class="subheading">Rapports À Compléter</div>
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