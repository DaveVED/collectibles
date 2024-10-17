import React from "react";
import { Github, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-gray-800">
      <div className="container mx-auto max-w-screen-xl text-center">
        {/* Informational Text */}
        <p className="my-6 text-gray-400 text-sm sm:text-base md:text-lg">
          TCG Price Guide pulls its prices and images from TCG Player (as permitted by their robots.txt) and currently supports only English cards. All card data outside of this is stored in our datastore. If anything with TCG Player changes in the future, or upon there reqeust, changes may be requried.
        </p>

        {/* Issue Reporting Text */}
        <p className="mb-6 text-gray-400 text-sm sm:text-base md:text-lg">
          If you find an issue or have a feature request (e.g., new set or TCG game), please open an issue on [GitHub](https://github.com/DaveVED/tcg-price-guide).
        </p>

        {/* Social Icons and Additional Link */}
        <div className="flex flex-col items-center">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-4">
            {/* GitHub Icon */}
            <a
              href="https://github.com/DaveVED/tcg-price-guide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>

            <a
              href="https://x.com/DaveVED_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>

          <a
            href="https://collectibles.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-xs sm:text-sm md:text-base"
          >
            See all collectible sites at collectibles.studio
          </a>
        </div>
      </div>
    </footer>
  );
};
