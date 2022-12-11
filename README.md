# Moneyhub Tech Test - Property Details

## Improvement/Suggestions

#### 1. Given more time, what other changes you would have liked to make?

-   I'd split each section of the propery details into its own little component or submodule so that the render function is a bit clearer and easier to read.
-   I'd add in some more robust (or any) error handling so that if the data isn't returned from the API the system won't throw out any errors/break.
-   I'd look to use or build some sort of data service that can handle the data requests rather than having the fetch request in the component.
-   I'd flesh out my loader so that it looked a bit nicer.
-   I'd move the format functions I'd made to a new file so they can be accessed more globally.
-   I'd improve the Pill component so that there was a default value, so if a type prop wasn't specified it could fallback to a default style.

#### 2. What UX or design improvements or alterations might you suggest? These can be to existing components or completely new ideas.

-   I would add a little info icon/tooltip to the top right of each AccountSection, explaining the content. Specifically what the Valuation Change is and why that could be good/bad for the end user/customer.
-   I think a dropdown list in under the annual appreciation that displays the yearly breakdown could be interesting see.
-   I would look to do something with the Mortgage section as at first glance it doesnt look like it should be interacted with however has a click event. This could be done by changing the text style, adding a "View details" button or text link.
-   I might make use of some icons to highlight certain parts of the content.
    -   (e.g the dates values in the first section could use a calendar icon).
-   Style wise I might look to tighten up some of the spacing between the text elements
    -   (e.g The property details section - the address lines look almost unrelated to the previos).
-   I'd add some hover/focus/active state styling to the button.
