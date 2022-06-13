<template>
  <div class="team">
    <h1 class="subheading grey--text">Dashboard en tant que Chef de Service et User</h1>
    <v-container >
      <v-layout  row wrap>
              <v-card class="text-center ma-3 const" color="hsl(209, 100%, 100%)" to="MesAnnoncesAnnouncer">
                <div class="CardNew">
                <v-responsive class="pt-4 responsive">
                   <v-avatar size="100" class="white lighten-2">
                     <img src="/promote.png" alt="" >
                   </v-avatar>
                </v-responsive>
                <hr class="hr5" />
                <v-card-text class="textNew">
                  <div class="subheading grey--text">Annonces</div>
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
<style>
.const {
  width: 500px;
  height: 200px;
}
.text{
  font-size: 18px;
}

</style>