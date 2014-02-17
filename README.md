pdns_rec_deploy
===============

### What?
pdns_rec_deploy is a simple PowerDNS Recursor configuration generator, which reads data from a JSON file. The generated configuration files can be used later to quickly deploy a configuration on many PowerDNS Recursors which share most of the initial configuration.

### Why?
I'm currently managing a couple of DNS recursors out there which run PowerDNS Recursor as DNS solution. But - as hard as I tried - I couldn't found a solution to simplify the configuration and the deployment of the confiuration for these servers and so I wrote it myself in Node.js.

### How?
You can easily clone this repository (```git clone https://github.com/Fusl/pdns_rec_deploy```) and change the configuration parameters to your needs. To automatically and instantly deploy the generated configuration file(s) I always used this simple bash-script:
```
node bin/deploy.js < configs/deploy.json | grep ';;' | while read line
do               
hostname=$(echo $line | awk -F'hostname: ' '{print $2}' | awk -F';' '{print $1}')
filename=$(echo $line | awk -F'filename: ' '{print $2}')
cat $filename | ssh root@$hostname 'cat > /etc/powerdns/recursor.conf && /etc/init.d/pdns-recursor restart'
done
```
So as you can see, you need to pipe the JSON file into the deploy.js script which then saves the configuration into different files named after the hostname given and .conf behind.

### deploy.json format
The deploy.json configuration file holds two basic objects, the "global" object and the "servers" array. 
The "global" object holds ```"key": "value"``` pairs which then will be passed to the output configuration file. All the keys have to be named after their real name in PowerDNS Recursor. The only difference is at the value: It can hold an array or an object, where a simple like ```{"org": "127.0.0.1", "net": "127.0.0.2"}``` will be rewritten as "org=127.0.0.1,net=127.0.0.2". A more complex object, which holds an array in it, like ```{"org": ["127.0.0.1", "127.0.0.2"], "net": "127.0.0.3"}``` will be rewritten as "org=127.0.0.1;127.0.0.2,net=127.0.0.3". A simple array like ```["0.0.0.0", "::"]``` will be rewritten as "0.0.0.0,::". It's just as simple as omitting the object/array and just writing the plain text as value pair.
The "servers" array holds all the server objects. The format is the same as in the "global" object, but with the difference that it overrides all the values in the "global" object. If the value is ```null```, it will be removed if it exists and not being added if it doesn't.
The on/off/yes/no switch can be used by defining ```true``` or ```false``` (without the "" in the examples above) in the configuration file.

### Aliases
The parser understands quite a few aliases defined in the [core](https://github.com/Fusl/pdns_rec_deploy/blob/master/bin/deploy.js#L9). Some of them are completely different from the PowerDNS Recursor as they're being inverted. A normal 1:1 rewriting for example is ```"do-aaaa-additional-processing": true``` which whill end up as ```"aaaa-additional-processing": true` and then (in the configuration file) as ```aaaa-additional-processing=on```. But a ```"no-export-etc-hosts": true``` will end up as ```"export-etc-hosts": false``` and then as ```export-etc-hosts=off```.

### Bugs?
If I find bugs, i'm gonna fix them. But i don't always find bugs and therefor need your help! So, if you find any type of bug (screwed up configuration file, weird behaviour, etc.), please open open a new issue ticket!
