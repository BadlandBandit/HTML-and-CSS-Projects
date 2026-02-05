
// Lightbox functionality with thumbnails and slideshow
document.addEventListener('DOMContentLoaded', function() {
	const lightboxOverlay = document.getElementById('lightbox-overlay');
	const lightboxImg = document.getElementById('lightbox-img');
	const lightboxClose = document.getElementById('lightbox-close');
	const lightboxPrev = document.getElementById('lightbox-prev');
	const lightboxNext = document.getElementById('lightbox-next');
	const images = Array.from(document.querySelectorAll('img.lightbox-trigger'));
	let currentIndex = 0;

	function showImage(index) {
		if (index < 0) index = images.length - 1;
		if (index >= images.length) index = 0;
		currentIndex = index;
		const img = images[currentIndex];
		const fullSrc = img.getAttribute('data-full') || img.src;
		lightboxImg.src = fullSrc;
		lightboxOverlay.style.display = 'flex';
	}

	images.forEach((img, idx) => {
		img.addEventListener('click', function() {
			showImage(idx);
		});
	});

	lightboxPrev.addEventListener('click', function(e) {
		e.stopPropagation();
		showImage(currentIndex - 1);
	});

	lightboxNext.addEventListener('click', function(e) {
		e.stopPropagation();
		showImage(currentIndex + 1);
	});

	// Close lightbox on close button click
	lightboxClose.addEventListener('click', function() {
		lightboxOverlay.style.display = 'none';
		lightboxImg.src = '';
	});

	// Close lightbox when clicking outside the modal
	lightboxOverlay.addEventListener('click', function(e) {
		if (e.target === lightboxOverlay) {
			lightboxOverlay.style.display = 'none';
			lightboxImg.src = '';
		}
	});

	// Optional: Keyboard navigation
	document.addEventListener('keydown', function(e) {
		if (lightboxOverlay.style.display === 'flex') {
			if (e.key === 'ArrowLeft') {
				showImage(currentIndex - 1);
			} else if (e.key === 'ArrowRight') {
				showImage(currentIndex + 1);
			} else if (e.key === 'Escape') {
				lightboxOverlay.style.display = 'none';
				lightboxImg.src = '';
			}
		}
	});
});
