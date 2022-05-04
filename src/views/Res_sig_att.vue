<template>
    <div class="LesSignalements">
        <h1 class="subheading grey--text">Signalements Utilisateurs</h1>
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
            <v-list-item-content @click="TousSign();btn=false">
              <v-list-item-title >Tous Les Signalements</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item>
            <v-list-item-content @click="SignEnAtt();btn=true">
              <v-list-item-title >Signalements En Attente</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item>
            <v-list-item-content @click="SignVal();btn=false">
              <v-list-item-title >Signalements Validés</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item>
          <v-list-item-content @click="SignInfo();btn=false">
              <v-list-item-title >Signalements Pas complets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider vertical></v-divider>
          <v-list-item>
          <v-list-item-content @click="SignRej();btn=false">
              <v-list-item-title >Signalements Rejetés</v-list-item-title>
            </v-list-item-content >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
            <v-layout row wrap>
                <v-flex  v-for="(Signalement, index) in Signalements" :key="Signalement.id">
                    <v-card class="text-center ma-3 card1">
                    <v-responsive class="pt-0 img">
                    <v-avatar size="100" class="red lighten-2">
                        <img src="/sig.png" alt="" >
                    </v-avatar>
                    </v-responsive>
                    <v-card-text class="titre">
                    <div class="subheading tt">{{Signalement.titre}}</div>
                    <div class="grey--text"><strong>Catégorie : </strong>{{Signalement.Catégorie}}</div>
                    <div class="grey--text"><strong>Publié le : </strong>{{Signalement.Date_de_publication}}</div>
                    </v-card-text>
                    <v-card-text class="etat" v-if="!btn">
                        <div class="subheading tt">Etat</div>
                        <div class="subheading">{{Signalement.Etat}}</div>
                        <!-- <div class="subheading">{{Signalement.id}}</div> -->
                    </v-card-text>
                    <v-card-text class="etat" v-if="btn">
                            <v-btn small outlined color="green" @click="valider(Signalement.id)" class="mr-0" dark>
                                <v-icon left small>check</v-icon>
                                <span class="caption text-lowercase">Valider</span>
                            </v-btn>
                            <v-btn small outlined color="red" @click="rejeter(Signalement.id)" class="mr-0" dark>
                                <v-icon left small>delete</v-icon>
                                <span class="caption text-lowercase">Rejeter</span>
                            </v-btn>
                            <v-btn small outlined color="orange" @click="info(Signalement.id)" class="mr-0" dark>
                                <v-icon left small>add</v-icon>
                                <span class="caption text-lowercase">Demender info</span>
                            </v-btn>
                    </v-card-text>
                    <v-card-actions class="mr-10">
                                <v-btn small outlined color="blue" class="mr-0" dark @click.stop="dialog = true">
                                  <v-icon small left >settings</v-icon>
                                   <span class="caption text-lowercase">Consulter</span>
                                </v-btn>
                    <v-dialog v-model="dialog" max-width="800px">
                                <v-card class="text-center">
                                  <v-card-text>
                                    <div>
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
                                          <div class=" form-group">
                                        <label for="site">Site</label>
                                          <select class="text1 form-control" name="site" id="site" v-model="site" @change="onChange1($event)">
                                            <option disabled value=''  selected>Selectionnez le site</option>
                                            <option v-for="option in sites_options" v-bind:value="option.value" v-bind:key="option.text" >{{option.text}}</option>
                                          </select>
                                        </div>
                                        <div class="form-group">
                                          <label for="etage">Etage</label>
                                          <select class="text2 form-control " name="etage" id="etage" v-model="etage" @change="onChange2($event)">
                                            <option value="" disabled selected>Selectionnez l'etage</option>
                                            <option v-for="option in etages_options[site]" v-bind:value="option.text" v-bind:key="option.text">{{option.text}}</option>
                                          </select>
                                        </div>
                                        <div class="form-group">
                                          <label for="salle">Salle</label>
                                          <select class="text3 form-control " name="salle" id="salle" v-model="salle" @change="onChange3($event)">
                                            <option value="" disabled selected>Selectionnez la salle</option>
                                            <option v-for="option in salles_options[etage]" v-bind:value="option.text" v-bind:key="option.text">{{option.text}}</option>
                                          </select>
                                        </div>
                                        </div>
                                        <v-text-field 
                                          label="lieu"
                                          v-model="lieu"
                                          prepend-icon="place"
                                          type="text"
                                          disabled
                                          ></v-text-field>
                                          <v-file-input
                                            v-model="image"
                                            accept="image/*"
                                            label="Ajouter une image "
                                            prepend-icon="add_a_photo"
                                          ></v-file-input>
                                    </div>
                                    <div class="bouttonsD">
                                    <v-btn class=" blue-grey lighten-3 " @click="Confirmer(Signalement.id)"><span class="text-lowercase">Confirmer</span></v-btn>
                                    <v-btn class="" @click="dialog = false"><span>Annuler</span></v-btn>
                                    </div>
                                  </v-card-text>
                                </v-card>
                      </v-dialog>
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
    name : 'LesSignalements',
    components : {

    },
    data() {
        return {
            btn: false,
            selectedItem: 0,
            dialog: false,
         titre: '',
        descriptif: '',
        catégorie:'',
        image: [],
        catégories: ["Hygiène", "Sécurité", "Problèmes techniques", "Santé","Electricité","Plomberie","Problèmes d'équipement","Objet perdu"],
        site: '',
        salle: '',
        etage: '',
        sites_options: [
          {text: "Site Préparatoire",value: 'Site Préparatoire'},
          {text: "Site Supérieur",value:'Site Supérieur' },
       ],
        etages_options: {
          'Site Préparatoire' : [{text:"Rez-de-chaussée", value: 'Rez-de-chaussée '},
                                 {text:"1er Etage", value: '1er Etage'},
                                 ],
          'Site Supérieur': [{text: "rez-de-chaussée", value: 'rez-de-chaussée'},
                             {text: "1er étage", value: '1er étage'},
                             {text: "2ème étage", value: '2ème étage'},
                             ],
          },
        salles_options: {
          'Rez-de-chaussée' : [{text:"Amphi A"},{text: "Amphi B"},{text: "Salle TD 1"},{text: "Salle TD 2"},
          {text: "Salle TD 3"},{text: "Salle TD 4"},{text: "Salle TD 5"},{text: "Salle TD 6"},{text: "Couloir"},
          {text: "hall"},{text:"Bureau"},{text: "Sanitaires"}],
          'rez-de-chaussée' : [{text:"Amphi C"},{text: "Amphi D"},{text: "Amphi E"},{text:"Cabinet de Médecin"},
          {text:"Parking"},{text: "Local Alphabit"},{text: "Local Ingeniums"},{text: "Local GDG"},
          {text: "Loge des agents"},{text: "Sanitaires"},{text: "Salle de soutenance"},{text: "Salle de réunion "},
          {text: "Moussala Homme"},{text: "Moussala Femme"},{text: "Foyer"},{text: "Bibliothèque"},{text: "hall"},{text: "Couloir"},{text:"Bureau"},{text: "Salle TD 1"},
          {text: "Salle TD 2"},{text: "Salle TD 3"},{text: "Salle TD 4"},{text: "Salle TD 5"},{text: "Salle TD 6"},
          {text: "Salle A1"},{text: "Salle A2"},{text: "Salle A3"},{text: "Salle A4"},{text: "Cour"}],
          '1er Etage' : [{text:"Salle TD 7"},{text: "Salle TD 8"},{text: "Salle TD B1"},{text: "Salle TD B2"},
          {text:"Salle TP 1"},{text: "Salle TP 2"},{text: "Salle TP 3"},{text: "Salle TP 4"},
          {text:"Salle de réunion"},{text:"Bureau"},{text: "Couloir"},{text: "hall"},{text: "Sanitaires"}],
          '1er étage' : [{text:"Salle TP 1"},{text: "Salle TP 2"},{text: "Salle TP 3"},{text: "Salle TP 4"},{text: "Salle TP 5"},
          {text: "Salle TP 6"},{text: "Salle TP 7"},{text: "Salle de lecture"},{text: "Cabinet de Médecin"},{text: "Magasin"},
          {text: "Administration"},{text: "Couloir"},{text: "Sanitaires"},{text: "hall"}],
          '2ème étage' : [{text:"Salle TP 8"},{text: "Salle TP 9"},{text: "Salle TP 10"},{text: "Laboratoire de recherche"},
          {text: "Couloir"},{text: "Sanitaires"},{text: "hall"}],

          },
            Signalements : [
                {
                    id:'1',
                    titre : 'Fuite de gaz',
                    Catégorie: 'Plomberie',
                    Date_de_publication: '10/12/2021',
                    publisher: 'Aymen',
                    Etat: 'Validé',
                    image: '/sig.png',
                    description: 'desc1',
                    lieu: 'lieu1',
                },
                {
                    id:'2',
                    titre : 'Animal sauvage',
                    Catégorie: 'Securité',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'Rejeté',
                    image: '/sig.png',
                    description: 'desc2',
                    lieu: 'lieu2'
                },
                {
                    id:'3',
                    titre : 'wahad rah ymout',
                    Catégorie: 'Santé',
                    Date_de_publication: '15/4/2020',
                    publisher: 'TipTop',
                    Etat: 'En Attente',
                    image: '/sig.png',
                    description: 'desc2',
                    lieu: 'lieu2'
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
                    alert('Votre signalement est modifié avec succès');
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
    },
    
    async created() {
    try {
      const res = await axios.get(`http://localhost:3000/LesSignalements`);
      this.Signalements = res.data;
    } catch(e) {
      alert("Missing data from database");
    }
  },
  onChange1(event) {
            {this.site = event.target.value;
            this.etage='';
            this.salle=''}
        },
      onChange2(event) {
            {this.etage = event.target.value;
            this.salle=''}
        },
      onChange3(event) {
            {this.salle = event.target.value;}
        },
    computed: {
    lieu: function () {
      if (this.site  && this.etage && this.salle)
      {return this.site + ' ' + this.etage + ' ' + this.salle}
      else {return ''}
    },
    
  },
    methods: {
        async Confirmer (id) {
         const data = {
                titre: this.titre,
                descriptif: this.descriptif,
                catégorie: this.catégorie,
                lieu: this.lieu,
                image: this.image,
            };
          axios.post('http://localhost:3000',data, id)
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
        TousSign() {
          const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;
        },
        SignEnAtt() {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
            let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].Etat !== 'En Attente'){
              this.Signalements.splice(i, 1)
            }else {
              i++
            }
          }
        },
        async valider(id) {
            this.Signalements[id].Etat = 'validé';
            try{
              await axios.put('http://localhost:3000/LesSignalements/${this.Signalements[id].token}',this.signalemets),
              alert("Signalemet validé")
            }catch(e){
              alert("Erreur: Signalement pas validé")
            }
        },
        async rejeter(id){
            this.Signalements[id].Etat = 'rejeté';
            try{
              await axios.put('http://localhost:3000/LesSignalements/${this.Signalements[id].token}',this.signalemets),
              alert("Signalemet rejeté")
            }catch(e){
              alert("Erreur: Signalement pas rejeté")
            }
        },
        async info(id){
            this.Signalements[id].Etat = 'plusInfo';
            try{
              await axios.put('http://localhost:3000/LesSignalements/${this.Signalements[id].token}',this.signalemets),
              alert("Signalemet a besion de plus d'informations")
            }catch(e){
              alert("Erreur: Operation non effectué")
            }
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
        SignInfo() {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
            let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].Etat !== 'PasComplet'){
              this.Signalements.splice(i, 1)
            }else {
              i++
            }
          }
        },
        SignRej() {
          /*const res = axios.get(`http://localhost:3000/LesSignalements`);
          this.Signalements = res.data;*/
            let i = 0
          while (i < this.Signalements.length){
            if (this.Signalements[i].Etat !== 'Rejeté'){
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
.bouttonsD{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.signal {
  width: 70%;
  padding: 10px;
   margin-top: 10px;
   position: relative;
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
.cycle{
 position: relative;
    left: -4.5cm;
  }

.form-control{
  position: relative;
    left: 0.5cm;
}
.text1 {
  position: relative;
  left: 10px;
  border: 1px solid grey;
  border-radius: 3px;
}
.text2 {
  position: relative;
  left: 10px;
  border: 1px solid  grey;
  border-radius: 3px;
  
}
.text3 {
  position: relative;
  left: 10px;
  border: 1px solid grey;
  border-radius: 3px;
  
}
.lieu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>