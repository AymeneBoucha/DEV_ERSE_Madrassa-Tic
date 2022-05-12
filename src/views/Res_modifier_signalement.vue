<template>
<div class="Ajouter Signalement">
    <h1 class="subheading grey--text">Modifier Signalement</h1>
  <v-form>
    <v-container >
      <v-layout class="container" >
        <v-flex class="const" >
              <v-card class="text-center cardM">
                <v-card-text>
                  <div class="signal">
                        <v-select
                            v-model="catégorie"
                            :items="catégories"
                            label="Catégorie"
                            prepend-icon="category"
                            required
                            :rules="[v => !!v || 'champs obligatoire']"
                        ></v-select>
                        <v-text-field
                            v-model="titre"
                            :rules="[v => !!v || 'champs obligatoire']"
                            label="Titre"
                            required
                            prepend-icon="title"
                        ></v-text-field>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Description (optionnelle)"
                            v-model="descriptif"
                            prepend-icon="description"
                        ></v-textarea>
                        <div class="lieu">
                          <div class="form-group">
                        <label for="cycle">Cycle :</label>
                          <select class="text1 form-control" name="cycle" id="cycle" v-model="cycle">
                            <option v-for="option in cycles_options" v-bind:value="option.value" v-bind:key="option.text">{{option.text}}</option>
                          </select>
                        </div>
                        <div class="salle form-group">
                          <label for="salle">Salle :</label>
                          <select class="text2 form-control " name="salle" id="salle" v-model="salle">
                            <option v-for="option in salles_options[cycle]" v-bind:value="option.text" v-bind:key="option.text">{{option.text}}</option>
                          </select>
                        </div>
                      </div>
                        <v-text-field 
                        label="lieu"
                        v-model="lieu"
                        prepend-icon="place"
                        type="text"
                        ></v-text-field>
                        <v-file-input
                          v-model="image"
                          accept="image/*"
                          label="Ajouter une image "
                          prepend-icon="add_a_photo"
                        ></v-file-input>
                    <v-btn outlined color="green" class="mr-12" dark @click="modifier()">
                        <span class=" text-lowercase">Modifier</span>
                    </v-btn>
                    <v-btn outlined color="red" class="mr-12" dark @click="$router.push('Res_sig_att')">
                        <span class=" text-lowercase">Annuler</span>
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
              
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  </div>
</template>

<script>
import axios from "axios";
import router from '../router/index';

export default {
  components : {},
    data: () => ({
        titre: '',
        descriptif: '',
        catégorie:'',
        image: [],
        catégories: ["Hygiène", "Sécurité", "Problèmes techniques", "Santé","Electricité","Plomberie","Problèmes d'équipement","Objet perdu"],
        cycle: '',
        salle: '',
        cycles_options: [
          {text: "Cycle préparatoire, rez-de-chaussée",value: 'Cycle préparatoire, rez-de-chaussée'},
          {text: "Cycle préparatoire, 1er étage",value:'Cycle préparatoire, 1er étage' },
          {text: "Cycle préparatoire, 2ème étage",value:'Cycle préparatoire, 2ème étage'},
          {text: "Cycle préparatoire 3ème étage",value:'Cycle préparatoire 3ème étage'},
          {text: "Cycle supérieur, rez-de-chaussée",value:'Cycle supérieur, rez-de-chaussée'},
          {text: "Cycle supérieur, 1er étage",value: 'Cycle supérieur, 1er étage'},
          {text: "Cycle supérieur, 2ème étage",value: 'Cycle supérieur, 2ème étage'}
       ],
        salles_options: {
          'Cycle préparatoire, rez-de-chaussée' : [{text:"Amphi A"},{text: "Amphi B"}],
          'Cycle préparatoire, 1er étage': [{text: "Salle1"},{text: "Salle2"}],
          'Cycle préparatoire, 2ème étage': [{text: "Salle1"},{text: "Salle2"}],
          'Cycle préparatoire 3ème étage': [{text: "Salle1"},{text: "Salle2"}],
          'Cycle supérieur, rez-de-chaussée': [{text: "Amphi C"},{text: "Amphi D"},{text: "Amphi E"},{text: "Local Alphabit"},{text: "Local Ingeniums"},
          {text: "Local GDG"},{text: "Loge des agents"},{text: "Sanitaires"},{text: "Salle de soutenance et réunion"},
          {text: "Moussala homme"},{text: "Moussala Femme"},{text: "Foyer"},{text: "Salle TD 1"},{text: "Salle TD 2"},
          {text: "Salle TD 3"},{text: "Salle TD 4"},{text: "Salle TD 5"},{text: "Salle TD 6"},{text: "Salle A1"},{text: "Salle A2"}
          ,{text: "Salle A3"},],
          'Cycle supérieur, 1er étage': [{text: "Salle de lecture"},{text: "Salle TP 4"}],
          'Cycle supérieur, 2ème étage': [{text: "Salle TP 8"},{text: "Amphi D "}],
          }
    }),
  computed: {
    lieu: function () {
      return this.cycle + ' ' + this.salle
    }
  },
methods: {
    async modifier() {
    axios.put('http://localhost:8080/api/auth/updateSignalement',this.data)
            .then(
                res => {
                    console.log(res)
                    alert('Vous avez modifier ce signalement');
                    router.push('/Profile');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
    },
      mounted: async function() {
        try {
        const res = await axios.get(`http://localhost:3000/signalement`)
        this.data.titre = res.data[0].titre
        this.data.descriptif = res.data[0].descriptif
        this.data.catégorie = res.data[0].catégorie
        this.data.lieu = res.data[0].lieu
        this.data.image = res.data[0].image
        }catch{
        alert('Missing data from database')
        }
      },
}
}
</script>
<style scoped>
.text {
  margin-left: 3cm;
  font-size: 13px;
}
.signal {
  width: 70%;
  padding: 10px;
   position: relative;
   margin-top: -30px;
   margin-left: auto;
   margin-right: auto;
}
.envoie{
    position: relative;
    left: 4cm;
    width: 15%;
  }
.enregistrer{
    position: relative;
    left: -4cm;
  }
.cardM{
  height: 600px;
}
.lieu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.text1 {
  position: relative;
  left: 10px;
  border: 2px solid grey;
  border-radius: 5px;
}
.salle {
  position: relative;
  left: -20%
}
.text2 {
  position: relative;
  left: 10px;
  border: 2px solid grey;
  border-radius: 5px;
  width: 70px;
}
</style>