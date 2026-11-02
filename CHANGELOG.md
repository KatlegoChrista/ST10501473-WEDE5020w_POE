# Changelog

All notable changes to the Sprinkle Sprinkle website project are documented in this file.

## [Part 1] - August 2026

### Added
- Selected Sprinkle Sprinkle as the target organisation and wrote the project proposal.
- Created the wireframe for the site layout.
- Built six HTML pages with shared navigation: `index.html`, `about.html`, `products.html`, `enquiry.html`, `contact.html`, `policy.html`.
- Added the customer enquiry form, including:
  - Customer details section
  - Product/order selection
  - Cake flavour, frosting and filling customisation
  - Occasion and preferred date fields
  - Design description field
  - Inspiration image upload
  - Delivery vs collection option
  - Dietary requirements/allergies section
  - Additional notes section
  - Required policy-agreement checkbox before submission
- Added the Sprinkle Sprinkle Policy page, covering orders, lead times, deposits, custom designs, allergies, delivery/collection, cancellations and refunds.
- Sourced and added website images from Unsplash and Pexels.
- Organised the project folder structure (Website, Images, Proposal, Chosen proposal).

### Researched
- Website requirements and content for Sprinkle Sprinkle.
- Domain and hosting costs for future deployment.

### Tested
- Navigation links across all six pages.

---
## [GitHub Preparation] - September 2026

### Added
- Created and updated the `README.md` file with project information, website goals, features, technologies, sitemap, file structure, timeline and references.
- Created a separate `CHANGELOG.md` file to document project changes.
- Uploaded the website files and Images folder to GitHub.
- Checked the project structure and uploaded files.

---

## [CSS Styling and Final Design] - September 2026

### Added

- Created `style.css` for the website styling.
- Added a CSS reset and CSS variables.
- Added typography styling using Fraunces and Karla from Google Fonts.
- Added styling for the header and navigation.
- Added button styling.
- Added `homepage-hero` section styling.
- Added `About` section styling.
- Added `product-preview` and product card styling.
- Added enquiry and contact section styling.
- Added enquiry form styling.
- Added footer styling.
- Added responsive styling for smaller screen sizes.
- Added reduced-motion support.

### Updated

- Corrected the About page image alignment.
- Added a CSS reset at the top of the stylesheet to remove inconsistent default browser spacing.
- Fixed missing page-specific body classes and section classes on the About, Contact and Enquiry pages that were preventing their CSS from applying correctly.
- Fixed the Home page product preview cards: the `product-categories` class was mistakenly applied to each individual card instead of their parent wrapper, causing the product images to render oversized; removed a stray extra closing `</div>` tag in the same section.
- Fixed a global CSS rule `p { max-width: 62ch }` that was preventing paragraph text from centring correctly in the footer, About teaser, "Ready to order?" and "Get in Touch" sections, despite `text-align: center` already being applied.
- Repositioned the About page image to appear before the paragraph text so the text wraps around it correctly, then increased its size and adjusted its spacing from the surrounding text.
- Changed the homepage hero image from an organic/blob border-radius shape to a standard rounded rectangle to match the rest of the site's card styling.
- Added a tablet breakpoint (900px) alongside the existing mobile breakpoint (640px) for a clearer desktop → tablet → mobile responsive structure.
- Fixed a stray typo `</html>>` in `products.html`.
- Centred the Products page introduction text.
- Increased the Products page introduction text size to 1.3rem.
- Centred the Products page call-to-action paragraph.
- Fixed the Policy page checkbox alignment so the checkbox, text and policy link stay aligned.
- Maintained the Sprinkle Sprinkle colour scheme using pink, brown, cream and white.

---

## [JavaScript Functionality and SEO Improvements] - October–November 2026

### Added

- Created the `js` folder and added `script.js` for the website's JavaScript functionality.
- Added product search, filtering and sorting functionality.
- Added an interactive product image lightbox with captions, image navigation, keyboard controls and touch swipe functionality.
- Added expandable and collapsible sections to the Policy page using JavaScript accordion functionality.
- Added JavaScript validation to the enquiry form, including customer details, product selections, preferred dates, contact numbers and other required fields.
- Added automatic date formatting and validation for the preferred order date.
- Added conditional form fields based on product selections and delivery or collection options.
- Added character counters and length validation for form descriptions and messages.
- Added image upload validation, including file type and file size checks.
- Added enquiry submission handling and a personalised confirmation panel after successful submission.
- Added JavaScript validation and submission handling to the Contact form.
- Added page-specific SEO titles and meta descriptions.
- Added descriptive image alt text and reviewed heading structure and internal links.
- Created robots.txt and sitemap.xml to support search engine crawling and page discovery.

### Updated

- Improved the enquiry form by displaying relevant fields based on customer selections.
- Improved form feedback and reset functionality.
- Added keyboard accessibility and visible focus states to interactive elements.
- Refined interactive elements to support a more accessible user experience.

### Tested

- Tested product search, filtering and sorting.
- Tested the product image lightbox, including captions, navigation, keyboard controls and touch gestures.
- Tested the Policy page accordion functionality.
- Tested enquiry form validation, successful submission, photo attachment and confirmation display.
- Tested Contact form validation and submission feedback.
- Checked responsive layouts and interactive features on different screen sizes.
- Checked internal navigation and contact links.

---

## [Current Status]

- HTML structure completed.
- CSS styling completed.
- Responsive design completed.
- Six main website pages completed.
- JavaScript functionality implemented.
- Enquiry and Contact forms implemented and tested.
- Product search, filtering and sorting completed.
- Product image lightbox completed.
- Policy accordion functionality completed.
- SEO improvements completed.
- `robots.txt` and `sitemap.xml` created.
- `README.md` and `CHANGELOG.md` updated.
- Project uploaded to GitHub.
- Website deployment through GitHub Pages completed.



