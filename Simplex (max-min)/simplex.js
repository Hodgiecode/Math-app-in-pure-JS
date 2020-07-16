var M=20;
 var N=20;
 var epsilon   = 1.0e-8;
 var str=""
 var counter=0
 
function equal(a,b){ 
	return Math.abs(a-b) < epsilon; 
}

function assert(condition)
{
  if (!condition) {
    throw "Assertion failed!";
  }
}

function print_tableau(m,n,mat,mes,mode) {
  var i, j;
  var str="<br>"
  var counter2=++counter;
  str=str+counter2.toString()+'. '+' '+mes+'\n';
 
  str=str+"col: "+"b[i]";
  for(j=1;j<n; j++){ 
		str=str+" x"+j; 
  }
  str=str+"<br>"

  for(i=0;i<m; i++) {
    if (i==0){
		str=str+"max"+":"
	} 
	else {
		str=str+"b"+i.toString();
	}
	
    for(j=0;j<n; j++){
        str=str+" "+mat[i][j].toFixed(5);
    }
    
	str=str+"<br>";
  }
  return str
}

function pivot_on(m,n,mat,row,col) {
  var i, j;
  var pivot;

  pivot = mat[row][col];
  assert(pivot > 0) 
  
  for (j=0;j<n;j++){
    mat[row][j] /= pivot;
  }
 
  assert(equal(mat[row][col], 1.));
  for(i=0; i< m; i++) { // foreach remaining row i do
    var multiplier = mat[i][col];
    if(i==row) continue;
    for (j=0; j<n; j++) { // r[i] = r[i] - z * r[row];
      mat[i][j] -= multiplier * mat[row][j];
    }
  }
}

// Find pivot_col = most negative column in mat[0][1..n]
function find_pivot_column(m,n,mat,str) {
  var j, pivot_col = 1;
  var lowest = mat[0][pivot_col];
  for(j=1; j<n; j++) {
    if (mat[0][j] < lowest) {
      lowest = mat[0][j];
      pivot_col = j;
    }
  }
  
  //str=str+"Most negative column in row[0] is col "+pivot_col.toString()+"="+lowest;
  if( lowest >= 0 ) {
    return -1; // All positive columns in row[0], this is optimal.
  }
  return pivot_col;
}

// Find the pivot_row, with smallest positive ratio = col[0] / col[pivot]
function find_pivot_row(m,n,mat,pivot_col,str) {
  var i, pivot_row = 0;
  var min_ratio = -1;
  //str=str+"Ratios A[row_i,0]/A[row_i,%d] = ["+pivot_col.toString();
  for(i=1;i<m;i++){
    var ratio = mat[i][0] / mat[i][pivot_col];
    str=str+ratio.toString()+" ";
    if ( (ratio > 0  && ratio < min_ratio ) || min_ratio < 0 ) {
      min_ratio = ratio;
      pivot_row = i;
    }
  }
  str=str+"].<br>";
  if (min_ratio == -1){
    return -1; // Unbounded.
  }
  
  //str=str+"Found pivot A["+pivot_row.toString()+","+pivot_col.toString()+"], min positive ratio="+min_ratio.toString()+" in row="+pivot_row.toString()+".\n"
  
  return pivot_row;
}

function add_slack_variables(m,n,mat) {
  var i, j;
  var new_a=new Array(m)
  for (var i = 0; i < m; i++) {
     new_a[i] = new Array(n+m-1);
  }
  
  for (var i=0;i<m;i++){
	for (var j=0;j<n+m-1;j++){
		if (j<n){
			new_a[i][j]=mat[i][j]
		}
		else {
		    new_a[i][j]=0
			if (i>0 && i-1+n==j){
				new_a[i][j]=1
			}
		}
	}
  }
  
  mat=new_a
  return mat
}

function check_b_positive(m,n,mat) {
  var i;
  for(i=1; i<m; i++)
    assert(mat[i][0] >= 0);
}

// Given a column of identity matrix, find the row containing 1.
// return -1, if the column as not from an identity matrix.
function find_basis_variable(m,n,mat,col) {
  var i, xi=-1;
  for(i=1; i < m; i++) {
    if (equal( mat[i][col],1) ) {
      if (xi == -1)
        xi=i;   // found first '1', save this row number.
      else
        return -1; // found second '1', not an identity matrix.

    } else if (!equal( mat[i][col],0) ) {
      return -1; // not an identity matrix column.
    }
  }
  return xi;
}

function print_optimal_vector(m,n,mat,str) {
  var j, xi;
  str=str+" at ";
  for(j=1;j<n;j++) { // for each column.
    xi = find_basis_variable(m,n,mat,j);
    if (xi != -1)
      str=str+"x"+j.toString()+"="+mat[xi][0].toString()+", ";
    else
      str=str+"x"+j.toString()+"=0, ";
  }
  str=str+"\n";
  return str
} 

