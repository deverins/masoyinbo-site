"use client"
import React from 'react'
import HeroSection from './HeroSection'
import Link from 'next/link'
import StatsCard from './StatsCard'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <section>
      <div className="flex items-center justify-center mt-8 mx-2">
            <div className=" border-t-8 border-danger-light rounded-t-lg container">
                <div className="bg-white p-6 w-full rounded-b-lg">
                    <h2 className=" text-[32px] text-gray-900 font-black">Másòyìnbó</h2>
                  <p className=" mt-4 text-base">
                      Thank you for your interest in joining <strong>Másòyìnbó</strong>, an edutainment programme and
                      gameshow designed to educate on the Yoruba language and culture. Másòyìnbó is an
                      initiative that aims to promote, safeguard and conserve our cultural heritage as Yorubas.
                  </p>
                  <p className=" mt-4 text-base">
                      Please note that we are experiencing high levels of demand from willing participants worldwide, we
                      endeavour to responbv d within a reasonable timeframe and would like to thank you for your
                      understanding and patience ahead of time.
                  </p>
                  <div className=" mt-4 text-base">
                      Please contact us at <Link href="tel:+2347033331389" className=" text-text-light font-bold">
                       +234 703 333 1389
                      </Link> if you would like to support or sponsor the programme.
                  </div>
                </div>
            </div>
        </div>
    );
      </section>
      <StatsCard />
    </>
  )
}

export default HomePage