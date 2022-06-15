<template>
  <div class="accounts">
    <h1 class="subheading grey--text">Comptes des Chefs de Service</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex
          xs12
          sm6
          md4
          lg3
          v-for="(person, index) in accounts"
          :key="person.id"
        >
          <v-card class="text-center ma-3" min-width="270px">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="red lighten-2">
                <img :src="person.picture" alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.username }}</div>
              <div class="grey--text">{{ person.email }}</div>
            </v-card-text>
            <v-card-actions>
              <v-dialog
                v-model="dialog1"
                :retain-focus="false"
                persistent
                max-width="800px"
              >
                <template v-slot:activator="{ on }">
                  <v-card-actions>
                    <v-btn
                      class="ModC"
                      @click="showInfos(index)"
                      outlined
                      color="orange"
                      dark
                      v-on="on"
                      ><v-icon small left>mdi-wrench</v-icon>Modifier</v-btn
                    >
                  </v-card-actions>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Modifier le compte</span>
                  </v-card-title>
                  <v-form class="px-3" ref="form">
                    <v-card-text>
                      <v-col cols="12" lg="8">
                        <v-text-field
                          label="Nom d'utilisateur"
                          v-model="username"
                          disabled
                          type="text"
                          prepend-icon="person"
                          color="blue"
                        ></v-text-field>
                        <v-text-field
                          label="Adresse email"
                          v-model="email"
                          disabled
                          type="email"
                          prepend-icon="email"
                          color="blue"
                        ></v-text-field>
                        <v-text-field
                          label="Numéro de téléphone"
                          prefix="+213"
                          v-model="phoneTel"
                          disabled
                          type="number"
                          prepend-icon="phone"
                          color="blue"
                          hint="9 chiffres"
                        ></v-text-field>
                        <v-text-field
                          v-model="birthDay"
                          disabled
                          label="Date de naisssance"
                          persistent-hint
                          prepend-icon="event"
                        ></v-text-field>
                        <v-select
                          v-model="defaultSelected"
                          :items="roles"
                          :menu-props="{ maxHeight: '200' }"
                          label="Modifier les roles"
                          
                          persistent-hint
                          prepend-icon="mdi-wrench"
                  
                        ></v-select>
                        <v-select
                          v-model="defaultSelectedC"
                          :items="catégories"
                          :menu-props="{ maxHeight: '200' }"
                          label="Modifier les catégories"
                          multiple
                          persistent-hint
                          prepend-icon="mdi-wrench"
                          @input="setSelected1"
                        ></v-select>
                        <v-card-actions>
                          <v-btn outlined color="primary" @click="actUser()" :disabled="active">
                            <v-icon small left
                              >mdi-checkbox-marked-circle</v-icon
                            >
                            <span  >Activer le compte</span>
                          </v-btn>
                          <v-btn outlined color="red" @click="desUser()" :disabled="!active">
                            <v-icon small left> mdi-cancel</v-icon>
                            <span >Desactiver le compte</span>
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog1= false, Close()"
                        >Close</v-btn
                      >
                      <v-btn color="green" text outlined @click="UpdateUser(),UpdateCatgoriesForEmployer()"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialog2"
                 :retain-focus="false"
                persistent
                max-width="400px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn outlined color="red" class="DelC" v-on="on">
                    <v-icon small left> mdi-delete</v-icon>
                    <span @click="Delete(index)">Supprimer</span>
                  </v-btn>
                </template>
                <v-card class="cardT">
                  <v-card-text>
                    <span><strong>Cette action est irréversible, Est ce que vous voulez supprimer cet compte définitivement ?</strong></span>
                    <div class="bouttonsD">
                      <v-btn @click="dialog2 = false"
                        ><span>Annuler</span></v-btn
                      >
                      <v-btn class="blue-grey darken-2" @click="DeleteUser()"
                        ><span>Confirmer</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import router from "../router/index";
