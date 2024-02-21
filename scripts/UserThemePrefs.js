
/** A list of all UTP instances is useful for two main reasons:
 * - Preloading all of the UTPs is much simpler.
 * - So that we can get rid of all UTP data easily. (reset preferences for the whole webpage)
 * 
 * To make sure your UTP is preloaded, add the following call after you create your UTP:
 * ```JS
 *    const EXAMPLE_PREFS = new UserThemePrefs("example", { ... });
 *    > GlobalUTPs.push(EXAMPLE_PREFS);
 * ```
 */
const GlobalUTPs = [];

/* Preference Variable Group Declarations */

/** Variable group for the webpage */
const PAGE_PREFS = new UserThemePrefs("master", {
    all: [
        "background-col",
        "foreground-col",

        "text-col",
        "text-selected-col"
    ]
});
GlobalUTPs.push(PAGE_PREFS);

/** Variable group for the navbar */
const NAV_PREFS = new UserThemePrefs("nav", {
    all: [
        "name-col",

        "nav-width", 
        "nav-collapsed-width", 
        "collapsed-mouseover-width-percentage"
    ],
    dashboard: [
        "name-bubble-col"
    ]
});
GlobalUTPs.push(NAV_PREFS);









/* Anything below here is code that is critical to the 
   functionality of our localStorage theme preference manager. */

/* PRELOAD */

const PAGEIND = document.querySelector("meta[name='page_index']").content;
LoadGlobalUTPData();

/* UserThemePrefs Object Declaration */

/** This is an object created to handle groups of user preferences.
 * 
 * Specifically, this library type thing can make & save modifications to `:root` element CSS variables.
 * 
 * Putting a property in a given array has a different effect:
 * - `all` - the rule applies to all pages
 * - `dashboard` - the rule applies to the dashboard
 * - `timers` - the rule applies to the timers page
 * - `todo` - the rule applies to the todo page
 * - `calendar` - the rule applies to the calendar page
 * 
 * Example creation of a UTP to handle a `:root` element on the `timers` page:
 * ```JS
 *    const UTP = new UserThemePrefs("example", {
 *       timers: [
 *          "variable1",
 *          "variable2",
 *          "variable3"
 *       ]
 *    });
 * ```
 * * It is important to note that a single UTP can handle properties on multiple pages.
 *  You can use all of the pref arrays if you wanted to. Try not to go overboard, it'll be okay
 * 
 * Now, pushing user preferences is as easy as calling `PushRulesToLS(UTP, ... )` with all of the rules we wish to push. `Rule` in this context refers to a CSS rule:
 * ```CSS
 *    property: value;
 * ```
 * A UTP can parse rules so long as the property you are trying to override is a member of the UTP.
 * 
 * Example pushing a set of rules for UTP to parse:
 * ```JS
 *    PushRulesToLS(EXAMPLE_PREFS,
 *       ["variable1", "#000000"],
 *       ["variable2", "2"],
 *       ["variable3", "100%"]
 *    );
 * ```
 * After doing this, the UTP will override all properties which are a member of itself with the provided values. 
 * 
 * To load the data of UTP members (for updating), call `LoadUTPData(UTP)`. This is done automatically when you call `PushRulesToLS(UTP, ...rules)`.
 * 
 * To delete all user preferences stored by a UTP, call `DeleteUTPData(UTP)`.
 * @param {String} id - Each instance of a UTP should have a unique ID.
 * @param {Object} pref - An element of pref should be an array with property names [p, p, p, ... ]
 */
function UserThemePrefs(id, {all, dashboard, timers, todo, calendar}) {
    this.id = `user-theme-prefs-${id}`;
    this.prefs = [all, dashboard, timers, todo, calendar];
}

/* UserThemePrefs Function Declarations */

/** Returns true if the property is a member of the UTP
 * @param {UserThemePrefs} UTP
 * @param {String} property
 * @returns Boolean
 */
function UTPHas(UTP, property) {
    for(const PAGE in UTP.prefs) {
        const rules = UTP.prefs[PAGE] ?? 0;
        if(rules === 0) continue;

        for(const KEY of rules) {
            if(KEY == property) return true;
        }
    }
    return false;
}

