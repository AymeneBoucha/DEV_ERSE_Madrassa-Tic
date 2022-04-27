<template>
  <v-app>
    <div class="Modifier_Profile">
    <h1 class="subheading grey--text">Modifier votre profile</h1>
    <v-container >
      <v-card class="text-center ma-3 card" height="auto" padding="50px" fluid>
          <div>
                <v-responsive class="pt-4 png">
                   <v-avatar size="250" class="red lighten-2">
                     <img src="img1.png" alt="">
                   </v-avatar>
                </v-responsive>
                <v-card-text>
                        <v-btn outlined color="orange" class="picButton">
                        <v-icon small left >mdi-wrench</v-icon>
                        <span>Modifier</span>
                        </v-btn>
                </v-card-text>
          </div>
          <div>
              <v-card-text class="fields">
                  <v-text-field class="text-center mt-0" 
                    label="Email"
                    v-model="email"
                    disabled
                    type="email"
                    prepend-icon="email"
                    color="blue"
                    counter
                  ></v-text-field>
                  <v-text-field class="text-center mt-0" 
                    label="Nom d'utilisateur"
                    v-model="username"
                    type="text"
                    prepend-icon="badge"
                    color="blue"
                    counter=20
                  ></v-text-field>
                  <v-text-field class="text-center mt-0"
                    v-model="phoneTel"
                    label="Numéro de téléphone"
                    prefix="+213"
                    type="number"
                    prepend-icon="phone"
                    color="blue"
                    counter=9
                  ></v-text-field>
                  <v-text-field class="text-center mt-0"
                    v-model="birthDay"
                    label="date de naissance"
                    type="date"
                    prepend-icon="event"
                  ></v-text-field>
                  <v-card-actions>
                        <v-btn width="100%" outlined color="orange" class="button" @click="step=-step">
                        <v-icon small left >mdi-wrench</v-icon>
                        <span>Modifier votre mot de passe</span>
                        </v-btn>
                  </v-card-actions>
              </v-card-text>

              <v-window class="drop" v-model="step">
              <v-window-item :value="-1">
                        <v-text-field
                            label="Mot de passe courant"
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            prepend-icon="lock"
                            counter=20
                        ></v-text-field>
                        <v-text-field
                            label="Nouveau mot de passe"
                            v-model="new_password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            prepend-icon="lock"
                            counter=20
                        ></v-text-field>
                        <v-text-field
                            label="Confirmer le nouveau mot de passe"
                            v-model="new_password_again"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            prepend-icon="lock"
                            counter=20
                        ></v-text-field>
              </v-window-item>
              <v-window-item :value="1"></v-window-item>
            </v-window>
          </div>

          <div>
                <v-btn outlined color="red" class="confirm" @click="modifier()">
                <v-icon small left >mdi-wrench</v-icon>
                <span>Confirmer les modifications</span>
                </v-btn>
          </div>
       </v-card>
    </v-container>
    </div>
  </v-app>
</template>

<script>

import axios from "axios";
import router from '../router/index';

export default {
  name: 'ProfileItem',
  components: {
   
  },
  data : () => {
      return {
      step: 1,
        show1: false,
      object: {
        username: "",
          usernameRules: [ 
              v => ( v && v.length >= 3 ) || "Le nom doit être plus de 3 caracteres",
              v => ( v && v.length <= 20 ) || "Le nom doit être moins de 20 caracteres",
          ],
        phoneTel: "",
          phoneTelRules: [ 
              v => ( v && v.length == 9 ) || "Le numéro doit être sur 9 caracteres",
          ],
        birthDay: "",
        currentpassword: "",
        newpassword: "",
          newpasswordRules: [ 
              v => ( v && v.length >= 6 ) || "Le mot de passe doit être plus de 6 caracteres",
              v => ( v && v.length <= 20 ) || "Le mot de passe doit être moins de 20 caracteres",
          ],
        confirmpassword: "",
          confirmpasswordRules: [ 
              v => ( v && v.length >= 6 ) || "Le mot de passe doit être plus de 6 caracteres",
              v => ( v && v.length <= 20 ) || "Le mot de passe doit être moins de 20 caracteres",
          ],
      },
    };
  },
  methods: {
    async modifier() {
    axios.put('http://localhost:8080/api/auth/updateUser',this.object)
            .then(
                res => {
                    console.log(res)
                    alert('Vous avez modifier votre profil');
                    router.push('/Profile');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
    },
  },
  mounted: async function() {
    try {
      const res = await axios.get(`http://localhost:3000/accounts`)
      this.object.username = res.data[0].username
      this.object.email = res.data[0].email
    }catch{
      alert('Missing data from database')
    }
  },
  
}
</script>

<style scoped>
.container {
  align-items: center;
  text-align: center;
}

.card {
  display: grid;
  grid-template-columns: repeat(auto-fill, 44%);
  height: 500px;
  align-items: center;
  text-align: center;
  
}
.fields {
  margin: 0px;
  width: 100%;
}
.png {
  margin-left: 0px;
}
.picButton{
    margin-top: 3%;
}
.button{
  margin-top: 3%;
  right: 18%;
}
.confirm {
  left: 60%;
  width: 90%;
  margin-bottom: 6%;
  margin-top: 4%;
}
@media screen and (max-width: 1200px){
    .fields{
      width: 300px;
      margin: 50px;
    }
    .card{
      flex-direction: column;
      height: 800px;

    }
  }
</style>
