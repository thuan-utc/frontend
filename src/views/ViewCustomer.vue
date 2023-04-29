<template>
    <div id="page-top">
        <div id="wrapper">

            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                :class="{ 'toggled': isSidebarCollapsed }" id="accordionSidebar">

                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div class="sidebar-brand-icon rotate-n-15">
                        <i class="fas fa-laugh-wink"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">Internet</div>
                </a>

                <hr class="sidebar-divider my-0">

                <li class="nav-item" :class="{ 'active': currentComponent === 'Dashboard' }">
                    <div class="nav-link" @click="showComponent('Dashboard')">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Internet packages</span>
                    </div>
                </li>

                <hr class="sidebar-divider">

                <!-- <div class="sidebar-heading">
                    Manage bills
                </div> -->

                <li class="nav-item">
                    <div class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
                        aria-controls="collapseTwo">
                        <i class="fa-regular fa-receipt fa-beat fa-2xl"></i>
                        <span>My bills</span>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Type:</h6>
                            <a class="collapse-item" @click="showComponent('MyPendingBills')"
                                :class="{ 'active': currentComponent === 'MyPendingBills' }">Pending bills</a>
                            <a class="collapse-item" @click="showComponent('MyPaidBills')"
                                :class="{ 'active': currentComponent === 'MyPaidBills' }">Payment</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item" :class="{ 'active': currentComponent === 'MyContract' }">
                    <div class="nav-link" @click="showComponent('MyContract')">
                        <i class="fa-regular fa-gear fa-2xl"></i>
                        <span>My Contract</span>
                    </div>
                </li>

                <li class="nav-item" :class="{ 'active': currentComponent === 'Setting' }">
                    <div class="nav-link" @click="showComponent('Setting')">
                        <i class="fa-regular fa-gear fa-2xl"></i>
                        <span>Setting</span>
                    </div>
                </li>

                <!-- <hr class="sidebar-divider"> -->

                <hr class="sidebar-divider d-none d-md-block">

                <!-- collapse sidebar -->
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle" @click="toggleSidebar"></button>
                </div>
            </ul>

            <div id="content-wrapper" class="d-flex flex-column">

                <div id="content">

                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>

                        <form
                            class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                            <div class="input-group">
                                <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                                    aria-label="Search" aria-describedby="basic-addon2">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button">
                                        <i class="fas fa-search fa-sm"></i>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <ul class="navbar-nav ml-auto">

                            <li class="nav-item dropdown no-arrow d-sm-none">
                                <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-search fa-fw"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                    aria-labelledby="searchDropdown">
                                    <form class="form-inline mr-auto w-100 navbar-search">
                                        <div class="input-group">
                                            <input type="text" class="form-control bg-light border-0 small"
                                                placeholder="Search for..." aria-label="Search"
                                                aria-describedby="basic-addon2">
                                            <div class="input-group-append">
                                                <button class="btn btn-primary" type="button">
                                                    <i class="fas fa-search fa-sm"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </li>



                            <div class="topbar-divider d-none d-sm-block"></div>

                            <li class="nav-item dropdown no-arrow">
                                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">name</span>
                                    <img class="img-profile rounded-circle" src="../assets/img/undraw_profile.svg">
                                </a>
                                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                    aria-labelledby="userDropdown">
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Profile
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Settings
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Activity Log
                                    </a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                            </li>

                        </ul>

                    </nav>

                    <div id="mycontent">
                        <component :is="currentComponent"></component>
                    </div>


                </div>

                <footer class="sticky-footer bg-white">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Your Website 2023</span>
                        </div>
                    </div>
                </footer>

            </div>

        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>
    </div>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" @click.prevent="logout">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template> 

<script>
import 'https://code.jquery.com/jquery-3.6.0.min.js'
import '../assets/js/sb-admin-2.min.js'
import '../assets/vendor/chart.js/Chart.min.js'
// import '../assets/js/demo/chart-area-demo.js'
// import '../assets/js/demo/chart-pie-demo.js'
import '../assets/vendor/jquery-easing/jquery.easing.min.js'
import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import '../assets/vendor/jquery/jquery.min.js'

import InternetPackages from '../components/customer/InternetPackages.vue'
import MyContract from '../components/customer/MyContract.vue'
import MyPaidBills from '../components/customer/MyPaidBills.vue'
import MyPendingBills from '../components/customer/MyPendingBills.vue'
import Setting from '../components/customer/Setting.vue'
export default {
    data() {
        return {
            isSidebarCollapsed: false,
            currentComponent: InternetPackages
        }
    },
    methods: {
        showComponent(componentName) {
            this.currentComponent = componentName
        },
        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;
        },
        logout() {
            window.location.href = '/';
        }
    },
    components: {
        InternetPackages,
        MyContract,
        MyPaidBills,
        MyPendingBills,
        Setting
    }
}
</script>

<style>
@import url('../assets/vendor/fontawesome-free/css/all.min.css');
@import url('https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i');
@import url('../assets/vendor/fontawesome-free/css/all.min.css');
@import url('../assets/css/sb-admin-2.min.css');
@import '../assets/vendor/fontawesome-free/css/all.min.css';

.toggled {
    width: 80px !important;
    overflow-x: hidden;
}
</style>