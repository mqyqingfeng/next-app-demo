import React from "react"
      export const props = {"data-client":true,"data-component":"Like"}
      export const jsx = function Like(){"use client";const[likes,setLikes]=React.useState(100);return React.createElement("button",{onClick:()=>{setLikes(likes+1)}},"\u2764\uFE0F ",likes)}