import Vue from "vue";
import VueRouter from "vue-router";
import ReceptiList from "@/components/ReceptiList";
import AddRecept from "@/components/AddRecept";
import Recept from "@/components/Recept";
import Home from "@/components/Home";
import UpdateRecept from "@/components/UpdateRecept";
import AddImage from "@/components/AddImage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/recepti/add",
    name: "AddRecept",
    component: AddRecept
  },
  {
    path: "/recepti",
    name: "Recepti",
    component: ReceptiList
  },
  {
    path: "/recepti/:id",
    name: "Recept",
    component: Recept
  },
  {
    path: "/recepti/:id/update",
    name: "UpdateRecept",
    component: UpdateRecept
  },
  {
    path: "/recepti/:id/add/image",
    name: "AddImage",
    component: AddImage
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
