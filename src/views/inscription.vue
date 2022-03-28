<template>
    <v-app>
     <div class="topnav"> <h1>MADRASA-TIC</h1></div>
      <img src="@/assets/connexion.png"/>
        <div class="infos" fluid>
          <v-row >
             <v-col>
                 <v-card-text  >
                   <h1 class="forgot">Créer un compte</h1>
                   <form @submit.prevent="handleSubmit">
                       <v-text-field  class="text-center mt-10"
                            label="Nom d'utilisateur"
                            v-model="username"
                            :rules="[rules.required]"
                            type="text"
                            prepend-icon="person"
                            color="blue"
                        ></v-text-field>
                        <v-text-field  class="text-center mt-1"
                            label="Adresse email"
                            v-model="email"
                            type="email"
                            prepend-icon="email"
                            color="blue"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field  class="text-center mt-1"
                            label="Numéro de téléphone"
                            prefix="+213"
                            v-model="phoneTel"
                            type="number"
                            prepend-icon="phone"
                            color="blue"
                            :rules="[rules.required,rules.min1]"
                            counter
                            hint="9 chiffres"
                        ></v-text-field>
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="birthDay"
                                        label="date de naissance"
                                        :rules="[rules.required]"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="birthDay"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="save"
                                ></v-date-picker>
                            </v-menu>
                        <v-text-field
                            label="Mot de passe"
                            v-model="password"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            hint="au moins 6 charactère"
                            counter
                            @click:append="show1 = !show1"
                            prepend-icon="lock"
                        ></v-text-field>
                        <v-text-field
                            label="Confirmer le mot de passe"
                            v-model="confirmpassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            hint="au moins 6 charactère"
                            counter
                            @click:append="show1 = !show1"
                            prepend-icon="lock"
                        ></v-text-field>
                 </form> 
                 </v-card-text>
                </v-col>
          </v-row>
          <v-card-actions>
          <v-btn  class=" text-center envoie" color="#0E84D9" @click="handleSubmit()"> S'inscrire </v-btn>
          </v-card-actions>
           <div class="text-center mt-4">
                 <p class="compte white--text">Vous avez déja un compte?</p> 

                   <h3 class="inscription "><a href="/">s'autentifier!</a></h3>
                </div>
         </div>
   </v-app>
</template>

<script>
import axios from "axios"
 export default {
    data () {
      return {
         activePicker: null,
         menu: false,
        show1: false,
        username:'',
        email:'',
        phoneTel: '',
        birthDay:'',
        password: '',
        confirmpassword:'',
        rules: {
          required: value => !!value || 'Required.',
          min1: v =>  v.length == 9 || '9 chiffres',
          min: v => v.length >= 6 || 'Min 6 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: { // hadi pour le calendrier de la date
      save (birthDay) {
        this.$refs.menu.save(birthDay)
      },

      async handleSubmit (){ //c'est tout ce que dont tu as besoin

            const data = {
                username: this.username,
                email: this.email,
                phoneTel: this.phoneTel,
                birthDay: this.birthDay,
                password: this.password,
                confirmpassword: this.confirmpassword
            };

            axios.post('http://localhost:8080/api/auth/signup',data)
            .then(
                res => {
                    console.log(res)
                    alert('Vous vous etes inscrit , Veuillez verfiez votre email pour pouvoir vous authentifier ');
                    this.$router.push('/');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
        }
    },
  }
</script>





<style scoped>
.infos{
  border-radius: 20px;
  background-color: #C5CFD6;
  margin-bottom: 30px;
  position: absolute;
  top: 100px;
  right:3.5cm;
  width: 400px;
  height: auto;
}
.forgot{
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
  width: 100%;
  height: 60px;
  float: left;
}
.envoie{
  background-color: #0E84D9;
  text-align: center;
  left:3.6cm;
  position:relative;
  color:white;
  top:0px;
  border: 1px solid #238DEF;
  border-radius: 5px;
}
.inscription{
   position:relative;
  font-size: 18px;
  top:-0.3cm;
}
.compte{
  font-size: 17px;
  position:relative;
  top:0.2cm;
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