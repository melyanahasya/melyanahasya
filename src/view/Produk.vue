<template>
    <div id="produk">
        <Navbar />

        <!-- pertama -->
        <div>
           

            <table>
                <tr>
                    <th>No</th>
                    <th>Merk </th>
                    <th>Tipe</th>
                    <th>Buatan</th>
                    <th>Tahun</th>

                </tr>

                <tr v-for="(motor,index) in motors" :key="motor.id">
                    <!-- perulangan no secara otomatis dengan {{ index + 1 }} -->
                    <td>{{ index + 1 }}</td>
                    <td>{{ motor.merk }}</td>
                    <td>{{ motor.tipe }}</td>
                    <td>{{ motor.buatan }}</td>
                    <td>{{ motor.tahun }}</td>
                    
                </tr>
            </table>
        </div>

         <br/>
        <!-- Kedua -->
        <div>

            

            <table>
                <tr>
                    <th>No</th>
                    <th>Merk </th>
                    <th>Tipe</th>
                    <th>Buatan</th>
                    <th>Tahun</th>

                </tr>

                <tr v-for="(pesawat,index) in pesawats" :key="pesawat.id">
                    <!-- perulangan no secara otomatis dengan {{ index + 1 }} -->
                    <td>{{ index + 1 }}</td>
                    <td>{{ pesawat.merk }}</td>
                    <td>{{ pesawat.tipe }}</td>
                    <td>{{ pesawat.buatan }}</td>
                    <td>{{ pesawat.tahun }}</td>
                    
                </tr>
            </table>

        </div>

    </div>
</template>


<script>
import axios from "axios"
import Navbar from "../components/Navbar.vue";
export default {
    name: "DetailPage",
    components: {
        Navbar,
    },
    data() {
        return {
            formMotor: {
                id: '',
                merk: '',
                tipe: '',
                buatan: '',
                tahun: ''
            },
            motors: '',
            updateSubmitMotor: false,
            formPesawat: {
                id: '',
                merk: '',
                tipe: '',
                buatan: '',
                tahun: ''
            },
            pesawats: '',
            updateSubmitPesawat: false,
        };
    },
    mounted() {
        this.loadMotor();
        this.loadPesawat();
        if (!sessionStorage.getItem("USER_DATA")) {
            this.$router.push("/")
        }
    },
    methods: {
        // methods motors start
        loadMotor() {
            axios.get('http://localhost:3000/motors').then((res) => {
                this.motors = res.data //respon dari rest api dimasukan ke users
            }).catch((err) => {
                console.log(err);
            })
        },
       
        // methods motors end

        // methods pesawats start

        loadPesawat() {
            axios.get('http://localhost:3000/pesawats').then((res) => {
                this.pesawats = res.data //respon dari rest api dimasukan ke users
            }).catch((err) => {
                console.log(err);
            })
        },
        

        // methods pesawats end


        close() {
            window.location.reload();
        }
    },
}
</script>
