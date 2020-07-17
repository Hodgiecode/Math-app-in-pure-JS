function zhegalkin(n,a){
    var k=2
	var count=0;
	coefs=new Array()
	
	for (var i = 0; i < (1 << n); i++){
		coefs[i]=a[i]
		coefs[i] -= 48;
		for (j = 0; j < i; j++)
			if ((i & j) == j)
				coefs[i] ^= coefs[j];

		if (coefs[i] == 1)
			count++;
	}

	var str="2 "+n+" "+count+"<br>";
	for (i = 0; i < (1 << n); i++){
		if (coefs[i] > 0){
			for (j = n - 1; j >= 0; j--){
				str=str+((i >> j) & 1);
			}
			str=str+" "+coefs[i]+"<br>";
		}
	}
		
	return str
}


function funct(func,x) { 
    var val=eval(func);
    return val;
} 

function simpson(n,func,a,b){ 
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
  
  
    var str="";
    var value=0; 
    var interval_size = (b - a)/ n;
    var sum = funct(func,a) + funct(func,b); 
  
    for (var i = 1 ; i < n ; i++) { 
        if (i % 3 == 0) 
            sum = sum + 2 * funct(func,a + i * interval_size); 
        else
            sum = sum + 3 * funct(func,a + i * interval_size); 
    } 
  
    str=( 3 * interval_size / 8 ) * sum ; 
    return str;
} 


function extrapolate(d,x){ 
 var y; 
    y = d[0][1] 
        + (x - d[0][0]) 
              / (d[1][0] - d[0][0]) 
              * (d[1][1] - d[0][1]); 
  
    return y; 
}

function extrapolation(str1,x) { 
    var f = []; 
	str3=str1.split(' ')
	for (var i=0;i<str3.length;i++){
			if (str3[i]!=""){
			tmp=str3[i].split(',')
			f.push([parseFloat(tmp[0]),parseFloat(tmp[1])])
		}
	}
 
	var str1="Значение y в x = "+String(x)+" : "+extrapolate(f, parseFloat(x));
    return str1; 
}



function interpolate(f,xi,n) { 
    var result = 0; // Initialize result 
  
    for (var i=0; i<n; i++) 
    { 
        // Compute individual terms of above formula 
        var term = f[i][1]; 
        for (var j=0;j<n;j++) 
        { 
            if (j!=i) {
                term = term*(xi - f[j][0])/(f[i][0] - f[j][0]);
			}
        } 
  
        // Add current term to result 
        result += term; 
    } 
  
    return result;
}

function interpolation(str1,x) { 
    // creating an array of 4 known data points 
    var f = []; 
	str3=str1.split(' ')
	for (var i=0;i<str3.length;i++){
			if (str3[i]!=""){
			tmp=str3[i].split(',')
			f.push([parseFloat(tmp[0]),parseFloat(tmp[1])])
			}
	}
  
   

	var str1="Значение f ("+String(x)+" ) : "+String(interpolate(f, parseFloat(x), f.length)); 
    return str1; 
}
