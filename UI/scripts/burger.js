(function menu() {
	
	let navbar = document.querySelector('nav>ul');

	let submenuButtons = document.getElementsByClassName('submenu-button');


	let toggleButton = document.getElementsByClassName('responsive-menu-button')[0];

	let toggle = function(elem) {

		//This function receives an element to show or hide according to it's state.

 		let element = elem;

 		let display = window.getComputedStyle(navbar).display; 		

 		if ( display === 'none') {

 			element.style.display = 'block';

 		} else {
 			element.style.display = 'none';
 		}
 		
 	}

 	// Smarthphones menu button
	toggleButton.addEventListener('click', function() {
 		toggle(navbar);
 	}); 	
 	

}());