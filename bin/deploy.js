#!/usr/bin/env node

// Proof of concept code!

var fs = require('fs');

'use strict';

var realKeyMap = {
    // ! -> invert, = -> don't invert
//  "aaaa-additional-processing":          "=aaaa-additional-processing",
    "enable-aaaa-additional-processing":   "=aaaa-additional-processing",
    "do-aaaa-additional-processing":       "=aaaa-additional-processing",
    "no-aaaa-additional-processing":       "!aaaa-additional-processing",
    "disable-aaaa-additional-processing":  "!aaaa-additional-processing",
    "dont-aaaa-additional-processing":     "!aaaa-additional-processing",
    
//  "additional-processing":               "=additional-processing",
    "enable-additional-processing":        "=additional-processing",
    "do-additional-processing":            "=additional-processing",
    "no-additional-processing":            "!additional-processing",
    "disable-additional-processing":       "!additional-processing",
    "dont-additional-processing":          "!additional-processing",
    
//  "export-etc-hosts":                    "=export-etc-hosts",
    "enable-export-etc-hosts":             "=export-etc-hosts",
    "do-export-etc-hosts":                 "=export-etc-hosts",
    "no-export-etc-hosts":                 "!export-etc-hosts",
    "disable-export-etc-hosts":            "!export-etc-hosts",
    "dont-export-etc-hosts":               "!export-etc-hosts",
    
    "shuffle":                             "!no-shuffle",
    "enable-shuffle":                      "!no-shuffle",
    "do-shuffle":                          "!no-shuffle",
//  "no-shuffle":                          "=no-shuffle",
    "disabe-shuffle":                      "=no-shuffle",
    "dont-shuffle":                        "=no-shuffle",
    
//  "single-socket":                       "=single-socket",
    "enable-single-socket":                "=single-socket",
    "do-single-socket":                    "=single-socket",
    "no-single-socket":                    "!single-socket",
    "disable-single-socket":               "!single-socket",
    "dont-single-socket":                  "!single-socket",
    "multi-socket":                        "!single-socket",
    "enable-multi-socket":                 "!single-socket",
    "do-multi-socket":                     "!single-socket",
    "no-multi-socket":                     "=single-socket",
    "disable-multi-socket":                "=single-socket",
    "dont-multi-socket":                   "=single-socket",
    "multiple-socket":                     "!single-socket",
    "enable-multiple-socket":              "!single-socket",
    "do-multiple-socket":                  "!single-socket",
    "no-multiple-socket":                  "=single-socket",
    "disable-multiple-socket":             "=single-socket",
    "dont-multiple-socket":                "=single-socket",
    "multi-sockets":                       "!single-socket",
    "enable-multi-sockets":                "!single-socket",
    "do-multi-sockets":                    "!single-socket",
    "no-multi-sockets":                    "=single-socket",
    "disable-multi-sockets":               "=single-socket",
    "dont-multi-sockets":                  "=single-socket",
    "multiple-sockets":                    "!single-socket",
    "enable-multiple-sockets":             "!single-socket",
    "do-multiple-sockets":                 "!single-socket",
    "no-multiple-sockets":                 "=single-socket",
    "disable-multiple-sockets":            "=single-socket",
    "dont-multiple-sockets":               "=single-socket",
    
//  "trace":                               "=trace",
    "enable-trace":                        "=trace",
    "do-trace":                            "=trace",
    "no-trace":                            "!trace",
    "disable-trace":                       "!trace",
    "dont-trace":                          "!trace",
    
//  "any-to-tcp":                          "=any-to-tcp",
    "enable-any-to-tcp":                   "=any-to-tcp",
    "do-any-to-tcp":                       "=any-to-tcp",
    "no-any-to-tcp":                       "!any-to-tcp",
    "disable-any-to-tcp":                  "!any-to-tcp",
    "dont-any-to-tcp":                     "!any-to-tcp",
    
//  "daemon":                              "=daemon",
    "enable-daemon":                       "=daemon",
    "do-daemon":                           "=daemon",
    "no-daemon":                           "!daemon",
    "disable-daemon":                      "!daemon",
    "dont-daemon":                         "!daemon",
    "daemonize":                           "=daemon",
    "enable-daemonize":                    "=daemon",
    "do-daemonize":                        "=daemon",
    "no-daemonize":                        "!daemon",
    "disable-daemonize":                   "!daemon",
    "dont-daemonize":                      "!daemon",
    
    "edns-ping":                           "!disable-edns-ping",
    "enable-edns-ping":                    "!disable-edns-ping",
    "do-edns-ping":                        "!disable-edns-ping",
    "no-edns-ping":                        "=disable-edns-ping",
//  "disable-edns-ping":                   "=disable-edns-ping",
    "dont-edns-ping":                      "=disable-edns-ping",
    
    "edns":                                "!disable-edns",
    "enable-edns":                         "!disable-edns",
    "do-edns":                             "!disable-edns",
    "no-edns":                             "=disable-edns",
//  "disable-edns":                        "=disable-edns",
    "dont-edns":                           "=disable-edns",
    
    "packetcache":                         "!disable-packetcache",
    "enable-packetcache":                  "!disable-packetcache",
    "do-packetcache":                      "!disable-packetcache",
    "no-packetcache":                      "=disable-packetcache",
//  "disable-packetcache":                 "=disable-packetcache",
    "dont-packetcache":                    "=disable-packetcache",
    
//  "experimental-json-interface":         "=experimental-json-interface",
    "enable-experimental-json-interface":  "=experimental-json-interface",
    "do-experimental-json-interface":      "=experimental-json-interface",
    "no-experimental-json-interface":      "!experimental-json-interface",
    "disable-experimental-json-interface": "!experimental-json-interface",
    "dont-experimental-json-interface":    "!experimental-json-interface",
    "json-interface":                      "=experimental-json-interface",
    "enable-json-interface":               "=experimental-json-interface",
    "do-json-interface":                   "=experimental-json-interface",
    "no-json-interface":                   "!experimental-json-interface",
    "disable-json-interface":              "!experimental-json-interface",
    "dont-json-interface":                 "!experimental-json-interface",
    
//  "log-common-errors":                   "=log-common-errors",
    "enable-log-common-errors":            "=log-common-errors",
    "do-log-common-errors":                "=log-common-errors",
    "no-log-common-errors":                "!log-common-errors",
    "disable-log-common-errors":           "!log-common-errors",
    "dont-log-common-errors":              "!log-common-errors",
    
//  "pdns-distributes-queries":            "=pdns-distributes-queries",
    "enable-pdns-distributes-queries":     "=pdns-distributes-queries",
    "do-pdns-distributes-queries":         "=pdns-distributes-queries",
    "no-pdns-distributes-queries":         "!pdns-distributes-queries",
    "disable-pdns-distributes-queries":    "!pdns-distributes-queries",
    "dont-pdns-distributes-queries":       "!pdns-distributes-queries",
    
//  "serve-rfc1918":                       "=serve-rfc1918",
    "enable-serve-rfc1918":                "=serve-rfc1918",
    "do-serve-rfc1918":                    "=serve-rfc1918",
    "no-serve-rfc1918":                    "!serve-rfc1918",
    "disable-serve-rfc1918":               "!serve-rfc1918",
    "dont-serve-rfc1918":                  "!serve-rfc1918",
    
//  "quiet":                               "=quiet",
    "enable-quiet":                        "=quiet",
    "do-quiet":                            "=quiet",
    "no-quiet":                            "!quiet",
    "disable-quiet":                       "!quiet",
    "dont-quiet":                          "!quiet",
    
    "bequiet":                             "=quiet",
    "enable-bequiet":                      "=quiet",
    "do-bequiet":                          "=quiet",
    "no-bequiet":                          "!quiet",
    "disable-bequiet":                     "!quiet",
    "dont-bequiet":                        "!quiet",
    
    "be-quiet":                            "=quiet",
    "enable-be-quiet":                     "=quiet",
    "do-be-quiet":                         "=quiet",
    "no-be-quiet":                         "!quiet",
    "disable-be-quiet":                    "!quiet",
    "dont-be-quiet":                       "!quiet",
};

