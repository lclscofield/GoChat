<template>
    <div id="login">
        <div class="login-box animated fadeInDown">
            <h2 class="login-logo">GoChat</h2>
            <div class="login-title">用心沟通你我</div>
            <form class="login-form"
                  action=""
                  method="post"
                  @submit.prevent>
                <div>
                    <label for="username">Username:</label>
                    <input type="text"
                           name="username"
                           :class="{ valid: inputUsername }"
                           autocomplete="off"
                           :value="inputUsername"
                           @compositionstart="switchLock(true)"
                           @compositionend="switchLock(false, $event)"
                           @input="formatValue($event)"
                           placeholder="大小写字母、汉字、数字、下划线">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password"
                           name="password"
                           :class="{ valid: inputPassword.length >= 8 }"
                           :value="inputPassword"
                           @compositionstart="switchLock(true)"
                           @compositionend="switchLock(false, $event)"
                           @input="formatValue($event)"
                           placeholder="8-14位数字、字母混合">
                </div>
                <div>
                    <button class="login">登 录</button>
                    <button class="register"
                            @click="register">注册>></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                inputUsername: '',
                inputPassword: '',
                lock: false
            }
        },
        methods: {
            switchLock (bool, event) {
                // 为非直接文字输入加上开关
                this.lock = bool
                if (!this.lock) {
                    this.formatValue(event)
                }
            },
            formatValue (event) {
                // 判断是否是非直接文字输入，是则不过滤
                if (this.lock) { return }
                // 判断是用户名还是密码框
                let formattedValue
                let len = 0
                if (event.target.name === 'username') {
                    // 过滤用户名输入，只能输入大小写字母、汉字、数字、下划线
                    formattedValue = event.target.value.replace(/[^a-zA-Z_0-9\u4e00-\u9fa5]/g, '')
                    // 限定输入 14 个字符，一个汉字为两个字符
                    for (let i = 0; i < formattedValue.length; i++) {
                        /[\u4e00-\u9fa5]/.test(formattedValue[i]) ? (len = len + 2) : len++
                        if (len > 14) {
                            formattedValue = formattedValue.slice(0, i)
                            break
                        }
                    }
                    this.inputUsername = formattedValue
                } else {
                    // 过滤密码输入，只能输入字母、数字混合
                    formattedValue = event.target.value.replace(/[^a-zA-Z0-9]/g, '')
                    // 限定输入 8-14 个字符
                    for (let i = 0; i < formattedValue.length; i++) {
                        len++
                        if (len > 14) {
                            formattedValue = formattedValue.slice(0, i)
                            break
                        }
                    }
                    this.inputPassword = formattedValue
                }
                event.target.value = formattedValue
            },
            register () {
                console.log(123)
                const postData = {
                    Username: this.inputUsername,
                    Password: this.inputPassword
                }
                this.$axios.post('/api/register', postData)
                    .then(function (res) {
                        console.log(res.data)
                    }).catch(function (err) {
                        console.log(err)
                    })
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
              padding-bottom: 8px;
              display: block;
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
              opacity: 0.7;
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
