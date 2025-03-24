"use client";

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {
  type: "login" | "register";
};

function AuthForm({ type }: Props) {
  const isLogin = type === "login";
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (formData: { email?: string; password?: string }) => {
    console.log("Form Submitted");
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <Label>Email</Label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                disabled={isPending}
                placeholder="Please enter your email"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <div className="text-red-400">
                {errors.email && touched.email && errors.email}
              </div>
              <Label>Password</Label>
              <input
                type="password"
                name="password"
                placeholder="Please enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                disabled={isPending}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <div className="text-red-400">
                {errors.password && touched.password && errors.password}
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : isLogin ? (
                  "Login"
                ) : (
                  "SignUp"
                )}
              </Button>
              <div className="text-xs">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Link
                  href={isLogin ? "/signup" : "/login"}
                  className={`text-blue-200 ${isLogin ? "pointer-event-none opacity-50" : ""}`}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AuthForm;
