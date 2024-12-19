// Category and subcategory toggle buttons
document.querySelectorAll('.toggle-subcategories').forEach((toggleButton) => {
    toggleButton.addEventListener('click', (event) => {
        // Get the sibling element (subcategories list)
        const subcategories = toggleButton.nextElementSibling;

        // Check if the subcategories exist and toggle the 'show' class
        if (subcategories && subcategories.classList.contains('subcategories')) {
            subcategories.classList.toggle('show');

            // Change the icon dynamically
            const icon = toggleButton.querySelector('i');
            if (icon) {
                icon.classList.toggle('bi-chevron-down'); // Default closed icon
                icon.classList.toggle('bi-chevron-up');   // Opened icon
            }
        }
    });
});

