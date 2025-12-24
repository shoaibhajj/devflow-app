import React, { ReactNode } from "react";

import Navbar from "@/components/navigation/navbar";

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}

export default RootLayout;
