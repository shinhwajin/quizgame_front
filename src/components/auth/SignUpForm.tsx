"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-10 mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
        >
          <ChevronLeftIcon />
          메인으로
        </Link>
      </div>
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
            <form>
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
                      placeholder="비밀번호를 입력해주세요"
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
                      id="password"
                      name="password"
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
