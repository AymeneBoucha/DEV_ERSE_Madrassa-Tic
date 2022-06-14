<template>
  <div>
    <h1 class="subheading grey--text">Ajouter Announce</h1>
    <v-form>
      <v-container>
        <v-layout class="container">
          <v-flex class="const">
            <v-card class="text-center card" min-width="950" min-height="520">
              <v-card-text>
                <div class="announce">
                  <v-text-field
                    v-model="title"
                    :rules="[(v) => !!v || 'champs obligatoire']"
                    label="Titre"
                    required
                    prepend-icon="title"
                  ></v-text-field>
                  <v-text-field
                    label="Lieu"
                    v-model="localisation"
                    prepend-icon="place"
                    type="text"
                    required
                  ></v-text-field>
                  <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    label="Description"
                    v-model="description"
                    rows="3"
                    required
                  
                    prepend-icon="description"
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
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateDebutEvent"
                          label="Date Début"
                          prepend-icon="mdi-calendar"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateDebutEvent"
                        :min="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        max="2050-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFinEvent"
                          label="Date Fin"
                          prepend-icon="mdi-calendar"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateFinEvent"
                        :min="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        max="2050-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="date">
                    <v-menu
                      ref="menu"
                      v-model="menu3"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateDebutDisplay"
                          label="Date d'Affichage"
                          prepend-icon="mdi-calendar"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateDebutDisplay"
                        :min="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        max="2050-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                    <v-menu
                      ref="menu"
                      v-model="menu4"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFinDisplay"
                          label="Date d'Expiration"
                          prepend-icon="mdi-calendar"
                          readonly
                          required
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateFinDisplay"
                        :min="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                        max="2050-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <v-file-input
                    v-model="picture"
                                        @change="onFileSelected"

                    accept="image/*"
                    label="Ajouter une image "
                    prepend-icon="add_a_photo"
                  >
                  </v-file-input>
                  <v-btn
                    class="envoie"
                    @click="envoyer()"
                    outlined
                    color="primary"
                    ><span class="Dt">Envoyer</span></v-btn
                  >
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
import router from "../router/index";
import setAuthHeader from "@/utils/setAuthHeader";
export default {
  name: "AjouterAnnonce",
  components: {},
  data: () => ({
    title: "",
    description: "",
    menu: false,
    menu2: false,
        menu3: false,

    menu4: false,

    dateDebutEvent: "",
        dateFinEvent: "",

    dateDebutDisplay: "",
        selectedFile:null,


    dateFinDisplay: "",

    picture: "",
  }),

  dateOf: function () {
    if (this.date && this.time) {
      return this.date + " " + this.time;
    } else {
      return "";
    }
  },
  methods: {
       onFileSelected(event){
      console.log(event)
            console.log("this. beyna picture")
      this.selectedFile = event
      console.log(this.selectedFile)
    },
    async envoyer() {

           const data = new FormData()
    
   data.append('picture', this.selectedFile)
      data.append('title', this.title)
         data.append('description', this.description)
                  data.append('localisation', this.localisation)

   data.append('dateDebutEvent', this.dateDebutEvent)
   data.append('dateFinEvent', this.dateFinEvent)
   data.append('dateDebutDisplay', this.dateDebutDisplay)
   data.append('dateFinDisplay', this.dateFinDisplay)

      const acc = localStorage.getItem("xaccesstoken");
      setAuthHeader(acc);
      axios
        .post("http://localhost:8080/api/madrasa-tic/announcer/submitAnnouncementByAnnouncer", data)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          if (res.status == 201) {
            router.push("MesAnnoncesAnnouncer");
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
.text {
  margin-left: 3cm;
  font-size: 13px;
}
.announce {
  width: 70%;
  padding: 10px;
  margin-top: -20px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
.envoie {
  position: relative;
  left: 1cm;
  width: 15%;
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
.date {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.Dt {
  text-transform: none;
}
.container {
  margin-bottom: 20%;
}
</style>