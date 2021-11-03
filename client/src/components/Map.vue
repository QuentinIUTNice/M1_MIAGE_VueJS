<template>
  <div>
    
    <l-map
      :center="center"
      :zoom="zoom"
      class="map"
      ref="map"
      @update:zoom="zoomUpdated"
    >
      <l-tile-layer :url="url"> </l-tile-layer>

      <l-marker :key="0" :lat-lng="center">
        <l-icon ref="icon">
          <img class="restaurant-icon" src="../assets/pr.png"/>
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import { LIcon, LMarker } from 'vue2-leaflet'
import "leaflet/dist/leaflet.css";

export default {
  components: {
    LMap,
    LTileLayer,
    LIcon,
    LMarker
  },
  props: {
      c: {
          type: [String],
      }
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [49.1193089, 6.1757156],
      zoom: 12,
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
  },
};
</script>

<style scoped>
.map {
  position: absolute;
  width: 30vw;
  height: 15vw;
  overflow: hidden;
  z-index: 9;
   border-style: solid;
  border-width: 0.5vw;
  border-color: #32424F;
}

.restaurant-icon {
  position: absolute; /* postulat de départ */
    top: 50%; left: 50%; /* à 50%/50% du parent référent */
    transform: translate(-50%, -50%);
    width: 150%;
    height: auto;
 }
</style>
