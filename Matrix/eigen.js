var precision=1e-12;
var eps=1e-12;	

Math.fraction=function(x){
return x?+x?x.toString().includes(".")?x.toString().replace(".","")/(function(a,b){return b?arguments.callee(b,a%b):a;})(x.toString().replace(".",""),"1"+"0".repeat(x.toString().split(".")[1].length))+"/"+("1"+"0".repeat(x.toString().split(".")[1].length))/(function(a,b){return b?arguments.callee(b,a%b):a;})(x.toString().replace(".",""),"1"+"0".repeat(x.toString().split(".")[1].length)):x+"/1":NaN:void 0;
}
	
function isAlmostTriangle(A, n){
	for(var i = 1; i < n; i++){
		for(var j = 0; j < i; j++){
			if(A[i][j] != 0) return 0;
		}
	}
	return 1;
}

function sim(n, A,str){
	
	if(isAlmostTriangle(A, n)){
		str += '<br>'+'Приводить данную матрицы к почти треугольному виду не нужно '+'<br>'
		return A,str;
	}
	
	str += '<br>'+'Приведение матрицы к почти треугольному виду унитарным подобием методом вращений '+'<br>'
	str += '<br>'+'Алгоритм заключается в следующем:'+'<br>'+'1. Построить матрицу вращения T_ij такую, что на позиции (i, i) находится '+
    'cos, на позиции (i, j) -- sin, на позиции (j, i) -- -sin, на позиции (j, j) -- cos,на главной диагонали -- единицы, в остальных позициях -- нули.'+'<br>'+
    '2. Умножить матрицу A слева на матрицу T_ij. При этом меняются только строки под номерами i, j'+'<br>'+'3. Построить транспонированную матрицу вращения (T_ij)^t'+
    '<br>'+'4. Умножить матрицу A справа на матрицу(T_ij)^t. При этом меняются только столбцы под номерами i, j. Умножаем А слева и справа, чтобы не изменились собственные значения. '+'<br>'
	
	var tmp=new Array()
	for (var i=0;i<n;i++){
		tmp[i] = new Array();
		for (var j=0;j<n;j++){
			tmp[i][j]=A[i][j]		
		}
	}
	
	
	for (var i = 1; i < n - 1; i++){
		for (var j = i; j < n - 1; j++){

			var cos = A[i][i - 1] / Math.sqrt(Math.pow(A[i][i - 1], 2) + Math.pow(A[(1 + j)][i - 1], 2));
			var sin = A[(1 + j)][i - 1] / Math.sqrt(Math.pow(A[i][i - 1], 2) + Math.pow(A[(1 + j)][i - 1], 2));
			
			//LEFT
			for (var q = 0; q < n; q++){
				tmp[i][q] = A[i][q] * cos + A[(1 + j)][q] * sin;
				tmp[(1 + j)][q] = - A[i][q] * sin + A[(1 + j)][q] * cos;

				if(Math.abs(tmp[i][q]) < precision){
					tmp[i][q] = 0;
				}

				if(Math.abs(tmp[(1 + j)][q]) < precision){
					tmp[(1 + j)][q] = 0;
				}				
			}		

			for (var q = 0; q < n; q++){
				for (var k=0; k<n; k++){
				   A[q][k] = tmp[q][k];
				}
			}

			//RIGHT
			for (var q = 0; q < n; q++){
				tmp[q][i] = A[q][i] * cos + A[q][j + 1] * sin;
				tmp[q][j + 1] = - A[q][i] * sin + A[q][j + 1] * cos;
				
				if(Math.abs(tmp[q][i]) < precision){
					Math.abs[q][i] = 0;
				}

				if(Math.abs(tmp[q][i]) < precision){
					tmp[q][i] = 0;
				}				
			}


			for (var q = 0; q < n; q++){
				for (var k=0; k<n; k++){
				   A[q][k] = tmp[q][k];
				}
			}

		}
	}
	
	
	str += '<br>'+'Матрица после приведения равна '+'<br>'
	for (var m=0;m<n;m++){
			str += '<br>'
			for(var u=0;u<n;u++){
		     str += A[m][u].toFixed(5)+' '
			}
	}

	str += '<br>'
	
    return A;
}

