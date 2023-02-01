import React from "react";

function ImageIcon(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="image"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="prefix__svg-inline--fa prefix__fa-image prefix__fa-w-16 prefix__fa-3x"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"
      />
    </svg>
  );
}

export default ImageIcon;
