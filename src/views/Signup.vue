<template>
    <div class="container">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <!-- Nested Row within Card Body -->
                <div class="row">
                    <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div class="col-lg-7">
                        <div class="p-5">
                            <div class="text-center">
                                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                            </div>
                            <form class="user">
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control form-control-user" id="name"
                                            placeholder="Name" v-model="newUser.name">
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="name">Address</label>
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="address" v-model="newUser.address">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6">
                                        <label for="name">Phone</label>
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="phone" v-model="newUser.phone">
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="name">Email</label>
                                        <input type="text" class="form-control form-control-user" id="exampleLastName"
                                            placeholder="email" v-model="newUser.email">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <label for="name">Username</label>
                                        <input type="text" class="form-control form-control-user"
                                            id="exampleInputPassword" placeholder="username" v-model="newUser.userName">
                                    </div>
                                    <div class="col-sm-6">
                                        <label for="name">Password</label>
                                        <input type="password" class="form-control form-control-user"
                                            id="exampleRepeatPassword" placeholder="password" v-model="newUser.password">
                                    </div>
                                </div>
                                <div style="color: red;" v-if="this.errorSignup" class="text-center">{{ this.errorSignup }}
                                </div>
                                <a @click.prevent="signup" class="btn btn-primary btn-user btn-block">
                                    Register Account
                                </a>
                                <hr>
                                <a href="index.html" class="btn btn-google btn-user btn-block">
                                    <i class="fab fa-google fa-fw"></i> Register with Google
                                </a>
                                <a href="index.html" class="btn btn-facebook btn-user btn-block">
                                    <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                                </a>
                            </form>
                            <hr>
                            <div class="text-center">
                                <a class="small" href="forgot-password.html">Forgot Password?</a>
                            </div>
                            <div class="text-center">
                                <a class="small" @click="this.$router.push({ path: `/` })">Already have an account?
                                    Login!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import {signup } from '../utils/login-api'
export default {
    data() {
        return {
            errorSignup: '',
            newUser: {
                name: '',
                address: '',
                email: '',
                phone: '',
                userName: '',
                password: ''
            }
        }
    },
    methods: {
        signup() {
            signup(this.newUser).then((response) => {
                if (response.data === "SUCCESS") {
                    alert("Signup successfully");
                    this.$router.push({ path: `/` })
                } else {
                    this.errorSignup = response.data
                }
            }).catch(error => {
                    this.errorSignup = error.response.data
            })
        }
    }
}
</script>