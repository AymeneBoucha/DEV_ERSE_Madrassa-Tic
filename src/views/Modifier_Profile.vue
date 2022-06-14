<template>
  <v-app>
    <div class="Modifier_Profile">
      <h1 class="subheading grey--text">Modifier votre profile</h1>
      <v-container>
        <v-card
          class="text-center ma-3 card"
          height="auto"
          padding="50px"
          min-width='950px'
          fluid
        >
          <div>
            <v-responsive class="pt-4 png">
              <v-avatar size="250" class="red lighten-2">
                <img :src=this.picture alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text>

                  <!-- <label>
                       <v-btn outlined color="orange" class="picButton">
                        <v-icon small left>mdi-wrench</v-icon>
                        <span>Modifier</span>
                      </v-btn>
                      <input @change="onFileSelected" type="file" ref="file" accept="image/gif, image/jpeg, image/png" hidden/>
                  </label> -->

                  <v-file-input
                    v-model="picture"
                    @change="onFileSelected"
                    accept="image/*"
                    label="Ajouter une image "
                    prepend-icon="add_a_photo"
                    dense
                    outlined
                  ></v-file-input>


            </v-card-text>
          </div>
          <div>
            <v-card-text class="fields">
              <v-text-field
                class="text-center mt-0"
                label="Email"
                v-model="email"
                disabled
                type="email"
                prepend-icon="email"
                color="blue"
                counter
              ></v-text-field>
              <v-text-field
                class="text-center mt-0"
                label="Nom d'utilisateur"
                v-model="username"
                type="text"
                prepend-icon="badge"
                color="blue"
                counter="20"
              ></v-text-field>
              <v-text-field
                class="text-center mt-0"
                v-model="phoneTel"
                label="Numéro de téléphone"
                prefix="+213"
                type="number"
                prepend-icon="phone"
                color="blue"
                counter="9"
              ></v-text-field>
              <v-text-field
                class="text-center mt-0"
                v-model="birthDay"
                label="date de naissance"
                type="date"
                prepend-icon="event"
              ></v-text-field>
              <v-card-actions>
                <v-btn
                  width="100%"
                  outlined
                  color="orange"
                  class="button"
                  @click="step = -step"
                >
                  <v-icon small left>mdi-wrench</v-icon>
                  <span>Modifier votre mot de passe</span>
                </v-btn>
              </v-card-actions>
            </v-card-text>

            <v-window class="drop" v-model="step">
              <v-window-item :value="-1">
                <v-text-field
                  label="Mot de passe courant"
                  v-model="currentpassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  prepend-icon="lock"
                  counter="20"
                ></v-text-field>
                <v-text-field
                  label="Nouveau mot de passe"
                  v-model="newpassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  prepend-icon="lock"
                  counter="20"
                ></v-text-field>
                <v-text-field
                  label="Confirmer le nouveau mot de passe"
                  v-model="confirmpassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  prepend-icon="lock"
                  counter="20"
                ></v-text-field>
              </v-window-item>
              <v-window-item :value="1"></v-window-item>
            </v-window>
          </div>

          <div>
            <v-btn outlined color="red" class="confirm" @click="modifier()">
              <v-icon small left>mdi-wrench</v-icon>
              <span>Confirmer les modifications</span>
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import router from "../router/index";
import setAuthHeader from '@/utils/setAuthHeader'


export default {
  name: "ProfileItem",
  components: {},
  data: () => {
    return {
      step: 1,
      show1: false,
      username: "",
      //selectedFile:null,
      email: "",
      password: "**********",
      phoneTel: "",
      birthDay: "",
      picture:'',
    };
  },
  mounted: async function () {
    try {
      const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);
      const res = await axios.get(`http://localhost:8080/api/auth/Me`);
      this.username = res.data.username;
      this.email = res.data.email;
      this.phoneTel = res.data.phoneTel;
      this.birthDay = res.data.birthDay;
      this.picture = res.data.picture;

      
    } catch {
      alert("error");
    }
  },
  
  methods: {
     async  onFileSelected(event){
      this.selectedFile = event
    /*  this.picture=
      `http://localhost:8080/${this.selectedFile.path}`*/
    },
    async modifier() {
    const data = new FormData()

          if(this.selectedFile){

   data.append('picture', this.selectedFile)}
      if(this.username){
   data.append('username', this.username)}
      if(this.phoneTel){
   data.append('phoneTel', this.phoneTel)}
         if(this.birthDay){

   data.append('birthDay', this.birthDay)}
   if(this.currentpassword){
   data.append('currentpassword', this.currentpassword)
   data.append('newpassword', this.newpassword)
   data.append('confirmpassword', this.confirmpassword)}

                           console.log("ana data picture")

             //  console.log(data.picture)

   //console.log(this.selectedFile)

   console.log(this.username)
      console.log(this.phoneTel)


         console.log(this.birthDay)

   

         console.log(this.currentpassword)

         console.log(this.newpassword)

 
         console.log(this.confirmpassword)

  


      const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);
      axios
        .put("http://localhost:8080/api/auth/updateUser", data)
        .then((res) => {
          console.log(res);
          //alert("Vous avez modifier votre profil");
                    alert(res.data.message);
               if (res.status==201) {   router.push("/Profile"),  window.location.reload() ;}
        })
        .catch((err) => {
          console.log(err);
          alert("Veillez remplir tout les champs correctement.");
        });
    },
   
  },
};
</script>

<style scoped>
.container {
  align-items: center;
  text-align: center;
}

.card {
  display: grid;
  grid-template-columns: repeat(auto-fill, 44%);
  height: 500px;
  align-items: center;
  text-align: center;
}
.fields {
  margin: 0px;
  width: 100%;
}
.png {
  margin-left: 0px;
}
.picButton {
  margin-top: 3%;
}
.button {
  margin-top: 3%;
  right: 18%;
}
.confirm {
  left: 60%;
  width: 90%;
  margin-bottom: 6%;
  margin-top: 4%;
}
@media screen and (max-width: 1200px) {
  .fields {
    width: 300px;
    margin: 50px;
  }
  .card {
    flex-direction: column;
    height: 800px;
  }
}
</style>
