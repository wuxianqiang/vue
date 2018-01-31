# Vue组件的数据通讯介绍

1. 单个组件进行数据通讯
2. 多个组件进行数据通讯
3. 任何组件进行数据通讯

## [双向数据绑定的原理](https://github.com/DMQ/mvvm)

## 单个数据

这是关于Vue组件的模板和脚本部分如何协同工作的。模板和脚本构成一个单元并共享相同的数据。

1. 在模板中绑定事件
```vue
<template>
  <button @click="handleClick">
    Tacos?
  </button>
</template>
 
<script>
export default {
  name: 'SingleComponent',
  methods: {
    handleClick () {
      alert('Tacos!')
    }
  }
}
</script>
```
2. 绑定事件的事件还可以传入参数
```vue
<template>
  <button @click="handleClick('Tacos')">
    Tacos?
  </button>
</template>

<script>
export default {
  name: 'SingleComponent',
  methods: {
    handleClick (value) {
      alert(`${value}!`)
    }
  }
}
</script>
```
3. 绑定事件的时候获取事件对象
```js
<template>
  <button
    @click="handleClick('Tacos', $event)"
    @mouseenter="handleMouseEnter"
  >
    Tacos?
  </button>
</template>

<script>
export default {
  name: 'SingleComponent',
  methods: {
    handleClick (value, event) {
      alert(`${value}!`)
      console.log('click', event)
    },
    handleMouseEnter (event) {
      console.log('mouse entered', event)
    }
  }
}
</script>
```
4. 循环绑定事件
```js
<template>
  <button
    v-for="(entry, index) in menu"
    :key="index"
    @click="selectEntry(entry)"
  >
    {{ entry }}?
  </button>
</template>

<script>
export default {
  name: 'SingleComponent',
  computed: {
    menu: ['tacos', 'hot dogs', 'ice cream']
  },
  methods: {
    selectEntry (value) {
      alert(`${value} it is!`)
    }
  }
}
</script>
```
5. 生命周期
```js
<template>
  <div class="traffic-light">
    isGreen: {{ isGreen }}
  </div>
</template>
<script>
export default {
  name: 'TrafficLight',
  data () {
    return {
      isGreen: false,
      interval: null
    }
  },
  created () {
    this.interval = setInterval(() => {
      this.isGreen = !this.isGreen
    }, 5 * 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
```
6. 引用元素
```js
<template>
  <div id="canvas-example">
    <canvas ref="canvas" height="200" width="200" />
  </div>
</template>
<script>
export default {
  name: 'CanvasExample',
  mounted () {
    const ctx = this.$refs.canvas.getContext('2d')
    ctx.fillStyle = 'rgb(200,0,0)'
    ctx.fillRect(10, 10, 55, 50)

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(30, 30, 55, 50)
  }
}
</script>
```
7. 循环引用元素
```js
<template>
  <ul id="dynamic-refs">
    <li
      v-for="entry in entries"
      :key="entry.id"
      :ref="`entry${entry.id}`"
    >
      {{ entry.title }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'DynamicRefs',
  data () {
    return {
      entries: [
        { id: 1, title: 'Uno' },
        { id: 2, title: 'Due' }
      ]
    }
  },
  mounted () {
    console.log(this.$refs.entry1)
  }
}
</script>
```
8. 双向绑定
```js
<template>
  <input v-model="name">
</template>
<script>
export default {
  name: 'ValueAndInput',
  data () {
    return {
      name: ''
    }
  }
}
</script>
```

```js
<template>
  <div class="loader">
    <div class="loader__bar" style="{ width: `${percent}%` }" />
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    percent: {
      type: Number
      required: true
    }
  }
}
</script>
```

### 过滤器
```js
    <div id="app">
        {{num | addYuan("￥")}}
    </div>
    <script src="js/vue.js"></script>
    <script>
        let vm = new Vue({
            el: "#app",
            data: {
                num: 1
            },
            filters: {
                addYuan(num, param) {
                    return num + param
                }
            }
        })
    </script>
```
### 全局过滤器所有实例都可以使用
```js
    <div id="app">
        {{num | addZero("￥")}}
    </div>
    <script src="js/vue.js"></script>
    <script>
        Vue.filter("addZero", function (num, param) {
            return num + param
        })
        let vm = new Vue({
            el: "#app",
            data: {
                num: 1
            }
        })
    </script>
```
### 过滤器除了可以使用在`{{}}`中还可以在绑定属性中使用
```js
    <div id="app">
        <div :class="num | addIcon('-icon')"></div>
    </div>
    <script src="js/vue.js"></script>
    <script>

        Vue.filter("addIcon", function (num, param) {
            return num + param
        })
        let vm = new Vue({
            el: "#app",
            data: {
                num: 1,
            }
        })
    </script>
```
