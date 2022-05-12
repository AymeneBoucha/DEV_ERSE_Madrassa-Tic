<template>
   <v-app>
     <div class="topnav elevation-12"> <h1>MADRASSA-TIC</h1></div>
      <img src="@/assets/mot_de_passe.png"/>
        <div class="elevation-12 infos">
          <v-row >
             <v-col>
                 <v-card-text  >
                   <h1 class="text-center display-1 blue-grey--text text--darken-3">Réinitialiser Mot de passe</h1>
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
                 <v-btn  class="envoie" rounded color="#263238" dark @click="handleSubmit()">
                       Envoyer
                    </v-btn>
          </v-card-actions>
        </div>
   </v-app>
</template>


<script>
 import axios from "axios"
 export default {
     name: 'Reset_password',
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
          alert(response.data.message);
            if (response.status==201) {this.$router.push('/');}
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
  /* background-color: rgb(190, 193, 209); */
  padding: 5px;
  position: absolute;
  top: 20%;
  left:52%;
  width: 30%;
  height: 52%;
}
.small {text-align: center;}
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
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, 0);
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
  left:18%;
  top: 20%;
  padding: 12px 20px;
}

</style>