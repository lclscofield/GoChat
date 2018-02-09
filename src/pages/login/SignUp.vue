<template>
    <div id="signUp"
         @click.self="isClick && leave()">
        <div class="signUp-box animated"
             :class="[ leaveSignUp ? 'fadeOutDown' : 'fadeInDown' ]">
            <h2>注册账号</h2>
            <form class="signUp-form"
                  @submit.prevent>
                <div>
                    <label for="username">用户名:
                        <span>{{ usernameHint }}</span>
                    </label>
                    <input type="text"
                           name="username"
                           :class="{ valid: inputUsername }"
                           autocomplete="off"
                           v-model="inputUsername"
                           @blur="showUsernameHint()"
                           placeholder="字母、汉字、数字、下划线">
                </div>
                <div>
                    <label for="password">密码:
                        <span>{{ passwordHint }}</span>
                    </label>
                    <input type="password"
                           name="password"
                           :class="{ valid: inputPassword }"
                           v-model="inputPassword"
                           @blur="showPasswordHint()"
                           placeholder="8-14 位字符">
                </div>
                <div>
                    <label for="phone">手机:
                        <span>{{ phoneHint }}</span>
                    </label>
                    <input type="text"
                           name="phone"
                           :class="{ valid: inputUsername }"
                           autocomplete="off"
                           v-model="inputPhone"
                           @blur="showPhoneHint()"
                           placeholder="11 位数字">
                </div>
                <div>
                    <button class="signUp"
                            @click="signUp()">注 册</button>
                    <div class="signUpSuccess animated bounceIn"
                         v-if="signUpSuccess">注册成功</div>
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
        name: 'SignUp',
        data () {
            return {
                inputUsername: '',
                inputPassword: '',
                inputPhone: '',
                usernameHint: '',
                passwordHint: '',
                phoneHint: '',
                isClick: false,
                signUpSuccess: false,
                leaveSignUp: false
            }
        },
        created () {
            setTimeout(() => {
                this.isClick = true
            }, 1000)
        },
        methods: {
            ...mapMutations([
                'setShowSignUp'
            ]),
            ...mapActions([
                'signUpVerify'
            ]),
            showUsernameHint () {
                this.usernameHint = ''
                if (!this.inputUsername) {
                    this.usernameHint = '用户名不能为空'
                } else if (/[^a-zA-Z_0-9\u4e00-\u9fa5]/.test(this.inputUsername)) {
                    this.usernameHint = '含有非法字符'
                } else {
                    let len = 0
                    for (let i = 0; i < this.inputUsername.length; i++) {
                        /[\u4e00-\u9fa5]/.test(this.inputUsername[i]) ? (len = len + 2) : len++
                    }
                    if (len > 16) {
                        this.usernameHint = '限定输入最多 16 个字符（汉字为两个字符）'
                    }
                }
            },
            showPasswordHint () {
                this.passwordHint = ''
                if (!this.inputPassword) {
                    this.passwordHint = '密码不能为空'
                } else if (this.inputPassword.length < 8 || this.inputPassword.length > 16) {
                    this.passwordHint = '限定输入 8-16 个字符'
                }
            },
            showPhoneHint () {
                this.phoneHint = ''
                if (!this.inputPhone) {
                    this.phoneHint = '手机号不能为空'
                } else if (/[^0-9]/.test(this.inputPhone) || this.inputPhone.length !== 3) {
                    this.phoneHint = '手机号格式错误'
                }
            },
            signUp () {
                if (this.signUpSuccess === true) {
                    return
                }
                this.showUsernameHint()
                this.showPasswordHint()
                this.showPhoneHint()
                if (!(this.usernameHint || this.passwordHint || this.phoneHint)) {
                    const postData = {
                        username: this.inputUsername,
                        password: this.inputPassword,
                        phone: this.inputPhone
                    }
                    this.signUpVerify(postData)
                        .then((data) => {
                            console.log(data)
                            if (data.type === 'success') {
                                this.signUpSuccess = true
                                this.isClick = false
                                setTimeout(() => {
                                    this.leave()
                                }, 1500)
                            } else if (data.errType === 'username') {
                                this.usernameHint = '用户名已被注册'
                            } else if (data.errType === 'phone') {
                                this.phoneHint = '手机号已被注册'
                            }
                        })
                }
            },
            leave () {
                this.leaveSignUp = true
                setTimeout(() => {
                    this.setShowSignUp(false)
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    *:focus {
      outline: none;
    }
    #signUp {
      height: 100%;
      min-width: 860px;
      min-height: 700px;
      overflow: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 98;

      > .signUp-box {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -220px;
        margin-top: -300px;
        border-radius: 4px;
        background-color: #9bc9e5;
        width: 440px;
        height: 600px;
        box-shadow: 0 2px 10px #999;

        > h2 {
          font-size: 30px;
          text-align: center;
          font-family: cursive;
          padding-top: 40px;
        }

        > .signUp-form {
          padding-top: 32px;

          > div {
            padding: 12px 72px;

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
          }

          > div:last-child {
            padding-top: 16px;
            margin-top: 24px;
            text-align: center;

            > button {
              border: 0;
              cursor: pointer;
              width: 100%;
              padding: 4px 16px;
              background: #73c0ef;
              font-size: 16px;
              border: 1px solid #1987ca;
              border-radius: 8px;
            }

            > button:hover {
              background: #1987ca;
            }

            > .signUpSuccess {
              padding-top: 16px;
              font-size: 30px;
              font-family: cursive;
              color: #107207;
            }
          }
        }
      }
    }
</style>
