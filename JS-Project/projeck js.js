let url =new URL ('https://jsonplaceholder.typicode.com/users')
let objArr = fetch(url)
    .then((response)=>response.json())
    .then((users) => {

        for (const user of users) {
            let divList =    document.getElementById('usersAll');
            let div = document.createElement('div')
            div.classList.add('user')
            divList?.appendChild(div)
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

                let divUserPosts = document.createElement('div')

divUserPosts.setAttribute('id','divPostsUl' )
                ulUserPosts=document.createElement('ul')
                divUserPosts.classList.add('d-none')
                ulUserPosts.setAttribute('id', 'ulPosts')
                divUserPosts.appendChild(ulUserPosts)
                userDet?.append(userPosts, divUserPosts)

     userPosts.onclick = function () {
                                ulPosts =  document.getElementById('divPostsUl')
                                ulPosts.classList.toggle('d-block')
                                ulPosts.classList.toggle('d-none')
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
                                        let divUlComments = document.createElement('div')
                                        divComments?.append(h2Title, divUlComments)

                                        divPostDetails?.appendChild(divComments)

                                        for (const comment of comments) {
                                            // let ulComment = document.createElement('ul')
                                            // divComments?.appendChild(ulComment)

                                            iterObj(comment,divUlComments)
                                        }
                                    })

                            }

                        }
                    })
            }
        }
        })
