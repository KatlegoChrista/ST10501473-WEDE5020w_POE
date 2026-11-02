/* ==== ENQUIRY FORM ==== */
(function () {
    "use strict";

    const form = document.querySelector(".enquiry-form");
    if (!form) return;

    form.noValidate = true;

    /* ---------- Settings ---------- */

    const SHORT_NOTICE_DAYS = 7;
    const MAX_DAYS_AHEAD = 365;

    const CUPCAKE_PRICES = { "6": 180, "12": 340 };
    const BENTO_PRICE = 200;
    const CUSTOM_CAKE_PRICE = 450;

    const DESSERT_PRICES = {
        "banana-loaf": { label: "Banana Loaf", price: 80 },
        "plain-brownies": { label: "Plain Brownies (3)", price: 90 },
        "chocolate-coated-brownies": { label: "Chocolate-Coated Brownies (3)", price: 100 },
        "premium-brownie-trio": { label: "Premium Brownie Trio (3)", price: 120 }
    };

    /* ---------- Helpers ---------- */

    const $ = (selector) => form.querySelector(selector);
    const $$ = (selector) => Array.from(form.querySelectorAll(selector));

    const checkedProducts = () =>
        $$('input[name="product"]:checked').map((box) => box.value);

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function startOfToday() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Convert the date entered into a date JavaScript can check.
    function parseDate(text) {
        const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
        if (!match) return null;

        const day = Number(match[1]);
        const month = Number(match[2]);
        const year = Number(match[3]);

        const date = new Date(year, month - 1, day);

        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return null;
        }

        return date;
    }

    function daysUntil(date) {
        return Math.round((date - startOfToday()) / 86400000);
    }

    function prettyDate(date) {
        return date.toLocaleDateString("en-ZA", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    /* ---------- Error Messages ---------- */

    const errorState = new Map();

    function clearError(key) {
        const state = errorState.get(key);
        if (!state) return;

        state.fields.forEach((field) => {
            field.classList.remove("input-invalid");
            field.removeAttribute("aria-invalid");
            field.removeAttribute("aria-describedby");
        });

        state.message.remove();
        errorState.delete(key);
    }

    function setError(key, fields, text, anchor) {
        clearError(key);

        const message = el("p", "field-error", text);
        message.id = "error-" + key;

        (anchor || fields[0]).insertAdjacentElement("afterend", message);

        fields.forEach((field) => {
            field.classList.add("input-invalid");
            field.setAttribute("aria-invalid", "true");
        });

        fields[0].setAttribute("aria-describedby", message.id);

        errorState.set(key, {
            fields: fields,
            message: message
        });

        return false;
    }

    function setValid(key) {
        clearError(key);
        return true;
    }

    /* ---------- Form Validation ---------- */

    function validateName() {
        const field = $("#full-name");
        const value = field.value.trim();

        if (!value) {
            return setError("full-name", [field], "Please enter your full name.");
        }

        if (!/^\p{L}[\p{L} '’.-]{1,59}$/u.test(value)) {
            return setError("full-name", [field], "Names can only contain letters, spaces, hyphens and apostrophes (2 to 60 characters).");
        }

        return setValid("full-name");
    }

    function validateEmail() {
        const field = $("#email");
        const value = field.value.trim();

        if (!value) {
            return setError("email", [field], "Please enter your email address.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            return setError("email", [field], "Please enter a valid email address, for example name@example.com.");
        }

        return setValid("email");
    }

    function validatePhone() {
        const field = $("#contact");
        const value = field.value.trim();

        if (!value) {
            return setError("contact", [field], "Please enter your contact number.");
        }

        const digits = value.replace(/[\s()-]/g, "");

        if (!/^(\+27|0)[1-9]\d{8}$/.test(digits)) {
            return setError("contact", [field], "Please enter a valid South African number, for example 071 234 5678 or +27 71 234 5678.");
        }

        return setValid("contact");
    }

    function validateProducts() {
        const boxes = $$('input[name="product"]');

        if (!checkedProducts().length) {
            return setError(
                "product",
                boxes,
                "Please choose at least one product.",
                boxes[0].closest("div")
            );
        }

        return setValid("product");
    }

    function validateCupcakeSize() {
        const select = $("#cupcake-size");

        if (checkedProducts().includes("cupcakes") && !select.value) {
            return setError("cupcake-size", [select], "Please select a box size for your cupcakes.");
        }

        return setValid("cupcake-size");
    }

    function validateDessertChoice() {
        const select = $("#dessert-choice");

        if (checkedProducts().includes("desserts") && !select.value) {
            return setError("dessert-choice", [select], "Please select which dessert you would like.");
        }

        return setValid("dessert-choice");
    }

    function validateOccasion() {
        const field = $("#occasion");

        if (!field.value) {
            return setError("occasion", [field], "Please select an occasion.");
        }

        return setValid("occasion");
    }

    function validateFlavour() {
        const radios = $$('input[name="cake-flavour"]');

        const needsCake = checkedProducts().some(
            (product) => product === "bento" || product === "custom-cakes"
        );

        if (needsCake && !radios.some((radio) => radio.checked)) {
            return setError(
                "cake-flavour",
                radios,
                "Please choose a cake flavour for your cake.",
                radios[0].closest("div")
            );
        }

        return setValid("cake-flavour");
    }

    function validateFrosting() {
        const radios = $$('input[name="frosting"]');

        const needsCake = checkedProducts().some(
            (product) => product === "bento" || product === "custom-cakes"
        );

        if (needsCake && !radios.some((radio) => radio.checked)) {
            return setError(
                "frosting",
                radios,
                "Please choose a frosting for your cake.",
                radios[0].closest("div")
            );
        }

        return setValid("frosting");
    }

    function validateDate() {
        const field = $("#date");
        const value = field.value.trim();

        if (!value) {
            return setError("date", [field], "Please enter your preferred date.");
        }

        const date = parseDate(value);

        if (!date) {
            return setError("date", [field], "Please enter a real date as dd/mm/yyyy, for example 25/12/2026.");
        }

        if (daysUntil(date) < 0) {
            return setError("date", [field], "Your preferred date cannot be in the past.");
        }

        if (daysUntil(date) < SHORT_NOTICE_DAYS) {
            return setError("date", [field], "Please choose a date at least 7 days from today.");
        }

        if (daysUntil(date) > MAX_DAYS_AHEAD) {
            return setError("date", [field], "Please choose a date within the next 12 months.");
        }

        return setValid("date");
    }

    function validateDesign() {
        const field = $("#design");

        if (field.value.length > 500) {
            return setError("design", [field], "Please keep your design description under 500 characters.");
        }

        return setValid("design");
    }

    function validateInspiration() {
        const field = $("#inspiration");
        const file = field.files && field.files[0];

        if (!file) return setValid("inspiration");

        if (!file.type.startsWith("image/")) {
            return setError("inspiration", [field], "Please upload an image file (for example JPG or PNG).");
        }

        if (file.size > 5 * 1024 * 1024) {
            return setError("inspiration", [field], "That photo is larger than 5 MB. Please choose a smaller image.");
        }

        return setValid("inspiration");
    }

    function validateDeliveryMethod() {
        const radios = $$('input[name="delivery-method"]');

        if (!radios.some((radio) => radio.checked)) {
            return setError(
                "delivery-method",
                radios,
                "Please choose delivery or collection.",
                radios[0].closest("div")
            );
        }

        return setValid("delivery-method");
    }

    function validateDeliveryAddress() {
        const field = $("#delivery-address");
        const method = $('input[name="delivery-method"]:checked');

        if (!method || method.value !== "delivery") {
            return setValid("delivery-address");
        }

        const value = field.value.trim();

        if (!value) {
            return setError("delivery-address", [field], "Please enter your delivery address.");
        }

        if (value.length < 10) {
            return setError("delivery-address", [field], "Please enter your full delivery address (street, suburb and city).");
        }

        return setValid("delivery-address");
    }

    function validateAllergies() {
        const field = $("#allergies");

        if (field.value.trim().length < 2) {
            return setError("allergies", [field], "Please list any allergies, or write 'None'.");
        }

        return setValid("allergies");
    }

    function validateNotes() {
        const field = $("#additional-notes");

        if (field.value.length > 500) {
            return setError("additional-notes", [field], "Please keep your notes under 500 characters.");
        }

        return setValid("additional-notes");
    }

    function validatePolicy() {
        const field = $('input[name="policy"]');

        if (!field.checked) {
            return setError(
                "policy",
                [field],
                "Please confirm that you have read and agree to the policy.",
                field.closest("label")
            );
        }

        return setValid("policy");
    }

    const validatorsByKey = {
        "full-name": validateName,
        "email": validateEmail,
        "contact": validatePhone,
        "product": validateProducts,
        "cupcake-size": validateCupcakeSize,
        "dessert-choice": validateDessertChoice,
        "occasion": validateOccasion,
        "cake-flavour": validateFlavour,
        "frosting": validateFrosting,
        "date": validateDate,
        "design": validateDesign,
        "inspiration": validateInspiration,
        "delivery-method": validateDeliveryMethod,
        "delivery-address": validateDeliveryAddress,
        "allergies": validateAllergies,
        "additional-notes": validateNotes,
        "policy": validatePolicy
    };

    /* ---------- Live Validation ---------- */

    form.addEventListener("focusout", function (event) {
        const validate = validatorsByKey[event.target.id];

        if (validate && event.target.matches("input, textarea, select")) {
            validate();
        }
    });

    function refreshErrors() {
        Object.keys(validatorsByKey)
            .filter((key) => errorState.has(key))
            .forEach((key) => validatorsByKey[key]());
    }
    form.addEventListener("input", function (event) {
        if (event.target.id === "design") {
            validateDesign();
        }

        if (event.target.id === "additional-notes") {
            validateNotes();
        }

        refreshErrors();
    });

    form.addEventListener("change", refreshErrors);

    /* ---------- Date and Delivery ---------- */

    // Add slashes while the customer types the date.
    $("#date").addEventListener("input", function () {
        const digits = this.value.replace(/\D/g, "").slice(0, 8);
        let formatted = digits;

        if (digits.length > 4) {
            formatted = digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
        } else if (digits.length > 2) {
            formatted = digits.slice(0, 2) + "/" + digits.slice(2);
        }

        if (this.value !== formatted) {
            this.value = formatted;
        }
    });

    // Only show the address field when delivery is selected.
    function updateAddressVisibility() {
        const method = $('input[name="delivery-method"]:checked');

        $("#delivery-address").closest("div").hidden = !(
            method && method.value === "delivery"
        );
    }

    $$('input[name="delivery-method"]').forEach((radio) => {
        radio.addEventListener("change", updateAddressVisibility);
    });

    updateAddressVisibility();

    /* ---------- Order Summary ---------- */

    function buildOrderLines() {
        const chosen = checkedProducts();
        const lines = [];

        if (chosen.includes("cupcakes")) {
            const size = $("#cupcake-size").value;

            lines.push({
                label: "Cupcakes, box of " + size,
                price: CUPCAKE_PRICES[size]
            });
        }

        if (chosen.includes("bento")) {
            lines.push({
                label: "Bento cake (4-inch)",
                price: BENTO_PRICE
            });
        }

        if (chosen.includes("custom-cakes")) {
            lines.push({
                label: "Custom cake (6-inch)",
                price: CUSTOM_CAKE_PRICE
            });
        }

        if (chosen.includes("desserts")) {
            const dessert = DESSERT_PRICES[$("#dessert-choice").value];

            lines.push({
                label: dessert.label,
                price: dessert.price
            });
        }

        return lines;
    }

    function showResponse() {
        const firstName = $("#full-name").value.trim().split(/\s+/)[0];
        const lines = buildOrderLines();
        const total = lines.reduce((sum, line) => sum + line.price, 0);
        const date = parseDate($("#date").value);
        const delivery = $('input[name="delivery-method"]:checked').value === "delivery";

        const panel = el("section", "enquiry-result");

        const heading = el("h2", "", "Thank you, " + firstName + "!");
        heading.setAttribute("tabindex", "-1");
        panel.appendChild(heading);

        panel.appendChild(el("p", "", "Thank you for sharing your requirements. Here is a summary of your enquiry:"));

        panel.appendChild(el("h3", "", "Your order"));

        const list = el("ul", "result-list");

        lines.forEach((line) => {
            list.appendChild(
                el("li", "", line.label + " (from R" + line.price + ")")
            );
        });

        panel.appendChild(list);

        const flavour = $('input[name="cake-flavour"]:checked');
        const frosting = $('input[name="frosting"]:checked');
        const filling = $('input[name="filling"]:checked');

        function formatChoice(value) {
            return value
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }

        panel.appendChild(el("h3", "", "Customisation"));

        if (flavour) {
            panel.appendChild(
                el("p", "", "Cake flavour: " + formatChoice(flavour.value))
            );
        }

        if (frosting) {
            panel.appendChild(
                el("p", "", "Frosting: " + formatChoice(frosting.value))
            );
        }

        if (filling) {
            panel.appendChild(
                el("p", "", "Filling: " + formatChoice(filling.value))
            );
        }

        panel.appendChild(
            el("p", "result-total", "Starting price: R" + total)
        );

        panel.appendChild(
            el(
                "p",
                "result-note",
                "The final price will be confirmed after we have discussed your requirements, including any customisation, add-ons and delivery fees."
            )
        );

        panel.appendChild(el("h3", "", "Availability"));

        if (daysUntil(date) < SHORT_NOTICE_DAYS) {
            panel.appendChild(
                el(
                    "p",
                    "",
                    "Your preferred date (" + prettyDate(date) + ") is less than " +
                    SHORT_NOTICE_DAYS +
                    " days away. Availability on short notice is limited, so we will check whether we can fit your order in and let you know."
                )
            );
        } else {
            panel.appendChild(
                el(
                    "p",
                    "",
                    "We have noted " + prettyDate(date) +
                    " as your preferred date and will confirm availability when we review your enquiry."
                )
            );
        }

        panel.appendChild(
            el("h3", "", delivery ? "Delivery" : "Collection")
        );

        panel.appendChild(
            el(
                "p",
                "",
                delivery
                    ? "Your delivery fee depends on your location and will be confirmed when we review your enquiry."
                    : "You can collect your order from Klipfontein View, Midrand. We will confirm the collection time with you."
            )
        );

        const design = $("#design").value.trim();

        if (design) {
            panel.appendChild(el("p", "", "Design: " + design));
        }

        const notes = $("#additional-notes").value.trim();

        if (notes) {
            panel.appendChild(el("p", "", "Additional notes: " + notes));
        }

        panel.appendChild(el("h3", "", "Dietary Requirements"));

        panel.appendChild(
            el("p", "", "Allergies: " + $("#allergies").value.trim())
        );

        const dietary = $("#dietary").value.trim();

        panel.appendChild(
            el(
                "p",
                "",
                "Dietary requirements: " + (dietary || "None specified.")
            )
        );

        panel.appendChild(
            el(
                "p",
                "",
                "We will be in touch on " + $("#email").value.trim() +
                " or " + $("#contact").value.trim() + "."
            )
        );

        const policyNote = el(
            "p",
            "result-note",
            "This is an enquiry, not a confirmed order. An order is only confirmed once the deposit has been received. See our "
        );

        const policyLink = el("a", "", "Policy page");
        policyLink.href = "policy.html";

        policyNote.appendChild(policyLink);
        policyNote.appendChild(document.createTextNode(" for details."));
        panel.appendChild(policyNote);

        const again = el("button", "result-again", "Make another enquiry");
        again.type = "button";

        again.addEventListener("click", function () {
            panel.remove();
            form.reset();
            updateAddressVisibility();
            form.hidden = false;
            $("#full-name").focus();
        });

        panel.appendChild(again);

        form.hidden = true;
        form.insertAdjacentElement("afterend", panel);
        heading.focus();
    }

    /* ---------- Form Submission ---------- */
/* ---------- Form Submission ---------- */

const status = el("p", "form-status");
status.setAttribute("role", "alert");
form.appendChild(status);

form.addEventListener("reset", function () {
    Array.from(errorState.keys()).forEach(clearError);
    status.textContent = "";
});

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const results = Object.keys(validatorsByKey).map(
        (key) => validatorsByKey[key]()
    );

    const problems = results.filter((ok) => !ok).length;

    if (problems > 0) {
        status.textContent = "Almost there! A few details still need your attention.";

        const firstInvalid = form.querySelector(".input-invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }

        return;
    }

    status.textContent = "Sending your enquiry...";

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const formData = new FormData(form);

        formData.set("_subject", "New Sprinkle Sprinkle Enquiry");
        formData.set("_replyto", $("#email").value.trim());

        const response = await fetch(form.action, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
            body: formData
        });

        const result = await response.json();

        if (!response.ok || result.ok !== true) {
            throw new Error("Your enquiry could not be sent.");
        }

        status.textContent = "";
        showResponse();

    } catch (error) {
        status.textContent = "Sorry, your enquiry could not be sent. Please try again.";

    } finally {
        submitButton.disabled = false;
    }
});
})();

