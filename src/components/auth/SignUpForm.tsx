"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { createUserApi } from "../../fetchers/auth/auth";

export default function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const signUp = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const password = formData.get("password");
    const passwordChk = formData.get("passwordChk");

    if (password !== passwordChk) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const signUpForm = { userName: formData.get("userName"), password: password };

    signUpMutation.mutate(signUpForm);
  };

  const signUpMutation = useMutation({
    mutationFn: async (form) => {
      return createUserApi(form); // API 호출
    },
    onSuccess: (response) => {
      alert(response.message);
      console.log(response);
      router.push("/signin");
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
              회원가입
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              아이디와 비밀번호를 입력해주세요.
            </p>
          </div>
          <div>
            <form onSubmit={signUp}>
              <div className="space-y-5">
                <div>
                  <Label>
                    ID / 닉네임<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="아이디를 입력해주세요"
                  />
                </div>
                <div>
                  <Label>
                    비밀번호<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="비밀번호를 입력해주세요 (영문+숫자 조합 8~12자)"
                      type={showPassword ? "text" : "password"}
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
                  <Label>
                    비밀번호 확인<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="비밀번호를 다시 입력해주세요"
                      type={showPassword ? "text" : "password"}
                      id="passwordChk"
                      name="passwordChk"
                    />
                  </div>
                </div>
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    가입하기
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                계정이 있나요?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  로그인하기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
