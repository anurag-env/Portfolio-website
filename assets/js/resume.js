/**
 * Resume Page Interactions - HTML5 UP Escape Velocity Extension
 * Clean, lightweight, recruiter-friendly JavaScript module.
 */

document.addEventListener('DOMContentLoaded', function () {
	// 1. Expand / Collapse for Experience Responsibilities
	const expandButtons = document.querySelectorAll('.expand-toggle-btn');

	expandButtons.forEach(button => {
		button.addEventListener('click', function () {
			const isExpanded = this.getAttribute('aria-expanded') === 'true';
			const contentId = this.getAttribute('aria-controls');
			const content = document.getElementById(contentId);

			if (!content) return;

			if (isExpanded) {
				this.setAttribute('aria-expanded', 'false');
				content.classList.remove('expanded');
				this.querySelector('.btn-text').textContent = 'View Responsibilities & Achievements';
			} else {
				this.setAttribute('aria-expanded', 'true');
				content.classList.add('expanded');
				this.querySelector('.btn-text').textContent = 'Hide Details';
			}
		});
	});

	// 2. Interactive Skills Category Filter
	const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
	const skillCards = document.querySelectorAll('.skill-category-card');

	skillFilterBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			const targetCategory = this.getAttribute('data-filter');

			// Update active tab
			skillFilterBtns.forEach(b => b.classList.remove('active'));
			this.classList.add('active');

			// Filter cards
			skillCards.forEach(card => {
				const cardCat = card.getAttribute('data-category');
				if (targetCategory === 'all' || cardCat === targetCategory) {
					card.style.display = 'block';
					setTimeout(() => {
						card.style.opacity = '1';
						card.style.transform = 'translateY(0)';
					}, 50);
				} else {
					card.style.opacity = '0';
					card.style.transform = 'translateY(20px)';
					setTimeout(() => {
						card.style.display = 'none';
					}, 300);
				}
			});
		});
	});

	// 3. Scroll Reveal Animation for Timelines, Skills, Achievements, Certifications
	const revealElements = document.querySelectorAll('.timeline-item, .skill-category-card, .achievement-card, .certification-card');

	if ('IntersectionObserver' in window) {
		const revealObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('revealed');
					observer.unobserve(entry.target);
				}
			});
		}, {
			threshold: 0.15,
			rootMargin: '0px 0px -50px 0px'
		});

		revealElements.forEach(el => revealObserver.observe(el));
	} else {
		// Fallback for older browsers
		revealElements.forEach(el => el.classList.add('revealed'));
	}

	// 4. Scroll-Spy for Recruiter Sub-Nav Highlighting
	const sections = document.querySelectorAll('.resume-section-target');
	const navLinks = document.querySelectorAll('.resume-nav-link');

	if ('IntersectionObserver' in window && sections.length > 0) {
		const sectionObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const activeId = entry.target.getAttribute('id');
					navLinks.forEach(link => {
						if (link.getAttribute('href') === '#' + activeId) {
							link.classList.add('active');
						} else {
							link.classList.remove('active');
						}
					});
				}
			});
		}, {
			threshold: 0.25,
			rootMargin: '-10% 0px -50% 0px'
		});

		sections.forEach(sec => sectionObserver.observe(sec));
	}

	// Smooth scroll offset handling for sticky sub-nav links
	navLinks.forEach(link => {
		link.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (targetId.startsWith('#')) {
				e.preventDefault();
				const targetElem = document.querySelector(targetId);
				if (targetElem) {
					const yOffset = -90; // Adjust for sticky subnav height
					const y = targetElem.getBoundingClientRect().top + window.pageYOffset + yOffset;
					window.scrollTo({ top: y, behavior: 'smooth' });
				}
			}
		});
	});

	// 5. Back to Top Button
	const backToTopBtn = document.getElementById('back-to-top');

	if (backToTopBtn) {
		window.addEventListener('scroll', function () {
			if (window.pageYOffset > 300) {
				backToTopBtn.classList.add('visible');
			} else {
				backToTopBtn.classList.remove('visible');
			}
		});

		backToTopBtn.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
});
