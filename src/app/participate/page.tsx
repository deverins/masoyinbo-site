"use client"
import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { participationSchema } from '@/validationSchema/participateSchema';
import { API_URL } from '@/constants/api';
interface Option {
  value: string;
  label: string;
}

const ParticipationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const URL = `${API_URL}/v1/auth/create-participant`;

  const options: Option[] = [
    { value: 'social_media', label: 'EAYoruba' },
    { value: 'friend', label: 'Word of Mouth/Recommendation' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'YouTube', label: 'YouTube' },
    { value: 'Instagram', label: 'Instagram' },
  ];

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      mobileNumber: '',
      gender: '',
      state: '',
      placeOfResidence: '',
      platformLink: '',
      socialMediaHandle: '',
      howDidYouFindOut: [] as string[],
      rulesAgreement: false,
      additionalComments: '',
    },
    validationSchema: participationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.post(URL, values);
        toast.success("User registered successfully.");
      } catch (error) {
        toast.error("Sign up failed. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="bg-slate-100 shadow-md rounded-lg p-8 w-full max-w-lg">
        <form onSubmit={formik.handleSubmit}>
         {/* Email */}
         <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name (Name and Surname)
            </label>
            <input
              type="text"
              name="fullName"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.fullName && formik.touched.fullName && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.fullName}
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.gender && formik.touched.gender && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.gender}
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number (Include Dialling/Area Code)
            </label>
            <input
              type="text"
              name="mobileNumber"
              onChange={formik.handleChange}
              value={formik.values.mobileNumber}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.mobileNumber && formik.touched.mobileNumber && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.mobileNumber}
              </div>
            )}
          </div>

          {/* Place of Residence */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Place of Residence
            </label>
            <input
              type="text"
              name="placeOfResidence"
              onChange={formik.handleChange}
              value={formik.values.placeOfResidence}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.placeOfResidence && formik.touched.placeOfResidence && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.placeOfResidence}
              </div>
            )}
          </div>

          {/* Social Media Platform */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
             Most Active/Frequently Used Social Media Platform Link
             <span className=' text-secondary-dark ml-3'>*</span>
            </label>
            <input
              type="text"
              name="platformLink"
              onChange={formik.handleChange}
              value={formik.values.platformLink}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.platformLink && formik.touched.platformLink && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.platformLink}
              </div>
            )}
          </div>

          {/* Social Media Handle */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Social Media Handle
            </label>
            <input
              type="text"
              name="socialMediaHandle"
              onChange={formik.handleChange}
              value={formik.values.socialMediaHandle}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {formik.errors.socialMediaHandle && formik.touched.socialMediaHandle && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.socialMediaHandle}
              </div>
            )}
          </div>

          {/* How Did You Find Out */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How did you find out about Másòyìnbó?
              <span className=' text-secondary-dark ml-3'>*</span>
            </label>
            <div className="flex flex-col">
              {options.map((option: Option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    name="howDidYouFindOut"
                    value={option.value}
                    onChange={formik.handleChange}
                    checked={formik.values.howDidYouFindOut.includes(option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
              {formik.errors.howDidYouFindOut && formik.touched.howDidYouFindOut && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.howDidYouFindOut}
                </div>
              )}
            </div>
          </div>

          {/* Rules Agreement */}
          <div className="mb-4">
            <h1 className='block text-gray-700 text-sm font-bold mb-2'>Rules of Másòyìnbó:</h1>
            <p>1. You are prohibited to code-mix or speak other languages aside from Yoruba throughout the duration of the programme. Failure to adhere will lead to the deduction of your earnings.</p>
            <p>2. It is required that all 10 questions are answered correctly to have the potential of earning up to N1,000,000.</p>
            <p>3. If you are selected, please come onto the programme in colourful native attire, as we will not allow standard dressing - we are keen to conserve and promote our Yoruba culture.</p>
            <p>4. You are expected and encouraged to know your Yoruba numbers; if not, it may impact your potential earnings.</p>
            <div className='flex items-center'>
              <input
                type="checkbox"
                name="rulesAgreement"
                onChange={formik.handleChange}
                checked={formik.values.rulesAgreement}
                className="mr-2"
              />
              <label className="block text-gray-700 text-sm font-bold">
                Yes, I Understand
              </label>
              {formik.errors.rulesAgreement && formik.touched.rulesAgreement && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors.rulesAgreement}
                </div>
              )}
            </div>
          </div>

          {/* Additional Comments */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Any further comments/questions?
            </label>
            <textarea
              name="additionalComments"
              onChange={formik.handleChange}
              value={formik.values.additionalComments}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder='Your answer'
            />
            {formik.errors.additionalComments && formik.touched.additionalComments && (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.additionalComments}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ParticipationForm;
