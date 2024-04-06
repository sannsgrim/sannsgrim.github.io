var box = document.getElementById('box');
var box2 = document.getElementById('box2');
var bottomHeader = document.getElementById('bottomHeader');
var Note = document.getElementById('Note');
var down = false;

function Account(){
    if(down){
        box.style.visibility = 'hidden';
        down = false;
    }
    else{
        box.style.visibility = 'visible'
        down = true;
    }
}

function Notification(){
    if(down){
        box2.style.visibility = 'hidden';
        down = false;
    }
    else{
        box2.style.visibility = 'visible';
        down = true;
    }
}

function markAllAsRead() {
    bottomHeader.style.backgroundColor = '#ffffff';
    bottomHeader.style.fontWeight = 'normal';
}

function hover() {
    if(down){
        Note.style.visibility = 'hidden';
        down = false;
    }
    else{
        Note.style.visibility = 'visible';
        down = true;
    }
}