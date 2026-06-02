import React, { useEffect, useState } from "react";

/**
 * Shows when the site was last updated, sourced from the latest commit on the
 * GitHub repo's main branch. Fetches on mount and links to the repo.
 */
function CommitInfo() {
  const [date, setDate] = useState("");
  const [hash, setHash] = useState("Loading...");

  useEffect(() => {
    let active = true;
    fetch("https://api.github.com/repos/ka-thas/react.kathas.no/commits/main")
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;
        const commitDate = new Date(data.commit.author.date);
        const formattedDate = `${commitDate.getDate().toString().padStart(2, "0")}-${(commitDate.getMonth() + 1).toString().padStart(2, "0")}-${commitDate.getFullYear()}`;
        setDate(formattedDate);
        setHash(data.sha.substring(0, 7));
      })
      .catch((error) => console.error("Error fetching commit:", error));
    return () => {
      active = false;
    };
  }, []);

  return (
    <p className="text-white/60 text-sm">
      This website was updated {date}:{" "}
      <a
        href="https://github.com/ka-thas/react.kathas.no"
        target="_blank"
        rel="noreferrer"
      >
        {hash}{" "}
      </a>
    </p>
  );
}

export default CommitInfo;
