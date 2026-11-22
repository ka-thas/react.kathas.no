---
title: My master’s thesis
date: 2026-10-17
description: Writing my thesis in Japan, evolving soft robots with VLMs
---

This article covers what I’m doing for my thesis, why I’m going to Japan, and how it relates to Robotics and AI. I’ll try not to get too technical, but it’s unavoidable to some degree.

My master’s program is called *Informatics: Robotics and Intelligent Systems* at the University of Oslo. For the final year of my master’s program I will focus solely on writing my thesis. No courses, no student associations, and no part-time job. I’ll be writing at Nagoya University with the supervision of Reiji Suzuki on-site, as well as Kyrre Glette remotely from Oslo.

## Background

My bachelor's was also in robotics and intelligent systems at UiO. I did calculus, linear algebra, object-oriented programming, algorithms, electronics, digital design, robotics, AI, machine learning, and operating systems. A good mix of software and hardware with a lot of math thrown in.

Kept at it for my master's and took courses in deep learning, multi-agent systems, advanced AI topics, and operating systems again but way more painful this time.

## Field of study

### Evolutionary Algorithm
I need you to go read [[Evolutionary algorithm|EA]] which I put a lot of effort into writing. It is the largest part of my background.

### Evolutionary Robotics

Now this uses the same steps as the castle example, but applied to evolving robots. Instead of designing the body manually, we let it evolve by itself and see what comes crawling out.

I'm using a Python library called EvoGym that lets me simulate 2D robots built from different blocks. The different kinds of blocks are: simple solid blocks, soft ones, and muscle blocks that push and pull other blocks. These blocks are placed according to the robot’s genes.

EvoGym is *usually* used for simpler tasks, like making the robot move as far or as fast as possible, but that’s not quite my tempo.

### Subjective Judges

My thesis will look into evolving robots that fit a *semantic description*, meaning a word that describes how they move or look. Like making the robot move as *adorably* as possible.

There’s no formula that measures adorableness, which is exactly where Vision-Language Models (VLMs) come in. A VLM is a model that can look at images or video and describe them, like the models Claude uses when you send a picture.

So instead of measuring distance, we record a video of the robot moving and ask a VLM: *"How well does this robot move adorably?"* The VLM's answer becomes the robot's score, and evolution takes it from there.

🏰 **Castles example**: AI grades castles on how *adorable* they look, instead of how well they hold up against attackers.

## The Japlan ⛩️

I'll be at **Nagoya University from September 2026 through May 2027** as a special research student, working in Prof. Suzuki's lab.

The thesis will be evaluated by the University of Oslo, which means my thesis defense is still in Norway sometime in June.

|              |                                      |     |
| ------------ | ------------------------------------ | --- |
| 10 Aug 2026  | Started writing                      |     |
| 9 Sept 2026  | Arriving in Nagoya                   |     |
| 24 Sept 2026 | ALife Symposium, Shizuoka University |     |
| 1 Oct 2026   | Extended project description         |     |
| 28 Oct 2026  | AROB abstract                        |     |
| 23 Dec 2026  | AROB final paper                     |     |
| 19 Jan 2027  | AROB conference                      |     |
| 15 May 2027  | Thesis delivery                      |     |
| 10 Jun 2027  | Thesis defense                       |     |
