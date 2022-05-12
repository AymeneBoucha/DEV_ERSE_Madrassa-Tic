<template>
  <v-app>
    <NavbarItem v-if="$route.meta.hideNavbar"/>
     <v-content class="ma-4" >
       <router-view></router-view>
     </v-content>  
    <footerItem/>
   </v-app>
</template>

<script>
import NavbarItem from '@/components/NavbarItem';
import footerItem from '@/components/footerItem';
//import NavbarItem from './components/NavbarItem.vue';
export default{
   name: 'App',
   components:{
     NavbarItem,
     footerItem,
      //NavbarItem,
   }
}
</script>