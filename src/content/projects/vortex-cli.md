---
title: Vortex CLI
blurb: A terminal tool that turns a directory of chaotic CSVs into a queryable local database in one command.
date: 2025-02-10
status: Active
tech:
  - Go
  - SQLite
  - DuckDB
cover: ""
repo: https://github.com/ChutianChen01/example
demo: ""
featured: true
order: 30
draft: false
---

I kept receiving folders of CSVs with inconsistent headers, mixed encodings,
and dates in three different formats, and I kept writing the same throwaway
Python script to make sense of them. Vortex is that script, made permanent.

## What it does

Point it at a directory and it infers a schema for every file, reconciles
columns that mean the same thing under different names, and loads everything
into a local database you can query immediately.

```bash
vortex load ./exports --out data.db
vortex query "select region, sum(revenue) from sales group by 1"
```

## What I learned

Schema inference is 10% statistics and 90% deciding what to do when you are
wrong. The version that worked was the one that stopped trying to be clever
and instead showed its guesses up front, with a one-key override.
