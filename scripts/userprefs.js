/* Preference Group Declarations */

const PAGE_PREFS = new UserPrefObj("master", {
    all: [
        "background-col",
        "foreground-col",

        "text-col",
        "text-selected-col"
    ]
});

const NAV_PREFS = new UserPrefObj("nav", {
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

const PreloadObjects = [ // All UserPrefObj in this array will attempt to load their data in the preload phase.
    NAV_PREFS,
    PAGE_PREFS
];




/* PRELOAD */
const PAGEIND = document.querySelector("meta[name='page_index']").content;

LoadUPOData(...PreloadObjects);








/* Anything below here is code that is critical to the 
   functionality of our localStorage preference manager. */


/* UserPrefObj Object Declaration */

/**User Preference Handler Object
 * 
 * @param {String} id - 
 * Each instance of a UPO should have a unique ID.
 * 
 * @param {Object} pref - 
 * An element of pref should be an array with property names [ p, p, p, ...]
 * 
 * Pref contains all of the properties this UPO will manage.
 * 
 * This is an object created to handle groups of user preferences.
 * 
 * Specifically, this handler can make & save modifications to `:root` element CSS variables.
 * 
 * 
 * 
 * 
 * Putting a property in a given array has a different effect:
 * - `all` - the rule applies to all pages
 * - `dashboard` - the rule applies to the dashboard
 * - `timers` - the rule applies to the timers page
 * - `todo` - the rule applies to the todo page
 * - `calendar` - the rule applies to the calendar page
 * 
 * Example creation of a UPO to handle a `:root` element on the `timers` page:
 * ```JS
 * const UPO = new UserPrefObj("example", {
 *  timers: [
 *      "variable1",
 *      "variable2",
 *      "variable3"
 *  ]
 * });
 * ```
 * * It is important to note that a single UPO can handle properties on multiple pages.
 * You can use all of the pref arrays if you wanted to. But that would defeat the purpose
 * of this object in the first place :)
 * 
 * Now, pushing user preferences is as easy as calling `UPO.PushRulesToLS()` with all of the rules we wish to push. `Rule` in this context refers to a CSS rule:
 * ```CSS
 * property: value;
 * ```
 * 
 * A UPO can parse rules so long as the property you are trying to override is a member of the UPO.
 * 
 * Example pushing a set of rules for UPO to parse:
 * ```JS
 *   UPO.PushRulesToLS(
 *     ["variable1", "#000000"],
 *     ["variable2", "2"],
 *     ["variable3", "100%"]
 *   );
 * ```
 * 
 * After doing this, the UPO will override all properties which are a member of itself with the provided values. 
 * 
 * To load the data of UPO members (for preloading), call `UPO.LoadData()`. This is done automatically when you call `UPO.PushRulesToLS()`.
 * To delete all user preferences stored by a UPO, call `UPO.DeleteData()`.
 * 
 */
function UserPrefObj(id, {all, dashboard, timers, todo, calendar}) {
    this.id = `userprefs-${id}`;
    this.prefs = [all, dashboard, timers, todo, calendar];

    /**
     * QueryRuleset will return all user-modified preferences
     * which belong to this UserPrefObj. 
     * 
     * This means there must be a match in `localStorage`.
     * @returns property:value ruleset as a 2D array [ [p,v], [p,v], [p,v], ...]
     */
    this.QueryRuleset = function() {
        const ruleset = [];
        // If a key (property) has an associated value in storage, it is pushed into the ruleset.
        for(const PAGE in this.prefs) {
            const properties = this.prefs[PAGE] ?? 0;
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

    
    this.LoadData = function() {
        // Delete the old userprefs style element if it exists.
        const ID = this.id;
        const PrevUPOS = document.getElementById(ID) ?? 0;
        if(PrevUPOS !== 0) {
            document.head.removeChild(PrevUPOS);
        }

        const UPOS = document.createElement("style");
        UPOS.id = ID;

        const ruleset = this.QueryRuleset();
        // if there is no data in this object, don't make a style
        if(ruleset.length == 0) return;
    
        // Build a new root element ruleset
        UPOS.innerHTML = ":root {\n";
        for(const rule of ruleset) {
            // Check if pref is meant for a specific page. if it is, skip if we're not on that page.
            if(rule["page"] != 0 && rule["page"] != PAGEIND) continue;

            UPOS.innerHTML += `--${rule["property"]}: ${rule["value"]};\n`;
        }
        UPOS.innerHTML+= "}";

        // Add the new style element to the page head.
        document.head.appendChild(UPOS);
    }
    this.DeleteData = function() {
        for(const rule of this.QueryRuleset()) {
            localStorage.removeItem(rule["property"]);
        }
        
        const UPOS = document.getElementById(this.id) ?? 0;
        if(UPOS === 0) return;

        document.head.removeChild(UPOS);
    }

    /**
     * Has will return true if the property is a member of this UPO
     * @param {String} property
     * @returns Boolean
     */
    this.has = function(property) {
        for(const PAGE in this.prefs) {
            const rules = this.prefs[PAGE] ?? 0;
            if(rules === 0) continue;

            for(const KEY of rules) {
                if(KEY == property) return true;
            }
        }
        return false;
    }

    this.PushRulesToLS = function(...rules) {
        if(rules.length == 0) return;

        for(const rule of rules) {
            if(!this.has(rule[0])) continue;

            localStorage.setItem(...rule);
        }

        this.LoadData();
    }
}

/* UserPrefObj helper function declarations */

function LoadUPOData(...UPOs) {
    if(UPOs.length == 0) return;

    for(const UPO of UPOs) UPO.LoadData();
}
function DeleteUPOData(...UPOs) {
    if(UPOs.length == 0) return;

    for(const UPO of UPOs) UPO.DeleteData();
}