import React from 'react';
import { cookies } from '.' 

export function User() {
  const cookiesStore = cookies()
  return (
    <html lang="zh">
      <body>
        <h3>Cookies:</h3>
        {JSON.stringify(cookiesStore, null, 2)}
      </body>
    </html>
  )
}