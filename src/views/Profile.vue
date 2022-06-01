<template>
  <div class="profile">
    <h1 class="subheading grey--text">Profile</h1>
    <v-container>
      <v-layout class="container" row wrap>
        <v-flex class="const">
          <v-card class="text-center ma-3 card">
            <v-responsive class="pt-4 png">
              <v-avatar size="250" class="red lighten-2">
                <img src="img1.png" alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text class="fields">
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
                label="Mot de passe"
                disabled
                v-model="password"
                @click:append="show1 = !show1"
                prepend-icon="lock"
              ></v-text-field>
              <v-text-field
                label="Numéro de téléphone"
                prefix="+213"
                value="541671350"
                v-model="phoneTel"
                disabled
                type="number"
                prepend-icon="phone"
                color="blue"
                hint="9 chiffres"
              ></v-text-field>
              <v-text-field
                v-model="birthDay"
                label="Date de naisssance"
                disabled
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(birthDay)"
                v-on="on"
              ></v-text-field>
              <v-card-actions>
                <v-btn
                  outlined
                  color="orange"
                  class="button"
                  @click="$router.push('Modifier_Profile')"
                >
                  <v-icon small left>mdi-wrench</v-icon>
                  <span>Modifier mon compte</span>
                </v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import setAuthHeader from '@/utils/setAuthHeader'


export default {
  name: "ProfileItem",
  components: {},
  data: () => {
    return {
      username: "",
      email: "",
      password: "**********",
      phoneTel: "",
      birthDay: "",
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
    } catch {
      alert("Missing data from database");
    }
  },
};
</script>

<style scoped>
.container {
  align-items: center;
  text-align: center;
}

.card {
  display: flex;
  flex-direction: row;
  height: 500px;
  align-items: center;
  text-align: center;
}
.fields {
  margin: 120px;
  width: 450px;
}
.png {
  margin-left: 40px;
}
.button {
  margin-inline: 80px;
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