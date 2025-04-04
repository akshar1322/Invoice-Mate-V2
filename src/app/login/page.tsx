'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', credentials);
      if (response.data.status === 200) {
        toast.success(response.data.message);
        router.push('/');
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="flex min-h-auto font-PoppinsMedium flex-col px-20 py-10 gap-10">
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl dark:text-white">
                Login
              </h2>
              <p className="mt-2 hidden text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a
                  href="#"
                  title=""
                  className="font-semibold text-black transition-all duration-200 hover:underline"
                >
                  Create a free account
                </a>
              </p>
              <form
                action="#"
                onSubmit={handleSubmit}
                method="POST"
                className="mt-8"
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-base font-medium dark:text-slate-300 text-gray-900"
                    >
                      {' '}
                      Username{' '}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="username"
                        id="username"
                        type="text"
                        placeholder="enter your username"
                        value={credentials.username}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium dark:text-slate-300 text-gray-900"
                      >
                        {' '}
                        Password{' '}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md dark:bg-white dark:hover:bg-white/80 dark:text-black bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Get started <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="h-full w-full">
          <Image
            className="mx-auto h-full max-h-[500px] w-full rounded-md object-cover"
            src={'/LoginBG.jpg'}
            alt="login-image"
            width={2000}
            height={1000}
          />

          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
