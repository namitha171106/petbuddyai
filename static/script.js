let currentPet = "Dog";

function selectPet(pet, element){

    currentPet = pet;

    document.getElementById("pet-name").innerText = pet;

    document.querySelectorAll(".pet").forEach(item => {
        item.classList.remove("active");
    });

    element.classList.add("active");
}

async function sendMessage(){

    let input = document.getElementById("message");

    let message = input.value;

    if(message.trim() === ""){
        return;
    }

    let chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `
        <div class="user-message">
            ${message}
        </div>
    `;

    input.value = "";

    let response = await fetch("/chat", {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:message,
            pet:currentPet
        })

    });

    let data = await response.json();

    chatBox.innerHTML += `
        <div class="bot-message">
            ${data.reply}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}