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
            <v-container class="select">
                <v-select
                    background-color="#263238"
                    :items="lns"
                    @change="changePath"
                    item-text="name"
                    item-value="path"
                    label="Select"
                    solo
                ></v-select>
            </v-container>
           </v-layout>
            <v-list flat>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" action-class="border">
                     <v-list-item-action>
                         <v-icon>{{link.icon}}</v-icon>
                     </v-list-item-action>
                     <v-list-item-content>
                         <v-list-item-title>{{link.text}}</v-list-item-title>
                     </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
export default {
    data: () => ({
        drawer:true,
        which:1,
        Dash:['/Dashboard','/DashboardUser','/DashboardRes'], //solution that didn't work
        Test: "/DashboardRes",
        links: [
            {icon: 'dashboard', text:'Dashboard', route:'DashboardRes'}, //takes you always to user dashbord (idk how to change it)
            {icon: 'folder', text:'Acceuil', route:'/Signalements'}, //ajouter path of acceuille 
            {icon: 'person', text:'Profile', route:'/profile'}, //il faut ajouter le path de profile 
        ],
        lns:
        [
            {name:'User', path:'/DashboardUser'}, //dashboard  user
            { name:'Admin', path:'/Dashboard'}, //dashboard  admin
            {name:'Responsable', path:'/DashboardRes'}, // dashboard de responsable 
        ],
    }),
    methods: {
        changePath(lns) {
        this.$router.push({ path: lns });
    }
    }
}
</script>
<style scoped>
.border {
    border-left: 5px solid #0ba518 ;
    background-color: rgb(236, 71, 71);
}
</style>
