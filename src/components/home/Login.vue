<template>
    <div id="login">
        <div class="login-box">
            <h2 class="login-logo">GoChat</h2>
            <div class="login-title">用心沟通你我</div>
            <form class="login-form"
                  action=""
                  method="post">
                <div>
                    <label for="username">UserName:</label>
                    <input type="text"
                           name="username"
                           autocomplete="off"
                           required
                           placeholder="6-12位数字、字母混合">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password"
                           name="password"
                           required
                           placeholder="6-12位数字、字母混合">
                </div>
                <div>
                    <button class="login"
                            name="login">登录</button>
                    <button class="register"
                            name="register">注册 >></button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {}
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
              background: #e1f1e9;
              border: 1px solid #aaa;
              box-shadow: 0px 0px 3px #ccc;
              border-radius: 4px;
            }

            > input:focus {
              border: 1px solid #555;
              box-shadow: 0 0 3px #aaa;
            }

            > input:focus:valid {
              border-color: #28921f;
            }

            > input:focus:invalid {
              border-color: #b03535;
            }
          }

          div:last-child {
            padding-top: 16px;

            > button {
              border: 0;
              cursor: pointer;
            }

            button:first-child {
              padding: 8px 16px;
              background: #33aaf3;
              font-size: 16px;
              border: 1px solid #aaa;
              border-radius: 8px;
            }

            button:first-child:hover {
              opacity: 0.7;
            }

            button:last-child {
              background: #9bc9e5;
              color: #1987ca;
              padding: 0 10px;
            }
          }
        }
      }
    }
</style>
