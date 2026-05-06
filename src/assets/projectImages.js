// png to webp conversion command:
// cwebp -q 50 input.png -o output.webp
//
// loop for all files in a dir:
// for file in images/*; do cwebp -q 50 "$file" -o "${file%.*}.webp"; done

import boids from "./images/projects/preview-boids.webp";
import chameleon from "./images/projects/preview-chameleon.webp";
import flashcards from "./images/projects/preview-flashcards.webp";
import flashcardsV2 from "./images/projects/preview-flashcards2.webp";
import moths from "./images/projects/preview-moths.webp";
import nursery from "./images/projects/preview-nursery.webp";
import plant from "./images/projects/preview-plant.webp";
import PSO from "./images/projects/preview-PSO.webp";
import ecoSim from "./images/projects/preview-ecoSim.webp";
import scooter from "./images/projects/preview-scooter.webp";
import snake from "./images/projects/preview-snake.webp";
import lifeCalendar from "./images/projects/preview-lifeCalendar.webp";
import wildLawnmower from "./images/projects/preview-wildLawnmower.webp";
import ondspera from "./images/projects/preview-ondspera.webp";

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
};
