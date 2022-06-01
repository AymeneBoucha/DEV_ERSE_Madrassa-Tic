<template>
  <main class="item-view">
    <div class="cards">
      <v-row>
        <div class="catégorie cards">
          <h2 class="text-center">Signalement par catégorie</h2>
          <div id="chart">
            <apexchart
              type="pie"
              width="500"
              :options="ChartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
        <div class="signalement cards">
          <h2 class="text-center">Signalement quotidien</h2>
          <apexchart
            type="line"
            width="500"
            :options="lineChartOptions"
            :series="lineseries"
          ></apexchart>
        </div>
      </v-row>
      <v-row>
        <div class="barre cards">
          <h2 class="text-center">Signalements selon l'état</h2>
          <div id="sales-chart">
            <apexchart
              type="bar"
              width="500"
              :options="statusChartOptions"
              :series="statuseries"
            ></apexchart>
          </div>
        </div>
        <div class="area cards">
          <h2 class="text-center">Etat des signalements</h2>
          <div id="areachart">
            <apexchart
              type="area"
              width="500"
              :options="areaChartOptions"
              :series="areaseries"
            ></apexchart>
          </div>
        </div>
      </v-row>
    </div>
  </main>
</template>

<script>
//import VueApexCharts from 'vue-apexcharts'

//import router from "../router/index";
import axios from "axios";
import setAuthHeader from "@/utils/setAuthHeader";
import apexchart from "vue-apexcharts"
const acc = localStorage.getItem("xaccesstoken");
setAuthHeader(acc);

export default {
  name: "Statistiques_j",
  components: {apexchart},
     data() {
        return {
     
    ChartOptions: {
      chart: {
         animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
        redrawOnWindowResize: true,
        width: 500,
        type: "pie",
      },
      // labels: ["Hygiène", "Sécurité", "Problèmes techniques", "Santé","Electricité","Plomberie","Problèmes d'équipement","Objet perdu"],
      labels: [],
      responsive: [
        {
          btreakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    //series: [44,55,10,34,20,10,40,20],
    series: [],

    statusChartOptions: {
      chart: {
        redrawOnWindowResize: true,
        id: "vuechart-example",
      },
      xaxis: {
        categories: [
          "En Attente",
          "Validé",
          "Rejeté",
          "Besoin plus d'infos",
          "Traité",
          "Accepté",
          "Obstacle",
          "Fini",
        ],
        title: {
          text: "Etat",
        },
      },
      yaxis: {
        title: {
          text: "Signalements",
        },
      },
    },
    statuseries: [
      {
        data: [],
      },
    ],

    areaChartOptions: {
      chart: {
        redrawOnWindowResize: true,
        width: 400,
        type: "area",
      },
      markers: {
        size: 4,
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      /* xaxis: {
          type:'datetime',
        categories: ["1","2","3","4","5","6","7" ],*/
      xaxis: {
        type: "time",
        // min: new Date("1 May 2022 ").getTime(),
        // max: new Date(Date.now()).getTime(),
        title: { text: "date" },
      },
      yaxis: { title: { text: "signalement" } },
    },

    areaseries: [
      { name: "Signalements déclaré", data: [] },
      { name: "Signalements Validé", data: [] },
      { name: "Signalements Rejetés", data: [] },
      { name: "Signalements traités",data: [],},
    ],

    lineChartOptions: {
      chart: {
        redrawOnWindowResize: true,
        stacked: false,
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.4,
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: { enabled: true },
      markers: {
        size: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      xaxis: {
        categories: [
          "dimanche",
          "lundi",
          "mardi",
          "mercredi",
          "jeudi",
          "vendredi",
          "samedi",
        ],
        title: {
          text: "Jour de la semaine",
        },
      },
      yaxis: {
        title: {
          text: "Signalement",
        },
      },
      colors: ["#247BA0"],
    },
    lineseries: [
      {
        name: "Nombre de signalement ",
        data: [],
      },
    ],}
  },
  
  async beforeCreate() {
    try {
       const res10 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/getAllCategories`
      );

      let f = 0;
      while (f < res10.data.length) {
        this.ChartOptions.labels.push(res10.data[f].name);
        f++;
      }
         const res = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats1ByModerator`
      );

      let j = 0;
      while (j < res.data.list.length) {
        this.series.push(res.data.list[j]);
        j++;
      }
      // console.log(this.statuseries[0].data)

      const res1 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats2ByModerator`
      );
      let i = 0;
      while (i < res1.data.list.length) {
        this.statuseries[0].data.push(res1.data.list[i]);
        i++;
      }
      window.dispatchEvent(new Event('resize'))
      // console.log(this.statuseries[0].data)

      const res2 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats3ByModerator`
      );
      let k = 0;
      while (k < res2.data.list.length) {
        this.lineseries[0].data.push(res2.data.list[k]);
        k++;
      }

       const res3 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats4ByModerator`
      );
      this.areaseries[0].data = res3.data.list;
      window.dispatchEvent(new Event('resize'))
      
      // console.log(res3.data.list);

      // console.log(this.areaseries[0].data);

      const res4 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats5ByModerator`
      );
      this.areaseries[1].data = res4.data.list;
      window.dispatchEvent(new Event('resize'))
      // console.log(res4.data.list);

      const res5 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats6ByModerator`
      );
      this.areaseries[2].data = res5.data.list;
      window.dispatchEvent(new Event('resize'))
      // console.log(res5.data.list);

      const res6 = await axios.get(
        `http://localhost:8080/api/madrasa-tic/moderator/getStats7ByModerator`
      );
      this.areaseries[3].data = res6.data.list;
      window.dispatchEvent(new Event('resize'))
      
 
    } catch (e) {
      alert("Missing data from database");
    }
  },
};
</script>
<style scoped>
.catégorie {
  border: 2px solid black;
}
.signalement {
  border: 2px solid black;
  position: relative;
  left: 1cm;
}
.barre {
  border: 2px solid black;
  margin-top: 10px;
}
.area {
  border: 2px solid black;
  margin-top: 10px;
  position: relative;
  left: 1cm;
}
</style>