function simplex(m,n,mat,str,mode) {
  var loop=0;
  mat=add_slack_variables(m,n,mat);
  var initial_n=n
  n=n+m-1
  
  check_b_positive(m,n,mat);
  str=str+print_tableau(m,n,mat,"Padded with slack variables",mode);
  while( ++loop ) {
    var pivot_col, pivot_row;

    pivot_col = find_pivot_column(m,n,mat,str);
    if( pivot_col < 0){
	  if (mode=="max"){
		str=str+"Found optimal value=A[0,0]="+mat[0][0].toString()+"(no negatives in row 0).<br>";
		str=str+print_optimal_vector(m,n,mat,"Optimal vector");
	  }
      break;
    }
    
	str=str+"Entering variable x"+pivot_col.toString()+" to be made basic, so pivot_col="+pivot_col.toString()+".<br>"
	
    pivot_row = find_pivot_row(m,n,mat,pivot_col,str);
    if (pivot_row < 0) {
      str=str+"unbounded (no pivot_row).<br>";
      break;
    }
    
	str=str+"Leaving variable x"+pivot_row+", so pivot_row="+pivot_row+"<br>";

    pivot_on(m,n,mat, pivot_row, pivot_col);
	str=str+print_tableau(m,n,mat,"After pivoting",mode);
	if (mode=="max"){
		str=str+print_optimal_vector(m,n,mat,"Basic feasible solution");
	} 

    if(loop > 20) {
      str=str+"Too many iterations >"+loop.toString()+"<br>";
      break;
    }
  }
  
  if (mode=="min"){
	var k=1
	var opt=0
	var str_lst=[]
	for (var x=initial_n;x<mat[0].length;x++){
		str_lst.push(mat[0][x])
		str=str+"\nx_"+String(k)+":"+mat[0][x]
		k=k+1
	}
	
	return [str,str_lst]
 }
	
  return str
}

function simplex_main(b,mode){
   var m=0;
   var n=0;
   var k=0;
   d=b[1].trim().split(" ")
   m=parseInt(d[0].trim())
   n=parseInt(d[1].trim())
   var x = new Array(m);
   var res=""
  
   for (var i = 0; i < m; i++) {
     x[i] = new Array(n);
   }
   
   for (var i=2;i<b.length;i++){
       b[i]=b[i].trim()
	   d=b[i].split(" ")
	   for (var j=0;j<d.length;j++){
		    x[k][j]=parseFloat(d[j])
       }  
		
        k=k+1
   }
 
 
   res=print_tableau(m,n,x,"Initial",mode);
   res=simplex(m,n,x,res,mode);
   str=""
   return res;
} 

function pretty_write_simplex(str1){
	var mode="max"
	var tmp=str1.trim().split('\n')
	var str2=""
	var arr=[]
	
	
	if (tmp[0].indexOf("min")+1){
		mode="min"
		var copy=[]
		var temp=tmp[1].split(" ")
		var save_me=tmp
		tmp[1]=String(parseInt(temp[1])+1)+" "+String(parseInt(temp[0])+1)
		tmp[2]=tmp[2]+" "+"0"
		
		for (var x=2;x<tmp.length;x++){
			str2=str2+"\n"
			var c=tmp[x].split(" ")
			arr.push(c)
		}
		
		for (var i=0;i<arr.length;++i){
			for (var j=0;j<arr[i].length;++j){
				if (arr[i][j]==undefined){
					continue;
				}
				
				if (copy[j]===undefined){
					copy[j]=[]
				}
				
				copy[j][i]=arr[i][j]
			}
		}
		
		arr=copy
		
		var str2=tmp[0]+'\n'+tmp[1]+'\n'
		for (var k=0;k<arr[arr.length-1].length;k++){
			if (k==0){
				str2=str2+String(-1*parseFloat(arr[arr.length-1][k]))
			} else {
				str2=str2+" "+String(-1*parseFloat(arr[arr.length-1][k]))
			}
		}
		
		for (var j=0;j<arr.length-1;j++){
			str2=str2+'\n'
			for (var k=0;k<arr[j].length;k++){
				if (k==0){
				  str2=str2+arr[j][k]
				} else {
				  str2=str2+" "+arr[j][k]
				}
			}
		}
		
		tmp=str2.split("\n")
	}
	
	if (mode=="max"){
		var temp=tmp[2].split(" ")
		var r="0"

		for (var i=0;i<temp.length;i++){
			r=r+" "+String(-1*parseFloat(temp[i].trim()))
		}
	
		tmp[2]=r
		temp=tmp[1].split(" ")
		tmp[1]=String(parseInt(temp[0])+1)+" "+String(parseInt(temp[1])+1)
		
		for (var i=3;i<tmp.length;i++){
			temp=tmp[i].split(" ")
			r=temp[temp.length-1]
			for (var x=0;x<temp.length-1;x++){
				r=r+" "+temp[x]
			}
		
			tmp[i]=r
		}
	}
	
	if (mode=="min"){
		var r=simplex_main(tmp,mode)
		var tmp=save_me[2].split(" ")
		var d=r[r.length-1]
		var res=0
		
		for (var i=0;i<d.length;i++){
			res=res+parseFloat(tmp[i])*d[i]
		}
		
		var r2="0. Convert minimization problem to maximization:"
		for (var i=2;i<save_me.length;i++){
			r2=r2+'\n'
			var p=save_me[i].split(" ")
			for (var j=0;j<p.length;j++){
				if (i==2 && j==p.length-1){
					r2=r2+" "+"min"
					continue
				}
				
				r2=r2+" "+p[j]
			}
		}
		
		r=r2+'\n'+r[0]+"\nOptimal value:"+String(res)	
	} 
	
	if (mode=="max"){
		var r=simplex_main(tmp,mode)
	}
	
	return r
}