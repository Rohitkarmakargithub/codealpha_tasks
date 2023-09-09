document.addEventListener('DOMContentLoaded', function () {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    modeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            modeToggle.innerText = 'Light Mode';
        } else {
            modeToggle.innerText = 'Dark Mode';
        }
    });
});
function submitForm(event) {
    event.preventDefault(); 

   
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

   
    const messageContainer = document.getElementById('message-container');
    messageContainer.innerHTML = '<p class="success-message">Message sent successfully!</p>';

    
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}


document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav ul');

    hamburgerMenu.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
});