import setAuthHeader from "@/utils/setAuthHeader";
export default {
  name: "ComptesItem",
  components: {},
  data: () => {
    return {
      dialog1: false,
      dialog2: false,
      varIndex: "",
      username: "",
      active: '',
      isActive: '',
      email: "",
      phoneTel: "",
      due: null,
      date: new Date().toISOString().substr(0, 10),
      birthDay: "",
      menu1: false,
      accounts: {
        id: "",
        username: "",
        email: "",
        avatar: "/img1.png",
      },
      NewAccount: "",
          roles: [["user","moderator", "admin", "announcer"],["user", "moderator", "announcer"] ,["user","employer","announcer"],
      ["user", "announcer"],["user"]],
      defaultSelected: [],
      defaultSelectedC: [""],
      catégories: [],
      rolesToAdd: [],
      catégoriesToAdd: [],
    };
  },
  async created() {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/admin/viewAllEmployesByAdmin`
      );
      this.accounts = res.data;
     for(let i=0; i<this.accounts.length; i++){
        if(!this.accounts[i].picture)
        this.accounts[i].picture = "img1.png"
      }
      console.log(this.accounts);
    } catch (e) {
      alert("There are some errors");
    }
  },
  mounted: async function () {
    try {
      const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);
      const res = await axios.get(`http://localhost:8080/api/madrasa-tic/getAllCategories`);
      //this.categrories = res.data.;
     // console.log(res.data[0].name)
   //  console.log(res.data.length)
        let j = 0;
      while (j < res.data.length) {
        this.catégories.push(res.data[j].name);
        j++
      }

      console.log(this.catégories)
    } catch {
      alert("Missing data from database");
    }
  },
  methods: {
    Delete(index) {
      this.varIndex = index
    },Close(){
  this.defaultSelected= []
},





    DeleteUser() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      axios
        .delete(
          `http://localhost:8080/api/madrasa-tic/admin/${this.accounts[this.varIndex].id}/delete`
        )
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.status == 201) {
            router.push("/Comptes");
            this.accounts.splice(this.varIndex, 1);
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Une erreur.");
        });
    },

    async UpdateCatgoriesForEmployer(){
           console.log(this.catégoriesToAdd);

      const acc = localStorage.getItem("xaccesstoken");
      const categories= this.defaultSelectedC
      console.log(categories)

      setAuthHeader(acc);
      
      await axios.post(`http://localhost:8080/api/madrasa-tic/admin/addCategoriesToEmployerByAdmin/${this.accounts[this.varIndex].id}`,{categories});
    }
,


    
    async UpdateUser() {
      console.log(this.varIndex);

      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);

      await axios
        .put(
          `http://localhost:8080/api/madrasa-tic/admin/${
            this.accounts[this.varIndex].id
          }/updateRoles`,
          {
            roles: this.defaultSelected,
          }
        )
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.status == 201) {
            router.push("/Comptes");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Une erreur.");
        });
    },
    async showInfos(index) {
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/admin/selectOneEmployerByAdmin/${this.accounts[index].id}`
        );
        this.username = res.data.username;
        this.email = res.data.email;
        this.phoneTel = res.data.phoneTel;
        this.birthDay = res.data.birthDay;
        this.defaultSelected = res.data.roles;
        this.defaultSelectedC = res.data.categories;
        if (res.data.isActive){
          this.active = true;
        }else{
          this.active = false;
        }
      } catch {
        alert("Missing data from database");
      }
    },
    async actUser() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      await axios
        .put(
          `http://localhost:8080/api/madrasa-tic/admin/${
            this.accounts[this.varIndex].id
          }/actUser`
        )
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.status == 201) {
            router.push("/Comptes");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Une erreur.");
        });
    },
    async desUser() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      await axios
        .put(
          `http://localhost:8080/api/madrasa-tic/admin/${
            this.accounts[this.varIndex].id
          }/desUser`
        )
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.status == 201) {
            router.push("/Comptes");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Une erreur.");
        });
    },
    setSelected(value) {
      this.rolesToAdd = value;
      console.log(value); 
    },
    setSelected1(value) {
      this.catégoriesToAdd = value;
      console.log(value); 
    },
  },
  
};
</script>
<style scoped>
.bouttonsD{
  position: relative;
  margin-top: 20px;
}
.ModC {
  margin-left: -10px;
}
.DelC {
  margin-left: -1px;
  font-size: 13px;
}
.ComptesC{
  position: relative;
  margin-left: -8px;
}
</style>
