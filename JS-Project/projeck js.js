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
            userButton.textContent = 'Details'
            div?.appendChild(userButton)

            userButton.onclick = function () {
                location.href = "user-details.html"
                localStorage.setItem(`id`,`${user.id}`)
            }
        }
        let userDet = document.getElementById('user')
 let userID = +localStorage.getItem('id')

        for (const user of users){
            if (user.id===userID){

                function iterObj(obj, div) {
                    let ul = document.createElement('ul')
                    div?.appendChild(ul)
                    for (const objKey in obj) {
                        if (typeof obj[objKey] === 'object'){
                            iterObj(obj[objKey],div)
                    }else{
                            let li = document.createElement('li')
                            li.innerText = `${objKey}: ${obj[objKey]}`
                            ul.appendChild(li)

                        }
                    }
                }
                iterObj(user,userDet)

let userPosts = document.createElement('button')
userPosts.innerText = 'post of current user'

                let ulUserPosts = document.createElement('ul')
                ulUserPosts.classList.add('d-none')
ulUserPosts.setAttribute('id','ulPosts' )
                userDet?.append(userPosts, ulUserPosts)

     userPosts.onclick = function () {
                                ulUserPosts =  document.getElementById('ulPosts')
                                ulUserPosts.classList.toggle('d-block')
                                ulUserPosts.classList.toggle('d-none')
                            }

                let url = new URL(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                let postsArr = fetch(url)
                    .then((response) => response.json())
                    .then((posts) => {
                        for (const postElement of posts) {
                            let liPost = document.createElement('li')
                            let ulPost =document.getElementById('ulPosts')
                            ulPost?.appendChild(liPost)
                            liPost.innerHTML= `${postElement.title}`

                            let postButtonDetail = document.createElement('button');
                            liPost?.appendChild(postButtonDetail)
                            postButtonDetail.innerHTML  =`<a href="user-post.html">Details</a>`
                            postButtonDetail.onclick = function () {
               localStorage.setItem(`idPost`, `${postElement.id}`)}

                            let postId=+localStorage.getItem('idPost')

                            if (postElement.id === postId){


                let divPostDetails = document.getElementById('divPostDetails')

                                iterObj(postElement, divPostDetails)

                                let url2 = new URL (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                                let postComments = fetch(url2)

                                    .then((response)=>response.json())
                                    .then((comments)=>{
                                        let divComments = document.createElement('div')
                                        let h2Title = document.createElement('h2')
                                        h2Title.innerText = 'Comments'
                                        divComments?.appendChild(h2Title)
                                        divPostDetails?.appendChild(divComments)
                                        for (const comment of comments) {
                                            let ulComment = document.createElement('ul')
                                            divComments?.appendChild(ulComment)

                                            iterObj(comment,divComments)
                                        }
                                    })

                            }

                        }
                    })
            }
        }
        })
