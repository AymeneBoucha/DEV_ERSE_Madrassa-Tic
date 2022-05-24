<template>
    <div>
        <h1 class="subheading grey--text">Catégories</h1>
        <v-container>
            <v-card-actions>
                <v-dialog v-model="dialog"  :retain-focus="false" persistent max-width="450px">
                        <template v-slot:activator="{ on }">
                <v-btn outlined color="blue" v-on="on">
                    <v-icon>mdi-plus-box-multiple</v-icon>
                    <span>Ajouter une Catégorie</span>
                </v-btn>
                </template>
                            <v-card>
                                <v-card-text>
                                    <h2 class="text-center">Entrer la nouvelle categorie</h2>
                                <v-textarea 
                                    clear-icon="mdi-close-circle"
                                    label="Catégorie"
                                    v-model="category"
                                    prepend-icon="category"
                                    rows="1"
                                    ></v-textarea>
                                    <div class="bouttonsD">
                                         <v-btn @click="dialog = false" ><span>Annuler</span></v-btn>
                                         <v-btn class=" blue-grey darken-2" @click="Ajouter()"><span>Confirmer</span></v-btn>
                                    </div>
                                </v-card-text>
                            </v-card>
                            </v-dialog>
            </v-card-actions>
            <v-layout row wrap>
                <v-flex
                    xs12
                    sm6
                    md4
                    lg3
                v-for="category in Categories" 
                :key="category.text">
                    <v-card class="text-center ma-3 category">
                        <v-card-text>
                        <h2 class="grey--text">{{ category.name }}</h2>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
 import axios from 'axios'
 export default {
     name: "GestionCategories",
     data() {
         return {
             text:'',
             dialog: false,
             category: '',
             Categories: []
         }
     },
     async created() {
         try{
             const res = await axios.get(`http://localhost:8080/api/madrasa-tic/getAllCategories`);
             this.Categories = res.data;
         }catch(e){
             alert("Missing categories from database")
         }
     },
     methods: {
         async Ajouter(){
         const data = {
             name: this.category
         }
         console.log(this.name)
         try {
             await axios.post(`http://localhost:8080/api/madrasa-tic/admin/addCategoriesByAdmin`, data)
         this.dialog = false
         this.$router.push("GestionCategories")
         }catch(e){
             alert("There is a problem")
         }
     }
     }
 }

</script>

<style scoped>
span{
    text-transform: none;
}
.category{
    display: flex;
    flex-direction: column;
}
div.layout.row.wrap{
    position: relative;
    margin-top: 30px;
}
</style>