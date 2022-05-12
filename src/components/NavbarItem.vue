<template>
    <nav>
        <v-app-bar color="blue-grey darken-4" dark app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            </v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">MADRASSA-TIC</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text>
                <router-link to="/">
                    <span>Se déconnecter</span>
                </router-link>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" dark app class="blue-grey darken-2">
           <v-layout column align-center>
               <v-flex class="mt-5">
                   <v-avatar size="100">
                       <v-img src="/img2.png"></v-img>
                   </v-avatar>
                   <v-menu offset-y>
                    <v-btn text v-on="on">
                     <v-icon bottom >expand_more</v-icon>
                    </v-btn>
            </v-menu>
               </v-flex>
           </v-layout>
        <v-container class="cardS">
        <v-list >
          <v-list-item-group class="list" v-model="selectedItem" color="primary">
          <v-list-item >
              <v-list-item-content  @click="Redirect()">
                <div class="element">
                      <v-icon class="ico">dashboard</v-icon> 
                <v-list-item-title class="text"> Dashboard</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="content">
                  <div class="element">
                      <v-icon class="ico">home</v-icon> 
                <v-list-item-title class="text"> Acceuil</v-list-item-title>
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="$router.push('Profile')">
              <v-list-item-content >
                <div class="element">
                      <v-icon class="ico">person</v-icon> 
                <v-list-item-title class="text"> Profile</v-list-item-title>
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
export default {
    data: () => ({
        drawer:true,
        which:1,
        selectedItem: 0,
    }),
    methods: {
        Redirect() {

        }
    }
}
</script>
<style scoped>
.border {
    border-left: 5px solid #0ba518 ;
    background-color: rgb(236, 71, 71);
}
.cardS{
    position: relative;
    margin-top: 120px;
}
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 25px;
}
.element{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.text{
    position: relative;
    margin-left: 20px;
    font-size: 20px;
    width: 170px;
    text-align: left;
}
</style>
