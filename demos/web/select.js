(function(Channel, go, timeout, select) {

    var c1 = new Channel(),
        c2 = new Channel(),
        c3 = new Channel(),
        out = document.getElementById('out'),
        start = Date.now(),
        timetaken;

    go(function* () {
        yield timeout(1000).receive();
        c1.send('process 1');
    });

    go(function* () {
        yield timeout(2000).receive();
        c2.send('process 2');        
    });

    go(function* () {
        yield timeout(1500).receive();
        c3.send('process 3');
    });


    function message(text) {
        var p = document.createElement('p');
        p.innerHTML = text;
        out.appendChild(p);
    }

    await select([ { channel: c1, response: message },
                   { channel: c2, response: message },
                   { channel: c3, response: message } ]);

    timetaken = Date.now() - start;
    message('Time taken: ' + timetaken + 'ms');
    message('Notice that total time taken is under 3s since the processes run in parallel.');


})($async.Channel, $async.go, $async.timeout, $async.select);