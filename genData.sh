#!/bin/bash
mypath=('/' '/image' '/error' '/event')
mydevice=('iPhone' 'Nexus 5' 'Nexus 6' 'iPad')
mybrowser=('Chrome' 'Safari' 'Other')
for value in {1..1000}
do
	curl -H "Content-Type: application/json" -X POST --data '{"sessionId": "fdsf", "column": 12, "line": 423, "message": "fsdfsdf", "path": "'${mypath[((RANDOM % 3))]}'", "timestamp": 1552696398490}' http://157.230.186.137:8089/api/error
	curl -H "Content-Type: application/json" -X POST --data '{"sessionId": "fdsf", "absoscreenHeight": 12, "absoscreenWidth": 423, "availscreenHeight": 12, "availscreenWidth": 423, "lang": "fsdfsdf", "path": "'${mypath[((RANDOM %  3))]}'", "timestamp": 1552696398490, "pixelDepth": 10, "userAgent": "faffsdf", "os": "other", "device": "'${mydevice[((RANDOM % 3))]}'", "browser": "'${mybrowser[((RANDOM % 2))]}'", "loadTime": 200}' http://157.230.186.137:8089/api/log
done
echo All done
