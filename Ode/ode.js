function ch_func(v1,func){
	x=v1;
	var val=eval(func);
	return val;
}

function calc_func(v1,v2,func){
	x=v1;
	y=v2;
	var val=eval(func);
	return val;
}

function calc_func_2(f,p,q,x,v2,c){
	var val=eval(f)-eval(p)*c-eval(q)*v2;
	return val;
}


function rk(f,p,q,h,yd,val,a,f0,fb,n,y){
    var ych2=0;
    var k1=0,k2=0,k3=0,k4=0,m1=0,m2=0,m3=0,m4=0;
    yd[0]=val;
    y[0]=f0;

    for (var i = 0; i < n;i++){
      x = a+h*i;
      m1=h*yd[i];
      k1 = h * calc_func_2(f,p,q,x,y[i],yd[i]);
      
      m2=h*(yd[i]+k1/2)
      k2 = h * calc_func_2(f,p,q,x+h/2,y[i]+m1/2,yd[i] + k1/2);
      
      m3=h*(yd[i]+k2/2)
      k3 = h * calc_func_2(f,p,q,x+h/2,y[i]+m2/2,yd[i] + k2/2);
      
      m4=h*(yd[i]+k3)
      k4 = h * calc_func_2(f,p,q,x+h,y[i] + m3,yd[i] + k3)
      
      y[i+1] = y[i] +(m1 + m2 + m2 + m3 + m3 + m4 )/6 ;
      yd[i+1] =yd[i]+ ( k1 + k2 + k2 + k3 + k3 + k4 )/6;
   }
   
   return y[n]-fb;
}

function solveode1(func,a,b,n,y_a,check_ode){
	 var x=0;
	 var y=0;
	 
     var y=new Array()
  
	  if (a.indexOf(".")+1){
     		a=parseFloat(a);
     	} else {
     		a=parseInt(a);
     	}

     	if (b.indexOf(".")+1){
     		b=parseFloat(b);
     	} else {
     		b=parseInt(b);
     	}

     	if (y_a.indexOf(".")+1){
     		y_a=parseFloat(y_a);
     	} else {
     		y_a=parseInt(y_a);
     	}

	  var k1=0, k2=0, k3=0, k4=0, x=0;
	  var h=0;
	  h=(b-a)/n;
	  y[0]=y_a;

	  for (var i = 0; i<n+1; i++) {
		x = a + h*i;
		k1 = h*calc_func(x,y[i],func);
		k2 = h*calc_func(x+h/2,y[i]+k1/2,func);
		k3 = h*calc_func(x + h / 2, y[i] + k2/ 2,func);
		k4 = h*calc_func(x + h, y[i] + k3,func);
		y[i + 1] = y[i] + (k1 + 2 * (k2 + k3) + k4) / 6;
	 }
	

     var str="";

     if (check_ode==""){
     	str="x y[i] <br>"
     	for (var i=0;i<=n;i++){
     		x=a+i*h;
  			str=str+x.toFixed(5)+"  "+y[i].toFixed(5)+"<br>";
  		}	
  	} 
  	else {
  	  str="x y[i] check_y[i] <br>"
     	for (var i=0;i<=n;i++){
     		x=a+i*h;
     		var ch=ch_func(x,check_ode);
  			str=str+x.toFixed(5)+"  "+y[i].toFixed(5)+"  "+ch.toFixed(5)+"<br>";
  		}
  	}
  	
  	return str
 }


function solveode2(func,p,q,a,b,n,y_a,y_b,check_ode){
     var x=0;
	 var y=0;
     var y=new Array()
     var yd=new Array()
     var max=200;

     
     	if (a.indexOf(".")+1){
     		a=parseFloat(a);
     	} else {
     		a=parseInt(a);
     	}

     	if (b.indexOf(".")+1){
     		b=parseFloat(b);
     	} else {
     		b=parseInt(b);
     	}

     	if (y_a.indexOf(".")+1){
     		y_a=parseFloat(y_a);
     	} else {
     		y_a=parseInt(y_a);
     	}

     	if (y_b.indexOf(".")+1){
     		y_b=parseFloat(y_b);
     	} else {
     		y_b=parseInt(y_b);
     	}
     
	 var k1=0, k2=0, k3=0, k4=0, x=0;
	 var h=0;
	 h=(b-a)/max;
	 y[0]=y_a;
	 
    var test_x_1 = 0;
	var test_x_2 = 0;
	var test_x_3 = 0;
	var delta_x = 0.1;
	var tmp = 0;

	var func_2 = 0;
	var func_1 = 0;
	var func_3 = 0;

	var delta_func = 0;
	var border = 0.00000001;

	var derivative_f = 0;

	test_x_1 = -10;
	test_x_2 = 10;

	while (0<1) {
		func_1 = rk(func,p,q,h,yd,test_x_1,a,y_a,y_b,max,y);
		func_2 = rk(func,p,q,h,yd,test_x_2,a,y_a,y_b,max,y);

		if ((Math.abs(func_1) < border) || (Math.abs(func_2) < border)) {
			break;
		}

		delta_func = func_2 - func_1;
		delta_x = test_x_2 - test_x_1;
		derivative_f = delta_func / delta_x;
		test_x_3 = test_x_2 - func_2 / derivative_f;
		test_x_1 = test_x_2;
		test_x_2 = test_x_3;
	}
	
	 if (check_ode==""){
     	str="x y[i] <br>"
     	for (var i=0;i<=max;i++){
     		x=a+i*h;
     		if (max%n==0){
  			  str=str+x.toFixed(5)+"  "+y[i].toFixed(5)+"<br>";
  			}
  		}	
  	} 
  	else {
  	    str="x y[i] check_y[i] <br>"
     	for (var i=0;i<=max;i++){
     		x=a+i*h;
     		var ch=ch_func(x,check_ode);
     		if (max%n==0){
  			   str=str+x.toFixed(5)+"  "+y[i].toFixed(5)+"  "+ch.toFixed(5)+"<br>";
  			}
  		}
  	}
  	
  	return str
 }