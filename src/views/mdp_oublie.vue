<template>
   <v-app>
     <div class="topnav"> <h1>MADRASA-TIC</h1></div>
      <img src="@/assets/mot_de_passe.png"/>
        <div class="infos">
          <v-row >
             <v-col>
                 <v-card-text  >
                   <h1 class="forgot">Mot de passe oublié</h1>
                 <form @submit.prevent="handleSubmit">
                  <v-text-field  class="text-center mt-10"
                    label="Adresse email"
                    v-model="email"
                    required
                   type="email"
                   prepend-icon="email"
                   color="blue"
                  ></v-text-field>
                 </form> 
                  <small>un message pour réinitialiser votre mot de passe vous sera envoyé à l'adresse email indiquée </small>
                 </v-card-text>
                </v-col>
          </v-row>
          <v-btn  class="envoie" color="#0E84D9"> Envoyer</v-btn>
          <v-btn  href="/" class="annuler" color="#0E84D9"> Annuler </v-btn>
        </div>
   </v-app>
</template>


<script>
 import axios from "axios"

 export default {
     name: 'mdp_oublie',
     data() {
         return{
         email: ''
     }
     },
     methods : {
        async handleSubmit (){
            const response= await axios.post('mdp_oublie', {
                email: this.email
            } );

            console.log (response);
        }
     }
 }

</script>

<style scoped>
.infos{
  border-radius: 20px;
  background-color: #C5CFD6;
  padding: 5px;
  position: absolute;
  top: 4cm;
  left:18cm;
  width: 400px;
  height: 300px;
}
.small {text-align: center;}
.forgot{
  color: white;
  text-align: center;
  position: relative;
  top: 10px;
  font-size: 30px;
}
.topnav {
  background-color: #C5CFD6;
  color: #0084FE;
  text-align: center;
  width: 1400px;
  height: 60px;
  float: left;
}
.envoie{
  background-color: #0E84D9;
  text-align: center;
  left:6cm;
  position:relative;
  color:white;
  top:30px;
  border: 1px solid #238DEF;
  border-radius: 5px;
}
.annuler{
  background-color: #0E84D9;
  text-align: center;
  position:relative;
  right: 1.5cm;
  color:white;
  top:30px;
  border: 1px solid #238DEF;
  border-radius: 5px;
}
img {
  height:300px;
  width: 300px;
  position: relative;
  left:6.5cm;
  top: 2.5cm;
  padding: 12px 20px;
}

</style>