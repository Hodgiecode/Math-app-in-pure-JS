Полином Жегалкина (k=2)
Пояснение по выходным данным.  k (значность логики. Всегда 2), n (количество переменных), m (количество слагаемых в полиноме).
Затем идут m строк, каждая строка соответствует одному слагаемому в полиноме.
В каждой строке n цифр (без пробела) - степени, в которых входит в полином каждая переменная xi (степень 0 означает, что переменная не входит), и потом через пробел - коэффициент при этом слагаемом.
Слагаемые с нулевым коэффициентом в число m не входят и в виде отдельных строк не отображаются. Строки, соответствующие слагаемым, в файле должны быть упорядочены лексикографически.

Например, полином в P3 2x2+x1x2+2x1^2x2 задается так: 3 2 3 
 01 2 
 11 1 
 21 2
 