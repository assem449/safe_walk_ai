import sendFutureText from textFriendNow.js;

document.addEventListener('DOMContentLoaded', function () {
  
  var form = document.querySelector('form');
  var nameField = document.getElementById('name_field');
  var contactField = document.getElementById('contact_field');
  var locationField = document.getElementById('location_field');
  var timeField = document.getElementById('time_field');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var nameValue = nameField.value;
    var contactValue = contactField.value;
    var locationValue = locationField.value;
    var timeValue = timeField.value;

    sendFutureText(nameValue, contactValue, locationValue, timeValue);

    console.log('Name:', nameValue);
    console.log('Emergency Contact:', contactValue);
    console.log('Time:', timeValue);

  });
});