---
name: figma-export
description: Export images, assets, and design structure from Figma files using the REST API with a personal access token. Use this skill whenever the user wants to pull images from Figma, export Figma frames/assets to local files, extract design sections from a Figma file, or convert a Figma design into local image files. Also trigger when the user mentions Figma assets, Figma export, downloading Figma images, or wants to use real Figma designs in their code instead of placeholders. Works without any local Figma installation or MCP plugin — only requires a personal access token and a file URL.
---

# Figma Export via REST API

Export frames, images, and design structure from any Figma file using the REST API. No local plugin or MCP server needed — just a personal access token and the file URL.

## What you need from the user

Before starting, you need:

1. **Figma personal access token** — The user generates this from Figma → Settings → Personal access tokens → Generate new token. Tokens start with `figd_`.
2. **Figma file URL** — Any Figma design URL like `https://www.figma.com/design/XXXXX/filename?node-id=...`

If the user only has one of these, ask for the other before proceeding.

## Extract the file key

From any Figma URL, extract the file key. It's the segment after `/design/`:

```
https://www.figma.com/design/MJW84wRtBl2p9fEdrkWrU5/thebedroom.com?node-id=1-3
                           ^^^^^^^^^^^^^^^^^^^^^^^^
                           This is the file key
```

If the URL contains a `node-id` parameter (like `1-3`), note it — it can be used to target a specific frame. Convert dash to colon for API calls (`1-3` → `1:3`).

## Step-by-step workflow

### Step 1: Fetch the file structure

Use the Figma REST API to explore the file tree. Start with a shallow depth and drill down:

```
GET https://api.figma.com/v1/files/{file_key}
Header: X-Figma-Token: {token}
```

Then drill into the tree to find the target canvas/section/frame. The tree structure is:

```
document
  └── children (canvases/pages)
        └── children (frames, sections)
              └── children (layers, groups, images)
```

Use the `depth` query parameter to control how deep to go: `?depth=5` or `?depth=8` for deep exploration.

**PowerShell example:**
```powershell
$token = "figd_xxxxx"
$headers = @{ "X-Figma-Token" = $token }
$response = Invoke-RestMethod -Uri "https://api.figma.com/v1/files/{file_key}?depth=5" -Headers $headers
$canvas = $response.document.children | Where-Object { $_.name -eq "Page Name" }
$canvas.children | ForEach-Object { "$($_.id) | $($_.name) | type: $($_.type)" }
```

**Bash/curl example:**
```bash
curl -H "X-Figma-Token: figd_xxxxx" \
  "https://api.figma.com/v1/files/{file_key}?depth=5"
```

### Step 2: Find the target frames

Walk the tree to find the specific frames or sections you want to export. Present the user with the frame list (id, name, type) so they can confirm which ones to export, or select them based on the user's description (e.g., "export all top-level frames", "export the Homepage frame").

### Step 3: Find image nodes (optional)

If you need to find individual image layers inside frames (hero backgrounds, product photos, etc.), traverse the node tree and look for nodes with `fills` that contain `type: "IMAGE"`:

```powershell
function Find-Images($node) {
    if ($node.fills) {
        foreach ($fill in $node.fills) {
            if ($fill.type -eq "IMAGE") {
                Write-Output "$($node.id) | $($node.name) | $($node.type) | $($node.absoluteBoundingBox.width)x$($node.absoluteBoundingBox.height)"
            }
        }
    }
    if ($node.children) {
        foreach ($child in $node.children) { Find-Images $child }
    }
}
```

This is useful when you want to replace placeholder images in code with the real design assets, rather than exporting entire frame screenshots.

### Step 4: Export images

Use the Figma image export endpoint. You can export any node by its ID:

```
GET https://api.figma.com/v1/images/{file_key}?ids={id1},{id2},{id3}&format=png&scale=2
Header: X-Figma-Token: {token}
```

Parameters:
- `ids` — Comma-separated node IDs (use colons, e.g., `1:3,1:189,1:203`)
- `format` — `png`, `jpg`, `svg`, or `pdf`
- `scale` — `1`, `2`, `3`, or `4` (for retina/high-res exports)

The response contains URLs for each requested node:
```json
{
  "images": {
    "1:3": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/...",
    "1:189": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/..."
  }
}
```

### Step 5: Download the images

Download each image URL to a local directory:

```powershell
$idsParam = "1:3,1:189,1:203"
$imagesResponse = Invoke-RestMethod -Uri "https://api.figma.com/v1/images/{file_key}?ids=$idsParam&format=png&scale=2" -Headers $headers

foreach ($id in $sectionIds) {
    $url = $imagesResponse.images.$id
    if ($url) {
        $outPath = Join-Path $downloadDir "$name.png"
        Invoke-WebRequest -Uri $url -OutFile $outPath
    }
}
```

Always create a local `assets/` directory for the downloads. Name files descriptively based on the frame/node name.

## Export strategies

Choose the right strategy based on what the user needs:

### Strategy A: Section screenshots
Export entire top-level frames/sections as full PNG screenshots. Best when the user wants the complete visual of each design section.

Find the direct children of the target frame (e.g., Nav, Hero, Footer), export each one as a 2x PNG.

### Strategy B: Individual image assets
Drill into the node tree and find specific IMAGE fill nodes. Export those individually. Best when the user wants to replace placeholder images in existing code with real Figma assets.

### Strategy C: Full page export
Export the entire top-level frame as one image. Good for reference screenshots or when the user wants a single overview image.

### Strategy D: SVG icons/components
Export with `format=svg` for icons, logos, and vector components. SVGs are resolution-independent and can be embedded directly in HTML.

## After export

Once images are downloaded:

1. Show the user a summary table of exported files with names and sizes
2. If the user has an existing HTML/code project, offer to update image `src` attributes to point to the local asset files
3. Remove any placeholder URLs (`placehold.co`, etc.) and replace with the real local paths

## API rate limits

The Figma REST API is generous but not unlimited. Batch your image export requests — you can pass multiple IDs in a single `?ids=` parameter instead of making one request per image. This is faster and uses fewer API calls.

## Token security

Never commit Figma tokens to version control. If the user provides a token inline, don't write it to any file that could be committed (no `.env` files in git repos, no config files unless explicitly asked). Use it only in the current session's API calls.
