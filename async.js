var async = require('async');


var arr = [{name:'Jack', delay: 200},
           {name:'Mike', delay: 100},
           {name:'Freewind', delay: 300}];

 async.each(arr, function(item, callback) {
   console.log('1.1 enter: ' + item.name);
 }, function(err) {
    console.log('1.1 err: ' + err);
 });
