# Vue组件的数据通讯介绍

1. 单个组件进行数据通讯
2. 多个组件进行数据通讯
3. 任何组件进行数据通讯

这是关于Vue组件的模板和脚本部分如何协同工作的。模板和脚本构成一个单元并共享相同的数据。

在模板中绑定时间，下面是给按钮绑定一个点击事件的例子。
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
绑定事件的时候你还可以传入参数
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
