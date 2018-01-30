function Vue(options = {}) {
    this.$opotions = options; //将所有数据挂载在$opotions
    // this._data
    var data = this._data = this.$opotions.data;

    observe(data);

    // 实例要代理_data
    for (const key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                return this._data[key];
            },
            set(newValue) {
                this._data[key] = newValue;
            }
        })
    }

    new Compile(options.el, this)
}

//  编译
function Compile(el, vm) {
    // el表示替换的范围
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();

    // 将app中的内容移动到内容中
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }

    replace(fragment);

    function replace(fragment) {
        Array.from(fragment.childNodes).forEach((node) => { //循环每一层
            let text = node.textContent;
            // 拿到内容
            let reg = /\{\{(.*)\}\}/;
            // 替换文本节点并且有大括号
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split("."); //[a,a]
                let val = vm;
                arr.forEach((k) => { //取值this.a.a
                    val =  val[k]
                })
                node.textContent = text.replace(/\{\{(.*)\}\}/, val);
            }
            if (node.childNodes) {
                //  标签循环嵌套
                replace(node);
            }
        })
    }

    vm.$el.appendChild(fragment);
}


// vm.$options

// 观察对象给对象增加Objevt.defineProperty
function observe(data) {
    if (typeof data !== "object") return;
    return new Observe(data)
}

function Observe(data) {
    for (const key in data) {
        let value = data[key];

        observe(value);
        Object.defineProperty(data, key, { //data通过Objevt.defineProperty的方式定义属性
            enumerable: true, //要循环
            get() {
                return value;
            },
            set(newValue) {
                // 更改值得时候
                if (newValue === value) return; //设置的值和之前的一样的
                value = newValue; //如果以后再获取值得时候将刚才设置的值丢回去

                observe(newValue);
            }
        })
    }
}
// vue的特点不能增加不存在的属性，不存在的属性是没有get和set的
// 深度响应：因为每次赋予一个新对象都会增加数据劫持

// 发布订阅模式 订阅 再发布 [fn1, fn2]
// 绑定的方法都有update
function Dep() {
    this.subs = [];
}

Dep.prototype.addSub = function (sub) { //订阅
    this.subs.push(sub);
}

Dep.prototype.notify = function() {
    this.subs.forEach((sub) => {
        sub.update();
    })
}

function Watcher(fn) { //Watch这个类创建的实例都有update方法
    this.fn = fn;
}

Watcher.prototype.update = function() {
     this.fn()
};

let watcher = new Watcher(function () {
    console.log(1)
})

let dep = new Dep();
