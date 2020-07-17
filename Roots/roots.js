var precision=1e-12;
var eps=1e-12;
var precision=1e-12;
var eps=1e-12;

String.prototype.repeat = function(count) {
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
};

Number.isInteger = Number.isInteger || function isInteger (value) {
  return typeof value === 'number' && 
    isFinite(value) && 
    Math.floor(value) === value
}

Math.cbrt = function(x) {
    var sign = x === 0 ? 0 : x > 0 ? 1 : -1;
    return sign * Math.pow(Math.abs(x), 1 / 3);
}

Math.fraction=function(x){
	return x?+x?x.toString().indexOf(".")+1?x.toString().replace(".","")/(function(a,b){
	return b?arguments.callee(b,a%b):a;})(x.toString().replace(".",""),"1"+"0".repeat(x.toString().split(".")[1].length))+"/"+("1"+"0".repeat(x.toString().split(".")[1].length))/
    (function(a,b){
	return b?arguments.callee(b,a%b):a;})(x.toString().replace(".",""),"1"+"0".repeat(x.toString().split(".")[1].length)):x+"/1":NaN:void 0;
}
	
function root3(a,b,c,d){
  var pi=3.14159265358979323846
  var disc = 0;
  var q = 0; 
  var r = 0;  
  var dum1 = 0; 
  var s, t, term1, r13;
  var x1_re=0,x1_im=0, x2_re=0,x2_im=0, x3_re=0,x3_im=0;

  b /= a;
  c /= a;
  d /= a;
  q = (3.0*c - (b*b)) / 9.0;
  r = -(27.0*d) + b*(9.0*c - 2.0*(b*b));
  r /= 54.0;
  disc = q*q*q + r*r;
  term1 = (b / 3.0);
 
  if (disc > 0){
    s = r + Math.sqrt(disc);
    s = s<0 ? -Math.cbrt(-s) : Math.cbrt(s);
    t = r - Math.sqrt(disc);
    t = t<0 ? -Math.cbrt(-t) : Math.cbrt(t);
    x1_re = -term1 + s + t;
    term1 += (s + t) / 2.0;
    x3_re =-term1;
    x2_re = -term1;
    term1 = Math.sqrt(3.0)*(-t + s) / 2;
    x2_im = term1;
    x3_im = -term1;
  }
   
  else if (disc == 0){
    x2_im = 0;
    x3_im = 0;
    r13 = r<0 ? -Math.cbrt(-r) : Math.cbrt(r);
    x1_re = -term1 + 2.0*r13;
    x3_re = -(r13 + term1);
    x2_re = -(r13 + term1);
  }
  
  else {
     x3_im = 0;
     x2_im = 0;
     q = -q;
     dum1 = q*q*q;
     dum1 = Math.acos(r / Math.sqrt(dum1));
     r13 = 2.0*Math.sqrt(q);
     x1_re = -term1 + r13*Math.cos(dum1 / 3.0);
     x2_re = -term1 + r13*Math.cos((dum1 + 2.0*pi) / 3.0);
     x3_re = -term1 + r13*Math.cos((dum1 + 4.0*pi) / 3.0);
   }
	
  var fl1=0
  var fl2=0
  var fl3=0
  var fl4=0
  var fl5=0
  var fl6=0
  fl1=x1_im<0 ? 1:0
  fl2=x2_im<0 ? 1:0
  fl3=x3_im<0 ? 1:0
  fl4=x1_re<0 ? 1:0
  fl5=x2_re<0 ? 1:0
  fl6=x3_re<0 ? 1:0
  
  if (fl1==1){
	   x1_im=(-1)*x1_im
  }
	
  if (fl2==1){
	   x2_im=(-1)*x2_im
  }
	
  if (fl3==1){
	   x3_im=(-1)*x3_im
  }
	
  if (fl4==1){
	  x1_re=(-1)*x1_re
  }
	
  if (fl5==1){
	   x2_re=(-1)*x2_re
   }
	
   if (fl6==1){
	   x3_re=(-1)*x3_re
   }
	
    x1_im=x1_im==0 ? 0:Math.fraction(x1_im.toFixed(2))
	x2_im=x2_im==0 ? 0:Math.fraction(x2_im.toFixed(2))
	x3_im=x3_im==0 ? 0:Math.fraction(x3_im.toFixed(2))
	x1_re=x1_re==0 ? 0:(Number.isInteger(x1_re)==true ? x1_re : Math.fraction(x1_re.toFixed(3)))
	x2_re=x2_re==0 ? 0:(Number.isInteger(x2_re)==true ? x2_re : Math.fraction(x2_re.toFixed(3)) )
	x3_re=x3_re==0 ? 0:(Number.isInteger(x3_re)==true ? x3_re : Math.fraction(x3_re.toFixed(3)) )
	
	var s1=(fl4==0 ? x1_re:"-"+x1_re)+(x1_im==0 ? "":(fl1==0 ? "+i*("+x1_im+")":"-i*("+x1_im+")"))
	var s2=(fl5==0 ? x2_re:"-"+x2_re)+(x2_im==0 ? "":(fl2==0 ? "+i*("+x2_im+")":"-i*("+x2_im+")"))
	var s3=(fl6==0 ? x3_re:"-"+x3_re)+(x3_im==0 ? "":(fl3==0 ? "+i*("+x3_im+")":"-i*("+x3_im+")"))
	
	var str="x1="+s1+"<br>x2="+s2+"<br>x3="+s3
    str=str.replace(/NaN/g, "0")
    return str;
}