function doLR(A, n,x,y) {
	
	var s = A[(y - 1)][y - 1];
		
	for(var i = x; i < y; i++) {
		A[i][i] -= s;
	}

	for(var i = x + 1; i < y; i++) {
		A[i][i - 1] /= A[(i - 1)][i - 1];
		if(Math.abs(A[i][i - 1]) < 1e-12) {
			A[i][i - 1] = 0;
		}

		for(var j = i; j < y; j++) {
			A[i][j] = A[i][j] - A[i][i - 1] * A[(i - 1)][j];
			if(Math.abs(A[i][j]) < 1e-12) {
				A[i][j] = 0;
			}
		}
	}

	for(var i = x; i < y; i++) {
		if(i > x) {
			A[i][i - 1] *= A[i][i];
			if(Math.abs(A[i][i - 1]) < 1e-12) {
				A[i][ i - 1] = 0;
			}
		}

		for(var j = i; j < y - 1; j++) {
			A[i][j] += A[i][j + 1] * A[(j + 1)][j];
			if(Math.abs(A[i][j]) < 1e-12) {
				A[i][j] = 0;
			}
		}
	}

	for(var i = x; i < y; i++) {
		A[i][i] += s;
	}
	
	
}

function norma(n,vector){
    var temp = 0;
    var i;
    for (var i = 0; i < n; i++){
        temp += vector[i] * vector[i];
    }
	
    return Math.sqrt(temp);
}	




function qnorm(n, vec){
   var sum=0;
  
    for (var i=0; i<n; i++){
        sum+=vec[i]*vec[i];
    }
    return Math.sqrt(sum);
}

function scal(n, v1, v2){
    var sum=0;
 
    for(var i=0; i<n; i++){
        sum+=v1[i]*v2[i];
    }
    return sum;
}

function mul(n,A, B, SaveTo, tmp){

    for(var i=0; i<n; i++){
		for (var j=0;j<n;j++){
        tmp[i][j]=0;
		}
	}

    for(var i=0; i<n; i++){
        for(var j=0; j<n; j++){
            // пемемножение вектор столбцов
            for(var k=0; k<n; k++){
                tmp[i][j]+=A[i][k]*B[k][j];
            }
        }
    }

    if (SaveTo==tmp) return;

    for(var i=0; i<n; i++){
		for (var j=0;j<n;j++){
        SaveTo[i][j]=tmp[i][j];
		}
    }
}

function mulMatrixXVec(n,A,v,dest){
    
    for(var i=0; i<n; i++){
        dest[i]=0;
    }

    for(var i=0; i<n; i++){
        for(var j=0; j<n; j++){
            dest[i]+=A[i][j]*v[j];
        }
    }
}

function matrixPrecision(n, A,precision){
    for(var i=0; i<n; i++){
		for (var j=0;j<n;j++){
        if (Math.abs(A[i][j])<precision){
			A[i][j]=0;
		}
		}
    }
}

function matrixDiff(n, D, S, el){
   
    for(var i=0; i<n; i++){
		for (var j=0;j<n;j++){
        D[i][j]=-S[i][j];
		}
    }

    for(var i=0; i<n; i++){
        D[i][i]+=el;
    }
}

function makeAt(n,A,e,At,tmp){

    matrixDiff(n, At, A, e);
    mul(n, At, At, At, tmp);
}

function copyV(n,v,dest){
    for (var i=0; i<n; i++){
        dest[i]=v[i];
    }
}

function copyVT(n, v, vt, j){
    
    for (var i=0; i<n; i++){
		for (var j=0;j<n;j++){
        vt[i][j]=v[i];
		}
    }
}

function normV(n, v){
    var norm = qnorm(n, v);
    for (var i=0; i<n; i++){
       v[i]/=norm;
    }
}

function correctXifZeroed(n,X,precision){
	
	for(var i=0; i<n; i++){
		if(Math.abs(X[i])>precision) return;
	}
	for(var i=0; i<n; i++){
		X[i]=i;
	}
	
}
	
function norm_m(n,A){
    var summ=0;
    var max=0;
    
    for (var i=0; i<n; i++){
        summ=0;
        for (var j=0; j<n; j++){
            summ+=Math.abs(A[i][j]);
        }
        if(summ>max) max=summ;
    }
    return max;
}
	



