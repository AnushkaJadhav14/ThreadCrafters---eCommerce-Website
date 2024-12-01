document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    // Handle form submission
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields
        if (validateForm()) {
            // If validation is successful, submit the form
            contactForm.submit();
        }
    });

    // Form validation function
    function validateForm() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();
        const attachment = document.getElementById("attachment").files[0];
        const errorMessage = document.getElementById("error-message");

        // Clear previous error message
        if (errorMessage) errorMessage.remove();

        // Check required fields
        if (!name || !email || !message) {
            displayError("Please fill out all required fields.");
            return false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            displayError("Please enter a valid email address.");
            return false;
        }

        // Phone number validation (optional but should be in a valid format)
        if (phone && !/^\d{10}$/.test(phone)) {
            displayError("Phone number must be 10 digits.");
            return false;
        }

        // Message length validation
        if (message.length < 10) {
            displayError("Message must be at least 10 characters long.");
            return false;
        }

        // Check file attachment type if uploaded
        if (attachment) {
            const allowedTypes = ["image/jpeg", "image/jpg", "application/pdf"];
            if (!allowedTypes.includes(attachment.type)) {
                displayError("Only JPG, JPEG, or PDF files are allowed.");
                return false;
            }

            // Check file size (maximum 5MB)
            if (attachment.size > 5 * 1024 * 1024) {
                displayError("File size should not exceed 5MB.");
                return false;
            }
        }

        return true; // Validation passed
    }

    // Display error message function
    function displayError(message) {
        const errorElement = document.createElement("p");
        errorElement.id = "error-message";
        errorElement.style.color = "red";
        errorElement.style.fontWeight = "bold";
        errorElement.textContent = message;
        contactForm.insertBefore(errorElement, contactForm.firstChild);
    }
});
