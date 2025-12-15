'use client';

import { FcGoogle } from "react-icons/fc";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/common/input/Input";
import { Button } from "@/components/common/button/Button";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {

  const router = useRouter();
  const initialValues: LoginFormValues = {
    email: "user@gamil.com",
    password: "user1234",
    remember: false,
  }; 
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
  });

  const handleSubmit = (values: LoginFormValues) => {
    console.log("Form submitted:", values);
    localStorage.setItem("loginForm", JSON.stringify(values));
    router.push('/account')
    // Add your login logic here
  };
 

  return (
    <div className=" bg-linear-to-br from-(--from) to-(--to) lg:px-6">


      <div className="flex items-center min-h-screen">
        {/* Left Side - Hero */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-12 text-(--primary)! relative">
          <h1 className="bg-linear-to-r from-blue-500 to-orange-500 text-transparent bg-clip-text text-4xl font-extrabold mb-6 animate-fadeIn">
            Welcome to eSIM
          </h1>
          <p className="text-sm text-gray-500 mb-8 text-center max-w-md animate-fadeIn delay-100">
            Seamlessly connect your devices with eSIM. Activate instantly and manage multiple numbers without physical SIM cards.
          </p>

        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 -mt-12">
          <div className="w-full max-w-sm md:bg-white   md:p-6 md:rounded-xl md:shadow-lg md:border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, handleChange, submitCount }) => (
                <Form className="flex flex-col gap-4">
                  <Input<LoginFormValues>
                    title="Email"
                    type="email"
                    field="email"
                    value={values.email}
                    onChange={(field, value) => {
                      handleChange({ target: { name: field, value } } as any);
                    }}
                    error={errors.email}
                    showError={(field) => !!(submitCount > 0 && errors[field])}
                    placeholder="Enter your email"
                  />

                  <Input<LoginFormValues>
                    title="Password"
                    type="password"
                    field="password"
                    value={values.password}
                    onChange={(field, value) => {
                      handleChange({ target: { name: field, value } } as any);
                    }}
                    error={errors.password}
                    showError={(field) => !!(submitCount > 0 && errors[field])}
                    placeholder="Enter your password"
                  />


                  <div className="flex justify-between items-center text-sm text-gray-500 text-[12px]">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={values.remember}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      Remember me
                    </label>
                    <a href="#" className="hover:text-blue-500 transition">Forgot password?</a>
                  </div>

                  <Button className="bg-(--primary) flex justify-center text-white">
                    Login
                  </Button>
                </Form>
              )}
            </Formik>


            <div className="my-4 flex items-center justify-center text-gray-400 text-sm relative">
              <span className="z-10 px-2">or</span>
              <div className="absolute top-1/2 w-full border-dashed border-t border-gray-200 "></div>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <Button className="flex px-2! border border-(--primary)/60 md:border-gray-200 w-full  ">
                <FcGoogle size={22} />
                Continue Google
              </Button>

              <Button onClick={() => router.push('/register')} className="flex px-2! border border-(--primary)/60 md:border-gray-200 w-full  ">
                <MdOutlineMailOutline size={22} />
                Register
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
