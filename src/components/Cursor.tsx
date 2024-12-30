'use client'
import React, { useEffect } from 'react'
import { gsap } from 'gsap'

function Cursor() {

    useEffect(() => {
        const h1Element = document.querySelector('.hq');
    
        const handleMouseEnter = () => {
            gsap.to('.smallcursor', {
                scale: 6
            })
            gsap.to('.cursor', {
                opacity: 0
            })
        };  // Increase cursor size on hover
        const handleMouseLeave = () => {
            gsap.to('.smallcursor', {
                scale: 1
            })
            gsap.to('.cursor', {
                opacity: 1
            })
        };  // Reset cursor size

        // Add event listeners to the h1 element (only run on the client)
        if (h1Element) {
        h1Element.addEventListener('mouseenter', handleMouseEnter);
        h1Element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            h1Element.removeEventListener('mouseenter', handleMouseEnter);
            h1Element.removeEventListener('mouseleave', handleMouseLeave);
        };
        }
    }, [])
    
    useEffect(() => {

        const handleMouseMove = (e: any) => {
            const { clientX, clientY } = e;
            gsap.to('.cursor', {
                x: clientX-70/2,
                y: clientY-70/2,
                duration: 1,
                delay: 0,
                ease: "power4.out"
            })

            gsap.to('.smallcursor', {
                x: clientX-10/2,
                y: clientY-10/2,
                duration: 0.3,
                delay: 0,
                ease: "power4.out",
            })
        }
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [])
    
    return (
        <>
            <div className='h-[70px] w-[70px] border-zinc-200 border fixed rounded-full z-10 cursor pointer-events-none'>
            </div>
            <div className='h-[10px] w-[10px] border-zinc-300 bg-zinc-300 border fixed rounded-full z-10 smallcursor pointer-events-none top-0 left-0 mix-blend-difference'/>            
        </>
    )
}

export default Cursor