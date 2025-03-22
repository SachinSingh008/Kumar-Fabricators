/**
 * Kumar Fabricators Website JavaScript
 * This script handles all interactive elements and dynamic functionality
 * of the Kumar Fabricators website.
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScroll();
    initTabSystem();
    initGallery();
    initClientSlider();
    initBackToTop();
    initScrollAnimations();
    initContactForm();
    createPlaceholderImages();
});

/**
 * Mobile Navigation Toggle
 * Handles the responsive navigation menu for mobile devices
 */
function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    
    // Toggle mobile menu on button click
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a navigation link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Change header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Smooth Scrolling
 * Provides smooth scrolling behavior for navigation links
 */
function initSmoothScroll() {
    // Find all links that navigate to an ID
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (empty anchor)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the final scroll position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll smoothly to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Tab System
 * Manages the tab interface in the services section
 */
function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            // Get the target tab
            const targetTab = this.getAttribute('data-tab');
            const targetPane = document.getElementById(targetTab);
            
            // If the target pane exists, make it active
            if (targetPane) {
                targetPane.classList.add('active');
                
                // Add a small animation
                targetPane.style.opacity = 0;
                setTimeout(() => {
                    targetPane.style.opacity = 1;
                }, 50);
            }
        });
    });
}

/**
 * Workspace Gallery
 * Creates and manages a simple image gallery
 */
function initGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.gallery-controls .prev');
    const nextBtn = document.querySelector('.gallery-controls .next');
    
    // Sample gallery images - replace with actual images
    const galleryImages = [
        { src: 'images/workspace-1.jpg', alt: 'Workshop Area' },
        { src: 'images/workspace-2.jpg', alt: 'Manufacturing Floor' },
        { src: 'images/workspace-3.jpg', alt: 'Machinery Setup' },
        { src: 'images/workspace-4.jpg', alt: 'Quality Control' },
        { src: 'images/workspace-5.jpg', alt: 'Finished Products' },
        { src: 'images/workspace-6.jpg', alt: 'Assembly Line' }
    ];
    
    // Create gallery items
    if (galleryGrid) {
        // Create placeholder items if no images available
        if (galleryImages.length === 0) {
            for (let i = 0; i < 6; i++) {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <div class="image-placeholder" data-alt="Workspace Image ${i+1}"></div>
                `;
                galleryGrid.appendChild(galleryItem);
            }
        } else {
            // Create items from the gallery images array
            galleryImages.forEach(image => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                
                // Create placeholder for now, will be replaced with actual images
                galleryItem.innerHTML = `
                    <div class="image-placeholder" data-alt="${image.alt}"></div>
                `;
                galleryGrid.appendChild(galleryItem);
            });
        }
        
        // Implement gallery navigation
        if (prevBtn && nextBtn) {
            let currentIndex = 0;
            const itemsPerPage = getGalleryItemsPerPage();
            
            // Initial setup - show first set of items
            updateGalleryView();
            
            // Update the number of visible items based on screen size
            window.addEventListener('resize', function() {
                updateGalleryView();
            });
            
            // Next button functionality
            nextBtn.addEventListener('click', function() {
                if (currentIndex + itemsPerPage < galleryGrid.children.length) {
                    currentIndex += itemsPerPage;
                    updateGalleryView();
                }
            });
            
            // Previous button functionality
            prevBtn.addEventListener('click', function() {
                if (currentIndex - itemsPerPage >= 0) {
                    currentIndex -= itemsPerPage;
                    updateGalleryView();
                }
            });
            
            // Helper function to update the gallery view
            function updateGalleryView() {
                const itemsToShow = getGalleryItemsPerPage();
                
                // Hide all items
                Array.from(galleryGrid.children).forEach(item => {
                    item.style.display = 'none';
                });
                
                // Show only items for the current page
                for (let i = currentIndex; i < currentIndex + itemsToShow && i < galleryGrid.children.length; i++) {
                    galleryGrid.children[i].style.display = 'block';
                }
                
                // Update button states
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex + itemsToShow >= galleryGrid.children.length;
                
                // Add visual indication for disabled buttons
                prevBtn.classList.toggle('disabled', prevBtn.disabled);
                nextBtn.classList.toggle('disabled', nextBtn.disabled);
            }
            
            // Helper function to determine how many items to show based on screen size
            function getGalleryItemsPerPage() {
                if (window.innerWidth < 768) {
                    return 1;
                } else if (window.innerWidth < 992) {
                    return 2;
                } else {
                    return 3;
                }
            }
        }
    }
}

/**
 * Client Slider
 * Creates a horizontal slider for client logos
 */
function initClientSlider() {
    const sliderContainer = document.querySelector('.clients-container');
    const prevBtn = document.querySelector('.clients-slider .prev');
    const nextBtn = document.querySelector('.clients-slider .next');
    
    if (sliderContainer && prevBtn && nextBtn) {
        const itemWidth = getItemWidth();
        let position = 0;
        const maxPosition = getMaxPosition();
        
        // Update values on window resize
        window.addEventListener('resize', function() {
            // Reset slider position when window size changes
            position = 0;
            sliderContainer.style.transform = `translateX(0)`;
            
            // Update button states
            updateButtonStates();
        });
        
        // Next button functionality
        nextBtn.addEventListener('click', function() {
            if (position > -maxPosition) {
                position -= itemWidth;
                // Don't go beyond the last set of items
                if (position < -maxPosition) {
                    position = -maxPosition;
                }
                sliderContainer.style.transform = `translateX(${position}px)`;
                updateButtonStates();
            }
        });
        
        // Previous button functionality
        prevBtn.addEventListener('click', function() {
            if (position < 0) {
                position += itemWidth;
                if (position > 0) {
                    position = 0;
                }
                sliderContainer.style.transform = `translateX(${position}px)`;
                updateButtonStates();
            }
        });
        
        // Update button states initially
        updateButtonStates();
        
        // Helper functions
        function getItemWidth() {
            const containerWidth = sliderContainer.parentElement.offsetWidth;
            // Determine items per view based on screen size
            let itemsPerView = 4;
            if (window.innerWidth < 768) {
                itemsPerView = 1;
            } else if (window.innerWidth < 992) {
                itemsPerView = 2;
            } else if (window.innerWidth < 1200) {
                itemsPerView = 3;
            }
            
            // Calculate individual item width with margin
            return containerWidth / itemsPerView;
        }
        
        function getMaxPosition() {
            const containerWidth = sliderContainer.parentElement.offsetWidth;
            const totalWidth = sliderContainer.scrollWidth;
            return Math.max(0, totalWidth - containerWidth);
        }
        
        function updateButtonStates() {
            prevBtn.disabled = position >= 0;
            nextBtn.disabled = position <= -maxPosition;
            
            // Add visual indication for disabled buttons
            prevBtn.classList.toggle('disabled', prevBtn.disabled);
            nextBtn.classList.toggle('disabled', nextBtn.disabled);
        }
    }
}

/**
 * Back To Top Button
 * Shows/hides the back to top button and enables functionality
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show the button when user scrolls down
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Scroll Animations
 * Adds subtle animations to elements as they enter the viewport
 */
function initScrollAnimations() {
    // Elements to animate
    const animateElements = document.querySelectorAll('.section-header, .feature-item, .service-card, .content-wrapper, .contact-grid');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Unobserve after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '-50px 0px',
        threshold: 0.15
    });
    
    // Observe each element
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Contact Form Handling
 * Basic form validation and submission handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (valid) {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just display a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! We'll get back to you soon.</p>
                `;
                
                // Replace form with success message
                contactForm.style.opacity = 0;
                setTimeout(() => {
                    contactForm.parentNode.replaceChild(successMessage, contactForm);
                    successMessage.style.opacity = 0;
                    setTimeout(() => {
                        successMessage.style.opacity = 1;
                    }, 50);
                }, 300);
            }
        });
        
        // Remove error class on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
}

/**
 * Create Placeholder Images
 * This function creates colored placeholders for images until real images are added
 */
function createPlaceholderImages() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    
    // Colors for the placeholders
    const colors = [
        '#ffc107', '#ff9800', '#ff5722', '#e91e63', 
        '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
        '#03a9f4', '#00bcd4', '#009688', '#4caf50',
        '#8bc34a', '#cddc39', '#ffc107', '#ff9800'
    ];
    
    placeholders.forEach((placeholder, index) => {
        // Use a color from the array, cycling through them
        const colorIndex = index % colors.length;
        placeholder.style.backgroundColor = colors[colorIndex];
        
        // Add camera icon and text
        const text = placeholder.getAttribute('data-alt') || 'Image';
        placeholder.innerHTML = `
            <div class="placeholder-content">
                <i class="fas fa-camera"></i>
                <span>${text}</span>
            </div>
        `;
    });
}

/**
 * Additional helper functions
 */

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Add animation classes to elements
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    });
}

// Format a phone number as input is typed
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    if (value.length > 6) {
        input.value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6);
    } else if (value.length > 3) {
        input.value = value.substring(0, 3) + '-' + value.substring(3);
    } else {
        input.value = value;
    }
}