/* ==== CONTACT FORM ==== */
(function () {
    "use strict";

    const form = document.querySelector(".contact-form");
    if (!form) return;

    // Our own messages replace the browser's default validation bubbles.
    form.noValidate = true;

    const MIN_MESSAGE_LENGTH = 10;
    const MAX_MESSAGE_LENGTH = 800;

    /* ---------- Helpers ---------- */

    const $ = (selector) => form.querySelector(selector);

    function el(tag, className, text) {
        const node = document.createElement(tag);

        if (className) node.className = className;
        if (text) node.textContent = text;

        return node;
    }

    /* ---------- Error messages ---------- */

    const errorState = new Map();

    function clearError(key) {
        const state = errorState.get(key);
        if (!state) return;

        state.fields.forEach((field) => {
            field.classList.remove("input-invalid");
            field.removeAttribute("aria-invalid");
            field.removeAttribute("aria-describedby");
        });

        state.message.remove();
        errorState.delete(key);
    }

    function setError(key, fields, text, anchor) {
        clearError(key);

        const message = el("p", "field-error", text);
        message.id = "error-" + key;

        (anchor || fields[0]).insertAdjacentElement("afterend", message);

        fields.forEach((field) => {
            field.classList.add("input-invalid");
            field.setAttribute("aria-invalid", "true");
        });

        fields[0].setAttribute("aria-describedby", message.id);

        errorState.set(key, {
            fields: fields,
            message: message
        });

        return false;
    }

    function setValid(key) {
        clearError(key);
        return true;
    }

    /* ---------- Character counter ---------- */

    const messageBox = $("#msg-text");
    const counter = el("p", "char-count", "0 / " + MAX_MESSAGE_LENGTH);

    messageBox.insertAdjacentElement("afterend", counter);

    messageBox.addEventListener("input", function () {
        counter.textContent =
            messageBox.value.length + " / " + MAX_MESSAGE_LENGTH;
    });

    /* ---------- Validators ---------- */

    function validateName() {
        const field = $("#msg-name");
        const value = field.value.trim();

        if (!value) {
            return setError(
                "msg-name",
                [field],
                "Please enter your full name."
            );
        }

        if (!/^\p{L}[\p{L} '’.-]{1,59}$/u.test(value)) {
            return setError(
                "msg-name",
                [field],
                "Names can only contain letters, spaces, hyphens and apostrophes (2 to 60 characters)."
            );
        }

        return setValid("msg-name");
    }

    function validateEmail() {
        const field = $("#msg-email");
        const value = field.value.trim();

        if (!value) {
            return setError(
                "msg-email",
                [field],
                "Please enter your email address."
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
            return setError(
                "msg-email",
                [field],
                "Please enter a valid email address, for example name@example.com."
            );
        }

        return setValid("msg-email");
    }

    // The phone number is optional, but if entered it must be valid.
    function validatePhone() {
        const field = $("#msg-phone");
        const value = field.value.trim();

        if (!value) return setValid("msg-phone");

        const digits = value.replace(/[\s()-]/g, "");

        if (!/^(\+27|0)[1-9]\d{8}$/.test(digits)) {
            return setError(
                "msg-phone",
                [field],
                "Please enter a valid South African number, for example 071 234 5678 or +27 71 234 5678."
            );
        }

        return setValid("msg-phone");
    }

    function validateType() {
        const field = $("#msg-type");

        if (!field.value) {
            return setError(
                "msg-type",
                [field],
                "Please choose the type of message you are sending."
            );
        }

        return setValid("msg-type");
    }

    function validateMessage() {
        const field = $("#msg-text");
        const value = field.value.trim();

        if (!value) {
            return setError(
                "msg-text",
                [field],
                "Please type your message.",
                counter
            );
        }

        if (value.length < MIN_MESSAGE_LENGTH) {
            return setError(
                "msg-text",
                [field],
                "Your message is a little short. Please write at least " +
                MIN_MESSAGE_LENGTH + " characters.",
                counter
            );
        }

        if (field.value.length > MAX_MESSAGE_LENGTH) {
            return setError(
                "msg-text",
                [field],
                "Please keep your message under " +
                MAX_MESSAGE_LENGTH + " characters.",
                counter
            );
        }

        return setValid("msg-text");
    }

    // Validation order follows the form fields.
    const validatorsByKey = {
        "msg-name": validateName,
        "msg-email": validateEmail,
        "msg-phone": validatePhone,
        "msg-type": validateType,
        "msg-text": validateMessage
    };

    /* ---------- Live feedback ---------- */

    form.addEventListener("focusout", function (event) {
        const validate = validatorsByKey[event.target.id];

        if (validate && event.target.matches("input, textarea, select")) {
            validate();
        }
    });

    // Re-check fields that currently have errors.
    function refreshErrors() {
        Object.keys(validatorsByKey)
            .filter((key) => errorState.has(key))
            .forEach((key) => validatorsByKey[key]());
    }

    form.addEventListener("input", refreshErrors);
    form.addEventListener("change", refreshErrors);

    /* ---------- AJAX submission ---------- */

    const status = el("p", "form-status");
    status.setAttribute("role", "status");

    form.appendChild(status);

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const results = Object.keys(validatorsByKey).map(
            (key) => validatorsByKey[key]()
        );

        const problems = results.filter((ok) => !ok).length;

        if (problems > 0) {
            status.textContent =
                "Almost there! A few details still need your attention.";

            const firstInvalid = form.querySelector(".input-invalid");

            if (firstInvalid) firstInvalid.focus();

            return;
        }

        status.textContent = "Sending your message...";
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(form);

        // Set the email subject and reply address.
        formData.append(
            "_subject",
            $("#msg-type").value + " from " + $("#msg-name").value.trim()
        );

        formData.append("_replyto", $("#msg-email").value.trim());

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            const result = await response.json();

            if (!response.ok || !(
                result.success === true || result.success === "true"
            )) {
                throw new Error("Your message could not be sent.");
            }

            status.textContent =
                "Thank you! Your message has been sent successfully.";

            form.reset();
            counter.textContent = "0 / " + MAX_MESSAGE_LENGTH;

        } catch (error) {
            status.textContent =
                "Sorry, something went wrong. Please try again.";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });

})();

