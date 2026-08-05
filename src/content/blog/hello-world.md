---
title: Starting a website, again
description: Why I keep rebuilding my personal site, and what I decided to do differently this time.
date: 2025-06-14
tags:
  - meta
  - writing
cover: ""
draft: false
---

This is the fourth personal website I have built and the first one I expect to
still be updating in a year. The previous three died the same way: I made
publishing hard enough that I stopped doing it.

## The failure mode

Every time, the site itself was fine. The problem was the gap between having a
thought and getting it published. One version needed a local toolchain and a
manual deploy. Another needed me to hand-write frontmatter correctly or the
build would fail silently. Both worked perfectly for about six weeks.

## What is different

The rule this time is that I should be able to publish from a phone, on a
train, without a terminal. Content is plain Markdown in a repository, edited
through a form that already knows what fields exist, and every save triggers a
deploy. If that stops being true, the site will rot again, and I would rather
find that out now.

## What I plan to write about

Mostly things I had to work out the hard way and could not find written down
anywhere: infrastructure decisions that turned out badly, tools that were
worth the switching cost, and the occasional detour into photography.
