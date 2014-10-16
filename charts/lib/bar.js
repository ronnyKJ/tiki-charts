(function(){
    var Utils = Charts.Utils,
        BLBase = Charts.BLBase,
        addStyleSheets = Utils.addStyleSheets,
        defaultColors = Utils.defaultColors,
        timeStamp = Utils.timeStamp;

        addStyleSheets('.bar-container'+timeStamp, 'position:absolute;overflow:hidden;width:100%;height:100%;left:0px;top:0px;z-index:1');
        addStyleSheets('.indicator'  +timeStamp, 'position:absolute;width: 0;height: 100%;border-left: #7cbb7e 1px dashed;border-right: #7cbb7e 1px dashed;');

    var Bar = function(data){
        if(!data.container) return;
        this.setBaseProperties(data);
        this.barContainer = null;
        this.indicator = Utils.C('div');
        this.indicatorLastIndex = null;
        this.refresh();
    }

    Bar.prototype = new BLBase();

    Bar.prototype = Utils.mergeObj(Bar.prototype, {
        refresh : function(data){
            var data = data || this.data;

            this.clear();
            this.setBaseComponents();

            this.setComponents();
            if(data.onhover && data.onhover.callback){
                this.bindAction(this.barContainer);
                var start = data.onhover.start === undefined? 10000 : data.onhover.start;
                var index = this.indicatorLastIndex === null ? start : this.indicatorLastIndex;
                this.showIndicator(0, 0, index, true);
            }
        },
        setComponents : function(){
            // 折线容器
            var barContainer = this.barContainer = Utils.createEle('div', {}, 'bar-container'+timeStamp);

            // 折线画布
            this.innerContainer.appendChild(barContainer);
            this.renderBars();

            this.barContainer.appendChild(this.indicator);
            this.indicator.className = 'indicator'+timeStamp;
            Utils.setStyle(this.indicator, this.data.indicator||{});

            if(this.data.series.length > 1) this.renderLegend();
        },
        renderBars : function(){
            var data = this.data,
                commonAttr = this.commonAttr,
                yAxis = commonAttr.yAxis,
                xAxis = commonAttr.xAxis,
                series = data.series,
                l = series.length,
                barWidth = data.bar && data.bar.width || 5;

            for (var i = 0; i < l; i++) {
                var yArr = commonAttr.yAxis[i];
                for (var j = 0; j < yArr.length; j++) {
                    Utils.createEle('div', {
                        position : 'absolute',
                        left: xAxis[j] - (l*barWidth/2) + i*barWidth + 'px',
                        bottom : 0,
                        width : barWidth + 'px',
                        height : yArr[j] + 'px',
                        backgroundColor : series[i].color || defaultColors[i],
                        zIndex : 1
                    }, '', '', this.barContainer);
                };
            };
        },

        clear : function(){
            this.container.innerHTML = '';
            this.barContainer && (this.barContainer.innerHTML = '');
        },

        onShowIndicator : function(posX, index, isRefresh){
            var commonAttr = this.commonAttr,
                data = this.data;

            var yValArr = [];
            var l = commonAttr.yAxis.length;
            for(var j = 0; j < l; j++) {
                yValArr.push({
                    name : data.series[j].name,
                    data : data.series[j].data[index]
                });
            }

            var xVal = data.xAxis.categories[index];
            // 回调
            data.onhover && data.onhover.callback && data.onhover.callback(xVal, yValArr);
        },
    });


    window.Charts.Bar = Bar;
})();