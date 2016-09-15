const api = {
  reckoBaseUrl: 'http://recko.me/',
  getNext(token) {
    var url = `http://localhost:5000/next?token=${token}`;
    return fetch(url).then((res) => res.json())
  },
  likeUrl(urlLike, token){
    var url = `http://localhost:5000/like?token=${token}`;
    body = {"url": urlLike}
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then((res) => res.json());
  },


  authenticate(){
    return fetch('http://localhost:5000/authenticate', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({})
      }).then((res) => res.json());
  }
};

export default api;
