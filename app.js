$(document).ready(function(){
    $('#searchuser').on('keyup',function(e){
      let username =  e.target.value;

      //make our ajax request
      $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
            client_id:'dc3e0234ae7f5de5c5b3',
            client_secret:'03e33ce289daad37bb4cc408d2068818ab97ac5d',
        }
      }).done(function(user){
          $.ajax({
            url:'https://api.github.com/users/'+username+'/repos',
            data:{
                client_id:'dc3e0234ae7f5de5c5b3',
                client_secret:'03e33ce289daad37bb4cc408d2068818ab97ac5d',
               sort: 'created: asc',
                per_page: 4  
            }
             
          }).done(function(repos){
            $.each(repos,function(index, repo){
                $('#repos').append(`
                <div class="jumbotron">
                
                <strong>${repo.name}</strong>:${repo.description}
                <div class="float-right">
                <span class="btn btn-success label label-primary">Forks: ${repo.forks_count}</span>
                <span class="btn btn-danger label label-info">Watchers: ${repo.watchers_count}</span>
                <span class="btn btn-warning label label-info">stars: ${repo.stargazers_count}</span>
                <a href="${repo.html_url}" target="_blank" class="btn btn-dark btn-lg" type="button">Repo page</a>
                </div>
                </div>
                `)
               
            });
          });
        $('#profile').html(`
        <div class="card" style="width: auto;">
        <img class="card-img-top" src="${user.avatar_url}">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.bio}</p>
        </div>
          <div class="d-flex">
          <a target="_blank" class="btn btn-info ml-2" href="${user.html_url}" class="card-link">View Profile</a>
          
        </div>
          
        </div>
        `);
        $('#others').html(`
        <span class="btn btn-danger label label-default">Public Repos: ${user.public_repos}</span>
        <span class="btn btn-success label label-primary">Public Gists: ${user.public_gists}</span>
        <span class="btn btn-danger label label-success">Following: ${user.following}</span>
        <span class="btn btn-warning label label-info">Followers: ${user.followers}</span>
        <div class="list-group mt-5">
        <ul>
         <li class="list-group-item">Company:${user.company}</li>
         <li class="list-group-item">Website:${user.blog}</li>
         <li class="list-group-item">email:${user.email}</li>
         <li class="list-group-item">Location:${user.location}</li>

        </ul>
        </div>
        `);
      });
    });
});