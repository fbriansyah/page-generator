# Page Ganerator

Aplikasi untuk membuat page dan menggenerate json code.

## Form Setting
Json Setting untuk Form

### Group
```json
{
  "kind": "g",
  "type": "double|triple",
  "child": []
}
```

### Text Input
```json
{
	"kind": "ti",
	"name": "",
	"placeholder": "",
	"label": "",
	"type": "text|password|email|number"
}
```

### Text Area
```json
{
	"kind": "ta",
	"name": "",
	"placeholder": "",
	"label": ""
}
```

### Select Option
```json
{
	"kind": "so",
	"name": "",
	"label": "",
  "options": [
		{"text": "", "value": ""}
	]
}
```


# Resource
base: https://example.com/api/

link: $base/endpoint
variasi:
	- $base/endpoint ([GET] all)
	- $base/endpoint?export=csv ([GET] export as csv)
	- $base/endpoint/$id ([GET] get one)
	- $base/endpoint/$id/add ([POST] insert new data)
	- $base/endpoint/$id/update ([POST] update data)
	- $base/endpoint/$id ([DELETE] delete data)

# Page
```json
{
	"id":"p-halaman-user",
	"title": "Halaman User",
	"deskripsi": "Data user",
	"end": "user",
	"filter": [],
	"table": {
		"header": [{"text": "Nama", "type": "b"}, {"text": "Alamat", "type": "-"}, {"text": "Umur", "type": "n"}],
		"action": ["edit", "delete", "check", "csv"]
	},
	"form-editor": [
		{
			"id": "section-1",
			"title": "",
			"description": "",
			"fields": []
		}
	]
}
```

## Header Setting
Type:
- -: Normal
- n: Number
- b: Bold
- a: Action