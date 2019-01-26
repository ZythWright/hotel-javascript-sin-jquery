/*  TONI TORRES & ALDO MENENDEZ */
function inicia() {
	llistarReserves();
}

function reset(){
	/* Totes les casilles amb estat lliure (verd) y sin id */
	var num_room = document.querySelectorAll(".room");
	var name = "room";
	for (var i = 0; i < num_room.length; i++) {
		num_room[i].className = name + " lliure";
		num_room[i].removeAttribute('id');
	}
}

function llistarReserves(){
	reset();
	var f = new Date();
	var inputDate = document.getElementById("inputDate").value;
	var currentDate = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
	var showDate = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
	console.log("Current Date => "+currentDate);
	//console.log("Input Date 1 => "+inputDate);
	
	document.getElementById("title").innerHTML = "<strong>Admin Panel - "+showDate;

	/* Si Es la primera vegada que entra al programa o el input esta vacio: cogerá la fecha actual */
	if(inputDate == "")
		inputDate = currentDate;

	console.log("Input Date 2 => "+inputDate);

    var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {

			var resposta = JSON.parse(this.responseText);
			var booking = resposta.booking;
			console.log(resposta.booking);

			for (index=0; index<booking.length; index++) {
				var id_room = booking[index]['id_room'];
				var id_booking = booking[index]['id_booking'];
				var num_room = document.querySelectorAll(".room");
				var room_estat = booking[index]['estat'];
				
				for (var i = 0; i < num_room.length; i++) {
					var num = num_room[i].innerText;
					var result = num.split("-");
					num = result[0];
					//console.log("id_room => " + id_room + " & num_room(doom) =>" + num);
					/* Si coincide el id de la habitación con el numero de la habitación se le añadirá un id y una clase para pintarla */
					if(id_room === num){
						num_room[i].className += " "+room_estat;
						num_room[i].setAttribute('id',id_booking);
					}
				}
			}
		}	
	}
	ajax.open("POST", "./php/controller.php");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send("accio=llistaReserva&inputDate="+inputDate);
}

