# Library - Initialization

Simple class for works with data from configuration files. Comes from the filename extension `INI`, for initialization, used in the MS-DOS operating system which popularized this method of software configuration.

The constructor accepts the following parameters.
| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| spaceBetweenGroups | bool | true | Add space between groups |
| spaceBetweenKeyValue | bool |  true | Add space between key and value |
| removeCommentFromValue | bool |  true | Remove comment from value |

### From configuration data to object data

```javascript
const INI = new InitializationLibrary();
let iniObject = INI.getObject(inputContent);
```

Input

```ini
; last modified 1 April 2001 by John Doe
[owner]
name = John Doe ; Value comment #1
organization = Acme Widgets Inc. #  Value comment #2

# Unix-style comment
[database]
; use IP address in case network name resolution is not working
server = 192.0.2.62
port = 143
file = "payroll.dat"
```

Output

```json
{
	"owner": {
		"name": "John Doe",
		"organization": "Acme Widgets Inc."
	},
	"database": {
		"server": "192.0.2.62",
		"port": "143",
		"file": "\"payroll.dat\""
	}
}
```

### From object data to configuration data

```javascript
const INI = new InitializationLibrary();
let iniData = INI.getFileContent(iniObject);
```

Input

```json
{
	"owner": {
		"name": "John Doe",
		"organization": "Acme Widgets Inc."
	},
	"database": {
		"server": "192.0.2.62",
		"port": "143",
		"file": "payroll.dat"
	}
}
```

Output

```ini
[owner]
name = John Doe
organization = Acme Widgets Inc.

[database]
server = 192.0.2.62
port = 143
file = "payroll.dat"
```

### Extended capabilities

You can add an array to a group and get the result, the keys will be indexes.

Input

```json
{
	"logs": [
		"Connecting...",
		"Working...",
		"Closing..."
	]
}
```

Output

```ini
[logs]
0 = Connecting...
1 = Working...
2 = Closing...
```
