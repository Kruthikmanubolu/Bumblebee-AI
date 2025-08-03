'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {
    const imageRef = useRef(null)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        await new Promise((r) => setTimeout(r, 2000)) // Simulate delay
        setLoading(false)
    }

    useEffect(() => {
        const imageElement = imageRef.current
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollThreshold = 100;

            if (scrollPosition > scrollThreshold) {
                imageElement.classList.add("scrolled")
            }
            else {
                imageElement.classList.remove('scrolled')
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [])
    return (
        <section className='w-full pt-24 md:pt-36 pb-10'>
            <div className='space-y-6 text-center'>
                <div className='space-y-6 mx-auto'>
                    <h1 className='text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl text-[#FFC107]'>
                        Success Starts Here with
                        <br />
                        Your AI Companion
                    </h1>
                    <p className='mx-auto max-w-[600px] md:text-lg'>Your Intelligent Career Companion: AI-Powered Coaching, Customized Guidance, and Tools to Help You Land the Job You Deserve
                    </p>
                </div>

                <div className='flex justify-center space-x-4'>
                    <Link href='/dashboard'>
                        <Button size='lg' className='px-8 bg-[#FFC107] rounded-4xl' onClick={handleClick}>
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* <div className='hero-image-wrapper mt-5 mx-2'>
                    <div ref={imageRef} className='hero-image'>
                        <Image src={'/banner_gpt.png'} width={1280} height={720} alt='banner bumblebee' className='rounded-lg shadow-2xl border mx-auto w-[400px] md:w-[700px] lg:w-[1000px] xl:w-[1280px]' priority />
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default HeroSection
