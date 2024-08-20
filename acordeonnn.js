window.onload = function(){
	let acordeon = document.getElementsByClassName("acordeon");
	let i, xhttp;

	for (i = 0; i < acordeon.length; i++) {
		acordeon[i].addEventListener("click",function(){
			this.classList.toggle("activa");
			let panel = this.nextElementSibling;
			if (panel.style.display==="block") {
				panel.style.display="none";
			} else {
				panel.style.display="block";
			}
		});
	}
	xhttp = new XMLHttpRequest();
	xhttp.open("GET","bios.xml");
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState==4 && xhttp.status==200) {
			crearImagenes(xhttp.responseXML);
		}
	}
}

function crearImagenes(xmlDoc) {
	let mate = xmlDoc.documentElement.childNodes;
	let datos = [];
	for (let i = 0; i < mate.length; i++) {
		if (mate[i].nodeType==1) {
			m = mate[i].childNodes;
			datos.push({
				apellido:m[1].childNodes[0].nodeValue,
				nombre:m[3].childNodes[0].nodeValue,
				nacimiento:parseInt(m[5].childNodes[0].nodeValue),
				fallecimiento:parseInt(m[7].childNodes[0].nodeValue),
				imagen:m[9].childNodes[0].nodeValue,
				biografia:m[11].childNodes[0].nodeValue
			});
		}
	}
	delete xmlDoc, mate;
	datos.sort(function(a,b){
		if (a.nacimiento > b.nacimiento) { return 1;}
		if (a.nacimiento < b.nacimiento) { return -1;}
		return 0;
	});

	datos.forEach(a =>{
		let contenedor = document.createElement("div");
		contenedor.setAttribute("class","contenedor");
		//
		let n = a.nombre+" "+a.apellido;
		let f = "("+a.nacimiento+"-"+a.fallecimiento+") ";
		imagen = '<img src="img/'+a.imagen+'" alt="'+f+n+'" title="'+f+n+'" style="height:150px;">';
		contenedor.innerHTML = imagen;
		if (a.nacimiento>=1600 && a.nacimiento<=1699) {
			document.getElementById("s17").appendChild(contenedor);
		} else if (a.nacimiento>=1700 && a.nacimiento<=1799) {
			document.getElementById("s18").appendChild(contenedor);
		} else if (a.nacimiento>=1800 && a.nacimiento<=1899) {
			document.getElementById("s19").appendChild(contenedor);
		}
	});
}