window.onload = function(){
	let acordeon = document.getElementsByClassName("acordeon");
	let i;

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
}