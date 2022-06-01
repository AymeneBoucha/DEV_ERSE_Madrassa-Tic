<template>
   <v-app>
     
      <div class="topnav elevation-12"> <h1>MADRASA-TIC</h1></div>
      <img src="@/assets/mot_de_passe.png"/>
        <div class="infos elevation-12">
          <v-row >
             <v-col>
                 <v-card-text>
                   <h1 class="text-center display-1 blue-grey--text text--darken-3">Mot de passe oublié</h1>
                 <form @submit.prevent="handleSubmit">
                  <v-text-field  class="text-center mt-10"
                    label="Adresse email"
                    v-model="email"
                    required
                    :rules="[(v) => !!v || 'veuillez saisir votre adresse email']"
                   type="email"
                   prepend-icon="email"
                   color="blue"
                  ></v-text-field>
                 </form> 
                  <small>Un message pour réinitialiser votre mot de passe vous sera envoyé à l'adresse email indiquée </small>
                 </v-card-text>
                </v-col>
          </v-row>
          <v-card-actions>
                 <v-btn  class="envoie" rounded color="#263238" dark @click="handleSubmit()">
                       Envoyer
                    </v-btn>
              <v-btn  href="/" class="annuler" rounded color="#263238" dark> Annuler </v-btn>
          </v-card-actions>
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
          try {
            const response= await axios.put('http://localhost:8080/api/auth/forgotPassword', {
                email: this.email
            } );

            console.log (response);
            alert('email has been sent, check your email');
          }catch(e) {
          alert('Adresse incorrect');
          //router.push({ name: 'connexion' });
      }
        }
     }
 }

</script>

<style scoped>
.infos{
  border-radius: 20px;
  /* background-color: rgb(190, 193, 209); */
  padding: 5px;
  position: absolute;
  top: 25%;
  left:52%;
  width: 30%;
  height: 330px;
}
.small {
  text-align: center;
}
.topnav {
  background-color: #263238;
  color: white;
  text-align: center;
  width: 100%;
  height: 50px;
  float: left;
}
.envoie{
  background-color: #0E84D9;
  text-align: center;
  right: 23%;
  position:absolute;
  color:white;
  top:80%;
  border: 1px solid #238DEF;
  border-radius: 5px;
}
.annuler{
  background-color: #0E84D9;
  text-align: center;
  position:absolute;
  left: 18%;
  color:white;
  top:80%;
  border: 1px solid #238DEF;
  border-radius: 5px;
}
img {
  height:300px;
  width: 300px;
  position: relative;
  left:17%;
  top: 22%;
  padding: 12px 20px;
}

</style>