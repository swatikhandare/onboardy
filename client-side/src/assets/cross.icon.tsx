import { SVGProps } from "react"

const CrossIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M5.001 5 19 19M5 19 18.999 5"
      stroke="currentcolor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CrossIcon