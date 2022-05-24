<template>
  <v-content>
    <div class="topnav elevation-12"><h1>MADRASA-TIC</h1></div>
    <div class="card" padding="50px">
      <v-container class="fill-height" padding="50px" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="
                            text-center
                            blue-grey--text
                            display-2
                            text--darken-3
                          "
                        >
                          Authentification
                        </h1>

                        <v-form>
                          <v-text-field
                            class="text-center mt-10"
                            label="Adresse email"
                            v-model="object.email"
                            required
                            :rules="[
                              (v) =>
                                !!v || 'veuillez saisir votre adresse email',
                            ]"
                            type="email"
                            prepend-icon="email"
                            color="blue"
                          ></v-text-field>
                          <v-text-field
                            class="text-center mt-1"
                            label="Mot de passe"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            @click:append="show1 = !show1"
                            v-model="object.password"
                            required
                            :rules="[
                              (v) =>
                                !!v || 'veuillez saisir votre mot de passe',
                            ]"
                            prepend-icon="lock"
                            counter
                          ></v-text-field>
                        </v-form>

                        <router-link
                          to="/Forgot_password"
                          class="text-center mt-4"
                          >Mot de passe oublié ?</router-link
                        >
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          class="cnx"
                          rounded
                          color="#37474F"
                          dark
                          @click="login()"
                          >Se connecter</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="blue-grey darken-4">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Vous n'avez pas de compte?
                        </h1>
                        <!-- <h5 class="text-center">Créer un nouveau compte!</h5> -->
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >Inscrivez-vous!</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="blue-grey darken-4">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">
                          Vous avez déja un compte?
                        </h1>
                        <!-- <h5 class="text-center">To Keep connected with us please login with your personnel info</h5> -->
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >S'authentifier</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-1">
                        <h1
                          class="
                            text-center
                            display-2
                            blue-grey--text
                            text--darken-3
                          "
                        >
                          Créer un compte
                        </h1>

                        <form @submit.prevent="handleSubmit">
                          <v-text-field
                            class="text-center mt-3"
                            label="Nom d'utilisateur"
                            v-model="username"
                            :rules="[rules.required]"
                            type="text"
                            prepend-icon="person"
                            color="blue"
                          ></v-text-field>
                          <v-text-field
                            class="text-center mt-1"
                            label="Adresse email"
                            v-model="email"
                            type="email"
                            prepend-icon="email"
                            color="blue"
                            :rules="[rules.required]"
                            hint="email doit etre : 'username@esi-sba.dz'"
                          ></v-text-field>
                          <v-text-field
                            class="text-center mt-1"
                            label="Numéro de téléphone"
                            prefix="+213"
                            v-model="phoneTel"
                            type="number"
                            prepend-icon="phone"
                            color="blue"
                            :rules="[rules.required, rules.min1]"
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
                              :max="
                                new Date(
                                  Date.now() -
                                    new Date().getTimezoneOffset() * 60000
                                )
                                  .toISOString()
                                  .substr(0, 10)
                              "
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
                            @click:append="show2 = !show2"
                            prepend-icon="lock"
                          ></v-text-field>
                        </form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          class="creat"
                          rounded
                          color="#37474F"
                          dark
                          @click="handleSubmit()"
                          >S'inscrire</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-content>
</template>

<script>
import axios from "axios";
import router from "../router/index";
import setAuthHeader from "@/utils/setAuthHeader";

// export default {
//   data: () => ({
//     step: 1
//   }),
//   props: {
//     source: String
//   }
// };

export default {
  data() {
    return {
      step: 1,
      show1: false,
      object: {
        email: "",
        password: "",
      },

      activePicker: null,
      menu: false,
      show2: false,
      username: "",
      email: "",
      phoneTel: "",
      userroles: [],
      birthDay: "",
      password: "",
      confirmpassword: "",
      rules: {
        required: (value) => !!value || "Required.",
        min1: (v) => v.length == 9 || "9 chiffres",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    save(birthDay) {
      this.$refs.menu.save(birthDay);
    },
    async login() {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/signin",
          this.object
        );
        localStorage.se;
        console.log(res);
        alert("Logged in !");
        localStorage.setItem("xaccesstoken", res.data.accessToken);
        setAuthHeader(res.data.accessToken);
        //  router.push({ name: 'Dashboard User' });7

        this.userroles = res.data.roles;
   //     console.log(this.userroles);

        if (
          this.userroles.includes("ROLE_USER") &&
          this.userroles.includes("ROLE_MODERATOR") &&
          this.userroles.includes("ROLE_ADMIN")
        ) {
          this.$router.push("/DashboardResAdmUser");
        } else {
          if (
            this.userroles.includes("ROLE_USER") &&
            this.userroles.includes("ROLE_MODERATOR")
          ) {
            this.$router.push("/DashboardResUser");
          } else {
            if (
              this.userroles.includes("ROLE_USER") &&
              this.userroles.includes("ROLE_ADMIN")
            ) {
              this.$router.push("/DashboardAdmUser");
            } else {
              if (
                this.userroles.includes("ROLE_USER") &&
                this.userroles.includes("ROLE_EMPLOYER")
              ) {
                this.$router.push("/DashboardChefUser");
              } else {
                if (this.userroles.includes("ROLE_USER")) {
                  this.$router.push("/DashboardUser");
                }
              }
            }
          }
        }
      } catch (e) {
        alert("Adresse ou mot de passe incorrect");
        router.push({ name: "Sign_up_in" });
      }
    },
    async handleSubmit() {
      //c'est tout ce que dont tu as besoin
      const data = {
        username: this.username,
        email: this.email,
        phoneTel: this.phoneTel,
        birthDay: this.birthDay,
        password: this.password,
        confirmpassword: this.confirmpassword,
      };
      axios
        .post("http://localhost:8080/api/auth/signup", data)
        .then((res) => {
          console.log(res);
          /*alert(
            "Vous vous etes inscrit!, Veuillez verfiez votre email pour pouvoir vous authentifier "
          );*/
          alert(res.data.message);

          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
          alert("erreur");
        });
    },
  },
};
</script>
<style scoped>
.topnav {
  background-color: #263238;
  color: white;
  text-align: center;
  width: 100%;
  height: 50px;
  float: left;
}
.card {
  position: absolute;
  width: 100%;
  top: 100px;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, 0);
}
.cnx {
  margin: 20px;
}
.creat {
  margin: 20px;
}
</style>