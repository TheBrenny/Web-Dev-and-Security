# Lab 2
> *ZEIT3119 Web Dev and Security -- z5217759 Jarod Brennfleck*

This was built using [NodeJS](https://nodejs.dev/) (a JS runtime framework), [Express](https://www.npmjs.com/package/express) (an easy to use web server package), and [scetch](https://www.npmjs.com/package/scetch) (a templating engine I wrote).

To run server, execute `npm install && npm start`. You'll need NodeJS for this. Otherwise you can use Docker by executing:

```cmd
docker build -t z5217759_lab2
docker run -p 80:80 z5217759_lab2
```

and then going to http://localhost:80 to see the server.