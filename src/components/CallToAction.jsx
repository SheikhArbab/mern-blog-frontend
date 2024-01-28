import React from 'react'
import { Button } from 'flowbite-react';

const CallToAction = () => {
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className='flex-1 justify-center flex flex-col'>
                <h2 className='text-2xl'>
                    Want to learn more about  Javascript?
                </h2>

                <p className='text-gray-500 my-2'>Checkout thses resources with 100 Javascript Projects</p>

                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" className='rounded-bl-none flex-1 overflow-hidden' target='_blank'>
                    <Button className='rounded-bl-none w-full' gradientDuoTone={'purpleToPink'}>

                        Learn More
                    </Button>
                </a>

            </div>
            <figure className="p-7 flex-1">
                <img src="https://www.geekboots.com/_next/image?url=https%3A%2F%2Fcdn.geekboots.com%2Fgeek%2Fjavascript-hero-1652702096795.webp&w=1080&q=75" />
            </figure>
        </div>
    )
}

export default CallToAction
