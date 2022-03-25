<template>
<v-app>
       <div class="topnav"> <h1>MADRASA-TIC</h1></div>
        <img src="@/assets/connexion.png"/>
        <div class="infos">
          <v-row >
             <v-col>
                 <v-card-text  >
                   <h1 class="authentification">Authentification</h1>
                 <v-form>
                  <v-text-field  class="text-center mt-10"
                    label="Adresse email"
                    v-model="object.email"
                    required
                   :rules="[(v) => !!v || 'veuillez saisir votre adresse email']"
                   type="email"
                   prepend-icon="email"
                   color="blue"
                  ></v-text-field>
                  <v-text-field class="text-center mt-1"
                   label="Mot de passe"
                   v-model="object.password"
                   type="password"
                   required
                   :rules="[(v) => !!v || 'veuillez saisir votre mot de passe']"
                   prepend-icon="lock"
                  ></v-text-field>
                  <p>{{ email }}{{ password }}</p>
                 </v-form>
                 <router-link to="/mdp_oublie" class=" mdp">Mot de passe oublié ?</router-link>
                <v-card-actions >
                    <v-btn  class="connexion" color="#0E84D9" @click="login()">
                      Se Connecter
                    </v-btn>
               </v-card-actions>
                 <div class="text-center mt-15">
                 <p class="compte white--text">Vous n'avez pas de compte?</p> 
                   <h3 class="inscription"><a href="/accueil">Inscrivez-vous!</a></h3>
                </div>
               </v-card-text>
             </v-col>
          </v-row>
        </div>
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
            email: "",
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
          router.push({ name: 'connexion' });
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
  top: 100px;
  right:3.5cm;
  width: 400px;
  height: 500px;
}
.authentification{
  color: white;
  text-align: center;
  position: relative;
  top: 10px;
  font-size: 35px;
}
.topnav {
  background-color: #C5CFD6;
  color: #0084FE;
  text-align: center;
  width: 1400px;
  height: 60px;
  float: left;
}
.connexion{
  background-color: #0E84D9;
  text-align: center;
  width: 60%;
  left:2cm;
  padding: 12px 20px;
  position:relative;
  color:white;
  top:50px;
  border: 1px solid #238DEF;
  border-radius: 20px;
  font-size: 30px;
}
.mdp{color:#0E84D9;font-size: 16px;}
.compte{
  font-size: 17px;
  position:relative;
  top:40px;
}
.inscription{
   position:relative;
  top:30px;
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

</style>