var id_booking_selected;
var numero_habitacion;
var form;
/* */
function bookingInfo(element){
	/* Cogemos el id que añadimos anteriormente para saber el id de la reserva que buscamos al hacer click */
	id_booking_selected = element.id;

	numero_habitacion = element.innerText;
	var result = numero_habitacion.split("-");
	numero_habitacion = result[0];
	console.log("Número de la habitación => "+numero_habitacion);
	var ajax = new XMLHttpRequest();

	/* Si no existe un id de la reserva significa que no hay reserva para ese dia */
	if(id_booking_selected == null || id_booking_selected == ""){
		/**
		 Clean Modal
		 */
		document.getElementsByClassName("modal-footer")[0].innerHTML = '';
		document.getElementsByClassName("modal-body")[0].innerHTML = "";
		
		/**
		 Body Modal
		 */
		var div = document.createElement("div");

		var alert = document.createElement("p");
		alert.innerHTML = '<div id="mssgAlerta" class="alert alert-warning alertaText" role="alert">No existe ninguna <strong>Reserva</strong> para este día.</div>';

		var formulario = document.createElement("form");
		formulario.className = "form-horizontal";
		crearFormulario(); /* Creo el formulario y lo añado al modal */
		formulario.innerHTML = form;
		div.appendChild(alert);
		div.appendChild(formulario);
		document.getElementsByClassName("modal-body")[0].appendChild(div);

		/**
		 Footer Modal
		 */
		var buttonAdd = document.createElement("button");
		buttonAdd.className = "btn btn-success";
		buttonAdd.id = "btnAdd";
		buttonAdd.innerHTML = ' <i class="fas fa-calendar-plus"></i> Añadir Reserva';

		document.getElementsByClassName("modal-footer")[0].innerHTML = '<button type="button" class="btn btn-info" data-dismiss="modal"> <i class="fas fa-sign-out-alt fa-rotate-180"></i> Close</button>';
		document.getElementsByClassName("modal-footer")[0].appendChild(buttonAdd);
		document.getElementById("btnAdd").addEventListener('click', function(){ addBooking(); }); /* Evento click */

	} else { /* ELSE - En caso de que si exista un id */

		console.log(id_booking_selected);
		ajax.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200) {
	
				var resposta = JSON.parse(this.responseText);
				var booking = resposta.booking;
				console.log(resposta.booking);
				
				/* Creo el segundo Formulario donde se pueden ver y editar los detalles de la reserva 
				PD: Te puedes saltar este trozo llendo a la línia 240 */
				for (index=0; index<booking.length; index++) {
					var div = document.createElement("div");
					var form = document.createElement("form");
					form.className= "form-horizontal";
					
					var alerta = document.createElement("div");
					alerta.style.display = "none";
					alerta.className = "alert alert-danger alertaText";
					alerta.id = "mssgAlertaEdit";
					alerta.textContent = 'Ojo! Las fechas que has introducido colisionan con otra reserva existente.';
					
					form.appendChild(alerta);

					var h30 = document.createElement("h3");
					h30.innerHTML = "<strong><u>Dades de la Reserva</u></strong>";
					form.appendChild(h30);

					var nRoom = document.createElement("div");
					nRoom.className= "form-group";
					nRoom.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"><strong>Número de la habitación: </strong></label><div class="col-sm-8"><input class="form-control" type="number" id="numPiso" value="'+ booking[index]['id_room']+'" ></div>';
					form.appendChild(nRoom);

					var nameOf = document.createElement("div");
					nameOf.className= "form-group";
					nameOf.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"><strong> Nombre de la Reserva: </strong></label><div class="col-sm-8"><input type="text" class="form-control" id="nameof" name="dni_cliente" value="'+ booking[index]['nameof']+'"></div>';
					form.appendChild(nameOf);

					var num_p = document.createElement("div");
					num_p.className= "form-group";
					num_p.innerHTML = '<label class="control-label col-sm-4" for="num_p"><strong>Número de Personas Alojadas: </strong></label> <div class="col-sm-8"> <input class="form-control" id="num_p" type="number" value="'+ booking[index]['num_people']+'"></div>';
					form.appendChild(num_p);

					var estat = document.createElement("div");
					estat.className= "form-group";
					estat.innerHTML = "<label class='control-label col-sm-4' for='estat'> <strong> Estado: </strong></label><div class='col-sm-8'><input class='"+booking[index]['estat']+" form-control' type='text' value='"+booking[index]['estat']+"' readonly></div>";//<span class="+booking[index]['estat']+">"+ booking[index]['estat']+"</span>
					//estat.className= booking[index]['estat'];
					form.appendChild(estat);

					var typeB = document.createElement("div");
					typeB.className= "form-group";
					typeB.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"> <strong>Tipo de Reserva: </strong></label><div class="col-sm-8"><select class="form-control" name="select_type" id="select_type"> <option value="'+ booking[index]['type_booking']+'">'+ booking[index]['type_booking']+'</option> <option value="completa">completa</option> <option value="semi">semi</option> </select></div>';
					form.appendChild(typeB);

					var fechas = document.createElement("div");
					fechas.className= "form-group";
					fechas.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"><strong>Fecha Inicial / Final: </strong></label><div class="col-sm-4"><input class="form-control" id="date_ini" type="date" value="'+ booking[index]["fecha_ini"]+'"></div><div class="col-sm-4"><input class="form-control" id="date_fi" type="date" value="'+ booking[index]["fecha_final"]+'"></div>';
					form.appendChild(fechas);

					var h31 = document.createElement("h3");
					h31.innerHTML = "<strong> <u> Dades del Client</u></strong>";
					form.appendChild(h31);

					var name = document.createElement("div");
					name.className= "form-group";
					name.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"><strong>Nombre: </strong></label> <div class="col-sm-8"> <input class="form-control" id="customer_name" type="text" value="'+ booking[index]['name_customer']+'"></div>';
					form.appendChild(name);

					var ape = document.createElement("div");
					ape.className= "form-group";
					ape.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"><strong>Apellidos: </strong></label> <div class="col-sm-8"> <input class="form-control" id="customer_surname" type="text" value="'+ booking[index]['surname_customer']+'"></div>';
					form.appendChild(ape);

					var dni = document.createElement("div");
					dni.className= "form-group";
					dni.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"> <strong> DNI/NIF/NIE: </strong></label> <div class="col-sm-8"> <input class="form-control" type="text" id="customer_dni" value="'+ booking[index]['dni']+'"></div>';
					form.appendChild(dni);

					var nationality = document.createElement("div");
					nationality.className= "form-group";
					nationality.innerHTML = '<label class="control-label col-sm-4" for="nombre_reserva"><strong>Nacionalidad: </strong></label> <div class="col-sm-8"> <input class="form-control" id="customer_nacion" type="text" value="'+ booking[index]['nationality']+'"></div>';
					form.appendChild(nationality);

					div.appendChild(form);
					document.getElementsByClassName("modal-body")[0].innerHTML = "";
					document.getElementsByClassName("modal-body")[0].appendChild(div);

					var buttonBooking = document.createElement("button");
					buttonBooking.className = "btn btn-primary btnOcup";
					buttonBooking.id = "btnUpdate";
					buttonBooking.innerHTML = " <i class='fas fa-business-time'></i> Reserva Ocupada";

					var buttonUpdate = document.createElement("button");
					buttonUpdate.className = "btn btn-warning btnOcup";
					buttonUpdate.id = "btnUpdate2";
					buttonUpdate.innerHTML = ' <i class="fas fa-edit"></i> Editar';

					var buttonDelete = document.createElement("button");
					buttonDelete.className = "btn btn-danger";
					buttonDelete.id = "btnDelete";
					buttonDelete.innerHTML = " <i class='fas fa-trash-alt'></i> Eliminar";
					
					document.getElementsByClassName("modal-footer")[0].innerHTML = '<button type="button" class="btn btn-info" data-dismiss="modal"> <i class="fas fa-sign-out-alt fa-rotate-180"></i> Close</button>';
					//document.getElementsByClassName("modal-footer")[0].appendChild(buttonExit);
					if (booking[index]['estat'] != "ocupat"){
						document.getElementsByClassName("modal-footer")[0].appendChild(buttonBooking);
						document.getElementById("btnUpdate").addEventListener('click', function(){updateStateBooking()});
					}

					document.getElementsByClassName("modal-footer")[0].appendChild(buttonUpdate);
					document.getElementById("btnUpdate2").addEventListener('click', function(){updateBooking()});
					document.getElementsByClassName("modal-footer")[0].appendChild(buttonDelete);
					document.getElementById("btnDelete").addEventListener('click', function(){deleteBooking()});

					var cn = document.getElementById('customer_name');
					cn.setAttribute('data-id', booking[index]['id_customer']);
					
				}
			}	
		}
		ajax.open("POST", "./php/controller.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("accio=llistaReservaInfo&id_booking_selected="+id_booking_selected);
	}
}