/* ==== CONTACT PAGE MAP LEAFLET ==== */
(function () {
    "use strict";

    const mapBox = document.getElementById("map");
    if (!mapBox) return;

    /* ---------- Settings: change these to move the pin ---------- */

    const BUSINESS = {
        name: "Sprinkle Sprinkle",
        address: "Klipfontein View, Midrand, 1685",
        lat: -25.99917,
        lng: 28.12639
    };

    const locateButton = document.getElementById("locate-me");
    const directionsLink = document.getElementById("directions-link");
    const status = document.getElementById("map-status");

    // Leaflet is loaded from a CDN. If it could not load (for example when
    // there is no internet), the message already in the box stays on screen.
    if (typeof L === "undefined") {
        if (locateButton) locateButton.hidden = true;
        return;
    }

    mapBox.textContent = "";

    // Point the directions link at the exact pin.
    if (directionsLink) {
        directionsLink.href = "https://www.google.com/maps/dir/?api=1&destination=" +
            BUSINESS.lat + "," + BUSINESS.lng;
    }

    /* ---------- The map ---------- */

    const map = L.map(mapBox, { scrollWheelZoom: false })
        .setView([BUSINESS.lat, BUSINESS.lng], 14);

    // The mouse wheel only zooms once the map has been clicked, so people can
    // still scroll down the page when their mouse happens to be over the map.
    map.on("click focus", function () { map.scrollWheelZoom.enable(); });
    map.on("mouseout blur", function () { map.scrollWheelZoom.disable(); });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // The pin, with a pop-up that opens straight away.
    const popup = document.createElement("div");
    const popupTitle = document.createElement("strong");
    popupTitle.textContent = BUSINESS.name;
    popup.appendChild(popupTitle);
    popup.appendChild(document.createElement("br"));
    popup.appendChild(document.createTextNode(BUSINESS.address));

    L.marker([BUSINESS.lat, BUSINESS.lng], {
        title: BUSINESS.name,
        alt: BUSINESS.name + " location"
    })
        .addTo(map)
        .bindPopup(popup)
        .openPopup();

    /* ---------- "How far am I from you?" ---------- */

    let youMarker = null;
    let routeLine = null;

    function say(text) {
        if (status) status.textContent = text;
    }

    if (locateButton) {
        locateButton.addEventListener("click", function () {
            if (!("geolocation" in navigator)) {
                say("Your browser cannot share your location, but you can still use the map and the directions link.");
                return;
            }

            say("Finding your location...");

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const you = L.latLng(position.coords.latitude, position.coords.longitude);
                    const shop = L.latLng(BUSINESS.lat, BUSINESS.lng);
                    const km = you.distanceTo(shop) / 1000;

                    // Replace anything drawn by an earlier click.
                    if (youMarker) youMarker.remove();
                    if (routeLine) routeLine.remove();

                    youMarker = L.circleMarker(you, {
                        radius: 8,
                        color: "#d14b7a",
                        fillColor: "#f4739e",
                        fillOpacity: 0.9
                    }).addTo(map).bindTooltip("You are here");

                    routeLine = L.polyline([you, shop], {
                        color: "#d14b7a",
                        weight: 3,
                        dashArray: "6 8"
                    }).addTo(map);

                    map.fitBounds(L.latLngBounds(you, shop), { padding: [40, 40] });

                    say("You are about " + km.toFixed(1) + " km from Sprinkle Sprinkle in a straight line. Use Get directions for the driving route. Your location is only used in your browser to work this out. It is not saved or sent anywhere.");
                },
                function (error) {
                    if (error.code === error.PERMISSION_DENIED) {
                        say("No problem. Location sharing was blocked, so we cannot work out the distance. You can still use the map and the directions link.");
                    } else {
                        say("We could not find your location this time. Please try again.");
                    }
                },
                { enableHighAccuracy: false, timeout: 10000 }
            );
        });
    }
})();

