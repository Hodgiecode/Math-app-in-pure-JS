function system(A,B,X,tmp,n){
    var str="Решение СЛАУ методом Гаусса с выбором главного элемента по всей матрице <br>";
	var coeff=0,summ = 0, temp = 0, eps = 1e-12;
 	var k=0, l=0,amount_of_nulls=0,row=0, column=0, temps=0;
 
 	for (var i = 0; i < n; i++){
		tmp[i] = i; 
 	}
 
// Неизвестные исключаем за (n-1) шагов 
 for (var step=0;step < n - 1;step++){
		var max_val = 0;
		for (var i = step; i < n; i++){
			for (var j = step; j<n; j++)
			if (Math.abs(A[i][j])>max_val){  // ищем максимальный по модулю элемент
				max_val = Math.abs(A[i][j]);
				row = i;
				column = j;
			}
		}
		
	//передвинем строки и столбцы матрицы так, чтобы макс. элемент оказался в позиции A[step*n+step]
		for (var j = step; j < n; j++){
			temp = A[step][j];
			A[step][j] = A[row][j];
			A[row][j] = temp;
		}
		
		
		temp = B[step];
		B[step] = B[row];
		B[row] = temp;

		for (var i = 0; i < n; i++){
			temp = A[i][step];
			A[i][step] = A[i][column];
			A[i][column] = temp;
		}

		temps = tmp[step];
		tmp[step] = tmp[column];
		tmp[column] = temps;

		str+='Шаг '+(step+1).toString()+'<br>'
		
		for (var i=0;i<n;i++){
		  str+="<br>"
		  for (var j=0;j<n;j++){
            str += A[i][j]+' '
		 }
		 
		 str += '| '+B[i]
		 
        }
		
		str+="<br>"

		for (var i = step + 1; i < n; i++){
			// разделим строку на главный элемент

			if (Math.abs(A[step][step]) > eps){
				coeff = A[i][step] / A[step][step];
			}
				else { coeff = 0; // если максимальный элемент A[step*n + step]-нулевой 
				
				}
				
				for (var j = step; j < n; j++){
					A[i][j] = A[i][j] - coeff*A[step][j];//  Вычитаем получавшуюся после перестановки строку
					                                             //  из остальных строк 
				}

				B[i] = B[i] - coeff*B[step];
			}
	}
	
	// Обратный ход

	for (var i = n - 1; i >= 0; i--){
			summ = 0;// summ - хранит сумму известных элементов на текущем шаге уравнения. 
					  // потом эту сумму мы вычтем из правой части текущего уравнения.
			for (var j = i + 1; j < n; j++){
				summ = summ + A[i][j] * B[j];
			}

			if (Math.abs(A[i][i]) < eps && Math.abs(B[i])<eps){ 
				B[i] = 0;
			} 
			else {
				B[i] = (B[i] - summ) / A[i][i];
		}				
	}

	for (var i = 0; i < n; i++){
			X[parseInt(tmp[i])] = B[i];
		
			/// зануляем коэффициенты

			for (var l= 0; l<n; l++){
				for (var j = 0; j < n; j++){
					if (Math.abs(A[l][j]) < eps){
						A[l][j] = 0;
					}

					if (Math.abs(B[i]) < eps){
						B[i] = 0;
					}

					// Если строка матрицы состоит полностью из нулевых элементов,но соответствующий элемент в правой части !=0
					// то система не имеет решения
					if (Math.abs(A[i][j]) < eps){
						amount_of_nulls=amount_of_nulls+1;
						if (n == amount_of_nulls){
							if (Math.abs(B[i])>eps){
							    str+='<br>'+'Система решения не имеет'
								return 1;
							}
						}
					}
				}

				amount_of_nulls = 0;
		}
	}

 str+='<br>'+'Шаг '+(step+1).toString()+'<br>'
		
		for (var i=0;i<n;i++){
		  str+="<br>"
		  for (var j=0;j<n;j++){
            str += A[i][j]+' '
		 }
		 
		 str += '| '+B[i]
		 
        }
		
	
  str +='<br>'+'Решение'+'<br>'
   for (var i=0;i<n;i++){
	  str +='X_'+(i+1).toString()+' '+X[i]+'<br>'
	}

	return str
}
