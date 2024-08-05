'use client'
import Link from "next/link";
import Image from 'next/image'
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Nav = () => {

    // const session?.user = true;

    const {data:session} = useSession()

    const [providers, setProviders] = useState(null);

    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {

        const setupProvider = async () => {

            const response = await getProviders();

            // alert(response);

            setProviders(response)

        }
        setupProvider();
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">


            {/* {alert(providers)} */}

            <Link href={'/'} className="flex gap-2 flex-center">

                <Image
                    alt="Logo"
                    height={30}
                    width={30}
                    className="object-contain"
                    src="/assets/images/logo.svg"

                />
                <p className="logo_text">Kalvin AI</p>
            </Link>

            {/* desktop Navigation  */}

            <div className="sm:flex hidden" >

            {
                session?.user ? (
                    <div className="flex gap-3 md:gap-5">

                        <Link className="black_btn" href={'/create-post'}>Create Post</Link>


                        <button
                            type="button"
                            onClick={() => signOut()}
                        >Sign Out</button>

                        <Link href={'/profile'} >

                            <Image
                                alt="profile"
                                height={37}
                                width={37}
                                className="rounded-full"
                                src={session?.user?.image || "/assets/images/logo.svg"}
                                onClick={() => {}}

                            />
                        </Link>

                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In


                                </button>
                            ))
                        }
                    </>
                )
            }
            </div>

            {/* Mobile Navigation */}

            <div className="sm:hidden flex relative">

            {session?.user ? (

                <div className="flex">
                    {/* <Link href={'/profile'} > */}
                    <Image
                        alt="profile"
                        height={37}
                        width={37}
                        onClick={() => setToggleDropdown((prev => !prev))}
                        className="rounded-full"
                        src={session?.user?.image || "/assets/images/logo.svg"} 
                    />
                    {/* </Link> */}

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link href={'/profile'}
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}
                            >
                            My Profile
                            </Link>
                            <Link href={'/profile'}
                            className="dropdown_link"
                            onClick={() => setToggleDropdown(false)}
                            >
                            Create Prompt
                            </Link>
                            <button type="button"
                            onClick={() => {

                                setToggleDropdown(false);
                                signOut();

                            }}
                            className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                    

                </div>

            ):(
                <>
                {
                    providers && Object.values(providers).map((provider) => (
                        <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="black_btn"
                        >
                            Sign In


                        </button>
                    ))
                }
            </>
            )}

            </div>


        </nav>
    )
}

export default Nav