/* jshint browserify: true */
/* jshint jquery: true */
/* jshint unused: false */
/* global io */
//var d3 = require('d3')
var $ = require('jquery')


var isSaving = false;
var start_record = document.getElementById('start_record');
var stop_record = document.getElementById('stop_record');

var accelData = [
  {
    label: 'x',
    values: [ { time: 0, y: 0 } ]
  },
  {
    label: 'y',
    values: [ { time: 0, y: 0 } ]
  },
  {
    label: 'z',
    values: [ { time: 0, y: 0 } ]
  }
]

// var accelChart = $('#accel').epoch({
//   type: 'time.line',
//   data: accelData
// })

var start = function() {
  console.log('Start');
  isSaving = true;
}
start_record.onclick = start;

var stop = function() {
    console.log('Stop');
    isSaving = false;
    console.log(accelData);
}
stop_record.onclick = stop;

var socket = io.connect()
socket.on('pyr', function (data) {
  console.log(data);
  if (isSaving === true) {
    accelData.push([
      {time: data.time, y: data.accel_x},
      {time: data.time, y: data.accel_y},
      {time: data.time, y: data.accel_z}
    ])
  }
})
