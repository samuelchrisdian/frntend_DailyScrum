<template>
  <div class="container-scroller"> 
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left"><i class="mdi mdi-format-list-bulleted menu-icon"></i></p>
                  <p class="card-description float-right">
                    <a href="#" class="btn btn-sm btn-success btn-icon-text" data-toggle="modal" data-target="#modalDailyScrum">
                      <i class="mdi mdi-plus btn-icon-prepend"></i>
                      Add Activity
                    </a>
                  </p>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Tanggal</th>
                          <th>Yesterday</th>
                          <th>Today</th>
                          <th>Problem</th>
                          <th>Solution</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Senin, 30 Mar 2020</td>
                          <td>Membuat desain layout aplikasi iklan baris</td>
                          <td>Membuat API aplikasi daily scrum</td>
                          <td>Desain layout masih belum rapi</td>
                          <td>Menambah waktu pengerjaan untuk merapikan layout</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-danger">
                              <i class="mdi mdi-delete btn-icon-prepend"></i>
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td>Selasa, 31 Mar 2020</td>
                          <td>Membuat desain layout aplikasi iklan baris</td>
                          <td>Membuat API aplikasi daily scrum</td>
                          <td>Desain layout masih belum rapi</td>
                          <td>Menambah waktu pengerjaan untuk merapikan layout</td>
                          <td>
                            <a href="#" class="btn btn-sm btn-danger">
                              <i class="mdi mdi-delete btn-icon-prepend"></i>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="modalDailyScrum" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content modal-md">
              <div class="modal-header">
                <h5 class="modal-title" id="ModalLabel">Add Activity</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="id_siswa" class="col-form-label">Your Team</label>
                    <select class="form-control" name="team" id="team">
                      <option value="BEON" checked>BEON</option>
                      <option value="DDS">DDS</option>
                      <option value="DOT">DOT</option>
                      <option value="node1">Node 1</option>
                      <option value="node2">Node 2</option>
                      <option value="react1">React 1</option>
                      <option value="react2">React 2</option>
                      <option value="laravel">Laravel</option>
                      <option value="laravel_vue">Laravel & Vue</option>
                      <option value="android">Android</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="activity_yesterday" class="col-form-label">Yesterday Activity</label>
                    <textarea name="activity_yesterday" id="activity_yesterday" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="activity_today" class="col-form-label">Today Activity</label>
                    <textarea name="activity_today" id="activity_today" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="problem_yesterday" class="col-form-label">Yesterday Problem</label>
                    <textarea name="problem_yesterday" id="problem_yesterday" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="solution" class="col-form-label">Your Solution</label>
                    <textarea name="solution" id="solution" class="form-control" rows="7" cols="10"></textarea>
                  </div>
                  <div class="form-group">
                    <button type="button" class="btn btn-md btn-success">Submit</button>
                    <button type="button" class="btn btn-md btn-light" data-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>

        <!-- content-wrapper ends -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
module.exports = {
  data : function(){
    return {
      search: "",
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      user: [],
      fields: ["id", "name", "email", "role", "Aksi"],
    }
  },

  methods: {
    getData : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios.get("/petugas/" + this.perPage + "/" + offset, conf)
      .then(response => {
        if(response.data.status == 1){
          this.$bvToast.hide("loadingToast");
          this.user = response.data.user;
          this.rows = response.data.count;
        } else {
          this.$bvToast.hide("loadingToast");
          this.message = "Gagal menampilkan data petugas."
          this.$bvToast.show("message");
          this.$router.push({name: "login"})
        }
        
      })
      .catch(error => {
        console.log(error);
      });
    },

    pagination : function(){
      if(this.search == ""){
        this.getData();
      } else {
        this.searching();
      }
    },

    Add : function(){
      this.action = "insert";
      this.name = "";
      this.email = "";
      this.password = ""; 
      this.role = "";
    },

    Edit : function(item){
      this.action = "update";
      this.id = item.id;
      this.name = item.name;
      this.email = item.email;
      this.role = item.role;
    },

    Save : function(){
      let conf = { headers: { "Authorization" : 'Bearer ' + this.key } };
      this.$bvToast.show("loadingToast");
      if(this.action === "insert"){
        let form = new FormData();
        form.append("id", this.id);
        form.append("name", this.name);
        form.append("email", this.email);
        form.append("password", this.password);
        form.append("role", this.role);

        this.axios.post("/petugas", form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      } else {
        let form = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role
        }
        this.axios.put("/petugas/" + this.id, form, conf)
        .then(response => {
          this.$bvToast.hide("loadingToast");
          if(this.search == ""){
            this.getData();
          } else {
            this.searching();
          }
          this.message = response.data.message;
          this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },

    Drop : function(id){
      let conf = { headers: { "Authorization" : "Bearer " + this.key} };
      if(confirm('Apakah anda yakin ingin menghapus data ini?')){
        this.$bvToast.show("loadingToast");
        this.axios.delete("/petugas/" + id, conf)
        .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
  },
  mounted(){
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
}
</script>