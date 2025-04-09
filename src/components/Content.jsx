import React from 'react';
import { motion } from "framer-motion";
import Navbar from './Navbar';

const Content = () => {
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center gap-5'>
        <motion.div
          initial={{ opacity: 0, y: -50 }}     // Starting animation
          animate={{ opacity: 1, y: 0 }}       // Animate to this
          transition={{ duration: 0.5 }}  
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}     // Animation duration
          className="w-40 h-40 bg-blue-500 text-white rounded-lg flex justify-center items-center"
        >
          Hello Motion!
        </motion.div>

        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3}}
            className="px-4 py-2 bg-green-500 text-white rounded"
        >           
            Click Me
</motion.button>

    </div>
    )
}

export default Content;