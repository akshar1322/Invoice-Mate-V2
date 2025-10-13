'use client';

import Link from 'next/link';
import React from 'react';
const openWebsite = (url: string | URL | undefined) => {
  window.open(url, "_blank");
};
function Footer() {
  return (
    <footer className="px-20 py-5 flex  justify-between">
      <div className="left">
         &copy; {new Date().getFullYear()} | INVOICEMATE - All Rights Reserved
      </div>

      <div className="right ">Developed by
        <span
          onClick={() => openWebsite("https://splisxstudio.wixstudio.com/splisxstudio")}
          className="hover:text-lime-400 uppercase cursor-pointer "> splisxStudio
          </span>
      </div>
    </footer>
  );
}

export default Footer;
