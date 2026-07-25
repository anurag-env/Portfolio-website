document.addEventListener("DOMContentLoaded", () => {

	const cards = document.querySelectorAll(".project-card");


	/* =========================================
	   CARD MOUSE INTERACTION
	   ========================================= */

	cards.forEach(card => {

		card.addEventListener("mousemove", (event) => {

			// Don't use tilt on smaller screens
			if (window.innerWidth <= 980) return;


			const rect = card.getBoundingClientRect();

			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;


			/* Cursor spotlight */

			card.style.setProperty("--mouse-x", `${mouseX}px`);
			card.style.setProperty("--mouse-y", `${mouseY}px`);


			/* Calculate position from card center */

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX =
				((mouseY - centerY) / centerY) * -2.5;

			const rotateY =
				((mouseX - centerX) / centerX) * 2.5;


			/* Apply subtle 3D tilt */

			card.style.transform = `
				perspective(1000px)
				rotateX(${rotateX}deg)
				rotateY(${rotateY}deg)
				translateY(-6px)
			`;

		});


		/* Reset card */

		card.addEventListener("mouseleave", () => {

			card.style.transform = `
				perspective(1000px)
				rotateX(0deg)
				rotateY(0deg)
				translateY(0)
			`;

		});

	});


	/* =========================================
	   SCROLL REVEAL
	   ========================================= */

	const projectColumns =
		document.querySelectorAll(".project-column");


	const observer = new IntersectionObserver(

		(entries, observer) => {

			entries.forEach(entry => {

				if (entry.isIntersecting) {

					entry.target.classList.add(
						"project-visible"
					);

					observer.unobserve(entry.target);

				}

			});

		},

		{
			threshold: 0.15
		}

	);


	projectColumns.forEach(column => {
		observer.observe(column);
	});

});