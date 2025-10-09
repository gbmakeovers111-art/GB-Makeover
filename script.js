document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gallery Filtering Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.target.getAttribute('data-filter');

            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            e.target.classList.add('active');

            // Show/Hide gallery items based on filterValue
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Use a short delay before displaying items for a smoother transition effect
                setTimeout(() => {
                    if (filterValue === 'all' || category.includes(filterValue)) {
                        item.classList.remove('hidden');
                        item.style.display = 'block'; // Ensure it's display block for non-hidden state
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none'; // Hide it completely after transition
                    }
                }, 100); 
            });
        });
    });

    // --- 2. Modal/Lightbox Logic ---
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    let currentGalleryLinks = [];

    // Get all gallery links
    const galleryLinks = document.querySelectorAll('.gallery-link');

    // Function to open the modal
    function openModal(index) {
        currentImageIndex = index;
        const link = currentGalleryLinks[currentImageIndex];
        
        modal.style.display = 'block';
        modalImage.src = link.getAttribute('href');
        
        // Get caption text from the <p> tag inside the gallery item
        captionText.innerHTML = link.querySelector('p').innerText;
    }
    
    // Event listener for all gallery links
    galleryLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // Rebuild currentGalleryLinks based on visible items
            // This ensures prev/next only cycle through the currently filtered category
            currentGalleryLinks = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) .gallery-link'));
            
            // Find the index of the clicked link within the current visible set
            const visibleIndex = currentGalleryLinks.findIndex(l => l === link);
            if (visibleIndex !== -1) {
                openModal(visibleIndex);
            }
        });
    });

    // Function to show the next image
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryLinks.length;
        openModal(currentImageIndex);
    }

    // Function to show the previous image
    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryLinks.length) % currentGalleryLinks.length;
        openModal(currentImageIndex);
    }
    
    // Event listeners for controls
    closeBtn.onclick = () => { modal.style.display = 'none'; };
    prevBtn.onclick = showPrev;
    nextBtn.onclick = showNext;
    
    // Close modal when clicking outside the image
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Keyboard navigation
    document.onkeydown = (e) => {
        e = e || window.event;
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    };
    
    // Initial setup: ensure all gallery links are collected 
    // This is useful if the user doesn't filter first.
    currentGalleryLinks = Array.from(galleryLinks);

});