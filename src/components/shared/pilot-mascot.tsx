export function PilotMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pilot-mascot ${className}`}
      viewBox="0 0 220 210"
      fill="none"
      role="img"
      aria-label="Pip, your friendly learning pilot"
    >
      <ellipse cx="111" cy="193" rx="57" ry="9" fill="#103E2B" opacity=".12" />
      <g className="mascot-float">
        <path
          d="M56 102C24 93 17 120 35 135L64 146M164 100C190 76 207 93 194 113L167 140"
          fill="#28B96B"
          stroke="#123C2B"
          strokeWidth="3"
        />
        <path
          d="M76 158L67 183C66 191 94 192 99 182L105 161M124 162L128 182C132 192 158 190 157 182L147 157"
          fill="#163E2C"
        />
        <rect
          x="55"
          y="37"
          width="114"
          height="134"
          rx="49"
          fill="#4ADE80"
          stroke="#123C2B"
          strokeWidth="3"
        />
        <path
          d="M67 59C82 40 103 40 111 43"
          stroke="#A5F5BF"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="70" y="77" width="84" height="56" rx="25" fill="#F5FFF8" />
        <g className="mascot-eyes">
          <ellipse cx="93" cy="99" rx="6" ry="9" fill="#163E2C" />
          <ellipse cx="133" cy="99" rx="6" ry="9" fill="#163E2C" />
        </g>
        <path
          d="M104 117Q113 125 122 117"
          stroke="#163E2C"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="82" cy="114" r="6" fill="#4ADE80" opacity=".5" />
        <circle cx="144" cy="114" r="6" fill="#4ADE80" opacity=".5" />
        <path
          d="M84 145L112 151L141 144"
          stroke="#1DA75A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M112 14V36"
          stroke="#163E2C"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx="112"
          cy="13"
          r="7"
          fill="#4ADE80"
          stroke="#163E2C"
          strokeWidth="3"
        />
        <path
          d="M175 45L178 35L182 45L192 49L182 53L178 63L175 53L165 49Z"
          fill="#FFC75A"
        />
        <path
          d="M34 58L37 51L40 58L47 61L40 64L37 71L34 64L27 61Z"
          fill="#4ADE80"
        />
      </g>
    </svg>
  );
}
