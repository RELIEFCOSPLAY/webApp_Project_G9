// let = local
// var = global
// Alt 96 = ``

"use strict;"
// let a = 6;
// let h = 7;
// const b = 5.44;
// const c = true;
// const d = hello;
// document.write(a+h);
// document.write("a = " + a);
// document.write(`a = ${a}`);
// alert(a);

// 1 find the button
// const btuClick =  document.getElementById('btnClick');

// // 2. add interaction
// // btuClick.addEventListener('click', function(){
// // alert('test');
// // });

// btuClick.onclick = function(){
//     alert('test');
// };
//-------------------------------------------------------------------------------------------------------------------------

// if have one button
// document.getElementById(btuClick).onclick = function(){
//     alert('test');
// };

//-------------------------------------------------------------------------------------------------------------------------


var count = 0;
document.querySelector('#btuClick').onclick = function () {
    count++;
    const txt = document.querySelector('txt');
    txt.innerHTML = "<h1>Counter = " + count + "</h1>";
    txt.Style.color = 'red';
};