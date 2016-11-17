
//游戏引擎
var gameEngine = {
    /*
    属性部分
     */
    //游戏区域
    ele:null,
    //记录分数最大值
    arr:[],
    //当前页面上所有的子弹对象(id)  检测碰撞方法里使用
    bulletList:{},
    //当前页面所有敌机对象(id) 检测碰撞方法里使用
    enemyList:{},
    //由于 每个游戏一启动都有唯一的myplane
    myplane:null,
    //子弹间歇
    interval:0,
    //分数
    score:0,
    //分数显示区域
    scoreEle:null,
    /*
    启动引擎的方法
     */
    start: function () {
        //首先 加载页面
        gameEngine.loading(function () {
            //拿到分数区域
            gameEngine.scoreEle = document.getElementById("score");
            //拿到游戏区域
            gameEngine.ele = document.getElementById("body_main");
            //创建我的飞机，并且给定 interval间歇
            gameEngine.myplane = new MyPlane(gameEngine.interval);
            //自动开火
            gameEngine.myplane.autofire();
            //创建敌机
            gameEngine.createEnemy();
            //监听键盘事件
            gameEngine.keyListener();
            //监听碰撞检测
            gameEngine.crashListener();
        });
    },
    //创建敌机
    createEnemy: function () {
        //一定几率创建小飞机
        setInterval(function () {
            var x = Math.random()>0.7?1:0;
            if(x>0){
                new Enemy(x).move();
            }
        },500);
        //一定几率创建中飞机
        setInterval(function () {
            var x = Math.random()>0.8?2:0;
            if(x>0){
                new Enemy(x).move();
            }
        },1500);
        //一定几率创建大飞机
        setInterval(function () {
            var x = Math.random()>0.9?3:0;
            if(x>0){
                new Enemy(x).move();
            }
        },2000);
    },
    /*
    键盘监听
     */
    keyListener: function () {
        var self = this;
        //按下的时候进行移动
        document.onkeydown = function (evt) {
            var e = evt || window.event;
            var code = e.keyCode;
            if(code == 37){//<-
                self.myplane.move(-8);//调用飞机移动的方法
            }else if(code == 39){//->
                self.myplane.move(8);
            }
        }
        //抬起的时候取消移动
        document.onkeyup = function () {
            self.myplane.stop();
        }
    },
    /*
    碰撞检测
     */
    crashListener: function () {
        var self = this;
        var timer = setInterval(function () {
            //检测碰撞
            /*
            首先遍历 所有的敌机 在外层，方便检测与myplane的碰撞
             */
            for(var i in self.enemyList){
                for(var j in self.bulletList){//遍历所有子弹和敌机进行碰撞检测
                    if(isCrash(self.enemyList[i].ele,self.bulletList[j].ele)){
                        self.bulletList[j].boom();//一旦发生碰撞 ，子弹爆炸
                        self.enemyList[i].hurt();//敌机血量减少
                        delete gameEngine.bulletList[j];//并且当前的子弹量减少
                        self.scoreEle.innerHTML = self.score;//并且修改分数
                    }
                }
                if(isCrash(self.myplane.ele,self.enemyList[i].ele)){//所有敌机和MyPlane进行碰撞检测
//                    gameEngine.myplane.boom();
                var ms=document.getElementById("max-score");
                var btn=document.getElementById("btn");
                var whitef=document.getElementById("white-float");///
                    whitef.style.display="block";
                var cs=document.getElementById("current-score");
                    gameEngine.arr.push(parseInt(self.scoreEle.innerHTML));
                var arr2=bubbleSort(gameEngine.arr)
                    ms.innerHTML=arr2[0];
                    if(arr2.length>2){
                        arr2.pop();
                     }
                    cs.innerHTML=self.scoreEle.innerHTML;
                    clearInterval(timer);
                    btn.onclick=function(){
                        whitef.style.display="none";
                        self.scoreEle.innerHTML = 0;//分数显示归0
                        self.score = 0;//分数归0
                        //产生两秒的金身状态
                        setTimeout(function () {
                            gameEngine.crashListener();
                        },2000);
                    }

                }
            }
        },30);
    },
    /*
    加载方法
    1 logo加载
    2 loading加载  类似进度条
     */
    loading: function (callback) {
        logo.init();//
        logo.show();
        var ele = document.createElement("div");//创建loading
        ele.className = "loading";
        document.body.appendChild(ele);
        var arr = ["images/loading1.png","images/loading2.png","images/loading3.png"];//loading动画
        var index = 0;//规定加载次数
        var lastIndex = 9;
        var timer = setInterval(function () {
            ele.style.background = "url("+arr[index%3]+")";
            index++;
            if(index>9){//当加载达到制定次数以后//进入游戏
                clearInterval(timer);//取消掉动画效果
                document.body.removeChild(ele);//并且移除loading
                logo.hidden();//移除logo
                if(callback){//如果有回调，直接执行回调
                    callback();
                }
            }
        },500)
    }

}
/*
logo对象
作为图标的显示
 */
var logo = {
    ele:null,

    init: function () {
        this.ele = document.createElement("div");
        this.ele.className = "logo";
    },
    show: function () {
        document.body.appendChild(this.ele);
    },
    hidden: function () {
        document.body.removeChild(this.ele);
    }
}











