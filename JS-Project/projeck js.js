// В index.html
// 1 отримати масив об'єктів з endpoint`а
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
let url =new URL ('https://jsonplaceholder.typicode.com/users')
let objArr = fetch(url)
    .then((response)=>response.json())
    .then((users) => {
        for (const user of users) {
            let div =    document.getElementById('usersAll');
            let h2 = document.createElement('h2')
            h2.innerText = `${user.id}: ${user.name}`;
            div?.appendChild(h2) ;

            let userButton = document.createElement('button');
            div?.appendChild(userButton)
            userButton.innerHTML  =`<a href="user-details.html">Details</a>`
            userButton.onclick = function () {

                localStorage.setItem(`id`,`${user.id}`)
            }




            // На странице user-details.html:
            // 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
            // 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
            // (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
            //     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
            //     котра має детальну інфу про поточний пост.
//

        }
        let userDet = document.getElementById('user')

        let userID = +localStorage.getItem('id')
        for (const user of users){

            if (user.id===userID){
                let  detailUserDiv = document.createElement('div');
                detailUserDiv.classList.add('detailUserDiv')

                detailUserDiv.innerHTML=`<ul>
 <li>id: ${user.id}</li>
 <li>name: ${user.name}</li>
 <li> username: ${user.username}</li>
 <li>email:${user.email}</li>
<button id=activeAdress> address </button>
<button id=userPosts> post of current user </button></ul>
<div class="d-none" id="divPosts"><ul id="ulPost"></ul></div>
`
                userDet?.appendChild(detailUserDiv)




                let divAdressDetails = document.createElement('div')
                divAdressDetails.classList.add('d-none')
                userDet?.appendChild(divAdressDetails)
                divAdressDetails.innerHTML=`<ul>
<li>street: ${user.address.street} </li>
<li>suite: ${user.address.suite}</li>
<li>city: ${user.address.city}</li>
<li>zipcode: ${user.address.zipcode}</li>
<button> <a id=activeGeo>geo</a></button></ul>
</ul>`

                let buttonActiveAdress = document.getElementById('activeAdress')
                buttonActiveAdress.onclick=function () {
                    divAdressDetails.classList.toggle('d-block')
                    divAdressDetails.classList.toggle('d-none') }

                    let buttonActiveGeo = document.getElementById('activeGeo')
                    let divGeoDetails = document.createElement('div')
                    divGeoDetails.classList.add('d-none')
                    userDet.appendChild(divGeoDetails)
                    divGeoDetails.innerHTML = `<ul>
<li>lat: ${user.address.geo.lat}</li>
<li>lng: ${user.address.geo.lng}</li>
</ul>`

                    buttonActiveGeo.onclick = function () {
                        divGeoDetails.classList.toggle('d-block')
                        divGeoDetails.classList.toggle('d-none')


                   }

                let url = new URL(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                let postsArr = fetch(url)
                    .then((response) => response.json())
                    .then((posts) => {
                        for (const postElement of posts) {
                            let liPost = document.createElement('li')
                            let ulPost =document.getElementById('ulPost')
                            ulPost?.appendChild(liPost)
                            liPost.innerHTML= `${postElement.title}`

                            let postButtonDetail = document.createElement('button');
                            liPost?.appendChild(postButtonDetail)
                            postButtonDetail.innerHTML  =`<a href="user-post.html">Details</a>`
                            postButtonDetail.onclick = function () {

                                localStorage.setItem(`idPost`, `${postElement.id}`)
                                console.log(postElement.id)




                            }

                            let buttonPosts = document.getElementById('userPosts')
                            buttonPosts.onclick = function () {
                                divPosts =  document.getElementById('divPosts')
                                divPosts.classList.toggle('d-block')
                                divPosts.classList.toggle('d-none')
                            }





                        }
                    })
            }
        }
        })



