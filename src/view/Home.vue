<template>
    <div id="home">
     <Navbar />

     <div>
        <!-- Bootsrap modal  -->
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
 Add
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Form  <span v-show="!updateSubmitPesawat">Tambah</span>  <span v-show="updateSubmitPesawat">data</span> </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit="add">
        <label for="">Merk: </label>
      <input type="text" v-model="form.merk" required><br/><br/>
      <label for="">Tipe: </label>
      <input type="text" v-model="form.tipe" required><br/><br/>
      <label for="">Buatan: </label>
      <input type="text" v-model="form.buatan" required><br/><br/>
      <label for="">Tahun: </label>
      <input type="text" v-model="form.tahun" required><br/><br/>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
        <!-- <button type="submit" class="btn btn-primary">Add</button>  -->
        <button type="button" class="btn update" v-show="updateSubmit" @click="update(form)">Update</button>
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

      <tr v-for="(pesawat,index) in pesawats" :key="pesawat.id" >
        <!-- perulangan no secara otomatis dengan {{ index + 1 }} -->
        <td>{{ index + 1 }}</td>
        <td>{{ pesawat.merk }}</td>
        <td>{{ pesawat.tipe }}</td>
        <td>{{ pesawat.buatan }}</td>
        <td>{{ pesawat.tahun }}</td>
        <td> <button @click="edit(pesawat)"><i class="fa-solid fa-pen-to-square"></i> Edit</button> || <button @click="del(pesawat)"><i class="fa-solid fa-delete-left"></i> Delete</button></td>
      </tr>
    </table>

    </div>
</template>

<script>
import axios from "axios"
import Navbar from "../components/Navbar.vue";
export default {
    name: "HomePage",
    components: {
        Navbar,
    },
    data() {
    return {
      form: {
        id: '',
        merk: '',
        tipe: '',
        buatan: '',
        tahun: ''
      },
      pesawats: '',
      updateSubmit: false,
    };
  },
    mounted() {
        this.load();
        if (!sessionStorage.getItem("USER_DATA")) {
            this.$router.push("/")
        }
    },
    methods: {
    load() {
      axios.get('http://localhost:3000/pesawats').then(res => {
        this.pesawats = res.data //respon dari rest api dimasukan ke users
      }).catch((err) => {
        console.log(err);
      })
    },

    add() {
      axios.post('http://localhost:3000/pesawats', this.form).then(() => {
        this.load()
        this.form.merk = '';
        this.form.tipe = '';
        this.form.buatan = '';
        this.form.tahun = '';
        this.form.image = '';
      })
    },

    update(form) {
      return axios
        .put('http://localhost:3000/pesawats/' + form.id, { merk: this.form.merk, tipe: this.form.tipe, buatan: this.form.buatan, tahun: this.form.tahun, image: this.form.image })
        .then(() => {
          this.load()
          this.form.id = ''
          this.form.merk = ''
          this.form.tipe = ''
          this.form.buatan = ''
          this.form.tahun = ''
          this.form.image = ''
          this.updateSubmit = false
        }).catch((err) => {
          console.log(err);

        })
    },
    
    edit(pesawat) {
      this.updateSubmit = true
      this.form.id = pesawat.id
      this.form.merk = pesawat.merk;
      this.form.tipe = pesawat.tipe;
      this.form.buatan = pesawat.buatan;
      this.form.tahun = pesawat.tahun;
    },
    del(pesawat) { 
      axios 
        .delete("http://localhost:3000/pesawats/" + pesawat.id) 
        .then((res) => { 
          this.load(); 
          let index = this.pesawats.indexOf(res.nama); 
          this.pesawats.splice(index, 1); 
        }); 
    },
    close() {
        window.location.reload();
    }
},
}
</script>

<style>
table, th, td{
    border: 1px solid;
    padding: 10px;
}

table {
  width:90%;
  text-align: center;
  background-color: #FFF5E4;
  margin-left: 60px;
  margin-right: 60px;
}

.update{
    background-color: skyblue;
}
</style>