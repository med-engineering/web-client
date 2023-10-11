import { FC } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const LoginInfo: FC = () => {
  return (
    <>
      <div
        className="bg-dark-2 min-h-[100vh] w-[50%] flex flex-col items-center justify-center gap-5 px-10 py-10"
        // style={{ clipPath: "polygon(0% 0%, 96% 0%, 100% 100%, 0% 100%)" }}
      >
        <Player
          src={"https://assets5.lottiefiles.com/packages/lf20_9wpyhdzo.json"}
          className="player max-w-[400px] w-full"
          loop
          autoplay
        />
        <h1 className="text-center font-bold max-w-[500px] text-2xl">
          Manage your services, machines and workers all in the same place!
        </h1>
        <p className="text-center">
          how to get an account? in order to get an account in this platform you
          need to contact one of the admins to confirm that you work at this
          institution and get your account
        </p>
      </div>
    </>
  );
};

export default LoginInfo;
