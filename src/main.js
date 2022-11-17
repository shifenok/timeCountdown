import { install } from '@icon-park/vue-next/es/all';
import { createApp } from "vue";
import "./style.css";
import "./assets/stylesheet.css";
import '@icon-park/vue-next/styles/index.css';
import App from "./App.vue";

const app = createApp(App);
install(app, 'icon');

app.mount("#app");
