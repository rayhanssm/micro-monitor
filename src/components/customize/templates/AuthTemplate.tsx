import React, { ReactElement } from "react";

type IProps = {
  pageType: "register" | "login";
  registerStep?: number;
  content: ReactElement;
};

function AuthTemplate({ content, pageType, registerStep }: IProps) {
  return (
    <div
      className={`lg:grid grid-cols-${
        pageType === "register" ? (registerStep === 2 ? "3" : "2") : "2"
      } h-screen`}
    >
      <div
        className="hidden lg:block bg-cover bg-center"
        style={{ backgroundImage: 'url("/assets/auth-image.png")' }}
      >
        <div className="mt-6 ml-10 flex items-center gap-4">
          <img
            className="w-14 h-14"
            src="/assets/logo.png"
            alt="Micro Monitor logo"
          />
          <h2 className="text-teal-50 text-3xl font-semibold">Micro Monitor</h2>
        </div>
      </div>

      {content}
    </div>
  );
}

export default AuthTemplate;
