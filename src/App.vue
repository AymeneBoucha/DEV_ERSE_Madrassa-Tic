<template>
  <v-app>
    <NavbarItem v-if="account == 'Moderator'"/>
    <NavbarUser v-if="account == 'User'"/>
    <NavbarAdmin v-if="account == 'Admin'"/>
    <NavbarService v-if="account == 'Employer'" />
     <v-content class="ma-4" >
       <router-view></router-view>
     </v-content>  
    <footerItem/>
   </v-app>
</template>

<script>
import axios from 'axios'
import NavbarItem from '@/components/NavbarItem';
import footerItem from '@/components/footerItem';
import NavbarUser from '@/components/NavbarUser';
import NavbarAdmin from '@/components/NavbarAdmin';
import NavbarService from '@/components/NavbarService';

export default{
   name: 'App',
   components:{
     NavbarItem,
     NavbarUser,
     NavbarAdmin,
     NavbarService,
     footerItem
   },
   data() {
     return {
       account: ''
     }
   },
   mounted: async function () {
     try {
       const res = await axios.get(`http://localhost:3000/accounts`)
       console.log(res.data[1].role)
       if(res.data[1].role.includes('Moderator')){
         this.account = 'Moderator'
       }else {
         if(res.data[1].role.includes('Admin')){
           this.account = 'Admin'
         }else {
           if(res.data[1].role.includes('Employer')){
             this.account = 'Employer'
           }else {
             this.account = 'User'
           }
         }
       }
     }catch {
       alert("There is a problem")
     }
   }
}
</script>
