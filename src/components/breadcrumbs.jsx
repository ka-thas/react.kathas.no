// Breadcrumbs component to display the current page's location in the app
// and allow navigation back to previous pages. It uses React Router's
// useLocation hook to get the current URL path and splits it into segments.
// It then maps over the segments to create a breadcrumb trail, with links
// to each segment. The last segment is displayed as plain text, while the
// others are links.

import React from "react";
import { useLocation, Link } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((p) => p);

  return (
    <nav className="text-sm text-gray-600">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          {paths.length > 0 && <span className="mx-2">/</span>}
        </li>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          return (
            <li key={href} className="flex items-center">
              {isLast ? (
                <span>{decodeURIComponent(path)}</span>
              ) : (
                <>
                  <Link to={href} className="text-blue-500 hover:underline">
                    {decodeURIComponent(path)}
                  </Link>
                  <span className="mx-2">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
