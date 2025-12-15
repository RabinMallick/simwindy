'use client';

import { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { increment, decrement } from '@/store/slice/checkoutSlice';

import PriceSummary from '@/components/eSim/PriceSummary';
import { Package } from '@/components/eSim/Package';
import EsimHeader from '@/components/eSim/EsimHeader';

import { Formik, Form, FieldArray, FormikErrors } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import Input from '@/components/common/input/Input';
import PhoneInputField from '@/components/common/input/PhoneInputField';
import { TopHeader } from '@/components/include/TopHeader'; 

type UserType = {
  name: string;
  email: string;
  phone: string;
};

export default function ReviewAndPurchase() {
  const dispatch = useDispatch<AppDispatch>();
 
  const { numSim } = useSelector((state: RootState) => state.checkout);

  const initialValues = {
    users: Array.from({ length: numSim }, () => ({
      name: '',
      email: '',
      phone: '',
    })),
  };

  const validationSchema = Yup.object().shape({
    users: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Required Full Name'),
        email: Yup.string().email('Invalid email').required('Required Email'),
        phone: Yup.string().required('Required Phone Number'),
      })
    ),
  });

  // -------------------------------
  // Helper Error Extractor
  // -------------------------------
  const getFieldError = (
    errors: FormikErrors<{ users: UserType[] }>,
    index: number,
    field: keyof UserType
  ) => {
    const row = errors?.users?.[index];
    return typeof row === 'object' ? (row?.[field] as string) : '';
  };

  return (
    <Suspense fallback={<p className="text-sm text-gray-500">Loading package...</p>}>

      <div className="max-w-5xl mx-auto md:p-6 min-h-screen">
        <TopHeader title="Review and Purchase" />
        <Formik
          enableReinitialize
          initialValues={{
            users: Array.from({ length: numSim }, (_, i) => initialValues.users[i]),
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log('Form submitted:', values)}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="grid grid-cols-12 gap-4">
              {/* Left Side */}
              <div className="col-span-12 sm:col-span-7 lg:col-span-8 bg-white md:border border-gray-100 rounded-md">
                <EsimHeader />

                <div className="p-4 lg:p-6 space-y-4">
                  <Package />

                  {/* SIM Counter */}
                  <div className="flex items-center justify-between mt-4 bg-linear-to-r from-(--primary) to-(--from) px-3 py-1 rounded">
                    <span className="text-[13px] font-medium text-white">Number of SIMs</span>

                    <div className="flex items-center border border-white rounded overflow-hidden text-sm">
                      <button
                        type="button"
                        onClick={() => dispatch(decrement())}
                        disabled={numSim <= 1}
                        className={clsx(
                          'px-2 py-0.5 bg-white text-gray-700 font-bold hover:bg-gray-100 transition',
                          numSim <= 1 && 'bg-gray-50 cursor-not-allowed'
                        )}
                      >
                        −
                      </button>

                      <div className="w-10 text-center">{numSim}</div>

                      <button
                        type="button"
                        onClick={() => dispatch(increment())}
                        disabled={numSim >= 9}
                        className="px-2 py-0.5 bg-white text-gray-700 font-bold hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* User Form List */}
                  <FieldArray name="users">
                    {() =>
                      values.users.map((user, index) => (
                        <div
                          key={index}
                          className="bg-white border border-gray-100 rounded-md p-4 pt-2 md:bg-gray-50/50 space-y-3 text-sm"
                        >
                          <h3 className="font-semibold text-[13px] mb-2">
                            User Details (eSim-{index + 1})
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Full Name */}
                            <Input
                              title="Full Name"
                              type="text"
                              field="name"
                              value={user.name}
                              onChange={(field, val) =>
                                setFieldValue(`users[${index}].${field}`, val)
                              }
                              error={getFieldError(errors, index, 'name')}
                              showError={() =>
                                Boolean(
                                  getFieldError(errors, index, 'name') &&
                                  touched.users?.[index]?.name
                                )
                              }
                              no
                            />

                            {/* Email */}
                            <Input
                              title="Email"
                              type="email"
                              field="email"
                              value={user.email}
                              onChange={(field, val) =>
                                setFieldValue(`users[${index}].${field}`, val)
                              }
                              error={getFieldError(errors, index, 'email')}
                              showError={() =>
                                Boolean(
                                  getFieldError(errors, index, 'email') &&
                                  touched.users?.[index]?.email
                                )
                              }
                              no
                            />

                            {/* Phone */}
                            <div className="md:col-span-2">
                              <PhoneInputField
                                label="Phone"
                                value={user.phone}
                                onChange={(val) =>
                                  setFieldValue(`users[${index}].phone`, val)
                                }
                                error={getFieldError(errors, index, 'phone')}
                                showError={Boolean(
                                  getFieldError(errors, index, 'phone') &&
                                  touched.users?.[index]?.phone
                                )}
                                no
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </FieldArray>
                </div>
              </div>

              {/* Right Side */}
              {/* <div className="hidden sm:block col-span-12 sm:col-span-5 lg:col-span-4 bg-white md:border border-gray-100 rounded-md">
                <PriceSummary />
              </div> */}
              <div className=" bg-linear-to-b  from-(--from)/50 to-gray-100/50  rounded-t-4xl col-span-12 sm:col-span-5 lg:col-span-4 bg-white md:border border-gray-100 md:rounded-md ">
                <PriceSummary />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Suspense>
  );
}
