function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); 
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;            
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

function swap(A,row1,row2,col){
 var temp;
    for (var i = 0; i < col; i++){
        temp = A[row1][i];
        A[row1][i] = A[row2][i];
        A[row2][i] = temp;
    }
}

function rank(n_1,m_1,A){
  var str=""
  var rank = m_1;
 
    for (var row = 0; row < rank; row++){
        // Before we visit current row 'row', we make
        // sure that mat[row][0],....mat[row][row-1]
        // are 0.
 
        // Diagonal element is not zero
        if (A[row][row]){
           for (var col = 0; col < n_1; col++)
           {
               if (col != row)
               {
                 // This makes all entries of current
                 // column as 0 except entry 'mat[row][row]'
                 var mult = A[col][row] /
                                       A[row][row];
                 for (var i = 0; i < rank; i++)
                   A[col][i] -= mult * A[row][i];
              }
           }
        }
 
        // Diagonal element is already zero. Two cases
        // arise:
        // 1) If there is a row below it with non-zero
        //    entry, then swap this row with that row
        //    and process that row
        // 2) If all elements in current column below
        //    mat[r][row] are 0, then remvoe this column
        //    by swapping it with last column and
        //    reducing number of columns by 1.
        else
        {
            var reduce = true;
 
            /* Find the non-zero element in current
                column  */
            for (var i = row + 1; i < n_1;  i++)
            {
                // Swap the row with non-zero element
                // with this row.
                if (A[i][row])
                {
                    swap(A, row, i, rank);
                    reduce = false;
                    break ;
                }
            }
 
            // If we did not find any row with non-zero
            // element in current columnm, then all
            // values in this column are 0.
            if (reduce)
            {
                // Reduce number of columns
                rank--;
 
                // Copy the last column here
                for (var i = 0; i < n_1; i ++)
                    A[i][row] = A[i][rank];
            }
 
            // Process this row again
            row--;
        }
    }
       for (var i = 0; i < n_1; i++){
        for (var j = 0; j < m_1; j++){
            str +=A[i][j]+' ';
		}
        
		str+='<br>'
    }
	
	str+='<br>'+'Ранг матрицы равен '+rank+'<br>'
    return str;
}

function inverse_matrix(A,n){
	var str=""
 if(A.length !== A[0].length){return "Size error!"}
    
    //create the identity matrix (I), and a copy (C) of the original
    var i=0, ii=0, j=0, e=0, t=0;
    var I = [], C = [];
    for(i=0; i<n; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<n; j+=1){
            
            //if we're on the diagonal, put a 1 (for identity)
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            
            // Also, make the copy of the original
            C[i][j] = A[i][j];
        }
    }
	
	var k=0;
	for (var i=0;i<n;i++){
		  str+="<br>"
		  for (var j=0;j<2*n;j++){
		    if (j<n){
            str += A[i][j]+' '
			} else {
			  if (j==n){
			    str +=' | '
			  }
			  str += I[i][j-n]+' '
			}
		 }
	}
	
    // Perform elementary row operations
    for(i=0; i<n; i+=1){
        // get the element e on the diagonal
        e = C[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e==0){
            //look through every row below the i'th row
            for(ii=i+1; ii<n; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(C[ii][i] != 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<n; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if(e==0){return}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<n; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
		str+='\n'+'Ведущий элемент '+e.toString()+"<br>"
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        
        // rows above and below this one
        for(ii=0; ii<n; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = C[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<n; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
		
		str+="<br>"
		for (var l=0;l<n;l++){
		  str+="<br>"
		  for (var m=0;m<2*n;m++){
		    if (m<n){
            str += C[l][m]+' '
			} else {
			  if (m==n){
			    str +=' | '
			  }
			  str += I[l][m-n].toFixed(5)+' '
			}
		 }
	}
			
    }
	
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return str;
}

function determinant_matrix(A,dim,B){
  var det=0, h=0, k=0;
  var temp_=[]
  var temp=[]
 
  var str=""
   
  for (var i=0;i<dim;i++){
	  for (var j=0;j<dim;j++){
		temp_.push(0)
	  }
	  
	  temp.push(temp_)
	  temp_=[]
  }
  
  if (dim==1) {
     if (n==1){
	  str = '<br>'+'Искомый определитель равен '+A[0][0]
	  B.push(str)
	 } 
	 
     return [A[0][0],B];
  } 
  if (dim==2){
	det=(A[0][0]*A[1][1]-A[0][1]*A[1][0]);
	if (n==2){
	 str = '<br>'+'Искомый определитель равен '+det
	 B.push(str)
	} 
	
    return [det,B];
  } 
  
  if (dim!=1 && dim!=2){
    for(var p=0;p<dim;p++){
      h = 0;
      k = 0;
      for(var i=1;i<dim;i++) {
        for(var j=0;j<dim;j++) {
          if (j==p){
            continue;
          }
          temp[h][k] = A[i][j];
		  
          k++;
          if(k==dim-1) {
            h++;
            k = 0;
          }
        }
      }
	  
	  str='<br>'+'Вычисляем определитель (det) для '+A[0][p]+'<br>'
	  
	  for (var i=0;i<dim-1;i++){
		  str+="<br>"
		  for (var j=0;j<dim-1;j++){
            str += temp[i][j]+' '
		 }
	  }
	  
	  if (str!=""){
		B.push(str)
	  }
	  
	  //str='<br>'+'Значение на текущем шаге '+(A[0][p]*Math.pow(-1,p)).toString()+'*'+String(det)+"="+String(A[0][p]*Math.pow(-1,p)*det)
      det=det+A[0][p]*Math.pow(-1,p)*determinant_matrix(temp,dim-1,B)[0];
    }
	
    return [det,B];
  }
}
