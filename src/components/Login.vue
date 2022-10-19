<template>
    <div class="kotak_login" 
    style="background-image: linear-gradient(pink,grey)"
    >
        <h4 class="tulisan_login">Login</h4>
        <form @submit="login">
            <label>Username</label>
            <input 
              type="text"
              required
              name="username"
              v-model="form.username" 
               class="form_login"
                placeholder="masukkan username.." />

            <label>Password</label>
            <input
             type="password"
             required
             name="password"
             v-model="form.password"
             class="form_login"
              placeholder=" masukkan password.." />

            <button 
            type="submit"
             class="btn btn-primary poll" 
             style="
             background-color: black;
             display: block;
             margin-left: auto;
             margin-right: auto;
             cursor: pointer;
             padding: 10px;
             border-radius:  18px;
             color: white;
             "
             >Login</button>
        </form>
        
        <br/>
        <br/>
        <center>
       
            <a href="/register" class="registerdonk">Register</a>
            <span class="notReg">Jika Telah Memiliki Akun</span>
    
        </center>
        <br/>
        <br/>

    </div>
</template>

<script>
// import axios
import axios from "axios";
export default {
    name: "LoginPage",
    data() {
        return {
            form: {
                username: "",
                password: "",
                useres: {},
            },
        };
    },

    methods: {
        async getUser() {
            const user = await axios.get("http://localhost:3000/akuns");
            this.useres = user.data;
        },
        // fungsi tombol login
        login(e) {
            e.preventDefault();
            const login = this.useres.find(
                (data) =>
                    data.username === this.form.username &&
                    data.password === this.form.password
            );
            // kondisi jika akun benar akan langsung masuk ke page home kalo salah muncul alert
            if (login === undefined) {
                alert("Username Or Password Not Found");
            } else if (this.form.password === "") {
                alert("Username Or Password Not Found");
            } else {
                var convertToString = JSON.stringify(login);
                sessionStorage.setItem("USER_DATA", convertToString);
                sessionStorage.setItem("role", login.role);
                this.$router.push("/home");
                window.location.reload();
            }
        },
    },
    mounted() {
        this.getUser();
        this.$emit("toggleBar");
    },
};
</script>

