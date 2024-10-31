"use client";

import { useState } from "react";

interface Form {
  username: string;
  password: string;
  email?: string;
}

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  function toggleFormType() {
    setFormType(formType === "login" ? "signup" : "login");
  }

  function handleSubmit(formData: Form) {
    if (formType === "login") {
      login(formData);
    } else {
      signup(formData);
    }
  }

  const login = async (formData: Form) => {
    const { username, password } = formData;
    if (!username || !password) {
      alert("⚠️ 아이디와 비밀번호를 입력해주세요!");
      return;
    }
    try {
      const data = await fetch("/auth/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (data.status !== 200) {
        alert("⚠️ 로그인에 실패했어요!");
        return;
      }
      onLogin();
    } catch (error) {
      console.error(error);
      alert("⚠️ 서버에서 데이터를 가져올 수 없어요!\n");
    }
  };

  const signup = async (formData: Form) => {
    const { username, password, email } = formData;
    if (!username || !password) {
      alert("⚠️ 아이디와 비밀번호를 입력해주세요!");
      return;
    }
    if (!email) {
      alert("⚠️ 이메일을 입력해주세요!");
      return;
    }
    try {
      const data = await fetch("/auth/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (data.status !== 201) {
        alert("⚠️ 회원가입에 실패했어요!");
        return;
      }
      alert("✅ 회원가입에 성공했어요!");
    } catch (error) {
      console.error(error);
      alert("⚠️ 서버에서 데이터를 가져올 수 없어요!\n");
    }
  };

  return (
    <div className="login">
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit({
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
            email: e.currentTarget.email?.value,
          });
        }}
      >
        <input type="text" name="username" placeholder="아이디" />
        <input type="password" name="password" placeholder="비밀번호" />
        {formType === "login" && (
          <input type="email" name="email" placeholder="이메일" />
        )}
        <button type="submit">
          {formType === "login" ? "로그인" : "회원가입"}
        </button>
        {formType === "login" && (
          <a onClick={() => toggleFormType()}>회원가입 하기</a>
        )}
      </form>
    </div>
  );
};

export default Login;
