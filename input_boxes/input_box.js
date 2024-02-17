document.addEventListener('DOMContentLoaded', function () {
  
    var form = document.querySelector('form');
    var nameField = document.getElementById('name_field');
    var contactField = document.getElementById('contact_field');
    var timeField = document.getElementById('time_field');
    var locationField = document.getElementById('location_field');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      var nameValue = nameField.value;
      var contactValue = contactField.value;
      var timeValue = timeField.value;
      var locationValue = locationField.value;
  
      console.log('Name:', nameValue);
      console.log('Emergency Contact:', contactValue);
      console.log('Time:', timeValue);
  
    });
});