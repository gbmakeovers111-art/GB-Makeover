document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. Gallery Lightbox Functionality 
    // ----------------------------------------------------------------------
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close-btn")[0];
    
    // Select all gallery links (including new additions)
    const galleryLinks = document.querySelectorAll(".gallery-link"); 
    
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;
    const projectItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Function to get visible links based on active filter
    const getVisibleLinks = () => {
        // Filter out items that are hidden by CSS display: none or class .hidden
        return Array.from(document.querySelectorAll('.gallery-item:not(.hidden)')).map(item => item.querySelector('.gallery-link')).filter(link => link);
    };
    
    // Function to open the modal
    const openModal = (index, links) => {
        if (links.length === 0) return;
        currentIndex = index;
        modal.style.display = "block";
        modalImage.src = links[currentIndex].href;
        captionText.innerHTML = links[currentIndex].querySelector('p').textContent;
    };
    
    // Event listener for opening the modal
    galleryLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const visibleLinks = getVisibleLinks();
            // Find the index of the clicked link within the currently visible links
            const linkIndex = visibleLinks.findIndex(l => l.href === link.href);
            if (linkIndex !== -1) {
                openModal(linkIndex, visibleLinks);
            }
        });
    });
    
    // Close modal function
    closeBtn.onclick = () => {
        modal.style.display = "none";
    };
    
    // Close modal when clicking outside the image
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    
    // Navigation function
    const navigate = (direction) => {
        const visibleLinks = getVisibleLinks();
        if (visibleLinks.length === 0) return;
        
        currentIndex = (currentIndex + direction + visibleLinks.length) % visibleLinks.length;
        modalImage.src = visibleLinks[currentIndex].href;
        captionText.innerHTML = visibleLinks[currentIndex].querySelector('p').textContent;
    };
    
    // Navigation listeners
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));
    
    // Keyboard navigation (optional)
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "block") {
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "ArrowRight") navigate(1);
            if (e.key === "Escape") modal.style.display = "none";
        }
    });

    
    // ----------------------------------------------------------------------
    // 2. Gallery Filtering Functionality (Updated for new buttons)
    // ----------------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hidden');
                    item.style.display = 'block'; 
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none'; 
                }
            });
        });
    });
});