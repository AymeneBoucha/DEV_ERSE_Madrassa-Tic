<template>
<v-app>
       <div class="topnav"> <h1>MADRASA-TIC</h1></div>
        <!-- <img src="@/assets/Confirmer.png"/> -->
        <table class="infos" width="100%">
          <v-row>
            <v-card-text class="text-center">
            <h3 class="modifier">Modifier votre compte</h3>
            </v-card-text>
          </v-row>
          <v-row>
              <v-col width="40%">      
                 <v-form>
                  <p class="toModif">Nom d'utilisateur :</p>
                  <p class="toModif">Email :</p>
                  <p class="toModif">Numéro de telephone :</p>
                  <p class="toModif">Date de naissance :</p>
                  <p class="toModif">Mot de passe :</p>
                  <p class="toModif">Photo de profile :</p>
                 </v-form>
             </v-col>
             <v-col width="30%">
                 <v-card-text>         
                 <v-form>
                  <v-text-field  class="text-center mt-0"
                   label=""
                   v-model="object.name"
                   type="name"
                   prepend-icon="badge"
                   color="blue"
                  ></v-text-field>
                  <v-text-field  class="text-center mt-0"
                    label=""
                    suffix="@esi-sba.dz"
                    v-model="object.email"
                    required
                   :rules="[(v) => !!v || 'veuillez saisir votre adresse email']"
                   type="email"
                   prepend-icon="email"
                   color="blue"
                  ></v-text-field>
                  <v-text-field  class="text-center mt-0"
                    label=""
                    prefix="+213"
                   type="phone"
                   prepend-icon="phone"
                   color="blue"
                  ></v-text-field>
                  <v-text-field class="text-center mt-0"
                   label=""
                   type="date"
                   prepend-icon="event"
                  ></v-text-field>
                  <v-text-field class="text-center mt-0"
                   label=""
                   v-model="object.password"
                   type="password"
                   required
                   :rules="[(v) => !!v || 'veuillez saisir votre mot de passe']"
                   prepend-icon="lock"
                  ></v-text-field>
                  <v-file-input class="text-center mt-0"
                   label=""
                   apend-icon="file download"
                  ></v-file-input>
                  <p>{{ email }}{{ password }}</p>
                 </v-form>
                <!-- <router-link to="/mdp_oublie" class=" mdp">Mot de passe oublié ?</router-link> -->
               </v-card-text>
             </v-col>
          </v-row>
          <v-row>
              <v-card-actions >
                    <v-btn  class="Confirmer" color="#0E84D9" @click="login()">
                      Confirmer
                    </v-btn>
              </v-card-actions>
          </v-row>
        </table>
 
        <div class="sidenav"></div>
        <div class="pagePrincipale"> <h2>Page principale</h2></div>
        <div class="alerte"> <h2>Signaler alerte</h2></div>
        <div class="annonce"> <h2>Ecrire annonce</h2></div>
        <div class="propos"> <h2>A propos de site</h2></div>
        <div class="profile"> <h2>Houssam</h2></div>
  </v-app>
</template>

<script>
// @ is an alias to /src

import axios from "axios"
import router from '../router/index'
//import Footer from '../components/Footer.vue'
//import Navbar from '../components/Navbar.vue'
export default {
  data(){
    return {
        object : {
            name: "example name",
            email: "example_email",
            password: "",
        }
    };
  },
    methods: {
    async login() {
      try {
          const res = await axios.post('http://localhost:3000/user/login',this.object)
          console.log(res)
          alert('Logged in !');
          localStorage.setItem('token',res.data.token)
          router.push({ name: 'acceuil' });
      } catch(e) {
          alert('Adresse ou mot de passe incorrect');
          router.push({ name: 'Confirmer' });
      }
    }, 
  },
};
</script>
<style scoped>
.infos{
  border-radius: 20px;
  background-color: #C5CFD6;
  padding: 5px;
  position: absolute;
  top: 130px;
  right:6cm;
  width: 700px;
  height: 600px;
}
.modifier{
  color: white;
  text-align: center;
  position: relative;
  top: 15px;
  font-size: 35px;
}
.toModif{
  color: rgb(100, 100, 100);
  text-align: left;
  position: relative;
  padding-top: 20px;
  top: 10px;
  left: 20px;
  font-size: 20px;
}
.topnav {
  background-color: #C5CFD6;
  color: #0084FE;
  text-align: center;
  width: 1450px;
  height: 60px;
  padding: 10px;
  float: left;
  z-index: 1;
}
.Confirmer{
  color:white;
  background-color: #0E84D9;
  text-align: center;
  width: 100%;
  left:6.5cm;
  padding: 0px;
  position:relative;
  top:-20px;
  border: 30px solid #238DEF;
  border-radius: 30px;
  font-size: 30px;
}
.mdp{
  color:#0E84D9;
  font-size: 16px;
  position:relative;
  left: 1cm;
  top:250px;
}
.compte{
  font-size: 17px;
  position:relative;
  left: 2.55cm;
  top:345px;
}
.inscription{
   position:relative;
  top:355px;
  left: 3.5cm;
  font-size: 18px;
}
img {
  height:450px;
  width: 500px;
  position: relative;
  left:4cm;
  top: 2cm;
  padding: 12px 20px;
}
.sidenav {
  background-color: #8D99AE;
  color: white;
  position: absolute;
  text-align: center;
  width: 300px;
  height: 1000px;
}
.pagePrincipale{
  color: white;
  position: relative;
  top: 30px;
  left: 2.5cm;
}
.alerte{
  color: white;
  position: relative;
  top: 60px;
  left: 2.5cm;
}
.annonce{
  color: white;
  position: relative;
  top: 90px;
  left: 2.5cm;
}
.propos{
  color: white;
  position: relative;
  top: 120px;
  left: 2.5cm;
}
.profile{
  background-color: #2B2D42;
  text-align: right;
  width: 300px;
  padding: 20px 45px;
  position:relative;
  color:white;
  top:510px;
  font-size: 20px;
}
</style>