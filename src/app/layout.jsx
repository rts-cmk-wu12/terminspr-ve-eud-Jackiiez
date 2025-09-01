

import "./globals.css";


export const metadata = {
  title:{
    template: "%s | Laudrup Dans",
    default: "Laudrup Dans "
  },
  description:"Termins prøve WU12"

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

    <div id="root">
        {children}</div>
      </body>
    </html>
  );
}

