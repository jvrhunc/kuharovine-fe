import Vue from "vue";
import VueRouter from "vue-router";
import ReceptiList from "@/components/ReceptiList";
import AddRecept from "@/components/AddRecept";

Vue.use(VueRouter);

const routes = [
  {
    path: "/recepti/add",
    name: "Dodaj",
    component: AddRecept
  },
  {
    path: "/recepti",
    name: "Recepti",
    component: ReceptiList
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
