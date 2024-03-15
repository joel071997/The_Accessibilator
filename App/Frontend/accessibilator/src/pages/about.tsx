import React, { useState } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import Head from 'next/head';

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

const faqsArr = [
  {
    question: 'How does Accessibilator work?',
    answer:
      'Users upload their documents to the Accessibilator platform. The application then uses various technologies to analyze and modify the document, enhancing its accessibility. This includes changing font styles and sizes, increasing spacing, and improving contrast.',
  },
  {
    question: 'What types of documents can I upload?',
    answer:
      "Accessibilator currently only supports the Word(.docx) format. We're looking to add support for other formats like Portable Document Format(.pdf), Excel (.xlsx)",
  },
  {
    question: 'Is Accessibilator free to use?',
    answer:
      'The Accessibilator is available for use at no cost. Our goal is to make document accessibility widely accessible.',
  },
  {
    question: 'How does Accessibilator help people with dyslexia?',
    answer:
      'The application modifies documents to adhere to the dyslexia-friendly guidelines by the British Dyslexia Association, such as using specific fonts, adjusting sizes, and improving readability, which can significantly aid dyslexic readers.',
  },
  {
    question: 'How can I provide feedback or suggest improvements?',
    answer:
      'We welcome user feedback! You can submit your suggestions or feedback through the feedback form on the menu.',
  },
  {
    question: 'Are there any system requirements to use Accessibilator?',
    answer:
      'Accessibilator is a web-based application accessible through most modern web browsers. There are no specific system requirements.',
  },
  {
    question: 'Who can I contact for support?',
    answer:
      'For support, please reach out to us via our email tudteam03@gmail.com',
  },
];

const AboutPage = () => {
  return (
    <>
      <DefaultLayout>
        <Head>
          <title>Accessibilator | About</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className='flex flex-1 flex-col justify-center px-4 py-8 text-center text-base text-gray-900 sm:px-16 md:px-8 lg:px-24 xl:px-36'>
          <div className='col-span-3 flex flex-1 flex-col rounded border border-gray-400/60 bg-stone-50 px-4 py-10 text-left md:px-8 lg:px-16'>
            <h2 className='mb-6 text-3xl font-medium'>About</h2>
            <p className='mb-4 text-lg'>
              The Accessibilator is a web application designed to make popular
              documents more accessible to individuals with learning
              disabilities, with a focus on dyslexia. In today&apos;s digital
              age, the concept of accessibility has extended beyond physical
              spaces to include digital platforms, making it an imperative need.
              The application was born out of this necessity, aiming to bridge
              the gap between standard document formats and the unique needs of
              individuals with learning disabilities, with an initial focus on
              Dyslexia. It provides a seamless, personalized, and efficient
              customization experience, educating the user on the need for these
              modifications and compliance with existing legal frameworks like
              the European Accessibility Act, Americans with Disabilities Act
              (ADA), and the United Nations Convention on the Rights of Persons
              with Disabilities.
            </p>
            <h2 className='mt-6 text-3xl font-medium'>
              Frequently Asked Questions (FAQ)
            </h2>
            <div className='mt-4'>
              {faqsArr.map((faq) => {
                return (
                  <Disclosure key={faq.question}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className='mb-2 flex w-full items-center justify-between rounded-lg bg-stone-100 px-4 py-3 text-left text-base font-medium text-stone-900 focus:outline-none focus-visible:ring focus-visible:ring-yellow-900/75'>
                          <span>{faq.question}</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-yellow-900`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className='px-4 pb-4 pt-3 text-base text-gray-800'>
                          {faq.answer}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          </div>
        </main>
      </DefaultLayout>
    </>
  );
};

export default AboutPage;
