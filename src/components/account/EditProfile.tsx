'use client';

import * as Yup from 'yup';
import { FC, useState } from 'react';
import Image from 'next/image';
import { Formik, Form, FormikHelpers } from 'formik';
import { TopHeader } from '../include/TopHeader';
import { Button } from '../common/button/Button';
import { CiCamera } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import Input from '../common/input/Input';
 
  
// --- Form Values ---
interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  newPassword: string;
  confirmPassword: string;
  address: string;
  profileImage: File | null;
}

// --- Props ---
interface EditProfileProps {
  open: boolean;
  onClose: () => void;
}

// --- Component ---
export const EditProfile: FC<EditProfileProps> = ({ open, onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const defaultImage = '/assets/user.png';

  const initialValues: FormValues = {
    fullName: '',
    email: '',
    phone: '',
    newPassword: '',
    confirmPassword: '',
    address: '',
    profileImage: null,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone Number is required'),
    newPassword: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), ''],
      'Passwords must match'
    ),
    address: Yup.string(),
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    console.log('Form Values:', values);
    setSubmitting(false);
    onClose();
  };

  const handleImageChange = (
    file: File,
    setFieldValue: (field: keyof FormValues, value: any) => void
  ) => {
    setFieldValue('profileImage', file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCancelImage = (
    setFieldValue: (field: keyof FormValues, value: any) => void
  ) => {
    setFieldValue('profileImage', null);
    setPreview(null);
  };

  return (
    <div
      className={`fixed inset-0 z-100 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed bg-white shadow-xl z-50 transition-transform duration-300
          w-full md:w-[400px] h-full
          ${open ? 'translate-x-0' : 'translate-x-full'}
          right-0 top-0
        `}
      >
        {/* Header */}
        <TopHeader title="Edit Profile" onClick={onClose} cross={true} show={true} />

        {/* Form */}
        <div className="p-4 overflow-y-auto h-[calc(100%-56px)] space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, setFieldValue, handleChange, handleBlur }) => (
              <Form className="space-y-4">
                {/* Profile Picture */}
                <div className="flex flex-col items-center relative">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                      <Image
                        src={preview || defaultImage}
                        width={112}
                        height={112}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <label className="absolute bottom-0 left-12 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageChange(e.target.files[0], setFieldValue);
                          }
                        }}
                      />
                      {preview ? (
                        <RxCross2
                          className="p-0.5 h-5 w-5 bg-white/50 flex justify-center rounded-full text-red-500"
                          onClick={() => handleCancelImage(setFieldValue)}
                        />
                      ) : (
                        <CiCamera className="p-0.5 h-5 w-5 bg-white/50 flex justify-center rounded-full text-white" />
                      )}
                    </label>
                  </div>
                </div>

                {/* Inputs */}
                <div className="grid gap-3">
                  <Input<FormValues>
                    title="Full Name"
                    type="text"
                    field="fullName"
                    value={values.fullName}
                    onChange={(field, val) => setFieldValue(field, val)}
                    error={errors.fullName}
                    showError={(field) => Boolean(touched[field] && errors[field])}
                    
                  />
                  <Input<FormValues>
                    title="Email"
                    type="email"
                    field="email"
                    value={values.email}
                    onChange={(field, val) => setFieldValue(field, val)}
                    error={errors.email}
                    showError={(field) => Boolean(touched[field] && errors[field])}
                    
                  />
                  <Input<FormValues>
                    title="Phone Number"
                    type="tel"
                    field="phone"
                    value={values.phone}
                    onChange={(field, val) => setFieldValue(field, val)}
                    error={errors.phone}
                    showError={(field) => Boolean(touched[field] && errors[field])}
                    
                  />
                  <Input<FormValues>
                    title="New Password"
                    type="password"
                    field="newPassword"
                    value={values.newPassword}
                    onChange={(field, val) => setFieldValue(field, val)}
                    error={errors.newPassword}
                    showError={(field) => Boolean(touched[field] && errors[field])}
                    
                  />
                  <Input<FormValues>
                    title="Confirm Password"
                    type="password"
                    field="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(field, val) => setFieldValue(field, val)}
                    error={errors.confirmPassword}
                    showError={(field) => Boolean(touched[field] && errors[field])}
                    
                  />

                  {/* Address */}
                  <div className="flex flex-col">
                    <label className="font-medium text-sm md:text-xs mb-1">Address</label>
                    <textarea
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your address"
                      className={`w-full text-[13px] md:text-sm rounded-md px-3 py-2 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-black transition
                        ${touched.address && errors.address ? 'border-red-500 focus:ring-red-500' : ''}
                      `}
                    />
                    {touched.address && errors.address && (
                      <span className="text-red-500 text-xs mt-1">{errors.address}</span>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <Button 
                  className="w-full bg-(--primary) justify-center text-white py-2 rounded-lg mt-4 hover:bg-(--primary)/80 transition"
                >
                  Save Changes
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
