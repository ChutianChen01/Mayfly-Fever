---
title: Darkroom
blurb: A small batch processor for scanned film negatives — inversion, dust removal, and consistent colour across a roll.
date: 2024-03-15
status: Prototype
tech:
  - Python
  - NumPy
  - OpenCV
cover: ""
repo: ""
demo: ""
featured: false
order: 10
draft: false
---

Scanning colour negatives produces images that need inverting, and doing that
by hand for 36 frames means 36 slightly different interpretations of the same
roll. Darkroom does it once, consistently, using the film base colour as a
reference point.

Still a prototype: it handles the two stocks I actually shoot and gives up
noisily on anything else.
