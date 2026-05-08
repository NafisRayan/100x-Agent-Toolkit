# Figma REST API Endpoints

## Base URL
`https://api.figma.com/v1`

## Authentication
All requests require header: `X-Figma-Token: {personal_access_token}`

## Endpoints

### Get file
```
GET /files/{file_key}
Query params: ?depth=N (optional, controls tree depth)
```
Returns the full document tree. Use `depth` to limit response size.

### Get file nodes
```
GET /files/{file_key}/nodes?ids={id1},{id2}
```
Returns specific nodes and their children. More efficient than fetching the whole file when you know which nodes you want.

### Export images
```
GET /images/{file_key}?ids={id1},{id2}&format=png&scale=2
```
Returns temporary S3 URLs for exported images. URLs expire after ~30 minutes.

**Parameters:**
- `ids` (required) — Comma-separated node IDs
- `format` — `png` (default), `jpg`, `svg`, `pdf`
- `scale` — `1` (default), `2`, `3`, `4`
- `svg_include_id_attr` — For SVG export, includes node IDs
- `svg_simplify_stroke` — For SVG export, simplifies strokes

### Get image fills
```
GET /files/{file_key}/images
```
Returns a mapping of image fill IDs to URLs. Useful for downloading embedded images.

## Node ID format
Figma node IDs use colons in the API: `1:3`, `1:189`, `1:203`
URLs use dashes: `?node-id=1-3`
Always convert dashes to colons for API calls.

## Response structures

### File response (simplified)
```json
{
  "name": "Filename",
  "document": {
    "children": [
      {
        "id": "0:1",
        "name": "Page 1",
        "type": "CANVAS",
        "children": [
          {
            "id": "1:3",
            "name": "Homepage",
            "type": "FRAME",
            "absoluteBoundingBox": { "width": 1920, "height": 5000 }
          }
        ]
      }
    ]
  }
}
```

### Image export response
```json
{
  "err": null,
  "images": {
    "1:3": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...",
    "1:189": null
  }
}
```
A `null` value means the node couldn't be exported (e.g., empty frame).

## Node types
| Type | Description |
|------|-------------|
| CANVAS | Top-level page |
| FRAME | Design frame (artboard) |
| SECTION | Grouped section |
| GROUP | Layer group |
| RECTANGLE | Shape layer |
| TEXT | Text layer |
| IMAGE | Image fill (found inside fills array) |
| COMPONENT | Reusable component |
| INSTANCE | Component instance |
