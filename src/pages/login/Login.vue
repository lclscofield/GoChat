<template>
    <div id="login">
        <div class="login-box animated"
             :class="[ isLoading ? 'fadeOutLeft' : 'fadeInDown' ]">
            <h2 class="login-logo">GoChat</h2>
            <div class="login-title">用心沟通你我</div>
            <form class="login-form"
                  action=""
                  method="post"
                  @submit.prevent>
                <div>
                    <label for="username">账号:
                        <span>{{ usernameHint }}</span>
                    </label>
                    <input type="text"
                           name="username"
                           :class="{ valid: inputUsername }"
                           autocomplete="off"
                           v-model="inputUsername"
                           @blur="showUsernameHint()"
                           placeholder="手机或用户名">
                </div>
                <div>
                    <label for="password">密码:
                        <span>{{ passwordHint }}</span>
                    </label>
                    <input type="password"
                           name="password"
                           :class="{ valid: inputPassword.length >= 8 && inputPassword.length <= 16 }"
                           v-model="inputPassword"
                           @blur="showPasswordHint()"
                           placeholder="密码">
                </div>
                <div>
                    <button class="login"
                            @click="login">登 录</button>
                    <button class="signUp"
                            @click="this.setShowSignUp(true)">注册>></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapActions
    } from 'vuex'
    export default {
        name: 'Login',
        data () {
            return {
                inputUsername: '',
                inputPassword: '',
                usernameHint: '',
                passwordHint: '',
                isLoading: false
            }
        },
        methods: {
            ...mapMutations([
                'setShowSignUp'
            ]),
            ...mapActions([
                'loginVerify'
            ]),
            // 前端表单验证 验证账号和密码是否为空
            showUsernameHint () {
                this.usernameHint = ''
                if (!this.inputUsername) {
                    this.usernameHint = '用户名/手机号不能为空'
                }
            },
            showPasswordHint () {
                this.passwordHint = ''
                if (!this.inputPassword) {
                    this.passwordHint = '密码不能为空'
                }
            },
            login () {
                if (this.isLoading === true) {
                    return
                }
                this.showUsernameHint()
                this.showPasswordHint()
                if (!(this.usernameHint || this.passwordHint)) {
                    const postData = {
                        username: this.inputUsername,
                        password: this.inputPassword
                    }
                    this.loginVerify(postData).then(data => {
                        console.log(data)
                        if (data.errType === 'username') {
                            this.usernameHint = '请输入正确的用户名/手机号'
                        } else if (data.errType === 'password') {
                            this.passwordHint = '请输入正确的密码'
                        } else {
                            this.isLoading = true
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'user',
                                    params: {
                                        id: this.inputUsername
                                    }
                                })
                            }, 1500)
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    *:focus {
      outline: none;
    }
    #login {
      height: 100%;
      min-width: 860px;
      min-height: 700px;
      overflow: auto;
      position: relative;

      > .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -190px;
        margin-top: -270px;
        border-radius: 4px;
        background-color: #9bc9e5;
        width: 380px;
        height: 540px;
        box-shadow: 0 2px 10px #999;

        > .login-logo {
          font-size: 50px;
          font-family: "Playball", cursive;
          color: #1987ca;
          text-align: center;
          text-shadow: #aaa 1px 0 10px;
          padding: 40px 0 16px;
        }

        > .login-title {
          font-size: 30px;
          text-align: center;
          font-family: cursive;
        }

        > .login-form {
          padding-top: 40px;

          > div {
            padding: 8px 64px;

            > label {
              font-size: 16px;
              margin-bottom: 8px;
              display: block;
              position: relative;

              > span {
                position: absolute;
                bottom: 0;
                right: 0;
                font-size: 12px;
                color: #d7362b;
              }
            }

            > input {
              height: 32px;
              width: 100%;
              padding: 8px 8px;
              font-size: 15px;
              background: #d5e6f0;
              border: 2px solid #aaa;
              box-shadow: 0px 0px 0px #555;
              border-radius: 4px;
            }

            > input:focus {
              border: 2px solid #b03535;
              box-shadow: 0 0 1px #aaa;
            }

            > input.valid:focus {
              border-color: #28921f;
            }
          }

          > div:last-child {
            padding-top: 16px;
            text-align: center;

            > button {
              border: 0;
              cursor: pointer;
            }

            > button:first-child {
              padding: 4px 16px;
              margin-right: 8px;
              background: #73c0ef;
              font-size: 16px;
              border: 1px solid #1987ca;
              border-radius: 8px;
            }

            > button:first-child:hover {
              background: #1987ca;
            }

            > button:last-child {
              background: #9bc9e5;
              color: #1987ca;
            }
          }
        }
      }
    }
</style>
