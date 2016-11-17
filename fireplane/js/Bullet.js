
//子弹(构造函数)
//要传入飞机形参， 知道是谁发射的
function Bullet(plane){
    //给一个id，放入 引擎里的当前所有子弹的对象
    this.id = "b"+Math.round(Math.random()*10000);
    gameEngine.bulletList[this.id] = this;//bulletList存储 当前页面里所有的子弹
    //运动间歇
    this.timer = null;
    //传入的飞机
    this.plane = plane;
    //创建子弹页面元素
    this.ele = document.createElement("div");
    this.ele.className = "bullet";
    document.body.appendChild(this.ele);
    //位置定位
    this.ele.style.left = this.plane.ele.offsetLeft + this.plane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px";
    this.ele.style.top =document.documentElement.offsetHeight - this.plane.ele.offsetHeight - this.ele.offsetHeight + "px";
    this.dieImg = ["images/die1.png","images/die2.png"];//死亡动画
}

Bullet.prototype = {
    /*
    move 移动的运动
     */
    move:function () {
        var speed = -10;//速度给定
        var self = this;
        this.timer = setInterval(function () {
            var y = parseInt(getStyle(self.ele,"top"));
            y = y + speed;
            if(y<=0-self.ele.offsetHeight){//运动边界处理
                self.destory();
                delete gameEngine.bulletList[self.id];
                clearInterval(self.timer);
            }else{//正常改变位置
                self.ele.style.top = y + "px";
            }
        },40)
    },
    /*
    boom
     */
    boom: function () {//发生爆炸是在进行碰撞检测以后
        clearInterval(this.timer);//取消运动间歇
        var index = 0;
        var last = this.dieImg.length;
        this.ele.className = "bullet-die";//将它修改className，因为在css中定义了爆炸的效果的css
        var self = this;
        var timer = setInterval(function () {//死亡动画轮播
            self.ele.style.background = "url("+self.dieImg[index]+")";
            index++;
            if(index>=last){
                self.destory();//页面上清除 子弹
                clearInterval(timer);
            }
        },40)
    },
    /*
    destory 在页面上清除 这个ele元素
     */
    destory: function () {
        this.ele.parentNode.removeChild(this.ele);
    }
}










