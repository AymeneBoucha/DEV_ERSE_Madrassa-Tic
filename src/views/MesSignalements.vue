<template>
    <div class="MesSignalements">
        <h1 class="subheading grey--text">Mes Signalements</h1>
        <v-container>
            <v-card
          class="cardS"
      min-width="950"
      width="950"
      tile
    >
      <v-list dense class="listS">
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
          <v-list-item>
            <v-list-item-content @click="SignenAtt()">
              <v-list-item-title >Signalements En Attente</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
          <v-list-item>
          <v-list-item-content @click="SignRej()">
              <v-list-item-title >Signalements Rejetés</v-list-item-title>
            </v-list-item-content >
          </v-list-item>
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
    name : 'MesSignalements',
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
                    Etat: 'Validé',
                    Avatar: '/sig.png'
                },
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Securité',
                    Date_de_publication: '15/4/2020',
                    Etat: 'En attente',
                    Avatar: '/sig.png'
                }
            ],
            Signalements1 : [
                {
                    titre : 'Fuite de gaz',
                    Catégorie: 'Plomberie',
                    Date_de_publication: '10/12/2021',
                    publisher: 'Aymen',
                    Etat: 'Validé',
                    Avatar: '/sig.png'
                },
            ],
            Signalements2 : [
                {
                    titre : 'Animal sauvage',
                    Catégorie: 'Securité',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Traité',
                    Avatar: '/sig.png'
                }
            ]
        }
    },
    async created() {
    try {
      const res = await axios.get(`http://localhost:3000/MesSignalements`);
      this.Signalements = res.data;
    } catch(e) {
      alert("Missing data from database");
    }
  },
    metthods: {
        TousSign() {

        },
        SignenAtt() {

        },
       SignVal() {
            this.Signalements = this.Signalements1
        },
        SignTrait() {
            this.Signalements = this.Signalements2
        },
        SignRej() {
            
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
/*.toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 950px;
    min-width: 950px;
    height: 40px;
}
.textS {
    font-size: 15px;
    text-transform: capitalize;
    color: rgb(255, 255, 255);
}*/
.lig {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 25px;
}
</style>