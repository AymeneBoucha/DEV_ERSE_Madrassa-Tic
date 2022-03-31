<template>
  <div class="accounts">
    <h1 class="subheading grey--text">Comptes</h1>
    <Popup />
    <v-container >
      <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="(person,index) in accounts" :key="person.username">
              <v-card class="text-center ma-3">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img :src="person.avatar" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subheading">{{person.username}}</div>
                  <div class="grey--text">{{person.email}}</div>
                </v-card-text>
                <v-card-actions >
                    <v-btn outlined color="orange">
                        <v-icon small left >mdi-wrench</v-icon>
                        <span class="text">Modifier</span>
                    </v-btn>
                    <v-btn outlined color="red">
                        <v-icon small left > mdi-delete</v-icon>
                        <span class="text" @click="DeleteUser(index)">Supprimer</span>
                    </v-btn>
                </v-card-actions>
              </v-card>
         </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Popup from "../components/Popup"
import axios from "axios";

export default {
  name: 'Comptes',
  components: {
    Popup
  },
  data : () => ({
    accounts: [

    ]
  }),
  methods: {
    DeleteUser (index) {
      this.accounts.splice(index, 1)
    }
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/accounts`);
      this.accounts = res.data;
    } catch(e) {
      alert("There are some errors");
    }
  }
}
</script>
<style scoped>
.text {
  font-size: 13px;
}
</style>