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

### Known Limitations
- CSS styling not yet implemented — colour scheme (light pink, brown, white) is planned but not applied.
- JavaScript not yet implemented — enquiry form has no submission handling yet.

---

## [GitHub Preparation] - September 2026
### Added
- Created and updated the README.md file with project information, website goals, features, technologies, sitemap, file structure, timeline and references.
- Created a separate changelog.md file to document project changes.
- Uploaded the website files and Images folder to GitHub.
- Checked the project structure and uploaded files.
---

## [CSS Styling and Final Design] - September 2026
### Added
- Created style.css for the website styling.
- Added a CSS reset and CSS variables.
- Added typography styling using Fraunces and Karla from Google Fonts.
- Added styling for the header and navigation.
- Added button styling.
- Added homepage hero section styling.
- Added About section styling.
- Added product preview and product card styling.
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
- Fixed a global CSS rule (`p { max-width: 62ch }`) that was preventing paragraph text from centring correctly in the footer, About teaser, "Ready to order?" and "Get in Touch" sections, despite `text-align: center` already being applied.
- Repositioned the About page image to appear before the paragraph text so the text wraps around it correctly, then increased its size and adjusted its spacing from the surrounding text.
- Changed the homepage hero image from an organic/blob border-radius shape to a standard rounded rectangle to match the rest of the site's card styling.
- Added a tablet breakpoint (900px) alongside the existing mobile breakpoint (640px) for a clearer desktop → tablet → mobile responsive structure.
- Fixed a stray typo (`</html>>`) in `products.html`.
- Centred the Products page introduction text.
- Increased the Products page introduction text size to 1.3rem.
- Centred the Products page call-to-action paragraph.
- Fixed the Policy page checkbox alignment so the checkbox, text and policy link stay aligned.
- Maintained the Sprinkle Sprinkle colour scheme using pink, brown, cream and white.

### Tested
- Checked navigation links between pages.
- Checked website images and image paths.
- Checked page layouts after adding CSS.
- Checked the responsive layout on smaller screen sizes.
---

## [Current Status]
- HTML structure completed.
- CSS styling completed.
- Responsive design completed.
- Six main website pages completed.
- Enquiry form structure completed.
- README and Changelog completed.
- Project uploaded to GitHub.

###  Known Limitations
- JavaScript has not been implemented in the current version of the website.
- The enquiry form does not currently process or submit enquiries.
---

## [Unreleased]
- Add JavaScript functionality, including enquiry form validation and submission handling.