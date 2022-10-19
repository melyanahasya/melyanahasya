<template>
    <div id="detail">
        <Navbar />

        <!-- pertama -->
        <div>
            <div>
                <!-- Bootsrap modal  -->
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Motor">
                    Add
                </button>

                <!-- Modal -->
                <div class="modal fade" id="Motor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Form<span
                                        v-show="!updateSubmitMotor"> Motor</span> <span
                                        v-show="updateSubmitMotor">data</span> </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit="addMotor">
                                    <label for="">Merk: </label>
                                    <input type="text" v-model="formMotor.merk" required><br /><br />
                                    <label for="">Tipe: </label>
                                    <input type="text" v-model="formMotor.tipe" required><br /><br />
                                    <label for="">Buatan: </label>
                                    <input type="text" v-model="formMotor.buatan" required><br /><br />
                                    <label for="">Tahun: </label>
                                    <input type="text" v-model="formMotor.tahun" required><br /><br />
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                        @click="close">Close</button>
                                    <button type="submit" class="btn btn-primary"
                                        v-show="!updateSubmitMotor">Add</button>
                                    <button type="button" class="btn update" v-show="updateSubmit"
                                        @click="updateMotor(formMotor)">Update</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <table>
                <tr>
                    <th>No</th>
                    <th>Merk </th>
                    <th>Tipe</th>
                    <th>Buatan</th>
                    <th>Tahun</th>
                    <th>Action</th>

                </tr>

                <tr v-for="(motor,index) in motors" :key="motor.id">
                    <!-- perulangan no secara otomatis dengan {{ index + 1 }} -->
                    <td>{{ index + 1 }}</td>
                    <td>{{ motor.merk }}</td>
                    <td>{{ motor.tipe }}</td>
                    <td>{{ motor.buatan }}</td>
                    <td>{{ motor.tahun }}</td>
                    <td> <button @click="editMotor(motor)"> Edit </button> || <button @click="delMotor(motor)"> Delete
                        </button></td>
                </tr>
            </table>
        </div>


        <!-- Kedua -->
        <div>

            <div>
                <!-- Bootsrap modal  -->
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#pesawat">
                    Add
                </button>

                <!-- Modal -->
                <div class="modal fade" id="pesawat" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Form <span
                                        v-show="!updateSubmitPesawat">Pesawat</span> <span
                                        v-show="updateSubmitPesawat">data</span> </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit="addPesawat">
                                    <label for="">Merk: </label>
                                    <input type="text" v-model="formPesawat.merk" required><br /><br />
                                    <label for="">Tipe: </label>
                                    <input type="text" v-model="formPesawat.tipe" required><br /><br />
                                    <label for="">Buatan: </label>
                                    <input type="text" v-model="formPesawat.buatan" required><br /><br />
                                    <label for="">Tahun: </label>
                                    <input type="text" v-model="formPesawat.tahun" required><br /><br />
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                        @click="close">Close</button>
                                    <button type="submit" class="btn btn-primary"
                                        v-show="!updateSubmitPesawat">Add</button>
                                    <button type="button" class="btn update" v-show="updateSubmitPesawat"
                                        @click="updatePesawat(formPesawat)">Update</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <table>
                <tr>
                    <th>No</th>
                    <th>Merk </th>
                    <th>Tipe</th>
                    <th>Buatan</th>
                    <th>Tahun</th>
                    <th>Action</th>

                </tr>

                <tr v-for="(pesawat,index) in pesawats" :key="pesawat.id">
                    <!-- perulangan no secara otomatis dengan {{ index + 1 }} -->
                    <td>{{ index + 1 }}</td>
                    <td>{{ pesawat.merk }}</td>
                    <td>{{ pesawat.tipe }}</td>
                    <td>{{ pesawat.buatan }}</td>
                    <td>{{ pesawat.tahun }}</td>
                    <td> <button data-bs-target="#exampleModal" @click="editPesawat(pesawat)"> Edit </button> ||
                        <button @click="delPesawat(pesawat)"> Delete </button>
                    </td>
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
        addMotor() {
            axios.post('http://localhost:3000/motors', this.formMotor).then(() => {
                this.loadMotor()
                this.formMotor.merk = '';
                this.formMotor.tipe = '';
                this.formMotor.buatan = '';
                this.formMotor.tahun = '';
            })
        },
        updateMotor(formMotor) {
            return axios
                .put('http://localhost:3000/motors/' + formMotor.id, { merk: this.formMotor.merk, tipe: this.formMotor.tipe, buatan: this.formMotor.buatan, tahun: this.formMotor.tahun, image: this.formMotor.image })
                .then(() => {
                    this.loadMotor()
                    this.formMotor.id = ''
                    this.formMotor.merk = ''
                    this.formMotor.tipe = ''
                    this.formMotor.buatan = ''
                    this.formMotor.tahun = ''
                    this.formMotor.image = ''
                    this.updateSubmit = false
                }).catch((err) => {
                    console.log(err);

                })
        },
        editMotor(motor) {
            this.updateSubmit = true
            this.formMotor.id = motor.id
            this.formMotor.merk = motor.merk;
            this.formMotor.tipe = motor.tipe;
            this.formMotor.buatan = motor.buatan;
            this.formMotor.tahun = motor.tahun;
        },
        delMotor(motor) {
            axios
                .delete("http://localhost:3000/motors/" + motor.id)
                .then((res) => {
                    this.load();
                    let index = this.motors.indexOf(res.nama);
                    this.motors.splice(index, 1);
                });
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
        addPesawat() {
            axios.post('http://localhost:3000/pesawats', this.formPesawat).then(() => {
                this.loadPesawat()
                this.formPesawat.merk = '';
                this.formPesawat.tipe = '';
                this.formPesawat.buatan = '';
                this.formPesawat.tahun = '';
            })
        },
        updatePesawat(formPesawat) {
            return axios
                .put('http://localhost:3000/pesawats/' + formPesawat.id, { merk: this.formPesawat.merk, tipe: this.formPesawat.tipe, buatan: this.formPesawat.buatan, tahun: this.formPesawat.tahun, image: this.formPesawat.image })
                .then(() => {
                    this.loadPesawat()
                    this.formPesawat.id = ''
                    this.formPesawat.merk = ''
                    this.formPesawat.tipe = ''
                    this.formPesawat.buatan = ''
                    this.formPesawat.tahun = ''
                    this.updateSubmitPesawat = false
                }).catch((err) => {
                    console.log(err);

                })
        },
        editPesawat(pesawat) {
            this.updateSubmitPesawat = true
            this.formPesawat.id = pesawat.id
            this.formPesawat.merk = pesawat.merk;
            this.formPesawat.tipe = pesawat.tipe;
            this.formPesawat.buatan = pesawat.buatan;
            this.formPesawat.tahun = pesawat.tahun;
        },
        delPesawat(pesawat) {
            axios
                .delete("http://localhost:3000/pesawats/" + pesawat.id)
                .then((res) => {
                    this.loadPesawat();
                    let index = this.pesawats.indexOf(res.nama);
                    this.pesawats.splice(index, 1);
                });
        },
        // methods pesawats end
        close() {
            window.location.reload();
        }
    },
}
</script>
