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

dep.addSub(watcher);
dep.addSub(watcher);

console.log(dep.subs)