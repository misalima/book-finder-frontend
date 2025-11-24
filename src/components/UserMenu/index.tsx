"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function UserMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([]);
  const { data: session } = useSession();

  const menuItems = [
    { label: "Meu Perfil", href: `/user/${session?.user?.id}`, action: null },
    { label: "Sair", href: null, action: async () => {
      await signOut({ redirect: true, callbackUrl: "/" });
    }},
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setActiveIndex(-1);
    }
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!menuOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        setMenuOpen(true);
        setActiveIndex(0);
      }
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        closeMenu();
        break;
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev < menuItems.length - 1 ? prev + 1 : 0;
          menuItemsRef.current[next]?.focus();
          return next;
        });
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => {
          const next = prev > 0 ? prev - 1 : menuItems.length - 1;
          menuItemsRef.current[next]?.focus();
          return next;
        });
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        menuItemsRef.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(menuItems.length - 1);
        menuItemsRef.current[menuItems.length - 1]?.focus();
        break;
    }
  };

  const handleMenuItemKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const item = menuItems[index];
      if (item.action) {
        item.action();
      }
      closeMenu();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, closeMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-label={`Menu do usuário ${session?.user?.name || "logado"}`}
        aria-expanded={menuOpen}
        aria-controls="user-menu"
        aria-haspopup="menu"
        className="bg-dark-grey px-4 py-2 rounded-lg text-white font-medium flex items-center hover:bg-gray-600"
      >
        {session?.user?.name}
        <FaChevronDown 
          className={`ml-2 text-white transition-transform duration-200 ${
            menuOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id="user-menu"
        role="menu"
        aria-label="Menu de opções do usuário"
        className={`absolute right-0 mt-2 w-48 bg-dark-grey border rounded-lg shadow-lg transition-all duration-300 ease-out ${
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        style={{ 
          overflow: "hidden",
          display: menuOpen ? "block" : "none"
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col">
          {menuItems.map((item, index) => {
            const menuItemContent = (
              <button
                ref={(el) => {
                  if (el) menuItemsRef.current[index] = el;
                }}
                role="menuitem"
                tabIndex={menuOpen ? 0 : -1}
                aria-label={item.label}
                onKeyDown={(e) => handleMenuItemKeyDown(e, index)}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  }
                  closeMenu();
                }}
                className={`w-full px-4 py-2 text-left text-white hover:bg-gray-100 hover:text-primary-green focus:bg-gray-100 focus:text-primary-green focus:outline-none ${
                  activeIndex === index ? "bg-gray-100 text-primary-green" : ""
                }`}
              >
                {item.label}
              </button>
            );

            if (item.href) {
              return (
                <Link key={index} href={item.href} className="block">
                  {menuItemContent}
                </Link>
              );
            }

            return <React.Fragment key={index}>{menuItemContent}</React.Fragment>;
          })}
        </div>
      </div>
    </div>
  );
}
