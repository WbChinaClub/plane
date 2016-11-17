/*
我方飞机
 */
//构造器
function MyPlane(fireInterval) {
    this.fireInterval = fireInterval; //设置自动开火的间歇 由游戏难度决定
    this.ele = document.createElement("div");//在页面上创建飞机元素
    this.ele.className = "myplane";
    this.timer;//设置移动间歇
    this.dieImg = ["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"];//死亡动画
    document.body.appendChild(this.ele);//添加到页面
    //设置定位
    this.ele.style.bottom = 0;
    this.ele.style.left = document.documentElement.clientWidth/2 - this.ele.offsetWidth/2 + "px";
}
//原型中写共享方法
MyPlane.prototype = {
    /*
    移动 由页面监听的键盘事件来触发move移动
     */
    move: function (speed) {
        clearInterval(this.timer);//先取消间歇
        var self = this;//涉及到闭包，需要传递this
        this.timer = setInterval(function () {
            var x = parseInt(getStyle(self.ele,"left"));//拿到 当前left值
            x = x + speed;//计算加了速度以后的 结果值
            //判断是否超过边界
            if(x<=gameEngine.ele.offsetLeft){
                self.ele.style.left = gameEngine.ele.offsetLeft+"px";
            }else if(x>=gameEngine.ele.offsetLeft+gameEngine.ele.offsetWidth- self.ele.offsetWidth){
                self.ele.style.left =gameEngine.ele.offsetLeft+gameEngine.ele.offsetWidth- self.ele.offsetWidth + "px";
            }else{
                self.ele.style.left = x + "px";
            }

        },30);
    },
    //如果界面进行键盘事件监听的时候，发生keyup事件，这个时候也不能移动了，所以取消this.timer
    stop: function () {
        clearInterval(this.timer);
    },
    //自动开火，那么间歇由界面里选择value传入
    autofire: function () {
        var self = this;
        setInterval(function () {//间歇创建子弹，并且让子弹发射
            var b = new Bullet(self);//要传入飞机这个参数值,子弹就知道是谁发射的它
            b.move();//子弹就向上发射
        },self.fireInterval);
    },
    /*
    一旦被检测到碰撞，应该发生 爆炸
     */
    boom: function () {
        var self = this;
        var index = 0;
        var last = self.dieImg.length;
        var timer = setInterval(function () {//动画效果
            self.ele.style.background = "url("+self.dieImg[index]+")";
            index++;
            if(index>=last){
                clearInterval(timer);
            }
        },50);
    }
}















