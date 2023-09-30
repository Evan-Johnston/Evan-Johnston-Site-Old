import helloWorld from "./scripts/helloWorld";
import Prism from 'prismjs';

import 'prismjs/themes/prism-coy.css'

helloWorld();

document.fonts.ready.then(function () {
	const text = new Blotter.Text("Evan Johnston", {
		family: "'Abril Fatface', serif",
		size : 120,
		fill : "#171717",
	});

	const material = new Blotter.ChannelSplitMaterial();
	const blotter = new Blotter(material, {
		texts: text,
	});

	const scope = blotter.forText(text);
	const scene = document.getElementById("scene");
	scope.appendTo(scene);

	//Animate
	material.uniforms.uOffset.value = 0.024;
	material.uniforms.uRotation.value = 0.4;



	document.addEventListener('mousemove', (e)=> {
		let mouse = {x: e.clientX,y: e.clientY};
		let distance = calculateDistance(scene, mouse.x, mouse.y);
		const center = {x: window.innerWidth/2, y:window.innerHeight/2};
		const deltaX = Math.floor((center.x - mouse.x)) * -0.45;
		const deltaY = Math.floor((center.y - mouse.y)) * -0.45;


		distance = distance > 360 ? 360 : distance;

		material.uniforms.uRotation.value = deltaX+deltaY * 0.1;
		material.uniforms.uOffset.value = (distance * 0.00004) + 0.02;
	});

	function calculateDistance(elem, mouseX, mouseY) {
		return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offsetLeft+(elem.clientWidth/2)), 2) + Math.pow(mouseY - (elem.offsetTop+(elem.clientHeight/2)), 2)));
	}
}.bind(this));
