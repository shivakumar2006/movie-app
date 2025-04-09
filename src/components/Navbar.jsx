import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';


const Navbar = () => {

    const [ visible, setVisible ] = useState(true);

    let handleScrollY = useRef(0);

    const handleScroll = () => {
        if(typeof window !== "undefined") {
            if(window.scrollY > handleScrollY) {
                setVisible(false); 
            } else {
                setVisible(true); 
            }
            lastScrollY = window.scrollY;
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    return (
        <motion.div
            className="flex justify-center items-center"
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : -80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className='w-full h-20 bg-blue-950 flex flex-row justify-between items-center'
                style={{
                    background: "linear-gradient(90deg, rgba(1,41,73,1) 0%, rgba(1,40,62,1) 35%, rgba(9,59,88,1) 55%, rgba(2,71,103,1) 100%)"
                }}
            >
                <h1 className='text-5xl mx-2 text-white'>Navbar</h1>
                <div>
                    {/* Add any other nav items here */}
                </div>
            </div>
        </motion.div>
     );
};

export default Navbar;
