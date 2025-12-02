"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";

import { loginApi } from '../../fetchers/auth/auth';

export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const login = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const loginForm = { userName: formData.get("userName"), password: formData.get("password") };

    loginMutation.mutate(loginForm);
  };

  const loginMutation = useMutation({
    mutationFn: async (form) => {
      return loginApi(form); // API 호출
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      alert(message);
    }
  });

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              로그인
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              아이디와 비밀번호를 입력해주세요.
            </p>
          </div>
          <div>
            <form onSubmit={login}>
              <div className="space-y-6">
                <div>
                  <Label>
                    ID / 닉네임 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    placeholder="아이디를 입력해주세요."
                    id="userName"
                    name="userName"
                  />
                </div>
                <div>
                  <Label>
                    비밀번호 <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력해주세요"
                      id="password"
                      name="password"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    로그인
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  회원가입하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