/** Returns all user-defined preferences which belong to the UTP.
 * 
 * This means there must be data in `localStorage` which is associated with the UTP for this function to return anything.
 * @param {UserThemePrefs} UTP
 * @returns [property, value] ruleset as a 2D array [ [p,v], [p,v], [p,v], ... ]
 */
function QueryRuleset(UTP) {
    const ruleset = [];
    // If a key (property) has an associated value in storage, it is pushed into the ruleset.
    for(const PAGE in UTP.prefs) {
        const properties = UTP.prefs[PAGE] ?? 0;
        // Prevent iterating over arrays that don't exist
        if(properties === 0) continue;

        for(const property of properties) {
            const value = localStorage.getItem(property) ?? 0;
            // Prevent pushing data that doesn't exist.
            if(value === 0) continue;
            
            ruleset.push({
                property: property,
                value: value,
                page: PAGE
            });
        } 
    }
    return ruleset;
};

/** Pushes a rule(set) into the UTP.
 * 
 * Example use:
 * ```JS
 *    PushRulesToLS(NAV_PREFS, 
 *       ["nav-width", "100px"],
 *       ["name-bubble-col", "#000000"]
 *    );
 * ```
 * This would make the navbar 100px wide and make the name bubble black when we're on the dashboard.
 * 
 * If you have a `ruleset` (an array of rules), you can call this function using the spread `...` operator:
 * ```JS
 *    PushRulesToLS(UTP, ...ruleset);
 * ```
 * @param {UserThemePrefs} UTP
 * @param  {...Array} ruleset - [property, value] elements.
 */
function PushRulesToLS(UTP, ...ruleset) {
    if(ruleset.length == 0) return;

    for(const rule of ruleset) {
        if(!UTPHas(UTP, rule[0])) continue;

        localStorage.setItem(...rule);
    }

    LoadUTPData(UTP);
}

/** Attempts to load the keys in the UTP if they need to be loaded.
 * 
 * If successful and there is data to load, a `style` element for the UTP is created.
 * @param {UserThemePrefs} UTP
 */
function LoadUTPData(UTP) {
    // Delete the old userprefs style element if it exists.
    const ID = UTP.id;
    let PrevUTPS = document.getElementById(ID) ?? 0;
    if(PrevUTPS !== 0) {
        document.head.removeChild(PrevUTPS);
    }
    PrevUTPS = undefined;

    const UTPS = document.createElement("style");
    UTPS.id = ID;

    const ruleset = QueryRuleset(UTP);
    // if there is no data in this object, don't make a style
    if(ruleset.length == 0) return;

    // Build a new root element ruleset
    UTPS.innerHTML = ":root {\n";
    for(const rule of ruleset) {
        // Check if pref is meant for a specific page. if it is, skip if we're not on that page.
        if(rule.page != 0 && rule.page != PAGEIND) continue;

        UTPS.innerHTML += `--${rule.property}: ${rule.value};\n`;
    }
    UTPS.innerHTML+= "}";

    // Add the new style element to the page head.
    document.head.appendChild(UTPS);
}

/** Removes `localStorage` data for every key in the UTP if it exists.
 * 
 * Also deletes the `style` element belonging to the UTP if it exists.
 * @param {UserThemePrefs} UTP
 */
function DeleteUTPData(UTP) {
    for(const rule of QueryRuleset(UTP)) {
        localStorage.removeItem(rule.property);
    }
    
    const UTPS = document.getElementById(UTP.id) ?? 0;
    if(UTPS === 0) return;
    document.head.removeChild(UTPS);
}

/** Tries to load data for all Global UTPs. 
 * 
 * If applicable, they will each have their own `style` element embedded in the `head` element.
 * 
 * Call this if you want to preload all entries, or update all of them for whatever reason. (importing..?)
 */
function LoadGlobalUTPData() { 
    for(const UTP of GlobalUTPs) LoadUTPData(UTP); 
}

/** Removes all Global UTP entries from localStorage. Also deletes their `style` elements.
 * 
 * `Clear global preferences` is a good descriptor of this action.
 */
function DeleteGlobalUTPData() {
    for(const UTP of GlobalUTPs) DeleteUTPData(UTP);
}