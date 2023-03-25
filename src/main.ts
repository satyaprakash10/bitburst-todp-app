import { createApp } from "vue";
import "./assets/global.css";
import { router } from "@/routes";
import App from "./App.vue";

import { createPinia } from "pinia";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
