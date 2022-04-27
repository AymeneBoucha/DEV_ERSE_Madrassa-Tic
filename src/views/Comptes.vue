<template>
  <div class="accounts">
    <h1 class="subheading grey--text">Comptes</h1>
    <v-container>
      <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="(person,index) in accounts" :key="person.username">
              <v-card class="text-center ma-3 card2">
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
                    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="orange" dark v-on="on"><v-icon small left >mdi-wrench</v-icon>Modifier</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Modifier le compte</span>
        </v-card-title>
         <v-form class="px-3" ref="form">
        <v-card-text>
          <v-col cols="12" lg="8">
            <v-text-field  
                            label="Nom d'utilisateur"
                            v-model="username"
                            disabled
                            type="text"
                            prepend-icon="person"
                            color="blue"
                        ></v-text-field>
                <v-text-field 
                            label="Adresse email"
                            v-model="email"
                            disabled
                            type="email"
                            prepend-icon="email"
                            color="blue"
                        ></v-text-field>
                <v-text-field 
                            label="Numéro de téléphone"
                            prefix="+213"
                            v-model="phoneTel"
                            disabled
                            type="number"
                            prepend-icon="phone"
                            color="blue"
                            hint="9 chiffres"
                        ></v-text-field>
            <v-text-field
              v-model="birthDay"
              disabled
              label="Date de naisssance"
              persistent-hint
              prepend-icon="event"
            ></v-text-field>
            <v-select
                    v-model="e6"
                    :items="roles"
                    :menu-props="{ maxHeight: '200' }"
                    label="Modifier les roles"
                    multiple
                    persistent-hint
                    prepend-icon="mdi-wrench"
          ></v-select>
          <v-card-actions>
            <v-btn outlined color="primary" >
                        <v-icon small left >mdi-checkbox-marked-circle</v-icon>
                        <span >Activer le compte</span>
                    </v-btn>
                    <v-btn outlined color="red">
                        <v-icon small left > mdi-cancel</v-icon>
                        <span >Desactiver le compte</span>
                    </v-btn>
          </v-card-actions>
        </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="green" text outlined @click="UpdateUser()">Save</v-btn>
        </v-card-actions>
         </v-form>
      </v-card>
    </v-dialog>
                    <v-btn outlined color="red" class="text" >
                        <v-icon small left > mdi-delete</v-icon>
                        <span @click="DeleteUser(index)">Supprimer</span>
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
import axios from "axios"


export default {
  name: 'ComptesItem',
  components: {
  },
  data : () => {
    return {
      dialog: false,
      username:'Aymene',
      email:'a.boucha@esi-sba.dz',
      phoneTel:'541671350',
      due:null,
      date: new Date().toISOString().substr(0, 10),
      birthDay: '11/11/2001',
      menu1: false,
      e6: '',
        accounts: {
          username: '',
          email: '',
          avatar:'/img1.png'
        },
        NewAccount: '',
        roles: [
          "User", "Admin", "Responsable", "Employer"
        ]
     }
    },
  methods: {
    DeleteUser (index) {
      this.accounts.splice(index, 1)
    },
     async UpdateUser () {
        try{
         await axios.put("http://localhost:3000/accounts",
          this.accounts)
          alert("Account has been modified")
        }catch (e) {
          alert("There is a problem")
        }
      }
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/accounts`);
      this.accounts = res.data;
    } catch(e) {
      alert("There are some errors");
    }
  },
}
</script>
<style scoped>
.text {
  margin-left: 5px;
  font-size: 13px;
}
.card2 {
  min-width: 270px;
}
</style>