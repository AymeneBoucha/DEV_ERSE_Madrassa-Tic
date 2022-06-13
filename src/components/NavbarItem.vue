<template>
  <nav>
    <v-app-bar app elevate-on-scroll elevation="3" class="grey lighten-2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img src="../assets/LogoOrange.png" width="50" height="50" />
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light"><h3>MADRASSA-TIC</h3></span>
      </v-toolbar-title>
      <v-spacer />
      <!--pour la barre de recherche-->
      <!-- <v-col lg="6" cols="12">
      <v-form>
        <v-text-field
          class="p-0 m-0 mt-6"
          full-width
          dense
          append-icon="mdi-magnify"
          outlined
          rounded
           v-model="search"
          placeholder="Search"
        />
      </v-form>
    </v-col>
    <v-spacer />
    <v-menu offset-y>
        pour les notifs
      <template v-slot:activator="{ attrs, on }">
        <span
          class="mx-5 mr-10"
          style="cursor: pointer"
          v-bind="attrs"
          v-on="on"
        >
          <v-badge content="3" color="red" offset-y="10" offset-x="10">
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </span>
      </template>-->
      <!--contenu des notification
      <v-list three-line width="250">
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list> 
    </v-menu>-->
      <v-btn text>
        <router-link @click="SeDec()"  to="/" class="black--text">
          <span><h3>Se deconnecter</h3></span>
        </router-link>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" color="#142850" dark app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-img src="/img2.png"></v-img>
          </v-avatar>
          <v-menu offset-y>
            <v-btn text v-on="on">
              <v-icon bottom>expand_more</v-icon>
            </v-btn>
          </v-menu>
        </v-flex>
      </v-layout>
      <h3 class="textN">{{ this.username }}</h3>
      <v-container class="cardNI">
        <v-list>
          <v-list-item-group
            class="list"
            v-model="selectedItem"
            color="primary"
            active-class="border"
          >
            <v-list-item>
              <v-list-item-content @click="Redirect()">
                <div class="element">
                  <v-icon class="ico">dashboard</v-icon>
                  <v-list-item-title class="text"> Dashboard</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                class="content"
                @click="$router.push('Accueil')"
              >
                <div class="element">
                  <v-icon class="ico">home</v-icon>
                  <v-list-item-title class="text"> Accueil</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('Profile')">
              <v-list-item-content>
                <div class="element">
                  <v-icon class="ico">person</v-icon>
                  <v-list-item-title class="text"> Profile</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('LesSignalements')">
              <v-list-item-content>
                <div class="element">
                  <v-icon class="ico">report</v-icon>
                  <v-list-item-title class="text">
                    Signalements</v-list-item-title
                  >
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="$router.push('MesAnnoncesAnnouncer')"
              v-show="show"
            >
              <v-list-item-content>
                <div class="element">
                  <v-icon class="ico">mdi-bullhorn</v-icon>
                  <v-list-item-title class="text">Annonces</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="$router.push('Statistiques')"
              v-show="moderator"
            >
              <v-list-item-content>
                <div class="element">
                  <v-icon class="ico">mdi-chart-pie</v-icon>
                  <v-list-item-title class="text">
                    Statistiques</v-list-item-title
                  >
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import axios from "axios";
//import router from "../router/index";
import setAuthHeader from "@/utils/setAuthHeader";
export default {
  data: () => ({
    drawer: false,
    which: 1,
    selectedItem: 0,
    userroles: [],
    moderator: false,
    show: false,
    username: "Aymen",
    menus: [
      { text: "Profile", icon: "mdi-account", route: "Profile" },
      { text: "Modifier Profile", icon: "mdi-key", route: "Modifier_Profile" },
      { text: "Se déconnecter", icon: "mdi-logout", route: "/" },
    ],
  }),
  mounted: async function () {
    try {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(`http://localhost:8080/api/auth/Me`);
      this.username = res.data.username;
      this.userroles = res.data.roles;
      if (this.userroles.includes("ROLE_MODERATOR")) {
        this.show = true;
        this.moderator = true;
      }
      if (this.userroles.includes("ROLE_ANNOUNCER")) {
        this.show = true;
      }
    } catch {
      alert("No name");
    }
  },
  methods: {
     SeDec() {
      try {
        console.log('smthg')
        localStorage.se;
        localStorage.clear("xaccesstoken");

        alert("Disconnected !");
      } catch {
        alert("Error");
      }
    },

    async Redirect() {
      try {
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(`http://localhost:8080/api/auth/Me`);
        this.userroles = res.data.roles;
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
              this.userroles.includes("ROLE_EMPLOYER")
            ) {
              this.$router.push("/DashboardChefUser");
            } else {
              if (this.userroles.includes("ROLE_USER")) {
                this.$router.push("/MesSignalements");
              }
            }
          }
        }
      } catch {
        alert("Missing data from database");
      }
    },
  },
};
</script>
<style scoped>
.border {
  border-left: 5px solid #0ba518;
}
.cardNI {
  position: relative;
  margin-top: 170px;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 25px;
}
.text-uppercase {
  left: 0.5cm;
  position: relative;
}
.element {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.text {
  position: relative;
  margin-left: 20px;
  font-size: 20px;
  width: 150px;
  text-align: left;
}
.textN {
  position: relative;
  text-align: center;
  margin-top: 20px;
  color: rgb(255, 255, 255);
  text-transform: none;
  font-size: 20px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
</style>
