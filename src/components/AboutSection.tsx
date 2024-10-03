import Link from 'next/link';
import React from 'react';

const AboutSection = () => {
  return (
    <section>
      <div className="flex items-center justify-center mt-8 mx-5 xl:mx-20">
        <div className="border-t-8 border-danger-light rounded-t-lg container">
          <div className="bg-white dark:bg-[rgba(255,255,255,0.1)] backdrop-blur-md p-6 w-full rounded-b-lg text-gray-900 dark:text-gray-100 transition duration-300">
            <h2 className="text-[32px] font-black">Másòyìnbó</h2>
            <p className="mt-4 text-base">
              Thank you for your interest in joining <strong>Másòyìnbó</strong>, an edutainment programme and
              gameshow designed to educate on the Yoruba language and culture. Másòyìnbó is an initiative that aims to promote, safeguard and conserve our cultural heritage as Yorubas.
            </p>
            <p className="mt-4 text-base">
              Please note that we are experiencing high levels of demand from willing participants worldwide, we endeavour to respond within a reasonable timeframe and would like to thank you for your understanding and patience ahead of time.
            </p>
            <div className="mt-4 text-base">
              Please contact us at <Link href="tel:+2347033331389" className="text-text-light dark:text-secondary-dark font-bold">
                +234 703 333 1389
              </Link> if you would like to support or sponsor the programme.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
