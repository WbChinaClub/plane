/*
敌机构造器
 */
function Enemy(type) {//传入类型，根据类型 决定创建什么样的敌机
    this.ele = document.createElement("div");//页面元素
    //id传入当前敌机的对象 enemyList
    this.id = "e"+Math.round(Math.random()*10000);
    gameEngine.enemyList[this.id] = this;
    //位置元素初始化为0
    var x = 0;
    var y = 0 ;
    //运动间歇
    this.timer = null;
    //根据type不同，得到不同的敌机，并且初始化
    switch(type){
        //小飞机初始化
            /*
            血量
            运动速度
            类名
            死亡动画
            分数
            位置
             */
        case this.SMALL_TYPE:
            this.hp = this.SMALL_HP;
            this.speed = this.SMALL_SPEED;
            this.ele.className = this.SMALL_CLASSNAME;
            this.dieImg = this.SMALL_DIEIMG;
            x = Math.floor(gameEngine.ele.offsetLeft + Math.random()*(parseInt(getStyle(gameEngine.ele,"width"))-this.SMALL_WIDTH));
            y = 0- this.SMALL_HEIGHT;
            this.score = this.SMALL_SCORE;
            break;
        //中飞机初始化
        case this.MIDDLE_TYPE:
            this.hp = this.MIDDLE_HP;
            this.speed = this.MIDDLE_SPEED;
            this.ele.className = this.MIDDLE_CLASSNAME;
            this.dieImg = this.MIDDLE_DIEIMG;
            x = Math.floor(gameEngine.ele.offsetLeft +Math.random()*(parseInt(getStyle(gameEngine.ele,"width"))-this.MIDDLE_WIDTH));
            y = 0- this.MIDDLE_HEIGHT;
            this.score = this.MIDDLE_SCORE;
            break;
        //大飞机初始化
        case this.LARGE_TYPE:
            this.hp = this.LARGE_HP;
            this.speed = this.LARGE_SPEED;
            this.ele.className = this.LARGE_CLASSNAME;
            this.dieImg = this.LARGE_DIEIMG;
            x = Math.floor(gameEngine.ele.offsetLeft + Math.random()*(parseInt(getStyle(gameEngine.ele,"width"))-this.LARGE_WIDTH));
            y = 0- this.LARGE_HEIGHT;
            this.score = this.LARGE_SCORE;
            break;
    }
//    alert(parseInt(getStyle(gameEngine.ele,"width")));
    //- parseInt(getStyle(this.ele,"height"));
    this.ele.style.left = x + "px";
    this.ele.style.top = y + "px";

    document.body.appendChild(this.ele);
}
/*
规定
type = 1 小
       2 中
       3 大
 */
Enemy.prototype = {
    //飞机类型
    SMALL_TYPE:1,
    MIDDLE_TYPE:2,
    LARGE_TYPE:3,
    //不同类型不同的血量
    SMALL_HP:1,
    MIDDLE_HP:3,
    LARGE_HP:10,
    //不同的速度
    SMALL_SPEED:10,
    MIDDLE_SPEED:7,
    LARGE_SPEED:5,
    //死亡动画
    SMALL_DIEIMG:["plane1_die1.png","plane1_die2.png","plane1_die3.png"],
    MIDDLE_DIEIMG:["plane2_die1.png","plane2_die2.png","plane2_die3.png","plane2_die4.png"],
    LARGE_DIEIMG:["plane3_die1.png","plane3_die2.png","plane3_die3.png","plane3_die4.png","plane3_die5.png"],
    //class样式
    SMALL_CLASSNAME:"enemy-small",
    MIDDLE_CLASSNAME:"enemy-middle",
    LARGE_CLASSNAME:"enemy-large",
    //图片宽度
    SMALL_WIDTH:59,
    MIDDLE_WIDTH:70,
    LARGE_WIDTH:165,
    //图片高度
    SMALL_HEIGHT:36,
    MIDDLE_HEIGHT:92,
    LARGE_HEIGHT:256,
    //加分数
    SMALL_SCORE:20,
    MIDDLE_SCORE:50,
    LARGE_SCORE:100,
    /*
    移动方法
     */
    move: function () {
        var self = this;
        //定义移动间歇
        this.timer = setInterval(function () {
            var y = parseInt(getStyle(self.ele,"top"));
            y = y + self.speed;
            if(y >= document.documentElement.clientHeight){//边界处理
                self.destory();
            }else{
                self.ele.style.top = y + "px";
            }
        },50);
    },
    /*
    页面上移除
     */
    destory: function () {
        this.ele.parentNode.removeChild(this.ele);
//        delete gameEngine.enemyList[this.id];
    },
    /*
    损失血量
    损失到0则爆炸
     */
    hurt: function () {
        this.hp--;
        if(this.hp == 0){
            this.boom();
        }
    },
    /*
    当hp为0时触发爆炸
     */
    boom: function () {
        gameEngine.score += this.score;//加分
        clearInterval(this.timer);//取消运动
        var index = 0;
        var last = this.dieImg.length;
        var self = this;
        var timer = setInterval(function () {//发生爆炸动画
            self.ele.style.background = "url("+"images/"+self.dieImg[index]+")";
            index++;
            if(index>=last){
                self.destory();//移除
                clearInterval(timer);//取消动画间歇
                delete gameEngine.enemyList[self.id];//

            }
        },40);
    }

}