function eigen(A,n){
	var temp=0;
	var f=0;
	var k=0;
	var max_iteration=0;
	
	var E=new Array();
	var A_isx=new Array();
	var V=new Array();
	var At=new Array();
	var temp_n=new Array();
	var X=new Array();
	var Xt=new Array();
	
	var str=""
	
	for (var i=0;i<n;i++){
		A_isx[i]=new Array()
		At[i]=new Array()
		V[i]=new Array()
		temp_n[i]=new Array()
		for (var j=0;j<n;j++){
			A_isx[i][j]=A[i][j]
			V[i][j]=0;
			At[i][j]=0;
			temp_n[i][j]=0;
		}
	}
	
	if (n==1){
		E[0]=A[0][0]
	}
	
	if (n==2){
		a1 = A[0][0];
		a2 = A[0][1];
		a3 = A[1][0];
		a4 = A[1][1];
		Di = (a1 + a4)*(a1 + a4) - 4 * (a1*a4 - a2*a3);
		E[0] = ((a1 + a4 + Math.sqrt(Di)) / 2);
		E[1] = ((a1 + a4 - Math.sqrt(Di)) / 2);
	}
	
	if (n>2){
		A,str=sim(n,A,str)
	
	str += '<br>'+'LR метод поиска собственных значений '+'<br>'
	 
	var tmp=new Array();
	
	for (var i=0;i<n;i++){
		tmp[n+i]=n;
		tmp[i]=0;
	}
	
	for(var i = 0; max_iteration <= 0; i++) {
		f = 0;
		
		for(var j = 0; j < n; j++) {
			if(tmp[n+j] - tmp[j] > 1) {
				doLR(A, n,tmp[j], tmp[n+j]);
				f = 1;
			}

			if(tmp[n+j] == n) {
				break;
			}
		}
		
		
		for (var m=0;m<n;m++){
			str += '<br>'
			for(var u=0;u<n;u++){
		     str += A[m][u].toFixed(5)+' '
			}
		}
		
		str += '<br>'
		
		if(f == 0) {
			break;
		}

		k = 0;
		
		for(var j = 1; j < n; j++) {
			if(Math.abs(A[j][j - 1]) < 1e-12) {
				A[j][j - 1] = 0;
				tmp[n+k] = j;
				k++;
				tmp[k] = j;
			}
		}

		tmp[n+k] = j;
	}

	
	
	for(var i = 0; i < n; i++) {
		E[i] = A[i][i];
	}

	}
	
	for(var i = 0; i < n; i++) {
		for(var j = i + 1; j < n; j++) {
			if(E[i] > E[j]) {
				temp = E[i];
				E[i] = E[j];
				E[j] = temp;
			}
		}
	}
	
	str += '<br>'+'Собственные значения равны:'+'<br>'
	for (var i=0;i<n;i++){
     str += E[i].toFixed(5)+'<br>'
	}
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////

  var itr=0;
  for(var l=0; l<n; l++){
        makeAt(n, A_isx, E[l], At, temp_n);
		matrixPrecision(n, At, 1e-12);
        lam = norm_m(n, At);

        lamk=lam-1;

        matrixDiff(n, At, At, lam);
        matrixPrecision(n, At, 1e-12);

        for(var i=0; i<n; i++){
            X[i]=1;
        }

        while(Math.abs(lam-lamk)>eps && (max_iteration<=0 || itr<max_iteration)){
            mulMatrixXVec(n, At, X, Xt);
            lamk=scal(n, Xt, X)/scal(n, X, X);

            itr++;
            normV(n, Xt);
			correctXifZeroed(n, Xt, precision);
			copyV(n, Xt, X);
        }
		
		for (var t=0;t<n;t++){
		  V[l][t]=X[t]	
		}
	}
	
	
	for (var i=0;i<n;i++){
		str+='<br>'+'Собств.значение '+E[i]+'<br>'
		str+='Собств.вектор '
		for (var j=0;j<n;j++){
			if (isNaN(parseFloat(V[i][j]))){
				str +=' не удалось найти'
			} else {
				str +=Math.fraction(parseFloat(V[i][j]).toFixed(2))+' | '
			}
		}
	}
		
	return V,str;
}