function addBooking(){
	if (confirm("Estas seguro que quieres Añadir una nueva Reserva?")) {
		/* Booking Data */
		var numRoom = document.getElementById('numero').value;
		var nameof = document.getElementById('nombre').value;
		var type_booking = document.getElementById('tipo_reserva').value;
		var fecha_ini = document.getElementById('inputDateIni').value;
		var fecha_final = document.getElementById('inputDateFinal').value;
		// CHECK numRoom = numRoom.replace(/ /g,"");

		/* Client Data */
		var num_people = document.getElementById('num_people').value;
		var name_client = document.getElementById('nombre_cliente').value;
		var surname_client = document.getElementById('apellido_cliente').value;
		var dni = document.getElementById('dni_cliente').value;
		var nacionalidad = document.getElementById('nacionalidad').value;

		if (nameof == "" || typeof(nameof) == "undefined" || nameof == null)
			inputError("nombre");
		else if(num_people == "" || typeof(num_people) == "undefined" || num_people == null || num_people <= 0)
			inputError("num_people");
		else if(fecha_ini == "" || typeof(fecha_ini) == "undefined" || fecha_ini == null)
			inputError("inputDateIni");
		else if(fecha_final == "" || typeof(fecha_final) == "undefined" || fecha_final == null)
			inputError("inputDateFinal");
		else if(name_client == "" || typeof(name_client) == "undefined" || name_client == null)
			inputError("nombre_cliente");
		else if(surname_client == "" || typeof(surname_client) == "undefined" || surname_client == null)
			inputError("apellido_cliente");
		else if(dni == "" || typeof(dni) == "undefined" || dni == null || dni.length < 9 || dni.length > 9)
			inputError("dni_cliente");
		else {
			var arrayJSON = {};
			arrayJSON['numRoom'] = numRoom;
			arrayJSON['nameof'] = nameof;
			arrayJSON['type_booking'] = type_booking;
			arrayJSON['fecha_ini'] = fecha_ini;
			arrayJSON['fecha_final'] = fecha_final;

			arrayJSON['name_client'] = name_client;
			arrayJSON['num_people'] = num_people;
			arrayJSON['surname_client'] = surname_client;
			arrayJSON['dni'] = dni;
			arrayJSON['nacionalidad'] = nacionalidad;
			
			elJSON = JSON.stringify(arrayJSON);
			//console.log("JSON ARRAY =>"+arrayJSON);
			
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
				if (this.readyState==4 && this.status==200) {
					var resposta = JSON.parse(this.responseText);
					var status = resposta.status;
					//alert(status);
					switch(status){
						case "noValid":
						/* Si devuelve no valido muestro una alerta de Bootstrap */
						var alerta = document.getElementById('mssgAlerta');
						alerta.className = "alert alert-danger alertaText";
						alerta.textContent = "Ojo! Las fechas que has introducido colisionan con otra reserva existente."
						break;
						case true:
							llistarReserves();
							$('#modalBookingInfo').modal('hide');
						break;
					}
				}
			}
			ajax.open("POST", "./php/controller.php");
			ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			ajax.send("accio=addBooking&dades="+elJSON);
		} /* FINAL IF DE LOS CHECKS */	
	}
}

