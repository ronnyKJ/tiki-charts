(function(){
    var Utils = KityCharts.Utils,
    addStyleSheets = Utils.addStyleSheets,
    timeStamp = Utils.timeStamp;

    var Pie = function(data){
        this.data = data;
        this.container = data.container;
        this.innerContainer = Utils.C('div');

        this.pieCanvas = Utils.C('canvas');
        this.legend = Utils.C('div');
        this.legend.className = 'legend'+timeStamp;
        this.refresh();
    };

    Pie.innerRadius = 35;
    Pie.radius = 75;
    Pie.outerRadius = 90;


    Pie.prototype = {
        refresh : function(){
            this.container.innerHTML = '';
            var data = this.data;
            var containerWidth = data.container.clientWidth;
            var containerHeight = data.container.clientHeight;

            Utils.setStyle(this.innerContainer, {
                width : containerWidth + 'px',
                height : containerHeight + 'px'
            });
            this.container.appendChild(this.innerContainer);
            this.sideLength = Math.min(containerWidth, containerHeight);

            this.init();
        },
        init : function(){
            this.initStyle();
            var sideLength = this.sideLength;
            var canvas = this.pieCanvas;
            canvas.width = canvas.height = sideLength*2;
            Utils.setStyle(canvas, {
                width : sideLength + 'px',
                height : sideLength + 'px',
                float : 'left'
            });
            var ctx = this.pieCTX = canvas.getContext("2d");
            ctx.translate(sideLength, sideLength);
            ctx.rotate(-Math.PI/2);
            this.ctx = ctx;
            this.convert2percent(this.data.series);
            this.innerContainer.appendChild(canvas);
            this.innerContainer.appendChild(this.legend);
            this.draw();
        },
        draw : function(){
            var data = this.data, series = data.series, rate, startRadian = endRadian = 0;
            var innerRadius = 0;
            if(data.pie){
                innerRadius = ('innerRadius' in data.pie ? data.pie.innerRadius : Pie.innerRadius)*2;
            }
            var outerRadius = (data.pie && data.pie.outerRadius || Pie.outerRadius)*2;
            var radius = (data.pie && data.pie.radius || Pie.radius)*2;

            var ctx = this.ctx;
            ctx.strokeStyle = '#FFF';
            ctx.lineWidth = 1;

            for (var i = 0; i < series.length; i++) {
                var serie = series[i];
                var radian = serie.percent * Math.PI * 2;
                ctx.rotate(startRadian);
                ctx.beginPath();
                ctx.arc(0, 0, innerRadius, 0, radian, false);
                ctx.arc(0, 0, radius, radian, 0, true);
                ctx.closePath();
                if(!serie.color) serie.color = Utils.defaultColors[i];
                ctx.fillStyle = serie.color;
                ctx.fill();
                ctx.stroke();
                startRadian = radian;
                this.data.legend.enabled && this.addLegend(serie);

                if(serie.subset){
                    ctx.save();
                    var outerStartRadian = 0;
                    for (var j = 0; j < serie.subset.length; j++) {
                        var sub = serie.subset[j];
                        var subRadian = sub.percent * radian;
                        ctx.rotate(outerStartRadian);
                        ctx.beginPath();
                        ctx.arc(0, 0, radius, 0, subRadian, false);
                        ctx.arc(0, 0, outerRadius, subRadian, 0, true);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();

                        outerStartRadian = subRadian;
                    };
                    ctx.restore();
                }
            };
        },
        convert2percent : function(arr){
            var sum = this.getSum(arr);
            for (var i = 0, l = arr.length; i < l; i++) {
                 var serie = arr[i];
                 serie.percent = serie.data/sum;

                 if(serie.subset){
                    this.convert2percent(serie.subset);
                 }
            }
        },
        getSum : function(arr){
            var sum = 0;
            for (var i = 0, l = arr.length; i < l; i++) {
                sum += arr[i].data;
            }
            return sum;
        },
        addLegend : function(serie){
            var html = '<div class="each-legend-box'+timeStamp+'"><div class="each-legend-color'+timeStamp+'" style="background:'+serie.color+'; "></div>'+serie.name + ' ' + (serie.percent*100).toFixed(1)+'% ('+serie.data+(this.data.legend&&this.data.legend.unit||'')+')</div>'
            this.legend.innerHTML += html;
        },
        initStyle : function(){
            addStyleSheets('.legend'+timeStamp, 'margin-top:10px;overflow:auto;clear:both;float:right;');
            addStyleSheets('.each-legend-color' + timeStamp, 'width: 10px;height:10px;float:left;margin-right:3px;');
            addStyleSheets('.each-legend-box' + timeStamp, 'margin:3px 0');
        }
    };

    window.KityCharts.Pie = Pie;
})();