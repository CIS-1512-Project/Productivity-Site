
/* DECLARATIONS */

// I intended to use :root for holding these CSS variables.
// this will make it easy to load/update user style preferences. 
// All CSS variables that hold user editable data in master :root should be named here.
const MASTER_PREFS = [ 
    "name-col",
    "bgcol",
    "bubble-bgcol",
    "text-col",
    "nav-hvrcol",
    "nav-width",
    "collapse-width"
];
// All CSS variables that hold user editable data in a specific pages' :root should be named here.
// 0 = Dashboard  1 = Timers  2 = To-Do  3 = Calendar
const PER_PAGE_PREFS = [
    ["namebubble-col", 0]
];

const QueryAllPrefData = () => {
    const pData = [];

    // For every editable preference, grab it's associated value in localStorage.
    // Push the key and it's value (if it has one) into the list of user preferences.
    for(const E of MASTER_PREFS) {
        const localData = localStorage.getItem(E) ?? 0;
        
        // Don't get data that doesn't exist.
        if(localData == 0) {
            continue;
        }
        
        pData.push({
            name: E, 
            data: localData
        });
    }
    for(const E of PER_PAGE_PREFS) {
        const localData = localStorage.getItem(E[0]) ?? 0;
        
        // Don't get data that doesn't exist.
        if(localData == 0) {
            continue;
        }

        pData.push({
            name: E[0], 
            data: localData,
            page: E[1]
        });
    }

    return pData;
}

function LoadStylePrefs() {
    // Delete the old userprefs style element if it exists.
    const PrevUP = document.getElementById("userprefs") ?? 0;
    if(PrevUP != 0) {
        document.head.removeChild(PrevUP);
    }

    const UserPrefs = document.createElement("style");
    UserPrefs.id = "userprefs";

    const prefs = QueryAllPrefData();
    
    const PAGEIND = document.querySelector("meta[name='page_index']").content;
    // Build a new root element ruleset
    UserPrefs.innerHTML = ":root {"; 
    for(const pref of prefs) {
        // Check if pref is meant for a specific page. if it is, skip if we're not on that page.
        if(typeof(pref["page"]) != "undefined" && pref["page"] != PAGEIND) continue;

        UserPrefs.innerHTML += `--${pref["name"]}: ${pref["data"]};`;
    }
    UserPrefs.innerHTML+= "}";

    // Add the new style element to the page head.
    document.head.appendChild(UserPrefs);
}

const ClearUserPrefs = () => { 
    localStorage.clear();
    LoadStylePrefs();
};

const SetPref = (key, val) => {
    localStorage.setItem(key, val);
    LoadStylePrefs();
};

/* PRELOAD */

LoadStylePrefs();