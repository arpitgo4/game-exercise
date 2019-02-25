

const api = (function() {
    const API_SERVER = 'http://localhost/api/v1';

    const API_TABLE = {
        LOGIN: { url: '/auth/token', type: 'POST' },
        GET_USER: { url: '/user', type: 'GET' },
        POST_USER: { url: '/user', type: 'POST' },
        START_GAME: { url: '/game', type: 'POST' },
        END_GAME: { url: '/game', type: 'PUT' },
    };

    function fetch_inteceptor(resJson) {
        if (resJson.meta && resJson.meta.token)
            localstorageUtils.putValue('auth-token', resJson.meta.token);
    
        return resJson;
    }

    const login = function(username, password) {
        const body = JSON.stringify({
            data: {
                attributes: {
                    username,
                    password
                }
            }
        });
        const api = API_TABLE.LOGIN;

        return fetch(API_SERVER + api.url, { 
            method: api.type,
            headers: { 'Content-Type': 'application/json' },
            body
        })
        .then(res => res.json())
        .then(resJson => {
            if (resJson.errors)
                return Promise.reject(resJson.errors[0].message);
            return resJson.meta.token;
        })
        .catch(alert);
    }

    const getUser = function () {
        const api = API_TABLE.GET_USER;

        return fetch(API_SERVER + api.url, { 
            method: api.type,
            headers: { 
                'Content-Type': 'application/json',
                'x-token': localstorageUtils.getValue('auth-token') 
            },
        })
        .then(res => res.json())
        .then(fetch_inteceptor)
        .then(resJson => {
            if (resJson.errors)
                return Promise.reject(resJson.errors[0].message);
            return resJson.data.attributes;
        })
        .catch(alert);
    }

    const startGame = function () {
        const api = API_TABLE.START_GAME;

        return fetch(API_SERVER + api.url, { 
            method: api.type,
            headers: { 
                'Content-Type': 'application/json',
                'x-token': localstorageUtils.getValue('auth-token') 
            },
        })
        .then(res => res.json())
        .then(fetch_inteceptor)
        .then(resJson => {
            if (resJson.errors)
                return Promise.reject(resJson.errors[0].message);
            return resJson.data.attributes;
        })
        .catch(alert);
    }

    const endGame = function (game_id, score) {
        const api = API_TABLE.END_GAME;

        const body = JSON.stringify({
            data: {
                attributes: {
                    game_id,
                    score,
                }
            },
        });

        return fetch(API_SERVER + api.url, { 
            method: api.type,
            headers: { 
                'Content-Type': 'application/json',
                'x-token': localstorageUtils.getValue('auth-token')
            },
            body: body
        })
        .then(res => res.json())
        .then(fetch_inteceptor)
        .then(resJson => {
            if (resJson.errors)
                return Promise.reject(resJson.errors[0].message);
            return resJson.data.attributes;
        })
        .catch(alert);
    }


    return {
        login: login,
        getUser: getUser,
        startGame: startGame,
        endGame: endGame
    };

})();


// localstorage utils module
const localstorageUtils = (function() {
    function getValue(key) {
      const item = localStorage.getItem(key);
      if (!item || item === 'undefined')
          return undefined;

      return JSON.parse(localStorage.getItem(key));
    }
  
    function putValue(key, item) {
      return localStorage.setItem(key, JSON.stringify(item));
    }
  
    function removeValue(key) {
      return localStorage.removeItem(key);
    }
  
    return {
      getValue: getValue,
      putValue: putValue,
      removeValue: removeValue,
    };
})();