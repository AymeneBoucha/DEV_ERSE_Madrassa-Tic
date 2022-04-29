<template>
    <div class="LesSignalements">
        <h1 class="subheading grey--text">Les Signalements</h1>
        <v-container>
          <v-col cols="5" xs6 sm4 md2 class="filtre">
                            <v-menu offset-x>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                small
                                outlined
                                color="green"
                                class="mr-2"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >
                                    <v-icon left small>check</v-icon>
                                    <span class="caption text-lowercase">Filtrer par catégories</span>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                v-for="Service in Services"
                                :key="Service.nom"
                                @click="Filtrer(Service.nom)"
                                >
                                <v-list-item-title>{{ Service.nom }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            </v-menu>
                </v-col>
          <v-card
          class="cardS"
      min-width="950"
      width="950"
      tile
    >
      <v-list dense>
        <v-list-item-group
        class="lig"
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item>
            <v-list-item-content @click="TousSign()">
              <v-list-item-title >Tous Les Signalements</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <!--<v-list-item>
            <v-list-item-content @click="SignenAtt()">
              <v-list-item-title >Signalements En Attente</v-list-item-title>
            </v-list-item-content>
          </v-list-item>-->
          <v-divider vertical></v-divider>
          <v-list-item>
            <v-list-item-content @click="SignVal()">
              <v-list-item-title >Signalements Validés</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item>
          <v-list-item-content @click="SignTrait()">
              <v-list-item-title >Signalements Traités</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <!--<v-list-item>
          <v-list-item-content @click="SignRej()">
              <v-list-item-title >Signalements Rejetés</v-list-item-title>
            </v-list-item-content >
          </v-list-item>-->
        </v-list-item-group>
      </v-list>
    </v-card>
            <v-layout row wrap>
                <v-flex  v-for="Signalement in Signalements" :key="Signalement.titre">
                    <v-card class="text-center ma-3 card1">
                    <v-responsive class="pt-0 img">
                    <v-avatar size="100" class="red lighten-2">
                        <img src="/sig.png" alt="" >
                    </v-avatar>
                    </v-responsive>
                    <v-card-text class="titre" >
                    <div class="subheading tt">{{Signalement.titre}}</div>
                    <div class="grey--text"><strong>Catégorie : </strong>{{Signalement.Catégorie}}</div>
                    <div class="grey--text"><strong>Publié le : </strong>{{Signalement.Date_de_publication}}</div>
                    <div class="grey--text"><strong>Publié par : </strong>{{Signalement.publisher}}</div>
                    </v-card-text>
                    <v-card-text class="etat">
                        <div class="subheading tt">Etat</div>
                        <div class="subheading">{{Signalement.Etat}}</div>
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
    name : 'LesSignalements',
    components : {

    },
    data() {
        return {
            selectedItem: 0,
            Signalements : [
                {
                    titre : 'Fuite de gaz',
                    Catégorie: 'Plomberie',
                    Date_de_publication: '10/12/2021',
                    publisher: 'Aymen',
                    Etat: 'Validé',
                    Avatar: '/sig.png'
                },
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Securité',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Traité',
                    Avatar: '/sig.png'
                },
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Santé',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Traité',
                    Avatar: '/sig.png'
                },
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Electricité',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Validé',
                    Avatar: '/sig.png'
                },
            ],
            Services : [
              {nom: 'Securité'},
              {nom: 'Plomberie'},
              {nom: 'Electricité'},
              {nom: 'Hygiéne'},
              {nom: 'Santé'},
              {nom: 'Probleme technique'},
              {nom: "Probléme d'équipement"},
              {nom: 'Objet perdu'}
    ],
        }
    },
    async created() {
    try {
      const res = await axios.get(`http://localhost:3000/LesSignalements`);
      this.Signalements = res.data;
    } catch(e) {
      alert("Missing data from database");
    }
  },
    methods: {
        TousSign() {
          const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;
        },
        SignVal() {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
            let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].Etat !== 'Validé'){
              this.Signalements.splice(i, 1)
            }else {
              i++
            }
          }
        },
        SignTrait() {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
            let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].Etat !== 'Traité'){
              this.Signalements.splice(i, 1)
            }else {
              i++
            }
          }
        },
        Filtrer(categorie) {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
          let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].Catégorie !== categorie){
              this.Signalements.splice(i, 1)
            }else {
              i++
            }
          }
        }
    }
}
</script>
<style>

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
.etat {
    margin-right: 150px;
    line-height: 300%;
}
.deleteS{
    margin-right: 40px;
}
.lig{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 25px;
}
.filtre{
  display: flex;
  flex-direction: row;
   margin-left: -14px;
}
</style>