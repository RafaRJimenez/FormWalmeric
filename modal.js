var contentName = document.getElementById('name');
var contentPhone = document.getElementById('phoneNumber');
var contentEmail = document.getElementById('email');
var errorName = document.getElementById('checkName');
var errorPhone = document.getElementById('checkPhoneNumber');
var errorEmail = document.getElementById('checkEmail');
var emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var phoneFormat = /^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/;
var nameFormat = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/

var nameOk = false;
var emailOk = false;
var phoneNumberOk = false;

/* Esta función me permite tener actualizado el estado de todos los campos, 
 si alguno de ellos es cumplimentado correctamente desaparece el error, 
 pero a la misma vez se mantienen los que no están correctos.*/

function checkAllContent() {
	if (emailFormat.test(contentEmail.value)){
		  	errorEmail.style.visibility = "hidden";
		  	emailOk = true; 
		} else {
			errorEmail.style.visibility = "visible";
			emailOk = false;
		}

	 if (phoneFormat.test(contentPhone.value)){
	 	  	errorPhone.style.visibility = "hidden";
		  	phoneNumberOk = true; 
		} else {
			errorPhone.style.visibility = "visible";
			phoneNumberOk = false;
		}


	 if (nameFormat.test(contentName.value)){
	 	  	errorName.style.visibility = "hidden";
		  	nameOk = true; 
		} else {
			errorName.style.visibility = "visible";
			nameOk = false;
		}

	  if ( nameOk && emailOk && phoneNumberOk ){
	  	submitForm();
	  }
}



// Ajax POST

function submitForm() {

	var user = {
	    name: contentName.value,
	    email: contentEmail.value,
	    phoneNumber: contentPhone.value
	}

	$.ajax({
	    type: "POST",
	    url: "http://httpbin.org/post",
	    dataType: "json",
	    data: user,
	    success: function (response) {
	    	var dataSent = response;
	       	alert("Los valores se han registrado correctamente en los siguientes términos: \n"   +
	       			"Nombre: " + dataSent.form.name + "\n"
	       			+ "Email: " + dataSent.form.email +"\n"
	       			+ "Teléfono: " + dataSent.form.phoneNumber
	       		);
	    },
	    failure: function (response) {
	        alert(JSON.stringify(response));
	    }
	});

}

// Modal 

var modal = document.getElementById("modal");
var open = document.getElementById("openModal");
var close = document.getElementById("close");

open.onclick = function() {
  modal.style.display = "block";
}

close.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}