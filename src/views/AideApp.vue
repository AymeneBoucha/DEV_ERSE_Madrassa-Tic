<template>
  <div class="app">
    <v-app-bar app elevate-on-scroll elevation="3" class="grey lighten-2">
      <img src="../assets/LogoOrange.png" width="50" height="50" />
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light"><h3>MADRASSA-TIC</h3></span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text>
        <router-link to="/" class="black--text">
          <span><h3>Se Connecter</h3></span>
        </router-link>
      </v-btn>
    </v-app-bar>
    <body>
      <h1 class="white--text">FOIRE AUX QUESTIONS</h1>
      <br />
      <div class="according">
        <details class="according-header">
          <summary>Deverse</summary>
        </details>
        <div class="according-body">
          DEVERSE est une société de développement informatique orientée
          logiciels. notre vocation est de créer des solutions nouvelles et
          innovantes qui proviennent de cas concrets, d'expériences personnelles
          ou de besoins révélés par le client.Notre Travail consiste à
          rassembler l'ensemble de ces besoins et de concevoir des outils qui
          permettront d'y répondre au mieux. L'idée principale étant de mettre
          les attentes de nos client au coeur de nos développements.
        </div>
      </div>

      <div class="according">
        <details class="according-header">
          <summary>MadrassaTic</summary>
        </details>
        <div class="according-body">
          Une plateforme participative pour le signalement et la prise en charge
          des problèmes rencontré au sein de l'école à fin d’améliorer le cadre
          de vie dans cette dernière.
        </div>
      </div>
      <div class="according">
        <details class="according-header">
          <summary>Objectif de MadrassaTic</summary>
        </details>
        <div class="according-body">
          L’Objectif de la plateforme et de permettre aux étudiants et aux
          usagers de l’école (enseignants, et fonctionnaires) de signaler
          facilement un problème au niveau de l’école sans se sourcier de
          l’autorité responsable de sa résolution. En outre, cette plateforme
          permet aux services techniques de l’école, d'intervenir plus
          rapidement lorsqu'une anomalie est rencontrée au sein de l’école et de
          faire un suivi de la prise en charge du problème signalé.
        </div>
      </div>

      <div class="according">
        <details class="according-header">
          <summary>Pourquoi MadrassaTic</summary>
        </details>
        <div class="according-body">
          La possibilité de faire remonter des anomalies en quelques secondes
          auprès de la direction de l’école représente un atout considérable
          dans la gestion de l’établissement, favorise la démocratie
          participative et permet de mobiliser le côté citoyen des membres de
          l’école qui peuvent signaler tout dysfonctionnement ou problème
          rencontré dans l’école : ordures, problèmes d’électricité, matériel
          défaillant, problème d’hygiène, objet perdu, objet volé, problème de
          sécurité, fuite d’eau ou de gaz, coupure d’eau, problèmes de
          chaufferie, etc.
        </div>
      </div>

      <div class="according">
        <details class="according-header">
          <summary>Autre Objectif que les Signalements</summary>
        </details>
        <div class="according-body">
          Par ailleurs la plateforme permet à la direction de l’école, ou aux
          présidents des club de diffuser à travers la plateforme des annonces
          d’évènements et d’actualités internes ou externes à l’école.
        </div>
      </div>
    </body>
  </div>
</template>
<scripts>
</scripts>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

.app {
  font-size: clamp(0.4rem, 1.5vw + 1vh, 1rem);
  background-color: #142850;
}

body {
  color: #1d1e35;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #142850;
  min-height: 100vh;
}

.according {
  width: 100%;
  max-width: 40rem;
  background: #fff;
  margin: 0.6rem 0;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 14px -10px rgb(0 0 0 / 35%);
}

.according-header {
  cursor: pointer;
  color: #1d1e35;
  transition: color 0.3s ease;
  line-height: 1.25rem;
  font-weight: bold;
  position: relative;
}

.according-header[open],
.according-header:hover {
  color: #142850;
}

summary::after {
  content: "\002B";
  font-size: 2rem;
  position: absolute;
  color: #142850;
  right: 1rem;
  top: 40%;
  transform: translateY(-50%);
}
.according-header[open] summary::after {
  content: "\2212";
}

summary {
  padding: 0.5rem 3rem 0.5rem 1rem;
  min-height: 3.5rem;
  display: flex;
  align-items: center;
}

.according-body {
  color: #787887;
  line-height: 1.5rem;
  border-top: 1px solid;
  border-image: linear-gradient(to right, transparent, #6c309b, transparent) 1;

  /* Animation */
  transition: height 0.6s ease-in-out, padding 0.6s ease-in-out;
  padding: 0 1rem;
  height: 0;
  overflow: hidden;
}

details[open] + .according-body {
  padding: 1rem;
  height: 13rem;
}

ul {
  padding-left: 1rem;
}

@media screen and (max-width: 600px) {
  details[open] + .according-body {
    height: 13rem;
  }
}

@media screen and (max-width: 350px) {
  details[open] + .according-body {
    height: 15rem;
  }
}
/* Button*/

.learning-link {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  font-family: arial;
  border-radius: 5px;
  font-size: 1.25rem;
  padding: 0.8rem 3rem;
  color: #ffffff;
  text-shadow: 0px 0px 18px #402f98;
  z-index: 1;
  overflow: hidden;
  border: none;
  text-decoration: none;
}

.learning-link::after {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background-image: linear-gradient(255deg, #27d86c, #26caf8 50%, #6c309b 100%);
  top: -100px;
  left: -100px;
  z-index: -1;
  transition: all ease 0.5s;
}

.learning-link:hover {
  transition-duration: 0.3s;
  box-shadow: 10px -10px 25px 0 rgb(143 64 248 / 50%),
    -10px 10px 25px 0 rgb(39 200 255 / 50%);
}
.text-uppercase {
  left: 0.5cm;
  position: relative;
}
.img {
  left: 1cm;
}
.learning-link:hover::after {
  transform: rotate(150deg);
}
</style>
