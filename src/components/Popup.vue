<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on }">
        <v-btn outlined color="teal lighten-3" dark v-on="on">Ajouter un compte</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Nouveau compte</span>
        </v-card-title>
         <v-form class="px-3" ref="form">
        <v-card-text>
            <v-text-field  
                            label="Nom d'utilisateur"
                            v-model="username"
                            :rules="[inputRules, rules.required]"
                            type="text"
                            prepend-icon="person"
                            color="blue"
                        ></v-text-field>
                <v-text-field 
                            label="Adresse email"
                            v-model="email"
                            type="email"
                            prepend-icon="email"
                            color="blue"
                            :rules="[rules.required, inputRules]"
                        ></v-text-field>
                <v-text-field 
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
                <v-col cols="12" lg="6">
                 <v-menu 
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="birthDay"
              label="Date de naisssance"
              hint="MM/DD/YYYY format"
              persistent-hint
              prepend-icon="event"
              @blur="date = parseDate(birthDay)"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
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
        </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="green" text outlined @click="AddNewUser()">Save</v-btn>
        </v-card-actions>
         </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
//const baseURL = 'http://localhost:3000/accounts'

export default {

    data: vm => ({
      dialog: false,
      username:'',
      email:'',
      password:'',
      confirmpassword:'',
      phoneTel:'',
      show1: false,
      due:null,
      date: new Date().toISOString().substr(0, 10),
      birthDay: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      inputRules: [
          v => v.length >= 3 || 'Minimum lenght is 3 charachters' 
      ],
      rules: {
          required: value => !!value || 'Required.',
          min1: v =>  v.length == 9 || '9 chiffres',
          min: v => v.length >= 6 || 'Min 6 characters',
          emailMatch: () => (`The email and password you entered don't match`),
        },
        accounts: {
          username: '',
          email: '',
          avatar:'/img1.png'
        },
        NewAccount: ''
    }),
    
    methods: {
         formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year}/${month}/${day}`
      },
      parseDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
     async AddNewUser () {
        try{
         await axios.post("http://localhost:3000/accounts",
          this.accounts)
          alert("Account created")
        }catch (e) {
          alert("There is a problem")
        }
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
}
</script>