// png to webp conversion command:
// cwebp -q 50 input.png -o output.webp
//
// loop for all files in a dir:
// for file in images/*; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done
//
// Project previews live in the blog's Obsidian vault (blog/content/attachments/projects/),
// shared with the per-project notes in blog/content/projects/.

import boids from "../../blog/content/attachments/projects/preview-boids.webp";
import chameleon from "../../blog/content/attachments/projects/preview-chameleon.webp";
import flashcards from "../../blog/content/attachments/projects/preview-flashcards.webp";
import flashcardsV2 from "../../blog/content/attachments/projects/preview-flashcards2.webp";
import moths from "../../blog/content/attachments/projects/preview-moths.webp";
import nursery from "../../blog/content/attachments/projects/preview-nursery.webp";
import plant from "../../blog/content/attachments/projects/preview-plant.webp";
import PSO from "../../blog/content/attachments/projects/preview-PSO.webp";
import ecoSim from "../../blog/content/attachments/projects/preview-ecoSim.webp";
import scooter from "../../blog/content/attachments/projects/preview-scooter.webp";
import snake from "../../blog/content/attachments/projects/preview-snake.webp";
import lifeCalendar from "../../blog/content/attachments/projects/preview-lifeCalendar.webp";
import wildLawnmower from "../../blog/content/attachments/projects/preview-wildLawnmower.webp";
import ondspera from "../../blog/content/attachments/projects/preview-ondspera.webp";
import pomodoro from "../../blog/content/attachments/projects/preview-pomodoro.webp";

export const projectImages = {
  chameleon,
  boids,
  flashcards,
  flashcardsV2,
  moths,
  nursery,
  plant,
  PSO,
  ecoSim,
  scooter,
  snake,
  lifeCalendar,
  wildLawnmower,
  ondspera,
  pomodoro,
};
