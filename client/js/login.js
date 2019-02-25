

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    api.login(username, password)
    .then(token => {
        if (!token)
            return;

        localstorageUtils.putValue('auth-token', token);
        window.location = '/game.html';
    });
}

function main() {
    const auth_token = localstorageUtils.getValue('auth-token');

    if (auth_token)
        window.location = '/game.html'; 
}


main();