/* ==== POLICY ==== */
(function () {
    "use strict";

    const main = document.querySelector(".page-policy main");
    if (!main) return;

    // Each policy section on the page becomes one accordion item.
    const sections = Array.from(main.querySelectorAll(":scope > section.section"));
    if (!sections.length) return;

    const items = [];
    const usedIds = new Set();

    function slugify(text) {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    /* ---------- Open and close ---------- */

    function setOpen(item, open) {
        item.trigger.setAttribute("aria-expanded", String(open));
        item.panel.classList.toggle("is-open", open);
    }

    function isOpen(item) {
        return item.trigger.getAttribute("aria-expanded") === "true";
    }

    /* ---------- Build the accordion from the existing sections ---------- */

    sections.forEach(function (section, index) {
        const heading = section.querySelector("h2");
        if (!heading) return;

        const title = heading.textContent.trim();

        // A clean, unique id from the heading, e.g. "deposits-and-payments".
        let id = slugify(title) || "section-" + (index + 1);
        if (usedIds.has(id)) id += "-" + (index + 1);
        usedIds.add(id);

        section.id = id;
        section.classList.add("accordion-item");

        // The heading text becomes a button, so it works with the keyboard.
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "accordion-trigger";
        trigger.id = "trigger-" + id;
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-controls", "panel-" + id);

        const label = document.createElement("span");
        label.textContent = title;

        const icon = document.createElement("span");
        icon.className = "accordion-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "+";

        trigger.appendChild(label);
        trigger.appendChild(icon);

        heading.textContent = "";
        heading.appendChild(trigger);

        // Everything after the heading moves into a panel that can slide open.
        const panel = document.createElement("div");
        panel.className = "accordion-panel";
        panel.id = "panel-" + id;

        const inner = document.createElement("div");
        inner.className = "accordion-panel-inner";

        while (heading.nextSibling) {
            inner.appendChild(heading.nextSibling);
        }

        panel.appendChild(inner);
        section.appendChild(panel);

        const item = { section: section, trigger: trigger, panel: panel };
        items.push(item);

        trigger.addEventListener("click", function () {
            setOpen(item, !isOpen(item));
        });
    });

    if (!items.length) return;

    /* ---------- Expand all / Collapse all ---------- */

    const controls = document.createElement("div");
    controls.className = "accordion-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Open or close all policy sections");

    function makeControl(text, open) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "accordion-control";
        button.textContent = text;
        button.addEventListener("click", function () {
            items.forEach((item) => setOpen(item, open));
        });
        return button;
    }

    controls.appendChild(makeControl("Expand all", true));
    controls.appendChild(makeControl("Collapse all", false));
    items[0].section.insertAdjacentElement("beforebegin", controls);

    /* ---------- Keyboard: arrows, Home and End move between headings ---------- */

    main.addEventListener("keydown", function (event) {
        const current = items.findIndex((item) => item.trigger === event.target);
        if (current === -1) return;

        let next = null;

        if (event.key === "ArrowDown") next = (current + 1) % items.length;
        if (event.key === "ArrowUp") next = (current - 1 + items.length) % items.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = items.length - 1;

        if (next !== null) {
            event.preventDefault();
            items[next].trigger.focus();
        }
    });

    /* ---------- Links straight to one policy, e.g. policy.html#cancellations-and-refunds ---------- */

    function openFromHash() {
        const target = items.find((item) => "#" + item.section.id === window.location.hash);
        if (!target) return false;

        setOpen(target, true);
        if (typeof target.section.scrollIntoView === "function") {
            target.section.scrollIntoView();
        }
        return true;
    }

    window.addEventListener("hashchange", openFromHash);

    // Start with the first policy open, unless the link points at a different one.
    if (!openFromHash()) setOpen(items[0], true);
})();

