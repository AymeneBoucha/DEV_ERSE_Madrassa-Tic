<template>
<v-app elevation="104">
  <v-app-bar app color="#C5CFD6"> 
    <v-toolbar color="#C5CFD6">
  <v-spacer />
  <div id="title">
  <v-toolbar-title>
    MADRASA-TIC
  </v-toolbar-title>
  </div>
  <v-spacer />
</v-toolbar>
  </v-app-bar>
  <img src="@/assets/singup.png"/>
  <v-container >
    <v-row  >
      <v-col >
        <v-card  class="elevation-6 mt-10" color="#C5CFD6" >
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col >
                   <v-card-text>
                    <h1 class="text-center"  >
                      Créer un compte</h1>
                  </v-card-text>
                </v-col>
              </v-row>
             
              <v-row align="center" justify="center">
                <v-col cols="10" sm="11">
                  <v-form @submit.prevent="submitForm">
                        <v-text-field
                            class="form-control"
                            v-model.trim="$v.user.$model" :class="{'is-invalid':$v.user.$error, 'is-valid':!$v.user.$invalid}" 
                            label="Nom d'utilisateur *"
                            name="user"
                            prepend-icon="person"
                            type="text"
                            color="blue"
                         > <div class="valid-feedback"> Votre Nom d'utilisateur est valide!</div>
                         <div class="invalide-feedback">
                           <span v-if="!$v.user.required">Nom d'utilisateur est obligatoire.</span>
                           <span v-if="!$v.user.isUnique">Nom d'utilisateur déja pris.</span>
                           <span v-if="!$v.user.minLength">Nom d'utilisateur doit contenir au moin {{!$v.user.$params.minLength.min}} caractére.</span>
                           <span v-if="!$v.user.maxLength">Nom d'utilisateur doit contenir au plus {{!$v.user.$params.maxLength.min}} caractére.</span>
                         </div>
                        </v-text-field>
                    
                     <v-text-field 
                            label="Adresse email *"
                            name="email"
                            class="form-control"
                            v-model.trim="$v.email.$model" :class="{'is-invalid':$v.email.$error, 'is-valid':!$v.email.$invalid}" 
                            prepend-icon="email"
                            type="email"
                            color="blue"
                   ><div class="valid-feedback">Email est valide!</div>
                         <div class="invalide-feedback">
                           <span v-if="!$v.email.required">Email est obligatoire.</span>
                           <span v-if="!$v.email.isUnique">Email déja pris.</span>
                         </div>
                        </v-text-field>
                   <v-text-field 
                            id="phone"
                            label="Numéro Téléphone*"
                            name="phone"
                            class="form-control"
                            v-model.trim="$v.phone.$model" :class="{'is-invalid':$v.phone.$error, 'is-valid':!$v.phone.$invalid}" 
                            type="number"
                            prepend-icon="phone"
                            color="blue"
                  ><div class="valid-feedback">Numéro Tel est valide!</div>
                         <div class="invalide-feedback">
                           <span v-if="!$v.phone.required">Numéro Tel est obligatoire.</span>
                           <span v-if="!$v.phone.minLength">{{$v.password.$params.minLength.min}} invalide Numéro Tel.</span>
                         </div>
                        </v-text-field>
                   <v-text-field 
                            label="Date de naissance *"
                            name="Date de naissance"
                            prepend-icon="event"
                            type="Date"
                            color="blue"
                   />
                    <v-text-field 
                            id="password"
                            label="Mot de passe *"
                            name="password"
                             class="form-control"
                            v-model.trim="$v.password.$model" :class="{'is-invalid':$v.password.$error, 'is-valid':!$v.password.$invalid}" 
                            prepend-icon="lock"
                             type="password"
                            color="blue"
                    ><div class="valid-feedback">Mot passe est valide!</div>
                         <div class="invalide-feedback">
                           <span v-if="!$v.password.required">Mot passe est obligatoire.</span>
                           <span v-if="!$v.password.minLength">{{$v.password.$params.minLength.min}} caractéres minimum.</span>
                         </div>
                        </v-text-field>
                    <div class="form-group form-check">
                      <input type="checkbox" id="showpassword" class="form-check-input" @click="toggleShowPassword" v-model="showpassword">
                      <label class="form-check-label" for="shwopassword">Afficher mot de passe</label> 
                    </div>
                    <v-text-field 
                            id="password"
                            label="Confirmer mot de passe *"
                            name="repeatpassword"
                            class="form-control"
                            v-model.trim="$v.repeatpassword.$model" :class="{'is-invalid':$v.repeatpassword.$error, 'is-valid':(password !='')? !$v.repeatpassword.$invalid: ''}"
                            prepend-icon="lock"
                            type="password"
                            color="blue"
                     >
                     <div class="valid-feedback">Mot passe est identique!</div>
                         <div class="invalide-feedback">
                           <span v-if="!$v.repeatpassword.sameAsPassword">Mot passe doit etre identique!</span>
                         </div>
                        </v-text-field>
                  </v-form>
                </v-col>
              </v-row>
            
                <div ><p>* Requis</p></div>
                <v-card-actions >
                  <v-btn id="log" class="S'inscrire" color="blue" @click="login()">
                    S'inscrire{{Submitstatus}}
                  </v-btn>
             </v-card-actions>
              <div>
                <p class="text-center">Vous avez déja un compte ?</p>
              </div>
              <div class="text-center">
                <v-btn id="authe" color="#C5CFD6" @click="step++"
                  >S'authentifier !</v-btn
                >
              </div>
             
            </v-window-item>
          </v-window>
        </v-card>
      </v-col> 
    </v-row>
  </v-container>  
 </v-app>
  
    
</template>
<script>
import { required, minLength, maxLength, email, sameAs} from 'vuelidate/lib/validators'

export default {
    name:'forminscription',
    data () {
        return{
     //variable utilisée
      user:'',
      email:'',
      phone:'',
      password:'',
      repeatpassword:'',
      showpassword: false
        }
        
    },
    validations:{
        user:{
            required,
            minLength: minLength(3),
            maxLength: maxLength(15),
            isUnique (value){
         if (value === '') return true
         return new Promise((resolve) => {
           setTimeout(()=>{
             resolve (typeof value === 'string' && value.length % 2 !==0)
 
           }, 350+ Math.random() * 300)
         })
       }
        },
        email:{
            required,
            email,
            isUnique (value){
         //eslint-disable-next-line
         var email_regex = RegExp(
     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
   )
         return new Promise((resolve)=>{
           setTimeout(()=>{
             resolve (email_regex.test(value))
 
           }, 350+ Math.random() * 300)
         })
       }

        },
        phone:{
            required,
            minLength: minLength(10)
        },
        birthdate:{
            required,
        },
        password:{
            required,
            minLength: minLength(6) ,
        },
        repeatpassword:{
            required,
            sameAsPassword: sameAs('password')
        }

    },
    methods: {
     toggleShowPassword(){
       var show = document.getElementById('password')
       if(this.showpassword== false){
         this.showpassword=true
         show.type ="text"
 
       } else{
         this.showpassword=false
         show.type ="password"
       }
     }
   ,
   SubmitForm (){
     this.$v.$touch()
     if(this.$v.$invalid){
       this.Submitstatus ="Fail"
     } else {
       this.Submitstatus = "success"
     }
   }
 }
}
</script>
<style scoped>

</style>
