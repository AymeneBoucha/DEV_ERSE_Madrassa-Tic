<template>
  <v-app>
    <div class="topnav"><h1>MADRASA-TIC</h1></div>
        <v-container class="infos" fluid>
          <v-row>
            <v-card-text class="text-center">
              <h3 class="modifier">Modifier votre compte</h3>
            </v-card-text>
          </v-row>
          <v-row>
            <v-col>
              <v-form>
                <p class="toModif">Nom d'utilisateur :</p>
                <p class="toModif">Numéro de telephone :</p>
                <p class="toModif">Date de naissance :</p>
                <p class="toModif">Mot de passe :</p>
              </v-form>
            </v-col>
            <v-col>
              <v-card-text>
                <v-form>
                  <v-text-field class="text-center mt-0" 
                    label="Nom d'utilisateur"
                    v-model="object.username"
                    type="text"
                    prepend-icon="badge"
                    color="blue"
                    counter=20
                  ></v-text-field>
                  <v-text-field class="text-center mt-0"
                    v-model="object.phoneTel"
                    label="Numéro de téléphone"
                    prefix="+213"
                    type="number"
                    prepend-icon="phone"
                    color="blue"
                    counter=9
                  ></v-text-field>
                  <v-text-field class="text-center mt-0"
                    v-model="object.birthDay"
                    label="date de naissance"
                    type="date"
                    prepend-icon="event"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn class="modifier_mdp" @click="step=-step"> modifier </v-btn>
                  </v-card-actions>
                  <p>{{ email }}{{ password }}</p>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row >
            <v-window class="drop" v-model="step">
              <v-window-item :value="-1">
                <v-container>
                  <v-row>
                    <v-col>
                      <p class="toModifP">Mot de passe courant :</p>
                      <p class="toModifP">Nouveau mot de passe :</p>
                      <p class="toModifP">Confirmer le mot de passe :</p>
                    </v-col>
                    <v-col>
                        <v-text-field class="text-center"
                            v-model="object.currentpassword"
                            type="old_password"
                            counter=20
                          ></v-text-field>
                          <v-text-field class="text-center"
                            v-model="object.newpassword"
                            type="text"
                            counter=20
                          ></v-text-field>
                          <v-text-field class="text-center"
                            v-model="object.confirmpassword"
                            type="text"
                            counter=20
                          ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-window-item>
              <v-window-item :value="1"></v-window-item>
            </v-window>
          </v-row>
          <v-row>
            <v-card-actions>
              <v-btn class="Confirmer" color="#0E84D9" @click="modifier()">
                Confirmer
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-container>
        <div class="sidenav">
          <div class="pagePrincipale"><h2>Page prinicpale</h2></div>
          <div class="alerte"><h2>Signaler alerte</h2></div>
          <div class="annonce"><h2>Ecrire annonce</h2></div>
          <div class="propos"><h2>A propos de site</h2></div>
          <div class="profile"><h2>Houssam</h2></div>
        </div>
  </v-app>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
import router from "../router/index";
//import Footer from '../components/Footer.vue'
//import Navbar from '../components/Navbar.vue'
export default {
  data() {   
    return {
      step: 1,
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
                    router.push('/user');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
    },
  },
};
</script>

<style scoped>
.drop {
  width: 80%;
  left: 60px;
  bottom: 30px;
}
.infos {
  border-radius: 20px;
  background-color: #c5cfd6;
  padding: 5px;
  position: absolute;
  top: 130px;
  right: 6cm;
  width: 700px;
  height: auto;
}
.modifier_mdp {
  color: white;
  background-color: #0e84d9;
  text-align: center;
  width: 100%;
  top: 0px;
  position: relative;
  border: 20px solid #238def;
  border-radius: 20px;
  font-size: 18px;
}
.modifier {
  color: white;
  text-align: center;
  position: relative;
  top: 15px;
  font-size: 35px;
}
.toModif {
  color: rgb(100, 100, 100);
  text-align: left;
  position: relative;
  padding-top: 20px;
  top: 10px;
  left: 20px;
  font-size: 20px;
}
.toModifP {
  color: rgb(100, 100, 100);
  text-align: left;
  position: relative;
  padding-top: 30px;
  top: 0px;
  left: 0px;
  font-size: 16px;
}
.toModifPC {
  align-content: left;
  position: relative;
  padding-top: 20px;
  top: 0px;
  left: 0px;
  font-size: 16px;
}
.topnav {
  background-color: #c5cfd6;
  color: #0084fe;
  text-align: center;
  width: 100%;
  height: 60px;
  padding: 10px;
  float: left;
  z-index: 1;
}
.Confirmer {
  color: white;
  background-color: #0e84d9;
  text-align: center;
  width: 100%;
  left: 6.5cm;
  margin-bottom: 30px;
  position: relative;
  bottom: 10px;
  border: 30px solid #238def;
  border-radius: 30px;
  font-size: 22px;
}
.mdp {
  color: #0e84d9;
  font-size: 16px;
  position: relative;
  left: 1cm;
  top: 250px;
}
.compte {
  font-size: 17px;
  position: relative;
  left: 2.55cm;
  top: 345px;
}
.inscription {
  position: relative;
  top: 355px;
  left: 3.5cm;
  font-size: 18px;
}
img {
  height: 450px;
  width: 500px;
  position: relative;
  left: 4cm;
  top: 2cm;
  padding: 12px 20px;
}
.sidenav {
  background-color: #8d99ae;
  color: white;
  position: absolute;
  text-align: center;
  width: 300px;
  height: 100%;
}
.pagePrincipale {
  color: white;
  position: relative;
  top: 90px;
  text-align: left;
  left: 20%;
}
.alerte {
  color: white;
  position: relative;
  top: 120px;
  text-align: left;
  left: 20%;
}
.annonce {
  color: white;
  position: relative;
  top: 150px;
  text-align: left;
  left: 20%;
}
.propos {
  color: white;
  position: relative;
  top: 180px;
  text-align: left;
  left: 20%;
}
.profile {
  background-color: #2b2d42;
  text-align: right;
  width: 300px;
  padding: 20px 45px;
  position: relative;
  color: white;
  font-size: 20px;
  top: 500px;
}
.flex-table {
  display: grid;
  grid-template-rows: repeat(auto-align, 30%);
  border-radius: 20px;
  background-color: #c5cfd6;
  padding: 5px;
  position: absolute;
  top: 130px;
  right: 6cm;
  width: 700px;
  height: 600px;
}
</style>
