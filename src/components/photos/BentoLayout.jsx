import React from "react";
import PhotoFrame from "./PhotoFrame";
import TripSection from "./TripSection";

// Which photos get a big tile. Change this to pick them another way.
const isBig = (photo) => Boolean(photo.caption);

// Tiles in grid cells, which are 4:3 like the landscape photos:
//   landscape  1×1, big 2×2 (never cropped)
//   portrait   1 wide × 2 tall, big 2×3 (a little cropped at the sides)
function tileCls(photo) {
  const portrait = photo.height > photo.width;
  if (isBig(photo)) return portrait ? "col-span-2 row-span-3" : "col-span-2 row-span-2";
  return portrait ? "row-span-2" : "";
}

// Two columns on phones, four from 681px up. Rows are 3/4 of a column's width,
// worked out from the container's width (cqw) so every cell is 4:3.
const grid = {
  gridTemplateColumns: "repeat(var(--cols), minmax(0, 1fr))",
  gridAutoRows: "calc((100cqw - (var(--cols) - 1) * var(--gap)) / var(--cols) * 0.75)",
};

/**
 * Gallery layout: a bento grid per trip, newest trip first. Later photos fill
 * gaps left by the big tiles, so the order is newest first, give or take.
 * Every layout takes { groups, base, onOpen(photoId) }; see PhotosPage.
 */
function BentoLayout({ groups, base, onOpen }) {
  return (
    <div className="flex flex-col gap-12">
      {groups.map((group) => (
        <TripSection key={group.trip?.id ?? "other"} group={group}>
          <div className="@container">
            <div
              className="grid grid-flow-dense gap-(--gap) [--gap:0.75rem] [--cols:2] min-[681px]:[--cols:4]"
              style={grid}
            >
              {group.photos.map((photo) => (
                <PhotoFrame
                  key={photo.id}
                  photo={photo}
                  base={base}
                  onOpen={() => onOpen(photo.id)}
                  className={`w-full h-full ${tileCls(photo)}`}
                />
              ))}
            </div>
          </div>
        </TripSection>
      ))}
    </div>
  );
}

export default BentoLayout;
