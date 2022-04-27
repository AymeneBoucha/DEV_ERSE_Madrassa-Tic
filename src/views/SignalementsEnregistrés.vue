<template>
    <div class="SignalementsEnregistrés">
        <h1 class="subheading grey--text">Mes Signalements Enregistrés</h1>
        <v-container>
            <v-layout row wrap>
                <v-flex  v-for="(Signalement, index) in Signalements" :key="Signalement.titre">
                    <v-card class="text-center ma-3 card1">
                    <v-responsive class="pt-0 img">
                    <v-avatar size="100" class="red lighten-2">
                        <img src="/sig.png" alt="" >
                    </v-avatar>
                    </v-responsive>
                    <v-card-text class="titre" >
                    <div class="subheading tt">{{Signalement.titre}}</div>
                    <div class="grey--text"><strong>Catégorie : </strong>{{Signalement.Catégorie}}</div>
                    <div class="grey--text"><strong>Enregistré le : </strong>{{Signalement.Date_de_publication}}</div>
                    <div class="descriptif grey--text"><strong>Description : </strong>{{Signalement.Description}}</div>
                    </v-card-text>
                    <v-card-actions class="bouttons">
                        <v-dialog v-model="dialog" persistent max-width="800px" class="dialog">
                        <template v-slot:activator="{ on }">
                        <v-btn outlined color="blue" class="deleteM" v-on="on" >
                             <v-icon small left > mdi-wrench</v-icon>
                             <span>Modifier</span>
                        </v-btn>
                        </template>
                        <v-card class="text-center  cardM">
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
                            <option v-for="option in cycles_options" v-bind:value="option.value">{{option.text}}</option>
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
                  </div>
                  <div class="bouttonsD">
                  <v-btn class=" blue-grey lighten-3 " @click="enregistrer()"><span>Enregistrer</span></v-btn>
                                    <v-btn class="" @click="dialog = false"><span>Annuler</span></v-btn>
                  <v-btn class=" blue-grey darken-2" @click="envoyer()"><span>Envoyer</span></v-btn>
                  </div>
                </v-card-text>
              </v-card>
              </v-dialog>
                        <v-btn outlined color="red" class="deleteS">
                             <v-icon small left > mdi-delete</v-icon>
                             <span @click="DeleteSignal(index)">Supprimer</span>
                        </v-btn>
                    </v-card-actions>
                    </v-card>       
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'


export default {
    name : 'SignalementsEnregistres',
    components : {

    },
    data() {
        return {
            selectedItem: 0,
            dialog: false,
            titre: 'Fuite de gaz',
            descriptif: '',
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
            'Cycle supérieur, 2ème étage': [{text: "Salle TP 8"}],
            },
            Signalements : [
                {
                    titre : 'Fuite de gaz',
                    Catégorie: 'Plomberie',
                    Date_de_publication: '10/12/2021',
                    publisher: 'Aymen',
                    Etat: 'Validé',
                    Avatar: '/sig.png',
                    Description: "c'est un descriptif ",
                },
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Securité',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Traité',
                    Avatar: '/sig.png',
                    Description: "c'est un descriptif"
                }
            ],
            Signalements1 : [
                {
                    titre : 'Fuite de gaz',
                    Catégorie: 'Plomberie',
                    Date_de_publication: '10/12/2021',
                    publisher: 'Aymen',
                    Etat: 'Validé',
                    Avatar: '/sig.png',
                    Description: "c'est un descriptif"
                },
            ],
            Signalements2 : [
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Securité',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Traité',
                    Avatar: '/sig.png',
                    Description: "c'est un descriptif"
                }
            ]
        }
    },
    computed: {
    lieu: function () {
      return this.cycle + ' ' + this.salle
    }
  },
    methods: {
        DeleteSignal (index) {
      this.Signalements.splice(index, 1)
    },
    async created() {
    try {
      const res = await axios.get(`http://localhost:3000/MesSignalementsEnregistrés`);
      this.Signalements = res.data;
    } catch(e) {
      alert("Missing data from database");
    }
  },
    async enregistrer () {
         const data = {
                titre: this.titre,
                descriptif: this.descriptif,
                catégorie: this.catégorie,
                lieu: this.lieu,
                image: this.image,
            };
          axios.post('http://localhost:3000',data)
        .then(
                res => {
                    console.log(res)
                    alert('Votre signalement est enregistré avec succès');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
      },
      async envoyer () {
         const data = {
                titre: this.titre,
                descriptif: this.descriptif,
                catégorie: this.catégorie,
                lieu: this.lieu,
                image: this.image,
            };
          axios.post('http://localhost:3000',data)
        .then(
                res => {
                    console.log(res)
                    alert('Votre signalement est envoyé avec succès');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
      },
    }
}
</script>
<style scoped>

.card1 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 950px;
    min-width: 950px;
    height: 164px;
}
.img {
    margin-left: 35px;
}
.tt {
    font-weight: 550;
    font-size: 18px;
}
.titre {
    margin-left: 25px;
    line-height: 250%;
    text-align: left;
}
.descriptif{
    width: 500px;
    max-height: 50px;
}
.deleteS{
    margin-right: 40px;
    margin-top: 30px;
}
.deleteM{
    margin-right: 34px;
}
.lig{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 25px;
}
.bouttons{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.bouttonsD{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
.cardM {
    min-height: 550px;
}
</style>