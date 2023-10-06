document.addEventListener("DOMContentLoaded", function () {
    var formdata = document.getElementById("form_data");
    var form = document.getElementById("form");
    form.addEventListener('click', (e) => {
        e.preventDefault();
        var search = formdata.value;
        var main_content = document.querySelector('.main-content');
        var org = search.split(' ').join('');
        const accessToken = "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";

        fetch("https://api.github.com/users/" + org, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                const joinDate = new Date(data.created_at);
                const today = new Date();
                const yearsOnGitHub = today.getFullYear() - joinDate.getFullYear();

                const card = `
            <div class="card  mb-2 content" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.avatar_url}" class="img-fluid rounded-start" alt="User Avatar">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title text-capitalize fs-2">${data.login}</h5>
                            <br>
                            <div class="card-t">
                                <p class="card-text fs-6"><span class="text-style">Followers:</span> <span class="count-style">${data.followers}</span></p>
                                <p class="card-text fs-6"><span class="text-style">Following:</span> <span class="count-style">${data.following}</span></p>
                                <p class="card-text fs-6"><span class="text-style">Repositories:</span> <span class="count-style">${data.public_repos}</span></p>
                                <p class="card-text fs-6"><span class="text-style">Years on GitHub:</span> <span class="count-style">${yearsOnGitHub}</span></p>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        `; 
      
        main_content.innerHTML = card;
           



                // Fetch repositories after user data is successfully loaded
                fetch(`https://api.github.com/users/${org}/repos?per_page=100`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                    .then(response => response.json())
                    .then(repos => {
                        var repoContainer = document.getElementById('repoContainer');
                        var repoRow = document.getElementById('repoRow');
                        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
                        const top3Repos = repos.slice(0, 3);

                        const top3Container = document.createElement('div');
                        top3Container.classList.add('top-3-container');
                        top3Container.classList.add('fade-in-animation');
                        top3Container.innerHTML = `<h3>Top 3 Repositories</h3>`


                        top3Repos.forEach(repo => {
                            const repoCard = document.createElement('div');
                            repoCard.classList.add('repo-card');
                            repoCard.innerHTML = `
                                <h4><span class="repo-name">${repo.name}</span></h4>
                                <p><span class="repo-desc">${repo.description || 'No description available'}</span></p>
                                <p><span class="text-style">Primary Language:</span> <span class="count-style">${repo.language}</span></p>
                                <p><span class="text-style">Stars:</span> <span class="count-style">${repo.stargazers_count}</span></p>
                            `;

                            top3Container.appendChild(repoCard);
                        });

                        main_content.appendChild(top3Container);

                        repos.forEach(repo => {
                            fetch(`https://api.github.com/repos/${org}/${repo.name}/languages`, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            })
                                .then(response => response.json())
                                .then(languages => {
                                    const primaryLanguage = Object.keys(languages)[0]; // Get the first language
                                    const languageElement = document.createElement('p');
                                    languageElement.classList.add('card-text', 'fs-6');
                                    languageElement.style.marginBottom = '5px';
                                    languageElement.innerHTML = `<span class="text-style">Primary Language:</span> <span class="count-style">${primaryLanguage}</span>`;
                                    repoCol.appendChild(languageElement);
                                })
                                .catch(error => {
                                    console.error('Error fetching primary language:', error);
                                });
                            var repoCol = document.createElement('div');
                            repoCol.classList.add('col');
                            repoCol.classList.add('mb-3');
                            repoCol.innerHTML = repo.name;
                            repoRow.appendChild(repoCol);

                            // Fetch commits for each repository
                            fetch(`https://api.github.com/repos/${org}/${repo.name}/commits`, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            })
                                .then(response => response.json())
                                .then(commits => {
                                    const today = new Date();
                                    const lastYear = new Date(today);
                                    lastYear.setFullYear(lastYear.getFullYear() - 1);

                                    const lastYearCommits = commits.filter(commit => {
                                        const commitDate = new Date(commit.commit.author.date);
                                        return commitDate > lastYear && commitDate <= today;
                                    });

                                    var commitCountElement = document.createElement('p');
                                    commitCountElement.classList.add('card-text', 'fs-6');
                                    commitCountElement.style.marginBottom = '5px';
                                    commitCountElement.innerHTML = `<span class="text-style">Commits (Last Year):</span> <span class="count-style">${lastYearCommits.length}</span>`;
                                    repoCol.appendChild(commitCountElement);
                                })
                                .catch(error => {
                                    console.error('Error fetching commits:', error);
                                });

                            // Fetch pull requests for each repository
                            fetch(`https://api.github.com/repos/${org}/${repo.name}/pulls`, {
                                headers: {
                                    Authorization: `Bearer ${accessToken}`
                                }
                            })
                                .then(response => response.json())
                                .then(pulls => {
                                    var pullCountElement = document.createElement('p');
                                    pullCountElement.classList.add('card-text', 'fs-6');
                                    pullCountElement.style.marginBottom = '5px';
                                    pullCountElement.innerHTML = `<span class="text-style">Pull Requests:</span> <span class="count-style">${pulls.length}</span>`;
                                    repoCol.appendChild(pullCountElement);
                                })
                                .catch(error => {
                                    console.error('Error fetching pull requests:', error);
                                });
                        });

                        repoContainer.style.display = 'block';
                        repoContainer.classList.add('fade-in-animation');

                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            });
    });
});

