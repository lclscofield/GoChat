<template>
    <div id="search">
        <i class="searchIcon"></i>
        <input type="text"
               placeholder="搜索"
               v-model="inputValue"
               @input="search(inputValue)"
               @focus="search(inputValue)">
        <div class="searchHint"
             v-if="showHint">
            <ul>
                <li v-for="(item, index) in list"
                    :key="index">
                    <a href="javascript:;"
                       @click="cli(item)">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
        mapMutations,
        mapGetters
    } from 'vuex'

    export default {
        name: 'Search',
        data () {
            return {
                inputValue: '',
                showHint: false,
                list: []
            }
        },
        computed: {
            ...mapGetters([
                'getUserInfo',
                'searchSwitch',
                'isActive'
            ])
        },
        watch: {
            showHint () {
                this.setIsActive(this.showHint)
            },
            isActive () {
                if (this.showHint) {
                    this.showHint = this.isActive
                }
            }
        },
        methods: {
            ...mapMutations([
                'setSearchHint',
                'setSearchSwitch',
                'setIsActive'
            ]),
            cli (item) {
                console.log(222)
                this.setSearchHint(item)
                this.setSearchSwitch(!this.searchSwitch)
                this.showHint = false
                this.inputValue = ''
            },
            search (value) {
                console.log(value)
                this.list = []
                value = value.trim()
                if (value) {
                    let arr = this.getUserInfo.friends.concat(this.getUserInfo.groups)
                    let reg = new RegExp(value)
                    arr.map(item => {
                        if (reg.test(item.name)) {
                            this.list.push(item)
                        }
                    })
                    this.showHint = !!this.list.length
                } else {
                    this.showHint = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #search {
      position: relative;
      width: 244px;
      margin: 0 auto 6px;

      > .searchIcon {
        position: absolute;
        display: inline-block;
        vertical-align: middle;
        width: 30px;
        height: 30px;
        top: 1px;
        background: url("//res.wx.qq.com/a/wx_fed/webwx/res/static/img/1OvE4o2.png")
          0 -1946px;
      }

      > input {
        width: 244px;
        height: 32px;
        line-height: 32px;
        border: 0;
        border-radius: 2px;
        background-color: #4a9fd3;
        color: #333;
        padding-left: 30px;
        font-size: 14px;
        outline: none;
      }

      > input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #333;
      }
      > input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #333;
      }
      > input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #333;
      }
      > input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #333;
      }

      > .searchHint {
        position: absolute;
        width: 100%;
        z-index: 100;

        > ul {
          background: #eee;
          border-radius: 4px;
          border: 1px solid #e8e4e4;
          box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.1);

          > li {
            > a {
              display: block;
              text-decoration: none;
              color: #000;
              font-size: 14px;
              padding: 8px;
              border-bottom: 1px solid #a5a3a3;
              text-align: left;

              &:hover {
                background-color: #ddd;
              }
            }
          }
        }
      }
    }
</style>
