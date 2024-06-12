import React from 'react';

export default function Html({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Marbrains</title>
        <link
          rel="stylesheet"
          href="client.css"
        />
        <script
          src="client.js"
          defer
        />
      </head>
      <body className="bg-light">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