function deleteBooking() {
	
	if (confirm("Estas seguro que quieres Eliminar esta Reserva?")) {
		
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200) {
				var resposta = JSON.parse(this.responseText);
				//var status = resposta.status; test
				if (resposta == "true"){
					document.getElementById(id_booking_selected).id = ""; /* Elimino el id del html para que no de conflicto */
					llistarReserves();
					$('#modalBookingInfo').modal('hide');
				}else{ 
					alert(false);
				}
			}
		}
		ajax.open("POST", "./php/controller.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("accio=eliminarBooking&id_booking_selected="+id_booking_selected);
	  }
}

function updateBooking() {
	if (confirm("Estas seguro que quieres Actualizar esta Reserva?")) {
		/* Booking Data */
		var numPiso = document.getElementById('numPiso').value;
		var nameof = document.getElementById('nameof').value;
		var num_p = document.getElementById('num_p').value;
		var select_type = document.getElementById('select_type').value;
		var date_ini = document.getElementById('date_ini').value;
		var date_fi = document.getElementById('date_fi').value;
		// CHECK numRoom = numRoom.replace(/ /g,"");

		/* Client Data */
		var cname = document.getElementById('customer_name');
		var customer_id = cname.getAttribute('data-id');
		var customer_name = cname.value;
		var customer_surname = document.getElementById('customer_surname').value;
		var customer_dni = document.getElementById('customer_dni').value;
		var customer_nacion = document.getElementById('customer_nacion').value;

		//document.getElementById(id_booking_selected).id = "";
		var arrayJSON = {};
			arrayJSON['id_booking_selected'] = id_booking_selected;

			arrayJSON['numPiso'] = numPiso;
			arrayJSON['nameof'] = nameof;
			arrayJSON['num_p'] = num_p;
			arrayJSON['select_type'] = select_type;
			arrayJSON['date_ini'] = date_ini;
			arrayJSON['date_fi'] = date_fi;

			arrayJSON['customer_id'] = customer_id;
			arrayJSON['customer_name'] = customer_name;
			arrayJSON['customer_surname'] = customer_surname;
			arrayJSON['customer_dni'] = customer_dni;
			arrayJSON['customer_nacion'] = customer_nacion;
			
			elJSON = JSON.stringify(arrayJSON);
			//console.log("JSON ARRAY =>"+arrayJSON);

		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200) {
				var resposta = JSON.parse(this.responseText);
				var status = resposta.status;
				//alert(status);
				switch(status){
					case "noValid":
						document.getElementById('mssgAlertaEdit').style.display = "block";
					break;
					case true:
						llistarReserves();
						$('#modalBookingInfo').modal('hide');
					break;
				}
			}
		}
		ajax.open("POST", "./php/controller.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("accio=actualizarBooking&dades="+elJSON);
	  }
}

