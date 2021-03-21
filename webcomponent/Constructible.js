const sheet = new CSSStyleSheet();

// Replace all styles synchronously for this style sheet
sheet.replaceSync('p { color: green; }');

class FancyComponent1 extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Attaching the style sheet to the Shadow DOM of this component
        shadowRoot.adoptedStyleSheets = [sheet];

        shadowRoot.innerHTML = `
      <div>
        <p>Hello World</p>
      </div>
    `;

    }
}

class FancyComponent2 extends HTMLElement {

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Same style sheet can also be used by another web component
        shadowRoot.adoptedStyleSheets = [sheet];

        // You can even manipulate the style sheet with plain JS manipulations
        setTimeout(() => shadowRoot.adoptedStyleSheets = [], 2000);

        shadowRoot.innerHTML = `
      <div>
        <p>Hello World</p>
      </div>
    `;

    }
}


// shadowRoot.adoptedStyleSheets = [sheet];
// // Remove stylesheets after two seconds
// setTimeout(() => shadowRoot.adoptedStyleSheets = [], 2000);