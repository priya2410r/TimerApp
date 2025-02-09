import * as React from "react"
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const DownArrowIcon = (props) => (
     <Svg
     xmlns="http://www.w3.org/2000/svg"
     xmlSpace="preserve"
     width={20}
     height={20}
     viewBox="0 0 185.344 185.344"
     {...props}
   >
     <Path
       d="M92.672 144.373a10.707 10.707 0 0 1-7.593-3.138L3.145 59.301c-4.194-4.199-4.194-10.992 0-15.18a10.72 10.72 0 0 1 15.18 0l74.347 74.341 74.347-74.341a10.72 10.72 0 0 1 15.18 0c4.194 4.194 4.194 10.981 0 15.18l-81.939 81.934a10.694 10.694 0 0 1-7.588 3.138z"
       style={{
         fill: "#010002",
       }}
     />
   </Svg>
)
export default DownArrowIcon
