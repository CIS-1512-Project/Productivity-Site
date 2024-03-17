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
        const section = document.createElement("section");
        section.classList.add("itemSection");
        (x.parentNode).insertBefore(section, x);

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "isCompleted";
        checkbox.classList.add("checkBox");
        checkbox.onclick = function() {
            if (checkbox.checked) {
                section.style.textDecorationLine = "line-through"
            }else{
                section.style.textDecorationLine = "None"
            }
        };
        section.appendChild(checkbox);

        const item = document.createElement("p");
        const node = document.createTextNode(name);
        item.appendChild(node);
        item.classList.add("item");
        item.onclick = function() {editElement(item)};
        section.appendChild(item);

        const delItem = document.createElement("p");
        const delNode = document.createTextNode("D");
        delItem.appendChild(delNode);
        delItem.classList.add("delete");
        delItem.onclick = function() {deleteElement(section)};
        section.appendChild(delItem);
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
        const subList = document.createElement("section");
        subList.classList.add("subList");
        (x.parentNode).insertBefore(subList, x);

        const section = document.createElement("section");
        section.classList.add("headerSection");
        subList.appendChild(section);

        const para = document.createElement("h2");
        const node = document.createTextNode(name);
        para.appendChild(node);
        para.classList.add("header");
        para.onclick = function() {editElement(para)};
        section.appendChild(para);

        const delItem = document.createElement("p");
        const delNode = document.createTextNode("D");
        delItem.appendChild(delNode);
        delItem.classList.add("delete");
        delItem.onclick = function() {deleteElement(subList)};
        section.appendChild(delItem);

        const item = document.createElement("p");
        const node1 = document.createTextNode("add Task");
        item.appendChild(node1);
        item.classList.add("itemSection");
        item.onclick = function() {createItem(item)};
        subList.appendChild(item);
    }
}
/** deletes the passes element 
* @param {object} x - The HTML element that will be deleted.
*/
function deleteElement(x){
    x.remove();
}
/** Changes the elements inner html 
* @param {object} x - The HTML element that will be edited.
*/
function editElement(x){
    let name = prompt("Please enter new name:");
    if (name == null || name == "") {
        alert("No item entered");
    } else
    {
        x.innerHTML = name;
    }
}