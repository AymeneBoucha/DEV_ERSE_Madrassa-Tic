<template>
   <v-app>
     <div class="topnav"> <h1>MADRASA-TIC</h1></div>
      <img src="@/assets/mot_de_passe.png"/>
        <div class="infos">
          <v-row >
             <v-col>
                 <v-card-text  >
                   <h1 class="forgot">Réinitialiser Mot de passe</h1>
                 <form @submit.prevent="handleSubmit">
                  <v-text-field  class="text-center mt-10"
                    label="Nouveau Mot de passe"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            hint="au moins 6 charactère"
                            counter
                            @click:append="show1 = !show1"
                    v-model="newpassword" 
                    required
                   prepend-icon="lock"
                   color="blue"
                  ></v-text-field>
                  <v-text-field  class="text-center mt-1"
                    label="Confirmer Mot de passe"
                    v-model="confirmpassword"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            hint="au moins 6 charactère"
                            counter
                            @click:append="show1 = !show1"
     
                    required
                   prepend-icon="lock"
                   color="blue"
                  ></v-text-field>
                 </form> 
                </v-card-text>
                </v-col>
          </v-row>
          <v-card-actions>
                 <v-btn  class="envoie" color="#0E84D9" @click="handleSubmit()">
                       Envoyer
                    </v-btn>
          </v-card-actions>
        </div>
   </v-app>
</template>


<script>
 import axios from "axios"
 export default {
     name: 'reset',
     data() {
         return{
               show1: false,
         newpassword: '',
         confirmpassword: '',
         rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
        },
     }
     },
     methods : {
        async handleSubmit (){
          try {
            const response= await axios.put(`http://localhost:8080/api/auth/resetPassword?token=${this.$route.params.token}`, {
                newpassword: this.newpassword,
                confirmpassword:this.confirmpassword,
                token: this.$route.params.token
            } );
            console.log (response);
            alert('password is changed !');
            this.$router.push('/');
        }catch(e) {
          alert('Veuillez remplir les champs correctement');
          //router.push({ name: 'connexion' });
        }
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
  height: 350px;
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
  width: 100%;
  height: 60px;
  float: left;
}
.envoie{
  background-color: #0E84D9;
  text-align: center;
  left:3.7cm;
  position:relative;
  color:white;
  top:40px;
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
  top: 3.5cm;
  padding: 12px 20px;
}

</style>