function updateStateBooking() {
	if (confirm("Estas seguro que quieres Cambiar el estado de la Reserva?")) {
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200) {
				var resposta = JSON.parse(this.responseText);
				var status = resposta.status;
				if (status == true){
					llistarReserves();
					$('#modalBookingInfo').modal('hide');
				}else{ 
					alert(false);
				}
			}
		}
		ajax.open("POST", "./php/controller.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("accio=changeStateBooking&id_booking_selected="+id_booking_selected);
	  }
}

function crearFormulario(){
	//var form = '<form class="form-horizontal" action="/action_page.php">
	form = '<div class="form-group">';

	form += '<div class="container-fluid">';
	form += '	<div class="col-md-12">';
	form += '		<h3> <u> <strong> Dades de la Reserva </strong> </u> </h3>';
	form += '	</div>';
	form += '</div>';

	form += '<label class="control-label col-sm-4" for="email">Número de Habitación:</label>';
	form +=	  '<div class="col-sm-8">';
	form +=		  '<input type="text" class="form-control" id="numero" name="numero" value="'+numero_habitacion+'" readonly>';
	form +=	  '</div>';
	form +='</div>';
	form +='<div class="form-group">';
	form +=  '<label class="control-label col-sm-4" for="nombre">Nombre de la Reserva: *</label>';
	form +=  '<div class="col-sm-8">';
	form +=	'<input type="text" class="form-control" id="nombre" placeholder="Introduce un nombre" name="nombre">';
	form +=			'<div id="msgInvalidName" class="invalid-feedback">';
    form +=   			'La Reserva tiene que estar asignada a un nombre!';
	form +=  		'</div>';
	form +=  '</div>';
	form +='</div>';
	form += '<div class="form-group">';
	form +=  	'<label class="control-label col-sm-4" for="num_people">Número de personas: *</label>';
	form +=  	'<div class="col-sm-8">';
	form +=		'<input type="number" class="form-control" id="num_people" placeholder="Introduce un número" name="num_people">';
	form +=				'<div id="msgInvalidNumCliente" class="invalid-feedback">';
    form +=   				'Se tiene que saber el número de personas que se van a alojar y no puede ser cero o inferior!';
	form +=  			'</div>';
	form +=  	'</div>';
	form +='</div>';
	form +='<div class="form-group">';
	form +=  '<label class="control-label col-sm-4" for="pwd">Tipo de Reserva: *</label>';
	form +=  '<div class="col-sm-8">';          
	form +=	'<select class="form-control" name="tipo_reserva" id="tipo_reserva">';
	form += 	'<option value="dormir">Dormir</option>';
	form +=		'<option value="semi">Semi</option>';
	form +=		'<option value="completa">Completa</option>';
	form +=	'</select>';
	form +=  '</div>';
	form +='</div>';
	form +='<div class="form-group">';
	form +=	  '<label class="control-label col-sm-4" for="email">Introduce una fecha: *</label>';
	form +=	  '<div class="col-sm-4">';
	form +=		'<input type="date" id="inputDateIni" class="form-control" id="fecha_ini" name="fecha_ini">';
	form +=			'<div id="msgInvalidDateIni" class="invalid-feedback">';
    form +=   			'La Reserva tiene que tener una Fecha Inicial Válida!';
	form +=  		'</div>';
	form +=	  '</div>';
	form +=	  '<div class="col-sm-4">';
	form +=		  '<input type="date" id="inputDateFinal" class="form-control" id="fecha_final" name="fecha_ini"> ';
	form +=			'<div id="msgInvalidDateFinal" class="invalid-feedback">';
    form +=   			'La Reserva tiene que tener una Fecha Final Válida!';
	form +=  		'</div>';       
	form +=	  '</div>';
	form +=	  '</div>';
	
	form += '<div class="container-fluid">';
	form += '	<div class="col-md-12">';
	form += '		<h3> <u> <strong> Dades del Client </strong> </u> </h3>';
	form += '	</div>';
	form += '</div>';

	form += '<div class="form-group">';
	form +=  	'<label class="control-label col-sm-4" for="nombre">Nombre: *</label>';
	form +=  	'<div class="col-sm-8">';
	form +=		'<input type="text" class="form-control" id="nombre_cliente" placeholder="Introduce un nombre" name="nombre_cliente">';
	form +=				'<div id="msgInvalidNameCliente" class="invalid-feedback">';
    form +=   				'El cliente tiene que tener un Nombre!';
	form +=  			'</div>';
	form +=  	'</div>';
	form +='	</div>';

	form += '<div class="form-group">';
	form +=  	'<label class="control-label col-sm-4" for="nombre">Apellidos: *</label>';
	form +=  	'<div class="col-sm-8">';
	form +=		'<input type="text" class="form-control" id="apellido_cliente" placeholder="Introduce los Apellidos" name="apellido_cliente">';
	form +=				'<div id="msgInvalidApeCliente" class="invalid-feedback">';
    form +=   				'El cliente tiene que tener Apellidos!';
	form +=  			'</div>';
	form +=  	'</div>';
	form +='</div>';

	form += '<div class="form-group">';
	form +=  	'<label class="control-label col-sm-4" for="nombre">DNI/NIF/NIE: *</label>';
	form +=  	'<div class="col-sm-8">';
	form +=		'<input type="text" class="form-control" id="dni_cliente" placeholder="Introduce un DNI/NIF/NIE" name="dni_cliente">';
	form +=				'<div id="msgInvalidDNI" class="invalid-feedback">';
    form +=   				'El cliente tiene que tener un Identificador Válido!';
	form +=  			'</div>';
	form +=  	'</div>';
	form +='</div>';

	form +='<div class="form-group">';
	form +=  '<label class="control-label col-sm-4" for="pwd">Nacionalidad: *</label>';
	form +=  '<div class="col-sm-8">';          
	form +=	'<select class="form-control" name="nacionalidad" id="nacionalidad">';
	form +=		'<option value="Afghanistan">Afghanistan</option>';
	form +=		'<option value="Albania">Albania</option>';
	form +=		'<option value="Algeria">Algeria</option>';
	form +=		'<option value="American Samoa">American Samoa</option>';
	form +=		'<option value="Andorra">Andorra</option>';
	form +=		'<option value="Angola">Angola</option>';
	form +=		'<option value="Anguilla">Anguilla</option>';
	form +=		'<option value="Antarctica">Antarctica</option>';
	form +=		'<option value="Antigua and Barbuda">Antigua and Barbuda</option>';
	form +=		'<option value="Argentina">Argentina</option>';
	form +=		'<option value="Armenia">Armenia</option>';
	form +=		'<option value="Aruba">Aruba</option>';
	form +=		'<option value="Australia">Australia</option>';
	form +=		'<option value="Austria">Austria</option>';
	form +=		'<option value="Azerbaijan">Azerbaijan</option>';
	form +=		'<option value="Bahamas">Bahamas</option>';
	form +=		'<option value="Bahrain">Bahrain</option>';
	form +=		'<option value="Bangladesh">Bangladesh</option>';
	form +=		'<option value="Barbados">Barbados</option>';
	form +=		'<option value="Belarus">Belarus</option>';
	form +=		'<option value="Belgium">Belgium</option>';
	form +=		'<option value="Belize">Belize</option>';
	form +=		'<option value="Benin">Benin</option>';
	form +=		'<option value="Bermuda">Bermuda</option>';

	//form +=		'<option value="Afghanistan">Afghanistan</option>';
	//form +=		'<option value="Albania">Albania</option>';
	form +=	'</select>';
	form +=  '</div>';
	form +='</div>';

	//form +='</form>';
}

