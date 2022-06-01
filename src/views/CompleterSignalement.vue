<template>
  <div class="CompleterSignalement">
    <h1 class="subheading grey--text">
      Signalements à Completer pour être validé
    </h1>
    <v-container>
      <v-layout row wrap>
        <v-flex
          v-for="(Signalement, index) in Signalements"
          :key="Signalement.titre"
        >
          <v-card class="text-center ma-3 card1">
            <div class="img">
           <v-img
        :aspect-ratio="16/9"
        :width="width"
         :src= Signalement.picture
      ></v-img>
      </div>
            <v-card-text class="titre">
              <div class="subheading tt">{{ Signalement.title }}</div>
              <div class="grey--text">
                <strong>Catégorie : </strong>{{ Signalement.category }}
              </div>
              <div class="grey--text">
                <strong>Enregistré le : </strong>{{ Signalement.dateOf }}
              </div>
              <div class="descriptif grey--text">
                <strong>Motif : </strong>{{ Signalement.motif }}
              </div>
            </v-card-text>
            <v-card-actions class="bouttons">
              <v-dialog
                v-model="dialog"
                :retain-focus="false"
                persistent
                max-width="800px"
                class="dialog"
              >
                <template v-slot:activator="{ on }">
                  <v-btn outlined color="blue" class="deleteM" v-on="on">
                    <v-icon small left> mdi-wrench</v-icon>
                    <span @click="Modifier(index)">Modifier</span>
                  </v-btn>
                </template>
                <v-card class="text-center cardM">
                  <v-card-text>
                    <div class="signal">
                      <v-select
                        v-model="defaultCatégorie"
                        item-text="nom"
                        :items="catégories"
                        label="Catégorie"
                        prepend-icon="category"
                        required
                        :rules="[(v) => !!v || 'champs obligatoire']"
                      ></v-select>
                      <v-text-field
                        v-model="title"
                        :rules="[(v) => !!v || 'champs obligatoire']"
                        label="Titre"
                        required
                        prepend-icon="title"
                      ></v-text-field>
                      <v-textarea
                        clearable
                        clear-icon="mdi-close-circle"
                        label="Description (optionnelle)"
                        v-model="description"
                        prepend-icon="description"
                        rows="2"
                      ></v-textarea>
                      <v-text-field
                        label="Date"
                        v-model="dateOf"
                        prepend-icon="mdi-calendar"
                        type="text"
                      ></v-text-field>
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
                            <option value="" disabled selected>
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
                        disabled
                        type="text"
                      ></v-text-field>
                      <v-file-input
                        v-model="picture"
                        accept="image/*"
                        label="Ajouter une image "
                        prepend-icon="add_a_photo"
                      ></v-file-input>
                      <v-text-field
                        label="Motif à Completer"
                        v-model="Motif"
                        prepend-icon="warning"
                        disabled
                        type="text"
                      ></v-text-field>
                    </div>
                    <div class="bouttonsD">
                      <v-btn class="" @click="dialog = false"
                        ><span>Annuler</span></v-btn
                      >
                      <v-btn class="" @click="(dialog = false), enregistrer()"
                        ><span>Confirmer</span></v-btn
                      >
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
import axios from "axios";
import router from "../router/index";
import setAuthHeader from "@/utils/setAuthHeader";
export default {
  name: "SignalementsEnregistres",
  components: {},
  data() {
    return {
      selectedItem: 0,
      dialog: false,
      width: '290',
      title: "",
      varIndex: "",
      description: "",
      category: "",
      picture: [],
      defaultCatégorie: "",
      motif: "",
      catégories: [
        { nom: "Hygiène" },
        { nom: "Sécurité" },
        { nom: "Problèmes techniques" },
        { nom: "Santé" },
        { nom: "Electricité" },
        { nom: "Plomberie" },
        { nom: "Problèmes d'équipement" },
        { nom: "Objet perdu" },
      ],
      site: "",
      salle: "",
      etage: "",
      defaultsite: "",
      defaultsalle: "",
      defaultetage: "",
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
      Signalements: [
        {
          id: "",
          title: "fuite",
          category: "agea",
          dateOf: "561561",
          Avatar: "/sig.png",
          description: "",
          site: "",
          etage: "",
          salle: "",
          motif: "libb",
        },
      ],
    };
  },
  computed: {
    localisation: function () {
      if (this.site && this.etage && this.salle) {
        return this.site + ", " + this.etage + ", " + this.salle;
      } else {
        return "";
      }
    },
  },
  async created() {
    try {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/user/getAllMyNeedMoreInfosReportsByUser`
      );
      this.Signalements = res.data;

      let j = 0;
      while (j < this.Signalements.length) {
        this.Signalements[j].category = res.data[j].category.name;
        // this.Signalements[j].auteur = res.data[j].user.email;
        j++;
      }
    } catch (e) {
      alert("Missing data from database");
    }
  },
  methods: {
    onChange1(event) {
      {
        this.site = event.target.value;
        this.etage = "";
        this.salle = "";
      }
    },
    onChange2(event) {
      {
        this.etage = event.target.value;
        this.salle = "";
      }
    },
    onChange3(event) {
      {
        this.salle = event.target.value;
      }
    },
    async Modifier(index) {
      try {
        this.varIndex = index;
        const acc = localStorage.getItem("xaccesstoken");
        setAuthHeader(acc);
        const res = await axios.get(
          `http://localhost:8080/api/madrasa-tic/user/selectOneOfMyReportsByUser/${
            this.Signalements[this.varIndex].id
          }`
        );
        this.title = res.data.title;
        this.description = res.data.description;
        this.category = res.data.category;
        this.localisation = res.data.localisation;
        this.site = res.data.site;
        this.etage = res.data.etage;
        this.salle = res.data.salle;
        this.dateOf = res.data.dateOf;
        //this.picture = res.data.picture;
        this.defaultCatégorie = res.data.category;
      } catch {
        alert("Missing data from database");
      }
    },
    async envoyer() {
      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      const data = {
        title: this.title,
        description: this.description,
        category: this.defaultCatégorie,
        //  localisation: this.localisation,
        site: this.site,
        etage: this.etage,
        salle: this.salle,
        picture: this.picture,
        dateOf: this.dateOf,
      };
      await axios
        .put(
          `http://localhost:8080/api/madrasa-tic/user/userEditReportAndSubmit/${
            this.Signalements[this.varIndex].id
          }`,
          data
        )
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.status == 201) {
            router.push("/SignalDash");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Veillez remplir tout les champs correctement.");
        });
    },
  },
};
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
.descriptif {
  width: 500px;
  max-height: 50px;
}
.deleteS {
  margin-right: 40px;
  margin-top: 30px;
}
.deleteM {
  position: absolute;
  margin-right: 180px;
}
.lig {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 25px;
}
.bouttons {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.bouttonsD {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.text {
  margin-left: 3cm;
  font-size: 13px;
}
.signal {
  width: 700px;
  padding: 10px;
  margin-top: 10px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
.envoie {
  position: relative;
  left: 4cm;
  width: 15%;
}
.enregistrer {
  position: relative;
  left: -4cm;
}
.cycle {
  position: relative;
  left: -4.5cm;
}
.form-control {
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
  border: 1px solid grey;
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
.img{
  position: relative;
  left: -34px;
}
</style>
