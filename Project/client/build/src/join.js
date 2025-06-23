/*Initialise io connection */
let socket = io(); 
/* Initialise a emit event */
socket.emit('join_booked', {'TEST':"test"});