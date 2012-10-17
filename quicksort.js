var data_base = [];
data_base["random"] = require("./data_random.js").data;
data_base["RANDOM_200000_1"] = require("./arr_RANDOM_200000_1.txt").data;						
data_base["RANDOM_200000_2"] = require("./arr_RANDOM_200000_2.txt").data;						
data_base["RANDOM_200000_3"] = require("./arr_RANDOM_200000_3.txt").data;	
data_base["RANDOM_50000_1"] = require("./arr_RANDOM_50000_1.txt").data;	
data_base["RANDOM_50000_2"] = require("./arr_RANDOM_50000_2.txt").data;
data_base["RANDOM_50000_3"] = require("./arr_RANDOM_50000_3.txt").data;
data_base["SORTED_200000"] = require("./arr_SORTED_200000.txt").data;	
data_base["SORTED_50000"] = require("./arr_SORTED_50000.txt").data;	
data_base["SORTED_INVERSE_200000"] = require("./arr_SORTED_INVERSE_200000.txt").data;
data_base["SORTED_INVERSE_50000"] = require("./arr_SORTED_INVERSE_50000.txt").data;


var iterations = 20;

var data = [];
var stats = require('measured');
var timer = null;
var stopwatch = null;
var test_iteration = 0;

//////////////////////
//////////////////////
//////////////////////
//////////////////////


printHelp();

for(var experiment in data_base){
	console.log("Array ("+experiment+") of length "+data_base[experiment].length+" at quicksort_iterativ() with "+iterations+" iterations");
	console.log("==================================================================================");
	var timer = new stats.Timer();
	test_iteration = 0;
	while (test_iteration < iterations){
		test_iteration++;
		data = data_base[experiment].slice(0); //copy the array
		stopwatch = timer.start();
		quicksort_iterativ(0,(data.length)-1);
		console.log("Did iteration "+test_iteration+" of "+iterations+" in: "+stopwatch.end()+" miliseconds");
	}
	console.log(timer.toJSON().histogram);
	console.log("\n\n\n");


	console.log("Array ("+experiment+") of length "+data_base[experiment].length+" at quicksort_recursiv() with "+iterations+" iterations");
	console.log("==================================================================================");
	var timer = new stats.Timer();
	test_iteration = 0;
	while (test_iteration < iterations){
		test_iteration++;
		data = data_base[experiment].slice(0); //copy the array
		stopwatch = timer.start();
		quicksort(0,(data.length)-1);
		console.log("Did iteration "+test_iteration+" of "+iterations+" in: "+stopwatch.end()+" miliseconds");
	}
	console.log(timer.toJSON().histogram);
	console.log("\n\n\n");
}

console.log("--- Finished ---");

//////////////////////
//////////////////////
//////////////////////
//////////////////////
//// Evaluate this code .. please :-D
//Iterativ
//=====
function quicksort_iterativ(left,right){
	var stack = [];
   while(true){
      if(left < right){
        // VAR PIVOT = DATA[random(left, right)]; //Choos a pivot element (between left and right) by random
         var pivot =data[Math.round((right-left)/2)];
				 var i = left;
         var j = right;
         while(true){
            while(data[i]<pivot) 
                i++;
            while(data[j]>pivot)
                j--;
            if (i >= j) break; //Brake inner loop
            if(data[i] === data[j]){
                 j--; 
            }else{
             var tmp = data[i];
             data[i]=data[j];
             data[j]=tmp;
            }
         }
         stack.push(right); //do the right side later
         right = Math.max(left, i-1); // do the left side now
      }else{ //now do the right side
         if(stack.length === 0)break; //outer loop
         left= right+1;
         right = stack.pop();
      }
    }
}

function quicksort(left, right){ //rekursiv
    if(left<right){
        var pivotElement = partition(left,right);
        quicksort(left,pivotElement-1);
        quicksort(pivotElement+1,right);
    }
}
function partition(left, right){
     var i = left;
     //Start with j lefthand side of pivot
     var j = right-1;
     var pivot =data[Math.round((right-left)/2)];

    while(i<j){
         //search for an lefthand element, bigger then pivot
         while(data[i] <= pivot && i < right)
             i++;
        //serach for an element from the right side smaler than quicksort
         while(data[j] >= pivot && j > left)
              j--;
         if(i < j){ //switch elements
             var tmp = data[i];
             data[i]=data[j];
             data[j]=tmp;

    		}

    }

     
     if(data[i] > pivot){
				 var tmp = data[i];
				 data[i]=data[right];
				 data[right]=tmp;
     }
    
    return i;
}

function printHelp(){
console.log(""+
    "\n"+
    "\n"+
    "\n"+
    "\n"+
    "\n"+
    "The following Output is defined as:\n"+
    "\n"+
    "min: The lowest observed value.\n"+
    "max: The highest observed value.\n"+
    "sum: The sum of all observed values.\n"+
    "variance: The variance of all observed values.\n"+
    "mean: The average of all observed values.\n"+
    "stddev: The stddev of all observed values.\n"+
    "count: The number of observed values.\n"+
    "median: 50% of all values in the resevoir are at or below this value.\n"+
    "p75: See median, 75% percentile.\n"+
    "p95: See median, 95% percentile.\n"+
    "p99: See median, 99% percentile.\n"+
    "p999: See median, 99.9% percentile.\n"+
"");
}
