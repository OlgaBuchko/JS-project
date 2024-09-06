let postId = +localStorage.getItem('idPost')
let url = new URL(`https://jsonplaceholder.typicode.com/posts/${postId}`)
let postDetail = fetch(url)

  .then((response)=>response.json())
.then((post)=>{
   if (post.id === postId){
       let divPostDetails = document.getElementById('divPostDetails')
       let divInfoPost = document.createElement('div')
       divPostDetails.appendChild(divInfoPost)
       divInfoPost.innerHTML = `<h3>User Id: ${post.userId}</h3>
<h3>Post Id: ${post.id}</h3>
<h3>Title: ${post.title}</h3>
<p>Post: ${post.body}</p>`

       let url2 = new URL (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
       let postComments = fetch(url2)

           .then((response)=>response.json())
           .then((comments)=>{
               let divComments = document.createElement('div')
              let h2Title = document.createElement('h2')
               h2Title.innerText = 'Comments'
               divComments.appendChild(h2Title)
               divPostDetails.appendChild(divComments)
               for (const comment of comments) {
                   let divComment = document.createElement('div')
                   divComment.innerText = `${comment.body}`
                   divComments.appendChild(divComment)
               }
           })
   }
})