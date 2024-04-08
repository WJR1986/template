// Function to toggle active state of navbar links on scroll
function navbarlinksActive() {
  // Select all navbar links with class .scrollto inside #navbar
  const navbarlinks = document.querySelectorAll('#navbar .scrollto');
  // Calculate current scroll position with an offset
  const position = window.scrollY + 200;
  
  // Loop through each navbar link
  navbarlinks.forEach(navbarlink => {
    // Find the corresponding section for the navbar link
    const section = document.querySelector(navbarlink.hash);
    // If section does not exist, return
    if (!section) return;
    
    // Calculate the top and bottom position of the section
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    // Add or remove 'active' class based on scroll position
    if (position >= sectionTop && position <= sectionBottom) {
      navbarlink.classList.add('active');
    } else {
      navbarlink.classList.remove('active');
    }
  });
}

// Function to scroll to an element with header offset
function scrollto(el) {
  // Get the height of the header
  const headerOffset = document.querySelector('#header').offsetHeight;
  // Get the top position of the target element
  const elementPos = document.querySelector(el).offsetTop;
  // Scroll to the target element with an offset
  window.scrollTo({
    top: elementPos - headerOffset,
    behavior: 'smooth'
  });
}

// Function to toggle .header-scrolled class on #header when page is scrolled
function headerScrolled() {
  // Select the header element
  const selectHeader = document.querySelector('#header');
  // If header element does not exist, return
  if (!selectHeader) return;
  // Check if page is scrolled beyond a certain point and toggle class accordingly
  const isScrolled = window.scrollY > 100;
  selectHeader.classList.toggle('header-scrolled', isScrolled);
}

// Function to toggle display of back-to-top button based on scroll position
function toggleBacktotop() {
  // Get the back-to-top button element
  const backtotop = document.getElementById('back-to-top-btn');
  // If back-to-top button does not exist, return
  if (!backtotop) return;
  // Show or hide back-to-top button based on scroll position
  if (window.scrollY > 100) {
    backtotop.style.display = 'block';
  } else {
    backtotop.style.display = 'none';
  }
}

// Add event listeners for page load and scroll
window.addEventListener('load', () => {
  // Call functions to handle header scroll and back-to-top button on page load
  headerScrolled();
  toggleBacktotop();
});

window.addEventListener('scroll', () => {
  // Call functions to handle header scroll and back-to-top button on scroll
  headerScrolled();
  toggleBacktotop();
});

// Event listener for back-to-top button click
const backtotop = document.getElementById('back-to-top-btn');
if (backtotop) {
  backtotop.addEventListener('click', () => {
    // Pause AOS animations
    AOS.refreshHard();

    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Resume AOS animations after a short delay (adjust the delay as needed)
    setTimeout(() => {
      AOS.refreshHard();
    }, 1000); // 1000 milliseconds delay
  });
}

// Event listener for scroll with offset on links with class .scrollto
const scrolltoLinks = document.querySelectorAll('.scrollto');
scrolltoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // Get the target element based on the link's hash and scroll to it
    const targetElement = document.querySelector(link.hash);
    if (targetElement) {
      scrollto(link.hash);
    }
  });
});

// Scroll to hash links on page load with offset
window.addEventListener('load', () => {
  if (window.location.hash && document.querySelector(window.location.hash)) {
    scrollto(window.location.hash);
  }
});

// Remove preloader element when window is fully loaded
const preloader = document.querySelector('#preloader');
if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove();
  });
}

// Initiate AOS (Animation on Scroll) if supported
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 1000, // Animation duration in milliseconds
    easing: 'ease-in-out', // Easing function for animation
    once: true, // Whether animation should only happen once
    mirror: false // Whether elements should animate out while scrolling past them
  });
}

// Mobile nav toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', function() {
    // Toggle mobile navigation menu and icon classes
    const navbar = document.querySelector('#navbar');
    navbar.classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });
}