function root2(a,b,c){
  var d = 0;
  var str="";
  var x1_re=0;
  var x2_re=0;
  var x1_im=0;
  var x2_im=0;
  
  d=b*b-4*a*c;
  
  if(d>=0){
    x1_re=(-b - Math.sqrt(d))/2*a;
    x2_re=(-b - Math.sqrt(d))/2*a;
    if(d > 0){
        x2_re=((-1)*b + Math.sqrt(d))/2*a;
	}
  }
   
  if (d<0){
	d = Math.abs(d);
    x1_re=-b/(2*a);
    x1_im=Math.sqrt(d)/(2*a);
    x2_re=-b/(2*a);
	x2_im=(-1)*Math.sqrt(d)/(2*a);
  }		
	var fl1=0
	var fl2=0
	var fl3=0
	var fl4=0
    fl1=x1_re<0 ? 1:0
    fl2=x1_im<0 ? 1:0
    fl3=x2_re<0 ? 1:0
    fl4=x2_im<0 ? 1:0

	if (fl1==1){
		x1_re=(-1)*x1_re
	}
	
	if (fl2==1){
		x1_im=(-1)*x1_im
	}
	
	if (fl3==1){
		x2_re=(-1)*x2_re
	}
	
	if (fl4==1){
		x2_im=(-1)*x2_im
	}
	
	x1_im=x1_im==0 ? 0:Math.fraction(x1_im.toFixed(3))
	x2_im=x2_im==0 ? 0:Math.fraction(x2_im.toFixed(3))
	x1_re=x1_re==0 ? 0:(Number.isInteger(x1_re)==true ? x1_re : Math.fraction(x1_re.toFixed(3)))
	x2_re=x2_re==0 ? 0:(Number.isInteger(x2_re)==true ? x2_re : Math.fraction(x2_re.toFixed(3)) )
	var s1=(fl1==0 ? x1_re:"-"+x1_re)+(x1_im==0 ? "":(fl2==0 ? "+i*("+x1_im+")":"-i*("+x1_im+")"))
	var s2=(fl3==0 ? x2_re:"-"+x2_re)+(x2_im==0 ? "":(fl4==0 ? "+i*("+x2_im+")":"-i*("+x2_im+")"))
	var str="x1="+s1+"<br>x2="+s2
    str=str.replace(/NaN/g, "0")
	return str;
}


function sign(x) {
	return (x < 0.0) ? -1 : (x > 0.0) ? 1 : 0;
}

function function_for_root(str1,v1){
 x=v1;
 var val=eval(str1)
 return val
}

function function_for_test(str1,v1){
 x=v1;
 var val=eval(str1)
 return val
}
 
function printRoots(f, lowerBound, upperBound, step) {
    var str1=""
	lowerBound_=parseFloat(lowerBound)
	upperBound_=parseFloat(upperBound)
	step_=parseFloat(step)
	
	var  x = lowerBound_, ox = x,
		 y = function_for_root(f,x), oy = y,
		 s = sign(y), os = s;
 
	for (; x <= upperBound_ ; x += step_) {
	    s = sign(y = function_for_root(f,x));
	    if (s == 0) {
			str1=str1+String(x)+';<br>';
           
	    }
	    else if (s != os) {
			var dx = x - ox;
			var dy = y - oy;
			var cx = x - dx * (y / dy);
			if (cx<0.00000001){
			  cx=0;
			  str1=str1+String(cx)+';<br>';
              
              
			} else {
			  str1=str1+String(cx)+';<br>';
             
			}
	    }
	    ox = x; oy = y; os = s;
	}
  
  return str1;
}
 