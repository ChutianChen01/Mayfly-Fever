---
title: In defence of boring infrastructure
description: The most interesting system I ever built was also the worst one. A note on choosing dull technology on purpose.
date: 2025-04-02
tags:
  - engineering
  - systems
cover: ""
draft: false
---

A few years ago I built something I was genuinely proud of: an event-driven
architecture with a custom scheduler, three message brokers, and a
hand-rolled consensus layer for a problem that, in retrospect, a single
Postgres table with a `status` column would have solved.

It worked. It was also unmaintainable by anyone but me, which meant that when
I moved teams it was rewritten within a year — correctly, and by people who
were kinder about it than I deserved.

## The actual lesson

The lesson is not "never build interesting things". It is that novelty is a
budget, and most systems can only afford to spend it in one place. If the
interesting part of your problem is the data model, then the deployment story
should be dull. If you are doing something genuinely new with scheduling, then
please, use the boring database.

I now ask one question in design reviews: *what is the interesting thing here,
and have we accidentally got more than one?* If the answer is two or more, the
design is usually not finished.

## A caveat

This can curdle into an excuse for never learning anything, which is its own
kind of failure. The distinction I try to hold onto is between novelty that
serves the problem and novelty that serves my own boredom. The second one is
much more fun and much more expensive.
