document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.getElementById('about-link');
    const currentDomain = window.location.hostname;

    if (currentDomain.startsWith('pleistos.')) {
        aboutLink.href = '/'; // Link back to the main domain if on subdomain
    } else {
        aboutLink.href = '//pleistos.' + currentDomain; // Link to subdomain if on main domain
    }
});
