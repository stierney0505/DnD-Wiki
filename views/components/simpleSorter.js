/*This is a simple sorter function that takes data, which should be a string
and then creates a html link if the data matches a link, otherwise creates 
a simple textNode
Header parameter will be used in a future build where the behavior is modified 
based on the header*/
function sort(data, header){
    let element;
    switch(data){
        case "Player's Handbook":
            element = document.createElement('a');
            element.href = "https://dnd.wizards.com/products/rpg_playershandbook";
            element.textContent = "PH";
            element.title = data;
            break;
        default: 
            element = document.createTextNode(data)
            break;
    }

    return element;
}