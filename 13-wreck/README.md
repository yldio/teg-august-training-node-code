## Exercise 13

# Wreck client

* Create a module named `post.js` that exports a function that
* makes HTTP POST requests
* to `http://127.0.0.1:3456/path`
* body is an object
* calls back with error if status code not 2xx
* otherwise, calls back with response body

Test it starting the server:

```
$ node server
```

While that is running, start the main script:

```
$ node main
```
