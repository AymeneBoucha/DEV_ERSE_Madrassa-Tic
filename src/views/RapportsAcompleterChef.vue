<template>
  <div class="Signalementtraiter">
    <h1 class="subheading grey--text">Rapports A completer</h1>
    <v-container>
      <v-layout row wrap>
        <v-flex v-for="(Rapport, index) in Rapports" :key="Rapport.titre">
          <v-card class="text-center ma-2 card" color="#F0FFF0">
            <v-responsive class="pt-3">
              <v-avatar size="170" class="red lighten-2">
                <img src="/p.png" alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text class="titre">
              <div class="subheading sig">{{ Rapport.title }}</div>
              <div class="grey-text">
                <strong>Durée de traitement: </strong>{{ Rapport.dateOf }}
              </div>
            </v-card-text>
            <v-card-actions>
              <v-dialog
                v-model="dialog3"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="Consulter(index)"
                    outlined
                    color="blue"
                    class="cont"
                    v-on="on"
                  >
                    <v-icon small left>mdi-eye</v-icon>
                    <span class="text-lowercase">Details</span>
                  </v-btn>
                </template>
                <v-card class="text-center cardM">
                  <v-card-text>
                    <div>
                      <h2 class="subheading">Rapport</h2>
                      <v-text-field
                        v-model="titleR"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Titre"
                        required
                        disabled
                        prepend-icon="title"
                      ></v-text-field>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Description "
                        v-model="descriptionR"
                        disabled
                        prepend-icon="description"
                        rows="2"
                      ></v-textarea>
                      <div class="date">
                

                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateOfR"
                              label="Fin de traitement"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                              disabled
                            ></v-text-field>
                          </template>
                          <!--v-date-picker
                                    v-model="datefin"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                ></v-date-picker-->
                        </v-menu>
                      </div>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Matériel"
                        v-model="materialR"
                        disabled
                        prepend-icon="description"
                        rows="2"
                      ></v-textarea>
                      <v-file-input
                        v-model="imageR"
                        accept="image/*"
                        disabled
                        label="Ajouter une image "
                        prepend-icon="add_a_photo"
                      ></v-file-input>
                    </div>
                    <div class="bouttonsD">
                      <v-btn @click="dialog3 = false"
                        ><span>Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>

                            <v-dialog v-model="dialog4"  :retain-focus="false" persistent max-width="800px" class="dialog">
                       <template v-slot:activator="{ on }">
                          <v-btn @click="Consulter(index)" outlined color="blue" class="cont" v-on="on">
                          <v-icon small left>mdi-wrench</v-icon>
                          <span class="text-lowercase">Modifier</span>
                      </v-btn>
                       </template><!--@click="modifier(index)"-->
                        <v-card class="text-center  cardM">
                <v-card-text>
                  <div >
                      <h2 class="subheading">Rapport</h2>
                        <v-text-field
                            v-model="titleR"
                            :rules="[v => !!v || 'champs obligatoire']"
                            label="Titre"
                            required
                            prepend-icon="title"
                        ></v-text-field>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Description "
                            v-model="descriptionR"
                            prepend-icon="description"
                            rows="2"
                        ></v-textarea>
                      <div class="date">
                

                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="dateOfR"
                              label="Fin de traitement"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                                    v-model="dateOf"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                ></v-date-picker>
                        </v-menu>
                      </div>
                        <v-textarea
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Matériel"
                            v-model="materialR"
                            prepend-icon="description"
                            rows="2"
                        ></v-textarea>
                        <v-file-input
                          v-model="pictureR"
                          accept="image/*"
                          label="Ajouter une image "
                          prepend-icon="add_a_photo"
                        ></v-file-input>

                  </div>
                  <div class="bouttonsD">
                    <v-btn  @click="dialog4 = false"  ><span>Annuler</span></v-btn>
                    <v-btn class=" blue-grey darken-2" ><span  @click="Confirmer(), dialog3 = false ">Confirmer</span></v-btn>
                   </div>
                </v-card-text>
              </v-card>
              </v-dialog>

              <v-dialog
              v-model="dialog2"
              :retain-focus="false"
              persistent
              max-width="600px"
          >
              <template v-slot:activator="{ on }">
                  <v-btn @click="Motif(index)" outlined color="blue" class="cont" v-on="on" >
                      <v-icon small left>info</v-icon>
                      <span class="text-lowercase">Motif</span>
                  </v-btn>
              </template>
              <v-card class="cardT">
              <v-card-text>
                  <h2 class="subheading grey--text pt-7 text-center">L'information manquante:</h2>
                  <v-card-text>
                  <div class="signal">
                          <v-textarea
                          clearable
                          clear-icon="mdi-close-circle"
                          label="Information manquante"
                          v-model="motifR"
                          disabled
                          rows="3"
                          ></v-textarea>
                  </div>
                  </v-card-text>
                  <div class="bouttonsV">
                  <v-btn @click="dialog2 = false"
                      ><span>Annuler</span></v-btn
                  >
                  </div>
              </v-card-text>
              </v-card>
          </v-dialog>
          
            </v-card-actions>

            <v-card-text class="mr-0">
              <v-dialog v-model="dialog" persistent max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="ConsulterSig(index)"
                    outlined
                    color="blue"
                    class="cont"
                    v-on="on"
                  >
                    <v-icon small left>mdi-alert</v-icon>
                    <span class="text-lowercase">Signalement Attaché</span>
                  </v-btn>
                </template>
                <v-card class="text-center cardM">
                  <v-card-text>
                    <div>
                      <v-text-field
                        v-model="titleS"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Titre"
                        required
                        disabled
                        prepend-icon="title"
                      ></v-text-field>
                      <v-textarea
                        clearable
                        disabled
                        clear-icon="mdi-close-circle"
                        label="Description (optionnelle)"
                        v-model="descriptionS"
                        prepend-icon="description"
                      ></v-textarea>
                      <div class="lieu">
                        <div class="form-group">
                          <label for="site">Site</label>
                          <select
                            class="text1 form-control"
                            name="site"
                            id="site"
                            v-model="site"
                            @change="onChange1($event)"
                          >
                            <option value="" disabled selected>
                              Selectionnez le site
                            </option>
                            <option
                              v-for="option in sites_options"
                              v-bind:value="option.value"
                              v-bind:key="option.text"
                            >
                              {{ option.text }}
                            </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="etage">Etage</label>
                          <select
                            class="text2 form-control"
                            name="etage"
                            id="etage"
                            v-model="etage"
                            @change="onChange2($event)"
                          >
                            <option value="" disabled selected>
                              Selectionnez l'etage
                            </option>
                            <option
                              v-for="option in etages_options[site]"
                              v-bind:value="option.text"
                              v-bind:key="option.text"
                            >
                              {{ option.text }}
                            </option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="salle">Salle</label>
                          <select
                            class="text3 form-control"
                            name="salle"
                            id="salle"
                            v-model="salle"
                            @change="onChange3($event)"
                          >
                            <option disabled value="" selected>
                              Selectionnez la salle
                            </option>
                            <option
                              v-for="option in salles_options[etage]"
                              v-bind:value="option.text"
                              v-bind:key="option.text"
                            >
                              {{ option.text }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <v-text-field
                        label="lieu"
                        v-model="localisation"
                        prepend-icon="place"
                        type="text"
                        disabled
                      ></v-text-field>
                      <v-file-input
                        v-model="imageS"
                        accept="image/*"
                        label="Ajouter une image "
                        prepend-icon="add_a_photo"
                        disabled
                      ></v-file-input>
                    </div>
                    <div class="bouttonsD">
                      <v-btn class="" @click="dialog = false"
                        ><span class="text-lowercase">Annuler</span></v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import setAuthHeader from "@/utils/setAuthHeader";

    const acc = localStorage.getItem('xaccesstoken');
      setAuthHeader(acc);

export default {
  name: "RapportsEnvoyésChef",
  components: {},
  data() {
    return {
      Signalements: [
        {
          title: "",
          category: "",
          dateOf: "",
          state: "",
          Avatar: "/sig.png",
          auteur: "",
        },
      ],
      Rapports: [
        {
          title: "",
          description: "",
          category: "",
          auteur: "",
          dateOf: "",
          image: [],
          motif: "",
        },
      ],
      selectedItem: 0,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      des: "",

      titleS: "",
      descriptionS: "",
      categoryS: "",
      dateOfS: "",

      auteurS: "",
      imageS: [],
      site: "",
      salle: "",
      etage: "",
//lieuS:"",
      varIndex: "",

      catégories: [],

      // categorie_rapport: '',
      datefin: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      datedebut: "",

      titleR: "",
      descriptionR: "",
      categoryR: "",
      auteurR: "",
      imageR: [],
      materialR:"",
      motifR: "",

      sites_options: [
        { text: "Site Préparatoire", value: "Site Préparatoire" },
        { text: "Site Supérieur", value: "Site Supérieur" },
      ],
      etages_options: {
        "Site Préparatoire": [
          { text: "Rez-de-chaussée", value: "Rez-de-chaussée " },
          { text: "1er Etage", value: "1er Etage" },
        ],
        "Site Supérieur": [
          { text: "rez-de-chaussée", value: "rez-de-chaussée" },
          { text: "1er étage", value: "1er étage" },
          { text: "2ème étage", value: "2ème étage" },
        ],
      },
      salles_options: {
        "Rez-de-chaussée": [
          { text: "Amphi A" },
          { text: "Amphi B" },
          { text: "Salle TD 1" },
          { text: "Salle TD 2" },
          { text: "Salle TD 3" },
          { text: "Salle TD 4" },
          { text: "Salle TD 5" },
          { text: "Salle TD 6" },
          { text: "Couloir" },
          { text: "hall" },
          { text: "Bureau" },
          { text: "Sanitaires" },
        ],
        "rez-de-chaussée": [
          { text: "Amphi C" },
          { text: "Amphi D" },
          { text: "Amphi E" },
          { text: "Cabinet de Médecin" },
          { text: "Parking" },
          { text: "Local Alphabit" },
          { text: "Local Ingeniums" },
          { text: "Local GDG" },
          { text: "Loge des agents" },
          { text: "Sanitaires" },
          { text: "Salle de soutenance" },
          { text: "Salle de réunion " },
          { text: "Moussala Homme" },
          { text: "Moussala Femme" },
          { text: "Foyer" },
          { text: "Bibliothèque" },
          { text: "hall" },
          { text: "Couloir" },
          { text: "Bureau" },
          { text: "Salle TD 1" },
          { text: "Salle TD 2" },
          { text: "Salle TD 3" },
          { text: "Salle TD 4" },
          { text: "Salle TD 5" },
          { text: "Salle TD 6" },
          { text: "Salle A1" },
          { text: "Salle A2" },
          { text: "Salle A3" },
          { text: "Salle A4" },
          { text: "Cour" },
        ],
        "1er Etage": [
          { text: "Salle TD 7" },
          { text: "Salle TD 8" },
          { text: "Salle TD B1" },
          { text: "Salle TD B2" },
          { text: "Salle TP 1" },
          { text: "Salle TP 2" },
          { text: "Salle TP 3" },
          { text: "Salle TP 4" },
          { text: "Salle de réunion" },
          { text: "Bureau" },
          { text: "Couloir" },
          { text: "hall" },
          { text: "Sanitaires" },
        ],
        "1er étage": [
          { text: "Salle TP 1" },
          { text: "Salle TP 2" },
          { text: "Salle TP 3" },
          { text: "Salle TP 4" },
          { text: "Salle TP 5" },
          { text: "Salle TP 6" },
          { text: "Salle TP 7" },
          { text: "Salle de lecture" },
          { text: "Cabinet de Médecin" },
          { text: "Magasin" },
          { text: "Administration" },
          { text: "Couloir" },
          { text: "Sanitaires" },
          { text: "hall" },
        ],
        "2ème étage": [
          { text: "Salle TP 8" },
          { text: "Salle TP 9" },
          { text: "Salle TP 10" },
          { text: "Laboratoire de recherche" },
          { text: "Couloir" },
          { text: "Sanitaires" },
          { text: "hall" },
        ],
      },
    };
  },
/*
  computed: {
    categorie_rapport: function (index) {
      return this.Signalements[index].Catégorie;
    },
    datedebut: function (index) {
      return this.signalements[index].Date_de_Traitement;
    },
  },
  */

  async created() {
    try {
      const res = await axios.get(`http://localhost:8080/api/madrasa-tic/employer/getAllMyNeedMoreInfosRaportsByEmployer`);
      this.Rapports = res.data;

      let i = 0;
      while (i < this.Rapports.length) {
        this.Rapports[i].category = res.data[i].report.category.name;
         this.Rapports[i].auteur = res.data[i].user.email;
        i++
      }
    } catch (e) {
      alert("Missing data from database");
    }
  },

 

  computed: {
    localisation: function () {
      if (this.site  && this.etage && this.salle)
      {return this.site + ' ' + this.etage + ' ' + this.salle}
      else {return ''}
    },
   //dateOf: function () {
     //    if (this.date  && this.time )
    //{return this.date + ' ' + this.time }
      //else {return ''}
     
    //},
  },



  
  
  methods:{
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
         async Motif(index) {
    try {
        this.varIndex=index
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/employer/selectOneOfMyRaportsByEmployer/${this.Rapports[this.varIndex].id}`
        );
        this.motifR = res.data.motif;
      } catch {
        alert("Missing data from database");
      }
      },
      Modifier(index){
        this.varIndex = index
      },
      async Confirmer () {
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
         const data =  {
                title: this.titleR,
                description: this.descriptionR,
                // category: this.defaultCatégorie,               
                 material: this.materialR,
                picture: this.pictureR,
                dateOf: this.dateOfR
            };
            console.log(this.materialR)
         await  axios.put(`http://localhost:8080/api/madrasa-tic/employer/employerEditRaportAndSubmit/${this.Rapports[this.varIndex].id}`,data)
        .then(
                res => {
                    console.log(res)
                    alert(res.data.message);
                    // if (res.status==201) { router.push("/RapportsEnvoyés");} 
                }
            ).catch (
                err => {
                    console.log(err)
                    alert('Veillez remplir tout les champs correctement.');
                }
            )
      },


       async Consulter (index) {
      try {
        this.varIndex=index
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/employer/selectOneOfMyRaportsByEmployer/${this.Rapports[this.varIndex].id}`
        );
        this.titleR = res.data.title;
                this.materialR = res.data.material;

        this.descriptionR = res.data.description;
        this.dateOfR = res.data.dateOf;
        this.pictureR = res.data.picture;
     //   this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    async ConsulterSig (index) {
       try {
        
        this.varIndex=index
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/employer/selectOneOfMyReportByEmployer/${this.Rapports[this.varIndex].reportId}`
        );
        this.titleS = res.data.title;
        this.descriptionS = res.data.description;
      //  this.categoryS = res.data.category;
      //  this.lieuS = this.localisation;
        
        this.site = res.data.site;
        this.etage = res.data.etage;
        this.salle = res.data.salle;
        this.dateOfS = res.data.dateOf;
        //this.pictureS = res.data.picture;
       // this.defaultCatégorieS  = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
  }
};

</script>
<style scoped>
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin-left: 10px;
  height: 410px;
}
.img {
  align-items: center;
  margin-bottom: 10px;
}
.sig {
  font-weight: 550;
  font-size: 18px;
  text-align: center;
}
.titre {
  position: relative;
  line-height: 200%;
  text-align: center;
  margin-bottom: 30px;
}
.etat {
  margin-left: 150px;
  line-height: 200%;
}
.cont {
  align-content: center;
  align-items: center;
  margin-bottom: -20px;
  bottom: 12px;
}
</style>