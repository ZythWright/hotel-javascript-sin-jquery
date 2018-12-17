function llista() {
	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {

			var resposta = JSON.parse(this.responseText);

			for (index=0; index<resposta.length; index++) {
				var filera = document.createElement("tr");
				filera.className= "filera";
				
				var casella = document.createElement("td");
				casella.textContent = resposta[index]['codi'];
				filera.appendChild(casella);
				
				var casella = document.createElement("td");
				casella.textContent = resposta[index]['nom'];
				filera.appendChild(casella);

				var casella = document.createElement("td");
				casella.textContent = resposta[index]['funcio'];
				filera.appendChild(casella);				

				var casella = document.createElement("td");
				casella.textContent = resposta[index]['departament'];
				filera.appendChild(casella);

				var casella = document.createElement("td");
				casella.textContent = resposta[index]['sou'];
				filera.appendChild(casella);	

				var casella = document.createElement("td");
				casella.textContent = resposta[index]['comisio'];
				filera.appendChild(casella);

				document.getElementById("llista").appendChild(filera);
			}
		}	
	}
	ajax.open("POST", "controller.php");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send("accio=llista");
}

function generaPaginacio() {
	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {
			var resposta = this.responseText;
			
			var taula = document.createElement("table");
			var filera = document.createElement("tr");
			var casella1 = document.createElement("td");
			casella1.textContent = 1;
			casella1.className="pagact";
			filera.appendChild(casella1);
			
			for (var i=1; i<resposta; i++) {
				var casella1 = document.createElement("td");
				casella1.textContent = (i+1);
				casella1.className="pagnact";

				casella1.onclick = function() {
					
				}
				filera.appendChild(casella1);				
			}
			taula.appendChild(filera);
			document.getElementById("paginacio").appendChild(filera);
		
		}
	}
	ajax.open("POST", "controller.php");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send("accio=paginacio");	
}

function llistaDepartaments() {
	var ajax = new XMLHttpRequest();
	
	ajax.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {

			var resposta = JSON.parse(this.responseText);
			
			for (index=0; index<resposta.length; index++) {
				var opt = document.createElement("option");
				opt.value = resposta[index]['codi'];
				opt.textContent = resposta[index]['nom'];
				
				document.getElementById("dept").appendChild(opt);
			}
			
		}
	}
	ajax.open("POST", "controller.php");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send("accio=llistadep");	
} 
    

function afegirregistre(form) {
	
	if (confirm('Vols afegir el nou empleat?')) {
		var arrayJSON = {};
		arrayJSON['codi'] = form.codi.value;
		arrayJSON['nom'] = form.nom.value;
		arrayJSON['funcio'] = form.funcio.value;
		arrayJSON['sou'] = form.sou.value;
		arrayJSON['datac'] = form.datac.value;
		arrayJSON['dept'] = form.dept.value;
		
		elJSON= JSON.stringify(arrayJSON);
		console.log(elJSON);
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (this.readyState==4 && this.status==200) {
				if (this.responseText=="1") 
					alert("Registre afegit");
			}
		}
		ajax.open("POST", "controller.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send("accio=afegir&dades="+elJSON);
	}
}

function inicia() {
	llista();
	generaPaginacio();
	llistaDepartaments();
}