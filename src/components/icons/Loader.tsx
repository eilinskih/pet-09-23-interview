import React from 'react'

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      //   xmlns:xlink="http://www.w3.org/1999/xlink"
      width={40}
      height={40}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke='#fff'
        strokeWidth={15}
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  )
}

export default Loader
