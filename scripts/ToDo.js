document.getElementById("list").onclick = function() 
    {createList(document.getElementById("list"))};
document.getElementById("mainTask").onclick = function() 
    {createItem(document.getElementById("mainTask"))};

/** Creates a new item for a list
* @param {object} x - The HTML element that will go after the new item.
*/
function createItem(x){
    let name = prompt("Please enter item:");
    if (name == null || name == "") {
        alert("No item entered");
    } else
    {
        const Item = document.createElement("p");
        const node = document.createTextNode(name);
        Item.appendChild(node);
        Item.classList.add("ToDoItem");
        (x.parentNode).insertBefore(Item, x);
    }
}
/** Creates a new List 
* @param {object} x - The HTML element that will go after the new list.
*/
function createList(x){
    let name = prompt("Please enter list name:");
    if (name == null || name == "") {
        alert("No name entered");
    } else
    {
        const section = document.createElement("section");
        section.classList.add("subList");
        (x.parentNode).insertBefore(section, x);

        const para = document.createElement("h2");
        const node = document.createTextNode(name);
        para.appendChild(node);
        para.classList.add("ToDoHeader");
        section.appendChild(para);

        const Item = document.createElement("p");
        const node1 = document.createTextNode("add Task");
        Item.appendChild(node1);
        Item.classList.add("ToDoItem");
        Item.onclick = function() {createItem(Item)};
        section.appendChild(Item);
    }
}