Object.prototype.toConfigFile = function () {
    var me = this;
    var result = [];
    Object.keys(me).forEach(function (key) {
        if (key === 'host') {
            return;
        }
        result.push(key + '=' + me[key]);
    });
    return result.join('\n');
};

var toRealKey = function (key, value) {
    var map = realKeyMap[key];
    if (typeof map === 'undefined') {
        if (typeof value === 'boolean') {
            return {
                'key': key,
                'value': value ? 'on' : 'off'
            };
        }
        if (value === '*') {
            if (key === 'allow-from') {
                value = ['0.0.0.0/0', '::/0'];
            } else if (key === 'local-address') {
                value = ['0.0.0.0', '::'];
            }
        }
        if (typeof value === 'object' && value instanceof Array) {
            value = value.join(',');
        }
        if (typeof value === 'string' || typeof value === 'number') {
            return {
                'key': key,
                'value': value
            };
        }
        throw new Error('Unknown error in map-type ' + key + ' with value ' + value + '.\nPlease report this issue!')
    }
    var mapTo = map.substr(1);
    var mapType = map.substr(0, 1);
    if (mapType === '=') {
        return toReaKey(mapTo, value);
    }
    if (mapType === '!') {
        return toRealKey(mapTo, !value);
    }
    throw new Error('Unknown error in map-type ' + key + ' with value ' + value + '.\nPlease report this issue!');
};

Object.prototype.parseConfig = function () {
    var config = {};
    var me = this;
    Object.keys(me).forEach(function (key) {
        var keyValuePair = toRealKey(key, me[key]);
        if (me[key] === null) {
            keyValuePair['value'] = undefined;
        }
        config[keyValuePair['key']] = keyValuePair['value'];
    });
    return config;
};

var init = function (config) {
    //var hostconfigs = {};
    var globalconfig = config.global.parseConfig();
    config.servers.forEach(function (server) {
        if (typeof server.host === 'undefined') {
            console.log('No hostname for server ' + (server + 1) + ' given. Adding "server' + (server + 1) + '" as hostname (host key).')
            server.host = 'server' + (server + 1);
        }
        var hostname = server.host;
        delete server.host;
        var hostconfig = globalconfig;
        var hostlocalconfig = server.parseConfig();
        Object.keys(hostlocalconfig).forEach(function (hostlocalconfig_key) {
            hostconfig[hostlocalconfig_key] = hostlocalconfig[hostlocalconfig_key];
            if (typeof hostlocalconfig[hostlocalconfig_key] === 'undefined') {
                delete hostconfig[hostlocalconfig_key];
            }
        });
        fs.writeFile(hostname + '.conf', hostconfig.toConfigFile(), function (e) {
            if(e) {
                console.log(e);
                return;
            }
            console.log('Host config for ' + hostname + ' written to file ' + hostname + '.conf');
            console.log(';; hostname: ' + hostname + '; filename: ' + hostname + '.conf');
        });
        //hostconfigs[hostname] = hostconfig.toConfigFile();
        //console.log(hostconfigs[hostname]);
    });
    //console.log(hostconfigs);
};

var stdin = '';
process.stdin.on('data', function (chunk) {
	stdin += chunk;
});
process.stdin.on('close', function () {
	init(JSON.parse(stdin));
});