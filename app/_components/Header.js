"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import logo from "../../public/logo-white.png";
import defaultProfileImg from "../../public/images/profile.png";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { data: session } = useSession();
  const userProfileImg = session?.user?.image;

  const [providers, setProviders] = useState(null);

  const pathName = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setAuthProviders();
  }, [])

  return (
    <header>
      <nav className="bg-teal-700 border-b border-teal-500">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
              <button
                onClick={() => {
                  setMobileMenuOpen((prev) => !prev);
                }}
                type="button"
                id="mobile-dropdown-button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <Link className="flex flex-shrink-0 items-center" href="/" onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}>
                <Image className="h-10 w-auto" src={logo} alt="Rent Roost" />

                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Rent Roost
                </span>
              </Link>
              <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-2">
                  <Link
                    href="/"
                    className={`${pathName === "/" ? "bg-black " : ""
                      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/properties"
                    className={`${pathName === "/properties" ? "bg-black " : ""
                      } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                    onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
                  >
                    Properties
                  </Link>
                  {session && (
                    <Link
                      href="/properties/create"
                      className={`${pathName === "/properties/create" ? "bg-black " : ""
                        } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                      onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
                    >
                      Add Property
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {!session ? (
              <div className="hidden md:block md:ml-6">
                <div className="flex items-center">
                  {
                    providers && Object.values(providers).map((provider, i) =>
                      <button key={i} onClick={() => { signIn(provider.id) }} className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2">
                        <FaGoogle className="tex-white mr-2" />
                        <span>Login or Register</span>
                      </button>
                    )
                  }
                </div>
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <Link href="/messages" className="relative group">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View messages</span>
                    <CiMail className="text-2xl" />
                  </button>
                  <UnreadMessageCount session={session} />
                </Link>
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={() => {
                        setProfileMenuOpen((prev) => !prev);
                      }}
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={userProfileImg || defaultProfileImg}
                        alt="Profile"
                        width={40}
                        height={40}
                      />
                    </button>
                  </div>

                  {profileMenuOpen && (
                    <div
                      id="user-menu"
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                        onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/properties/bookmarks"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
                      >
                        Bookmarks
                      </Link>
                      <button
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setProfileMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="/"
                className={`${pathName == "/" ? "bg-black " : ""
                  }text-white block rounded-md px-3 py-2 text-base font-medium`}
                onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className={`${pathName == "/properties" ? "bg-black " : ""
                  }text-white block rounded-md px-3 py-2 text-base font-medium`}
                onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
              >
                Properties
              </Link>
              {session && (
                <Link
                  href="/properties/create"
                  className={`${pathName == "/properties/create" ? "bg-black " : ""
                    }text-white block rounded-md px-3 py-2 text-base font-medium`}
                  onClick={() => { setProfileMenuOpen(false); setMobileMenuOpen(false); }}
                >
                  Add Property
                </Link>
              )}

              {!session && (
                providers && Object.values(providers).map((provider, i) =>
                  <button key={i} onClick={() => { signIn(provider.id) }} className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4">
                    <FaGoogle className="tex-white mr-2" />
                    <span>Login or Register</span>
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