/* Mostrar y esconder los mensajes de error */
function inputError(element){
	/* CLEAN CLASES */
	document.getElementById("nombre").classList.remove("is-invalid");
	document.getElementById("inputDateIni").classList.remove("is-invalid");
	document.getElementById("inputDateFinal").classList.remove("is-invalid");
	document.getElementById("nombre_cliente").classList.remove("is-invalid");
	document.getElementById("apellido_cliente").classList.remove("is-invalid");
	document.getElementById("dni_cliente").classList.remove("is-invalid");
	document.getElementById("num_people").classList.remove("is-invalid");
	/* ADD CLASS */
	var element = document.getElementById(element);
	element.classList.add("is-invalid");
	/* SHOW MSSG */
	switch(element){
		case num_people:
			document.getElementById('msgInvalidNumCliente').style.display = "block";
			document.getElementById('msgInvalidName').style.display = "none";
			document.getElementById('msgInvalidDateIni').style.visibility = "hidden";
			document.getElementById('msgInvalidDateFinal').style.visibility = "hidden";
			document.getElementById('msgInvalidNameCliente').style.display = "none";
			document.getElementById('msgInvalidApeCliente').style.display = "none";
			document.getElementById('msgInvalidDNI').style.display = "none";
		break;
		case nombre:
			document.getElementById('msgInvalidName').style.display = "block";
			document.getElementById('msgInvalidDateIni').style.visibility = "hidden";
			document.getElementById('msgInvalidDateFinal').style.visibility = "hidden";
			document.getElementById('msgInvalidNameCliente').style.display = "none";
			document.getElementById('msgInvalidApeCliente').style.display = "none";
			document.getElementById('msgInvalidDNI').style.display = "none";
			document.getElementById('msgInvalidNumCliente').style.display = "none";
		break;
		case inputDateIni:
			document.getElementById('msgInvalidDateIni').style.visibility = "visible";
			document.getElementById('msgInvalidDateFinal').style.visibility = "hidden";
			document.getElementById('msgInvalidName').style.display = "none";
			document.getElementById('msgInvalidNameCliente').style.display = "none";
			document.getElementById('msgInvalidApeCliente').style.display = "none";
			document.getElementById('msgInvalidDNI').style.display = "none";
			document.getElementById('msgInvalidNumCliente').style.display = "none";
		break;
		case inputDateFinal:
			document.getElementById('msgInvalidDateFinal').style.visibility = "visible";
			document.getElementById('msgInvalidDateIni').style.visibility = "hidden";
			document.getElementById('msgInvalidName').style.display = "none";
			document.getElementById('msgInvalidNameCliente').style.display = "none";
			document.getElementById('msgInvalidApeCliente').style.display = "none";
			document.getElementById('msgInvalidDNI').style.display = "none";
			document.getElementById('msgInvalidNumCliente').style.display = "none";
		break;

		case nombre_cliente:
			document.getElementById('msgInvalidNameCliente').style.display = "block";
			document.getElementById('msgInvalidDateFinal').style.visibility = "hidden";
			document.getElementById('msgInvalidDateIni').style.visibility = "hidden";
			document.getElementById('msgInvalidName').style.display = "none";
			document.getElementById('msgInvalidApeCliente').style.display = "none";
			document.getElementById('msgInvalidDNI').style.display = "none";
			document.getElementById('msgInvalidNumCliente').style.display = "none";
		break;
		case apellido_cliente:
			document.getElementById('msgInvalidApeCliente').style.display = "block";
			document.getElementById('msgInvalidDateFinal').style.visibility = "hidden";
			document.getElementById('msgInvalidDateIni').style.visibility = "hidden";
			document.getElementById('msgInvalidName').style.display = "none";
			document.getElementById('msgInvalidNameCliente').style.display = "none";
			document.getElementById('msgInvalidDNI').style.display = "none";
			document.getElementById('msgInvalidNumCliente').style.display = "none";
		break;
		case dni_cliente:
			document.getElementById('msgInvalidDNI').style.display = "block";
			document.getElementById('msgInvalidDateFinal').style.visibility = "hidden";
			document.getElementById('msgInvalidDateIni').style.visibility = "hidden";
			document.getElementById('msgInvalidName').style.display = "none";
			document.getElementById('msgInvalidNameCliente').style.display = "none";
			document.getElementById('msgInvalidApeCliente').style.display = "none";
			document.getElementById('msgInvalidNumCliente').style.display = "none";
		break;
	}
	
}

