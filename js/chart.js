(function(){
	var barData = {
	    guide : true,
	    container : barContainer,
	    xAxis: {
	        categories: ['Jan', 'Feb', 'Mar', 'Apr']
	    },
	    series: [
	        {   
	            name: 'Tokyo',
	            data: [10,10,10,10]
	        },
	        {   
	            name: 'Tokyo',
	            data: [20,20,20,20]
	        },
	        {   
	            name: 'Tokyo',
	            data: [30,30,30,30]
	        }     
	    ],
	    onhover : { // 该属性可为空
	        callback : function(x, yArr){ // touchmove时回调，必选
	            var s = '';
	            for (var i = 0; i < yArr.length; i++) {
	            	s += yArr[i].name + ' : ' + yArr[i].data + '<br>';
	            };
	            barShow.innerHTML = x + '<br>' + s;
	        }
	    }
	};

	new Charts.Bar(barData);


	var lineData = {
	    guide : true,
	    container : lineContainer,//指定容器
	    xAxis: {
	        categories: ['Jan', 'Feb', 'Mar']
	    },
	    series: [
	        {
	            name: 'Tokyo',
	            color : 'rgb(183, 211, 240)',
	            data: [20,10,10]
	        }
	    ],
	    onhover : { // 该属性可为空
	        callback : function(x, yArr){ // touchmove时回调，必选
	            var s = '';
	            for (var i = 0; i < yArr.length; i++) {
	            	s += yArr[i].name + ' : ' + yArr[i].data + '<br>';
	            };
	            lineShow.innerHTML = x + '<br>' + s;
	        }
	    }
	};

	new Charts.Line(lineData);

	var pieData = {
	    container : pieContainer,
	    pie : {
	        innerRadius : 30,
	        radius : 75,
	        outerRadius : 90
	    },
	    legend : {
	        unit : '元'
	    },
	    series: [
	        {
	            name: 'Tokyo',
	            data: 200
	        },
	        {
	            name: 'Beijing',
	            data: 300
	        },
	        {
	            name: 'New York',
	            data: 100
	        },
	        {
	            name: 'Taiwan',
	            data: 150
	        },
	        {
	            name: 'HK',
	            data: 250
	        }
	    ],
	    onhover : { // 该属性可为空
	        callback : function(data){ // touchmove时回调，必选
	            
	        }
	    }
	};

	new Charts.Pie(pieData);
})();