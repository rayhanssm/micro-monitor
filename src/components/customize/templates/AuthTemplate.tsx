import React, { ReactElement } from "react";

type IProps = {
  content: ReactElement;
};

function AuthTemplate({ content }: IProps) {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div
        className="bg-cover bg-center"
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
