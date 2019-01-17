(function menu() {
	
	var navbar = document.querySelector('nav>ul');

	var submenuButtons = document.getElementsByClassName('submenu-button');


	var toggleButton = document.getElementsByClassName('responsive-menu-button')[0];

	var toggle = function(elem) {

		//This function receives an element to show or hide according to it's state.

 		var element = elem;

 		var display = window.getComputedStyle(navbar).display; 		

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