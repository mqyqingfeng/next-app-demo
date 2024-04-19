import React from "react";

function Like() {
  "use client";

  // if (typeof window == 'undefined') return null;

  const [likes, setLikes] = React.useState(100)
  
  return <button onClick={() => {setLikes(likes + 1)}}>❤️ {likes}</button>;
}

export default Like