/* ==== PRODUCT SEARCH AND CATEGORY FILTER ==== */
(function () {
    const searchInput = document.getElementById("product-search");
    const categoryFilter = document.getElementById("category-filter");
    const productCategories = document.querySelectorAll(".product-category");

    if (!searchInput || !categoryFilter || productCategories.length === 0) {
        return;
    }

    function filterProducts() {
        const searchText = searchInput.value.toLowerCase().trim();
        const selectedCategory = categoryFilter.value;

        productCategories.forEach(function (category) {
            const categoryText = category.textContent.toLowerCase();
            const heading = category.querySelector("h2");
            const categoryName = heading.textContent.toLowerCase();

            const matchesSearch = categoryText.includes(searchText);
            const matchesCategory = selectedCategory === "all" ||
                categoryName.includes(selectedCategory);

            category.hidden = !matchesSearch || !matchesCategory;
        });
    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
})();

/* ==== PRODUCT CATEGORY SORTING ==== */
(function () {
    const sortSelect = document.getElementById("product-sort");
    const productList = document.getElementById("product-list");

    if (!sortSelect || !productList) {
        return;
    }

    const originalCategories = Array.from(
        productList.querySelectorAll(".product-category")
    );

    sortSelect.addEventListener("change", function () {
        const selectedSort = sortSelect.value;

        let sortedCategories = [...originalCategories];

        if (selectedSort === "az") {
            sortedCategories.sort(function (a, b) {
                return a.querySelector("h2").textContent.localeCompare(
                    b.querySelector("h2").textContent
                );
            });
        } else if (selectedSort === "za") {
            sortedCategories.sort(function (a, b) {
                return b.querySelector("h2").textContent.localeCompare(
                    a.querySelector("h2").textContent
                );
            });
        }

        sortedCategories.forEach(function (category) {
            productList.appendChild(category);
        });
    });
})();

/* ==== PHOTO LIGHTBOX ==== */
(function () {
    "use strict";

    const thumbs = Array.from(document.querySelectorAll(".product-images img"));
    if (!thumbs.length) return;

    let overlay = null;
    let image = null;
    let caption = null;
    let counter = null;
    let closeButton = null;
    let prevButton = null;
    let nextButton = null;

    let gallery = [];     // the photos that can be seen right now
    let position = 0;
    let opener = null;    // the photo that was clicked, so focus can go back to it

    function makeButton(className, label, symbol) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = className;
        button.textContent = symbol;
        button.setAttribute("aria-label", label);
        return button;
    }

    function show(index) {
        position = (index + gallery.length) % gallery.length;
        const photo = gallery[position];

        image.src = photo.src;
        image.alt = photo.alt;
        caption.textContent = photo.alt;
        counter.textContent = (position + 1) + " of " + gallery.length;

        prevButton.hidden = nextButton.hidden = gallery.length < 2;
    }

    function close() {
        overlay.hidden = true;
        document.body.classList.remove("lightbox-open");
        if (opener) opener.focus();
    }

    function build() {
        overlay = document.createElement("div");
        overlay.className = "lightbox";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.setAttribute("aria-label", "Photo viewer");
        overlay.hidden = true;

        const backdrop = document.createElement("div");
        backdrop.className = "lightbox-backdrop";
        backdrop.addEventListener("click", close);

        const figure = document.createElement("figure");
        figure.className = "lightbox-figure";

        image = document.createElement("img");
        image.className = "lightbox-image";

        caption = document.createElement("figcaption");
        caption.className = "lightbox-caption";

        figure.appendChild(image);
        figure.appendChild(caption);

        closeButton = makeButton("lightbox-close", "Close photo viewer", "\u00D7");
        prevButton = makeButton("lightbox-prev", "Previous photo", "\u2039");
        nextButton = makeButton("lightbox-next", "Next photo", "\u203A");

        counter = document.createElement("p");
        counter.className = "lightbox-count";
        counter.setAttribute("aria-live", "polite");

        closeButton.addEventListener("click", close);
        prevButton.addEventListener("click", function () { show(position - 1); });
        nextButton.addEventListener("click", function () { show(position + 1); });

        // Keyboard: Esc closes, arrows change photo, Tab stays inside the viewer.
        overlay.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                close();
            } else if (event.key === "ArrowLeft") {
                show(position - 1);
            } else if (event.key === "ArrowRight") {
                show(position + 1);
            } else if (event.key === "Tab") {
                const focusable = [closeButton, prevButton, nextButton].filter((b) => !b.hidden);
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });

        // Phones: swipe left or right to change photo.
        let touchStartX = null;
        figure.addEventListener("touchstart", function (event) {
            touchStartX = event.changedTouches[0].clientX;
        });
        figure.addEventListener("touchend", function (event) {
            if (touchStartX === null || gallery.length < 2) return;
            const distance = event.changedTouches[0].clientX - touchStartX;
            touchStartX = null;
            if (Math.abs(distance) > 50) show(position + (distance < 0 ? 1 : -1));
        });

        // If a photo cannot load, say so instead of showing a broken image.
        image.addEventListener("error", function () {
            caption.textContent = "Sorry, this photo could not be loaded.";
        });

        overlay.appendChild(backdrop);
        overlay.appendChild(figure);
        overlay.appendChild(closeButton);
        overlay.appendChild(prevButton);
        overlay.appendChild(nextButton);
        overlay.appendChild(counter);
        document.body.appendChild(overlay);
    }

    function open(thumb) {
        if (!overlay) build();

        // Only photos that are showing (your category filter may hide some).
        gallery = thumbs.filter((photo) => !photo.closest("[hidden]"));
        opener = thumb;

        overlay.hidden = false;
        document.body.classList.add("lightbox-open");
        show(Math.max(gallery.indexOf(thumb), 0));
        closeButton.focus();
    }

    // Make every product photo clickable, and reachable with the keyboard.
    thumbs.forEach(function (thumb) {
        thumb.classList.add("lightbox-thumb");
        thumb.tabIndex = 0;
        thumb.setAttribute("role", "button");
        thumb.setAttribute("aria-label", "View larger photo: " + thumb.alt);

        thumb.addEventListener("click", function () { open(thumb); });
        thumb.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open(thumb);
            }
        });
    });
})();

