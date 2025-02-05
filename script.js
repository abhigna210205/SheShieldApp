document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const sosButton = document.getElementById("sos-button");

    // Function to switch between pages
    window.showPage = function(pageId) {
        document.querySelectorAll(".page").forEach(page => {
            page.classList.remove("active");
        });
        document.getElementById(pageId).classList.add("active");
    };

    // Save Contacts
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const contact1 = document.getElementById("contact1").value;
            const contact2 = document.getElementById("contact2").value;

            localStorage.setItem("contact1", contact1);
            localStorage.setItem("contact2", contact2);
            alert("Contacts Saved Successfully!");
            showPage('sos-page');
        });
    }

    // Display Contacts & Enable SOS
    if (sosButton) {
        const contact1 = localStorage.getItem("contact1");
        const contact2 = localStorage.getItem("contact2");

        if (contact1 && contact2) {
            document.getElementById("contacts-display").innerHTML = 
                `Emergency Contact 1: ${contact1}<br>Emergency Contact 2: ${contact2}`;
        } else {
            document.getElementById("contacts-display").innerHTML = 
                "No emergency contacts saved.";
        }

        sosButton.addEventListener("click", function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const message = `🚨 SOS! Help Needed! Location: https://www.google.com/maps?q=${latitude},${longitude}`;

                    alert(`SOS message sent to ${contact1} and ${contact2}:\n${message}`);
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
    }
});
