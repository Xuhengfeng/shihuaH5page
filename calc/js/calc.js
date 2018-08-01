var vm = new Vue({
    el: '#box',
    data:{
        menu:['公积金贷款','商业贷款','组合贷款'],
        // input的双向绑定
        mode: "按贷款总额",//计算模式
        isLoans: true,//按贷款计算方式
        loans: 0,//贷款总额
        years: "30年",//贷款年限
        rate11: "最新基准利率(3.25%)",//公积金贷款利率
        rate21: "最新基准利率(4.9%)",//商业贷款利率
        rate31: "最新基准利率(3.25%)",//组合贷款的公积金贷款利率
        rate32: "最新基准利率(4.9%)",//组合贷款的商业贷款利率
        calcRate1: 3.25, //用于计算的公积金贷款利率
        calcRate2: 4.9,  //用于计算的商业贷款利率
        calcYears: 30,   //用于计算的贷款年数
        commercialLoans: 0,//组合贷款的商业贷款
        houseLoans: 0,//组合贷款的公积金贷款
        isToast: false,//是否提示
        toastContent: "请输入贷款金额",//提示内容
        rate: "7成",//公积金 商业 组合的贷款比例

        sellPrice: 0,//房价总额

        selectNum: 0,//tab切换的索引
        selectNum3: 3,//用于区分组合贷款中的3公积金贷款比例 4商业贷款比例
        one: null,
        two: null,
        three: null,
        four: null,

        isCancel: false,//打开展开选项
        ergodic : null,//展开项将要的遍历对象
        
        // 遍历对象
        calcWay: ['按房价总额','按贷款总额'], //计算方式
        loanYears: 30,  //贷款年限
        loanRate: [], //贷款利率
        loanRate2: [2,3,4,5,6,7,8],//贷款比例(多少成)
        titles: ['计算方式','贷款年限','贷款利率','贷款比例'],//展开项的标题
        titleIndex: 0,//展开项的标题的索引
    },
    created() {
        this.selectItem(1);
    },
    watch: {
        loans() {
            this.commercialLoans = this.loans - 0;
        },
        commercialLoans() {
            if(this.commercialLoans<0) this.commercialLoans=0;
            if(this.loans==0){
                return;
            }else{
                this.commercialLoans>this.loans
                ? (this.isToast=true,this.toastContent="超出贷款总额",setTimeout(()=>{this.isToast=false},3000))
                : this.houseLoans = this.loans - this.commercialLoans;
            }
        },
        houseLoans() {
            if(this.houseLoans<0) this.houseLoans=0;
            if(this.loans==0){
                return;
            }else{
                this.houseLoans>this.loans
                ? (this.isToast=true,this.toastContent="超出贷款总额",setTimeout(()=>{this.isToast=false},3000))
                : this.commercialLoans = this.loans - this.houseLoans;
            }
        }
    },
    computed: {
        //修正高亮样式
        selectNum2() {
            let num = this.titleIndex;
            switch(num) {
                case 0: return this.one;
                case 1: return this.two;
                case 2: return this.three;
                case 3: return this.four;
            }
        }
    },
    methods:{
        aaa() {
           this.loans = '';
           this.loans = '0';
        },
        /**
         * selectItem(index) 
         * index  0 1 2 控制菜单对应高亮
         * index 3 4 控制贷款利率 公积金利率 商贷利率
         */
        changeLoans() {
            this.commercialLoans = this.loans - this.houseLoans;
            this.houseLoans = this.loans - this.commercialLoans;
        },
        selectItem(index) {
            let num;
            //修改头部的菜单高亮
            index<=2
            ? this.selectNum=index 
            : this.selectNum3=index;
            num = index;
            //修改loanRate贷款利率的内容
            switch(num) {
                case 0:this.loanRate = ['','1.1倍','1.2倍'];break;
                case 1:this.loanRate = ['','9.5折','9折','8.8折','8.7折','8.6折','1.1倍','1.2倍','1.3倍','1.4倍'];break;
                case 3:this.loanRate = ['','1.1倍','1.2倍'];this.unfold(2);break;
                case 4:this.loanRate = ['','9.5折','9折','8.8折','8.7折','8.6折','1.1倍','1.2倍','1.3倍','1.4倍'];this.unfold(2);break;
            }
        },
        // 关闭展开项
        cancel() {
            this.isCancel = false;
        },
        // 控制展开项内容
        unfold(num) {
            this.isCancel = true;
            switch(num){
                case 0: 
                    this.titleIndex = 0;
                    this.ergodic  = this.calcWay;//计算方式
                    break;
                case 1: 
                    this.titleIndex = 1;
                    this.ergodic  = this.loanYears;//贷款年限                     
                    break;
                case 2: 
                    this.titleIndex = 2;
                    this.ergodic  = this.loanRate;//贷款利率                                                       
                    break;
                case 3:
                    this.titleIndex = 3;
                    this.ergodic  = this.loanRate2;//贷款比例                                                     
                    break;
            }
        },
        // 展开项点击
        selectOption(item,index) {
            //修改input的值
            let num = this.titleIndex;
            switch(num){
                case 0://计算方式
                    this.mode = item;
                    this.one = index;
                    if(item=="按房价总额"){
                        this.isLoans=false;
                    }else if(item == "按贷款总额") {
                        this.isLoans=true;
                    }
                    break;
                case 1://年限
                    this.years=item+'年';
                    this.calcYears=item;
                    this.two = index;
                    if(item<=5&&item>1){
                        this.rate11="最新基准利率(2.75%)";
                        this.rate21="最新基准率(4.75%)";
                        this.rate31="最新基准利率(2.75%)";
                        this.rate32="最新基准率(4.75%)";
                        if(this.selectNum==0){
                            this.calcRate=2.75;
                        }else if(this.selectNum==1){
                            this.calcRate=4.75;                                    
                        }
                    }
                    else if(item == 1) {
                        this.rate11="最新基准利率(2.75%)";
                        this.rate21="最新基准率(4.35%)";
                        this.rate31="最新基准利率(2.75%)";
                        this.rate32="最新基准率(4.35%)";
                    }
                    else{
                        this.rate11="最新基准利率(3.25%)";
                        this.rate21="最新基准率(4.9%)";
                        this.rate31="最新基准利率(3.25%)";
                        this.rate32="最新基准率(4.9%)";
                        if(this.selectNum==0){
                            this.calcRate=3.25;
                        }else if(this.selectNum==1){
                            this.calcRate=4.9;
                        }
                    }
                    break;
                case 2://利率
                    this.three = index;
                    this.changeRate(item,index,this.selectNum);
                    break;
                case 3://贷款比例
                    this.four = index;
                    this.rate=item+'成';
                    break;
            }
            this.cancel();
        },
        changeRate(item,index,selectNum) {
            let resultRate;
            let num = item.slice(0,-1)-0;
            if(this.selectNum == 0){
                //修改贷款利率 基准利率3.25%
                resultRate = Math.floor( num * 3.25 * 100) / 100//不四舍五入 截取小数点后两位 思想是先扩大100倍取整，再缩小100倍
                this.calcRate1 = resultRate;

                index==0
                ? this.rate11 = "最新基准利率(3.25%)"
                : this.rate11 = "最新基准利率"+item+"("+resultRate+"%)";
            }else if(this.selectNum == 1) {
                //修改贷款利率 基准利率4.9%
                if(item.slice(-1)=='折'){
                    resultRate = num * 4.9 / 10;
                }else if(item.slice(-1)=='倍'){
                    resultRate = num * 4.9;                                   
                }
                resultRate = Math.floor(resultRate * 100) / 100//不四舍五入 截取小数点后两位 思想是先扩大100倍取整，再缩小100倍
                this.calcRate2 = resultRate;
                
                index==0
                ? this.rate21 = "最新基准利率(4.9%)"
                : this.rate21 = "最新基准利率"+item+"("+resultRate+"%)";
            }else if(this.selectNum == 2){
                if( this.selectNum3 == 3) {
                    //修改贷款利率 基准利率3.25%
                    resultRate = Math.floor(num * 3.25 * 100) / 100//不四舍五入 截取小数点后两位 思想是先扩大100倍取整，再缩小100倍
                    this.calcRate1 = resultRate;

                    index==0
                    ? this.rate31 = "最新基准利率(3.25%)"
                    : this.rate31 = "最新基准利率"+item+"("+resultRate+"%)";
                }else{
                    //修改贷款利率 基准利率4.9%
                    if(item.slice(-1)=='折'){
                        resultRate = num * 4.9 / 10;
                    }else if(item.slice(-1)=='倍'){
                        resultRate = num * 4.9;                                   
                    }
                    resultRate = Math.floor(resultRate * 100) / 100//不四舍五入 截取小数点后两位 思想是先扩大100倍取整，再缩小100倍
                    this.calcRate2 = resultRate;
                    
                    index==0
                    ? this.rate32 = "最新基准利率(4.9%)"
                    : this.rate32 = "最新基准利率"+item+"("+resultRate+"%)";
                }
            }
        },
        //计算
        calcResult() {
            //验证是否输入贷款额 
            if(this.loans==0){
                this.isToast = true;
                return setTimeout(()=>{this.isToast=false},3000);
            }

            //这里调取真正的计算
            let result; 
            if(this.selectNum == 0){//公积金贷款按贷款总额计算
                if(this.isLoans) {
                    result = this.calcformula1(0);
                }else{
                    result = this.calcformula2(0);
                }
            }else if(this.selectNum == 1){//商业贷款按贷款总额计算
                if(this.isLoans) {
                    result = this.calcformula1(1);
                }else{
                    result = this.calcformula2(1);
                }
            
            }else{//组合贷款按贷款总额计算
                if(this.isLoans){
                    result = this.groupCalc();
                }else{
                    result = this.groupCalc();
                }
            }

            if(this.loans!=0) location.href="./calcChart.html?one="+JSON.stringify(result.one)+"&two="+JSON.stringify(result.two);
        },
        /**
         * 计算公式
         * 等额本金计算公式
         * 每月还款额 = 本金/还款月数 + (本金-累计还款总额)*月利率
         * 每月本金 = 本金/还款月数
         * 每月利息 = (本金-累计还款总额)*月利率
         * 每月月供递减额 = 贷款本金/还款月数*月利率
         * 总利息 = [(贷款本金/还款月数+贷款本金*月利率)+贷款本金/还款月数*(1+月利率)]/2*还款月数-贷款本金
         * 计算原则: 每月归还的本金额始终不变,利息随剩余本金的减少减少。
         *
         * 等额本息计算公式
         * 每月还款额 = (本金*月利率*(1+月利率)^还款月数)/((1+月利率)^还款月数-1);
         * 每月还利息 = 剩余本金*贷款月利率   注:第一个月的剩余本金就是贷款本金
         * 还款总利息 = 贷款本金*贷款月数*月利率*(1+月利率)^还款月数 / [(1+月利率)^还款月数-1]-贷款本金
         * 计算原则: 银行从每月月供款中,先收取剩余本金的利息,后收取本金;利息在月供比例中
         *          随剩余本金的减少而降低,本金在月供款中的比例变高,但是月供总额不变。
         * 
         * 房屋价格的贷款额度计算
         * 房屋总价 = 单价*面积
         * 贷款额度 = 房屋总价*贷款成数/10
         * 参考首付 = 房屋总价-贷款金额
         * 月利率 = 年利率*倍数/12 或者 年利率*折扣数/12
         * 还款月数 = 贷款年限*12
         * 支付利息 = 月均还款*还款月数 - 贷款金额
         * 月均还款 = (贷款金额*月利率*(1+月利率)^还款月数)/((1+月利率)^还款月数-1)
         * 
         * 组合型计算
         * 商业贷款月均还款 = (商业贷款金额*月利率*(1+月利率)^还款月数)/((1+月利率)^还款月数-1)
         * 公积金贷款月均还款 = (公积金贷款金额*月利率*(1+月利率)^还款月数)/((1+月利率)^还款月数-1)
         * 月均还款 = 商业贷款月均还款 + 公积金贷款月均还款
         * 贷款金额 = 商业贷款金额+公积金贷款金额
         * 月利率 = 年利率*倍数/12 或者 年利率*折扣数/12
         * 支付利息 = 月均还款*还款月数 - 贷款金额
         */
        //公积金和商业贷款
        calcformula1(num) {
            //按照贷款总额进行计算
            let rate = num == 0 ? this.calcRate1 : this.calcRate2;
            let D = (this.loans-0)*10000;    //贷款总额多少元
            let R = rate/100;                //贷款利率(年利率)
            let r = R/12;                    //月利率 
            let years = this.calcYears;      //贷款年数
            let month = years*12;            //月数

            let result1 = {                //等额本金
                totalLoans: D,             //贷款总额多少元
                totalLoans2: D/10000,      //贷款总额多少万
                month: month,              //月数
                rnb: null,                 //每月还款多少元
                totalRnb: null,            //总共还多少元
                totalInterest: null,       //总共支付多少万利息
                totalInterest2: null,      //总共支付多少元利息
                Decreasing: null,          //每月递减多少元
            }
            let result2 = {                //等额本息
                totalLoans: D,             //贷款总额多少元
                totalLoans2: D/10000,      //贷款总额多少万
                month: month,              //月数
                rnb: null,                 //每月还款多少元
                totalRnb: null,            //总共还多少元
                totalInterest: null,       //总共支付多少万利息
                totalInterest2: null,      //总共支付多少元利息
            }

            //年数
            "string" == typeof this.years
            ? years = this.years.slice(0,-1)-0
            : years = this.years;

            //等额本金总利息
            let totalInterest = [(D/month+D*r)+D/month*(1+r)]/2*month-D;
            result1.totalInterest = Math.floor(totalInterest/10000*10)/10;
            result1.totalInterest2 = Math.floor(totalInterest);
            result1.totalRnb = result1.totalInterest + result1.totalLoans2;
            result1.rnb = Math.floor((D - result1.totalRnb)*r + D/month);
            result1.Decreasing = Math.floor((D/month*r));

            //等额本息月均还款
            let midn = Math.pow((1+r), month);
            let rnb = (D*r*midn)/(midn-1);
            result2.rnb = Math.floor(rnb);
            result2.totalInterest = Math.floor((rnb*month-D)/10000*10)/10;
            result2.totalInterest2 = Math.floor((rnb*month-D)*10)/10;
            result2.totalRnb = result2.totalInterest + result2.totalLoans2;
            return {
                one: result1,
                two: result2
            };
        },
        //组合贷款计算
        groupCalc() {
            let D1 = this.houseLoans*10000;        //公积金贷款
            let D2 = this.commercialLoans*10000;   //商业贷款
            let D = D1 + D2;
            let R1 = this.calcRate1/100;     //公积金贷款利率
            let R2 = this.calcRate2/100;     //商业贷款利率
            let r1 = R1/12;                  //公积金贷款月利率
            let r2 = R2/12;                  //商业贷款月利率
            let years = this.calcYears;      //贷款年数
            let month = years*12;            //月数

            let result1 = {                //等额本金
                totalLoans: D,             //贷款总额多少元
                totalLoans2: D/10000,      //贷款总额多少万
                month: month,              //月数
                rnb: null,                 //每月还款多少元
                totalRnb: null,            //总共还多少元
                totalInterest: null,       //总共支付多少万利息
                totalInterest2: null,      //总共支付多少元利息
            }
            let result2 = {                //等额本息
                totalLoans: D,             //贷款总额多少元
                totalLoans2: D/10000,      //贷款总额多少万
                month: month,              //月数
                rnb: null,                 //每月还款多少元
                totalRnb: null,            //总共还多少元
                totalInterest: null,       //总共支付多少万利息
                totalInterest2: null,      //总共支付多少元利息
            }

            //年数
            "string" == typeof this.years
            ? years = this.years.slice(0,-1)-0
            : years = this.years;

            //等额本金
            let r = (R1+R2)/12;
            let totalInterest = [(D1/month+D1*r1)+D1/month*(1+r1)]/2*month-D1 + [(D2/month+D2*r2)+D2/month*(1+r2)]/2*month-D2
            result1.totalInterest = Math.floor(totalInterest/10000*10)/10;
            result1.totalInterest2 = Math.floor(totalInterest);
            result1.totalRnb = result1.totalInterest + result1.totalLoans2;
            result1.rnb = Math.floor((D1 - result1.totalRnb)*r1 + D1/month+ (D2 - result1.totalRnb)*r2 + D2/month);
            result1.Decreasing = Math.floor(D1/month*r1+D2/month*r2);


            //等额本息月均还款 = 商业贷款月均还款 + 公积金贷款月均还款
            let midn1 = Math.pow((1+r1), month);
            let midn2 = Math.pow((1+r2), month);
            let rnb = (D1*r1*midn1)/(midn1-1) + (D2*r2*midn2)/(midn2-1);
            result2.rnb = Math.floor(rnb);
            result2.totalInterest = Math.floor((rnb*month-D)/10000*10)/10;
            result2.totalInterest2 = Math.floor((rnb*month-D)*10)/10;
            result2.totalRnb = result2.totalInterest + result2.totalLoans2;

            return {
                one: result1,
                two: result2
            };
        },
        //按房价总额进行计算
        calcformula2(num) {
            console.log('点击')
            //按照房价总额进行计算
            let rate = num == 0 ? this.calcRate1 : this.calcRate2;
            let housesell = this.sellPrice;  //房价总额
            let D = (this.loans-0)*10000;    //贷款总额多少元
            let R = rate/100;                //贷款利率(年利率)
            let r = R/12;                    //月利率 
            let years = this.calcYears;      //贷款年数
            let month = years*12;            //月数

            let result1 = {                //等额本金
                totalLoans: D,             //贷款总额多少元
                totalLoans2: D/10000,      //贷款总额多少万
                month: month,              //月数
                rnb: null,                 //每月还款多少元
                totalRnb: null,            //总共还多少元
                totalInterest: null,       //总共支付多少万利息
                totalInterest2: null,      //总共支付多少元利息
                Decreasing: null,          //每月递减多少元
            }
            let result2 = {                //等额本息
                totalLoans: D,             //贷款总额多少元
                totalLoans2: D/10000,      //贷款总额多少万
                month: month,              //月数
                rnb: null,                 //每月还款多少元
                totalRnb: null,            //总共还多少元
                totalInterest: null,       //总共支付多少万利息
                totalInterest2: null,      //总共支付多少元利息
            }

            //年数
            "string" == typeof this.years
            ? years = this.years.slice(0,-1)-0
            : years = this.years;

            //等额本金总利息
            let totalInterest = [(D/month+D*r)+D/month*(1+r)]/2*month-D;
            result1.totalInterest = Math.floor(totalInterest/10000*10)/10;
            result1.totalInterest2 = Math.floor(totalInterest);
            result1.totalRnb = result1.totalInterest + result1.totalLoans2;
            result1.rnb = Math.floor((D - result1.totalRnb)*r + D/month);
            result1.Decreasing = Math.floor((D/month*r));

            //等额本息月均还款
            let midn = Math.pow((1+r), month);
            let rnb = (D*r*midn)/(midn-1);
            result2.rnb = Math.floor(rnb);
            result2.totalInterest = Math.floor((rnb*month-D)/10000*10)/10;
            result2.totalInterest2 = Math.floor((rnb*month-D)*10)/10;
            result2.totalRnb = result2.totalInterest + result2.totalLoans2;
            return {
                one: result1,
                two: result2
            };
        }
    }
}) 
