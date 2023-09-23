/*This is a simple sorter function that takes data, which should be a string
and then creates a html link if the data matches a link, otherwise creates 
a simple textNode
Header parameter will be used in a future build where the behavior is modified 
based on the header*/
function sort(data, header){
    let element;
    switch(data){
        case "Player's Handbook":
            element = createLink("PH", "https://dnd.wizards.com/products/rpg_playershandbook", data);
            break;
        case "Eberron: Rising from the Last War":
            element = createLink("ERLW", "https://dnd.wizards.com/products/eberron", data);
            break;
        default: 
            element = document.createTextNode(data)
            break;
    }

    return element;
}

function createLink(content, link, data){
    let e = document.createElement('a');
    e.href = link;
    e.textContent = content;
    e.title = data;
    return e;
}