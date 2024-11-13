// add event listener
document.getElementById("add-comment").addEventListener("click", (e) =>{
    const inputValue = document.getElementById("comment-box").value.trim();  // Trim whitespace

    const container = document.getElementById("comment-data");

    // container.innerHTML = `<p class="mb-3 mx-5"><strong>Comment:</strong> ${inputValue}</p>`;

    const p = document.createElement("p");
    p.classList.add("child")
    p.innerText = inputValue;

    container.appendChild(p);

    document.getElementById("comment-box").value = "";

    const allComments = document.getElementsByClassName("child")

    for(const comment of allComments){
        comment.addEventListener("click", (e) => {
            e.target.parentNode.removeChild(comment)
        })
    }
})

// Api

fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    displayData(data)
}).catch((err) =>{
    console.log(err)
})



const displayData = (userData) =>{
    const container = document.getElementById("user-data")

    userData.forEach(user => {
        const userDiv = `
            <div class="mb-3 p-3 border w-25 text-center">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            </div>
        `;

        // Append each user div
        container.innerHTML += userDiv;
    });

}

// players api
const url = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=133602';

fetch(url)
  .then(response => response.json())
  .then(data => displayPlayers(data));

  const displayPlayers = (playerData) =>{
    console.log(playerData)

    // const container = document.getElementById("player-data")

    // playerData.forEach(player => {
    //     const playerDiv = `
    //         <div class="mb-3 p-3 border w-25 text-center">
    //             <h3>${player.name}</h3>
    //             <p><strong>Email:</strong> ${player.email}</p>
    //             <p><strong>Phone:</strong> ${player.phone}</p>
    //             <p><strong>Address:</strong> ${player.address.street}, ${player.address.city}</p>
    //             <p><strong>Company:</strong> ${player.company.name}</p>
    //         </div>
    //     `;

    //     // Append each player div
    //     container.innerHTML += playerDiv;
    // });

}