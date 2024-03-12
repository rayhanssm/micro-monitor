import Button from "@/components/button/Button";

export const metadata = {
  title: "Register",
};

export default function Register() {
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

      <div className="relative">
        <div className="absolute top-8 right-10 flex items-center gap-4">
          <p className="text-slate-500 text-base">Already a user?</p>
          <Button text="Login" type="outlined" />
        </div>

        <div className="flex flex-col justify-center pl-20 pr-32 h-full gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-teal-800 text-5xl font-extrabold">
              Welcome to <br /> Micro Monitor!
            </p>
            <p className="text-slate-900 text-xl font-regular">
              Create your account
            </p>
          </div>

          {/* TODO: integrate later */}
          <div>
            <form className="space-y-6 mb-[30px]">
              <div>
                <label className="text-slate-900 text-sm font-medium">
                  Store Name
                </label>
                <input
                  type="text"
                  className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium">
                  Password
                </label>
                <input
                  type="text"
                  className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
                  required
                />
              </div>
            </form>
            <Button text="Sign Up" type="filled" />
          </div>
        </div>
      </div>
    </div>
  );
}
