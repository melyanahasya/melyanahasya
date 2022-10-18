// import { createRouter, createWebHistory, RouterLink } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../view/Home.vue";
import Produk from "../view/Produk.vue";
import Detail from "../view/Detail.vue";
import Contact from "../view/Contact.vue";
import About from "../view/About.vue";
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
    {
    path: "/",
    name:"LoginPage",
    component: Login
    },
    {
        path:"/register",
        name: "RegisterPage",
        component: Register
    },
    {
        path:"/home",
        name: "HomePage",
        component: Home
    },
    {
        path:"/produk",
        name: "ProdukPage",
        component: Produk
    },
    {
        path:"/detail",
        name: "DetailPage",
        component: Detail
    },
    {
        path:"/contact",
        name: "ContactPage",
        component: Contact
    },
    {
        path:"/about",
        name: "AboutPage",
        component: About
    }
];


const router = new Router({
    routes,
    mode: "history",
});

export default router;